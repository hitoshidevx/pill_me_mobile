import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal
} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { format } from 'date-fns';


const apiKEY = axios.create({
    baseURL: "https://pill-time-3d9f9-default-rtdb.firebaseio.com"
})

function MeusRemedios( {navigation} ) {

    const [lista, setLista] = useState([]);
    const [countdown, setCountdown] = useState([]);

    // Modal
    const [modalVisible, setModalVisible] = useState(false)
    const [modalRemedio, setModalRemedio] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0); // Estado para controlar o tempo restante
    const [initialRemainingTime, setInitialRemainingTime] = useState(0)

    // Armazena o tempo restante ao fechar o modal
    const closeModal = () => {
        setModalVisible(false);
        if (modalRemedio) {
            const selectedRemedio = lista.find(remedio => remedio.id === modalRemedio.id);
            if (selectedRemedio) {
                setRemainingTime(selectedRemedio.diffHora * 60 * 60 + selectedRemedio.diffMinuto * 60 + selectedRemedio.diffSegundo);
                // Salva o tempo restante em AsyncStorage
                AsyncStorage.setItem('remainingTime', (selectedRemedio.diffHora * 60 * 60 + selectedRemedio.diffMinuto * 60 + selectedRemedio.diffSegundo).toString());
            }
        }
    };

    // Abre o modal e restaura o estado da contagem regressiva
    const openModal = (remedio) => {
        setModalRemedio(remedio);
        if (remedio) {
            setInitialRemainingTime(remedio.diffHora * 60 * 60 + remedio.diffMinuto * 60 + remedio.diffSegundo);
        }
        setModalVisible(true);
    };


    const getRemedios = async () => {
        try {
            const userId = await AsyncStorage.getItem("userToken");
            const resposta = await apiKEY.get(`/medicamentos.json?userId=${userId}`);

            if (resposta.status === 200) {
                const remedios = resposta.data;
                const novaLista = [];

                for (const remedioKey in remedios) {
                    if (remedios[remedioKey].userId === userId) {
                        const remedio = remedios[remedioKey];

                        const dataInicial = new Date(remedio.dataInicial).getTime();
                        const dataInicialUTC = format(dataInicial, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
                        const partesDataInicial = dataInicialUTC.split('T')[1].split('.')[0].split(':');
                        const horaDataInicial = parseInt(partesDataInicial[0], 10);
                        const minutoDataInicial = parseInt(partesDataInicial[1], 10);
                        const segundoDataInicial = parseInt(partesDataInicial[2], 10);

                        const intervalo = remedio.intervalo;

                        const dataProximoAlarme = new Date(dataInicial + (intervalo * 60 * 60 * 1000));
                        const dataProximoAlarmeUTC = format(dataProximoAlarme, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
                        const partesProximoAlarme = dataProximoAlarmeUTC.split('T')[1].split('.')[0].split(':');
                        const hora = parseInt(partesProximoAlarme[0], 10);
                        const minuto = parseInt(partesProximoAlarme[1], 10);
                        const segundo = parseInt(partesProximoAlarme[2], 10);

                        const diffHora = hora - horaDataInicial;
                        const diffMinuto = minuto - minutoDataInicial
                        const diffSegundo = segundo - segundoDataInicial;

                        // Adiciona o novo objeto com a propriedade 'dataProximoAlarme' à nova lista
                        novaLista.push({
                            ...remedio,
                            dataProximoAlarme: dataProximoAlarmeUTC,
                            hora: hora,
                            minuto: minuto,
                            segundo: segundo,
                            horaDataInicial: horaDataInicial,
                            minutoDataInicial: minutoDataInicial,
                            segundoDataInicial: segundoDataInicial,
                            diffHora: diffHora,
                            diffMinuto, diffMinuto,
                            diffSegundo: diffSegundo // Convertendo para string no formato aceitável
                        });
                    }
                }

                setLista(novaLista);
            }

        } catch (error) {
            console.log("Deu erro aqui: ", error)
        }
    };

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            getRemedios();
        });

        return focusListener;
    }, [navigation]);

    useEffect(() => {
        const interval = setInterval(() => {
          const updatedList = lista.map(remedio => {
            const diffTime = new Date(remedio.dataProximoAlarme) - new Date();
    
            const diffHora = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diffMinuto = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            const diffSegundo = Math.floor((diffTime % (1000 * 60)) / 1000);
    
            return {
              ...remedio,
              diffHora,
              diffMinuto,
              diffSegundo
            };
          });
    
          setLista(updatedList);
    
          if (modalVisible && modalRemedio) {
            const selectedRemedio = updatedList.find(remedio => remedio.id === modalRemedio.id);
            if (selectedRemedio) {
              setRemainingTime(selectedRemedio.diffHora * 60 * 60 + selectedRemedio.diffMinuto * 60 + selectedRemedio.diffSegundo);
            }
          }
        }, 1000);
    
        return () => clearInterval(interval);
    
      });

      useEffect(() => {
        // Ao iniciar, verifique se há um estado salvo em AsyncStorage
        const restoreCountdownState = async () => {
            try {
                const savedRemainingTime = await AsyncStorage.getItem('remainingTime');
                if (savedRemainingTime !== null) {
                    setInitialRemainingTime(parseInt(savedRemainingTime));
                }
            } catch (error) {
                console.log('Erro ao recuperar o estado da contagem regressiva:', error);
            }
        };

        restoreCountdownState();
    }, []);

    const estilos = StyleSheet.create({
        mainSection: {
            width: "100%",
            alignItems: "center"
        },
        estiloText: {
            textAlign: "center",
            fontWeight: "600",
            color: "#4583D0",
            fontSize: 25,
            marginTop: "15%",
            marginBottom: "15%"
        },
        pillSection: {
            width: "100%",
            backgroundColor: "#0171FF",
            borderRadius: 10,
            padding: "10%",
            alignItems: "flex-start",
            marginBottom: "20%"
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para destacar o modal
        },
        modalContent: {
            backgroundColor: 'white',
            padding: "15%",
            alignItems: 'center',
            borderRadius: 10
        },
    })

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <View style={estilos.mainSection}>
                <Text style={estilos.estiloText}>Meus Remédios</Text>
                {lista.length === 0 ? (
                    <Text style={{ textAlign: 'center', fontSize: 30, color: '#6D6D6D', marginTop: "30%", fontWeight: 700 }}>
                        Não há produtos cadastrados :(
                    </Text>
                ) : (
                    lista.map((remedio, index) => (
                        <View key={index} style={{ width: "80%" }}>
                            <TouchableOpacity style={estilos.pillSection} onPress={() => openModal(remedio)}>
                                <Text style={{ color: "white", fontSize: 30, fontWeight: 600 }}>{remedio.nome}</Text>
                                <Text style={{ color: "#4F9CFF", fontSize: 20, fontWeight: 500 }}>Alarme em: {remedio.diffHora}:{remedio.diffMinuto}:{remedio.diffSegundo}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={estilos.modalContainer}>
                    <View style={estilos.modalContent}>

                        {modalRemedio && ( // Verifica se modalRemedio não é null antes de acessar suas propriedades
                            <CountdownCircleTimer
                                isPlaying
                                duration={remainingTime}
                                initialRemainingTime={initialRemainingTime}
                                size={200}
                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[7, 5, 2, 0]}
                                onComplete={closeModal}
                            >
                                {({ remainingTime }) => {
                                    const hours = Math.floor(remainingTime / 3600);
                                    const minutes = Math.floor((remainingTime % 3600) / 60);
                                    const seconds = remainingTime % 60;

                                    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                                    return (
                                        <Text style={{ fontSize: 20 }}>{formattedTime}</Text>
                                    );
                                }}
                            </CountdownCircleTimer>
                        )}

                        <TouchableOpacity
                            style={{ width: "100%", backgroundColor: "#0055C0", borderRadius: 10, marginTop: "15%", padding: "3%" }}
                            onPress={closeModal}
                        >
                            <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 20, color: "white" }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default MeusRemedios;