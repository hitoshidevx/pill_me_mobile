import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { format } from 'date-fns';
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import img from "../assets/adaptive-icon.png"


const apiKEY = axios.create({
    baseURL: "https://pill-time-3d9f9-default-rtdb.firebaseio.com"
})

function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

    return (<>
        <Image source={imageSource} style={{ width: 90, height: 90, borderRadius: 50, marginLeft: "30%" }} />
    </>)
}

function MeusRemedios({ navigation }) {

    const ref = useRef();

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
    };

    // Abre o modal e restaura o estado da contagem regressiva
    const openModal = (remedio) => {
        setModalRemedio(remedio);
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
                        const remedioId = remedioKey;

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

                        const diffTotal = diffHora * 3600 + diffMinuto * 60 + diffSegundo;

                        // Adiciona o novo objeto com a propriedade 'dataProximoAlarme' à nova lista
                        novaLista.push({
                            ...remedio,
                            id: remedioId,
                            dataProximoAlarme: dataProximoAlarmeUTC,
                            hora: hora,
                            minuto: minuto,
                            segundo: segundo,
                            horaDataInicial: horaDataInicial,
                            minutoDataInicial: minutoDataInicial,
                            segundoDataInicial: segundoDataInicial,
                            diffHora: diffHora,
                            diffMinuto, diffMinuto,
                            diffSegundo: diffSegundo,
                            diffTotal: diffTotal
                        });

                        setRemainingTime(diffTotal);
                        setInitialRemainingTime(diffTotal);
                    }
                }

                setLista(novaLista);

            }

        } catch (error) {
            console.log("Deu erro aqui: ", error)
        }
    };

    useEffect(() => {
        getRemedios();
    }, [])

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            getRemedios();
        });

        return focusListener;
    }, [navigation]);

    const excluirRemedio = (remedio) => {
        return apiKEY.delete("/medicamentos/" + remedio.id + ".json")
    }

    const renderItem = ({ item, drag }) => {

        const isActive = useOnCellActiveAnimation();

        return (
            <ScaleDecorator>
                <OpacityDecorator activeOpacity={0.5}>
                    <ShadowDecorator>
                        <TouchableOpacity onLongPress={drag} style={[estilos.pillSection, { elevation: isActive ? 30 : 0 }]} onPress={() => openModal(item)}>
                            <View style={{ flexDirection: "column", marginRight: "20%" }}>
                                <Text style={{ color: "white", fontSize: 30, fontWeight: 600 }}>{item.nome}</Text>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={item.diffTotal}
                                    initialRemainingTime={item.diffTotal}
                                    size={50}
                                    strokeWidth={6}
                                    trailColor='#0171FF'
                                    colors={['#0171FF', '#0171FF', '#0171FF', '#0171FF']} // Primeira cor alterada para azul
                                    colorsTime={[7, 5, 2, 0]}
                                >
                                    {({ remainingTime }) => {
                                        const hours = Math.floor(remainingTime / 3600);
                                        const minutes = Math.floor((remainingTime % 3600) / 60);
                                        const seconds = remainingTime % 60;

                                        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                                        return (
                                            <Text style={{ width: 100, fontSize: 20, color: "#4F9CFF", marginLeft: "100%" }}>Alarme em: {formattedTime}</Text>
                                        );
                                    }}

                                </CountdownCircleTimer>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={item.diffTotal}
                                    initialRemainingTime={item.diffTotal}
                                    size={70}
                                    strokeWidth={6}
                                    colors={['#0058C7', '#F7B801', '#A30000', '#A30000']} // Primeira cor alterada para azul
                                    colorsTime={[7, 5, 2, 0]}
                                >

                                </CountdownCircleTimer>
                            </View>
                        </TouchableOpacity>
                    </ShadowDecorator>
                </OpacityDecorator>
            </ScaleDecorator>
        )
    }

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
            width: "90%",
            backgroundColor: "#0171FF",
            borderRadius: 10,
            padding: "10%",
            marginBottom: "20%",
            marginLeft: "5%",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para destacar o modal
        },
        modalContent: {
            width: "80%",
            backgroundColor: 'white',
            padding: "10%",
            borderRadius: 10
        },
        infoModal: {
            width: "100%",
            borderColor: "#0055C0",
            borderWidth: 2,
            marginTop: "10%",
            padding: "5%",
            color: "#111111",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            borderRadius: 10
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <View style={estilos.mainSection}>
                <Text style={estilos.estiloText}>Meus Remédios</Text>
                <GestureHandlerRootView>
                    {lista.length > 0 ? // Sim, tem remédio pra exibir
                        <DraggableFlatList
                            ref={ref}
                            data={lista}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `draggable-item-${item.id}`}
                            onDragEnd={({ data }) => {
                                // Atualiza a ordem da lista após o arrasto
                                setLista(data);
                            }}
                        /> : // Não, não tem remédio para exibir
                        <Text style={{fontSize: 20, fontWeight: 600, color: "#6D6D6D", marginTop: "30%"}}>Não há remedios Cadastrados</Text>}
                </GestureHandlerRootView>
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
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: "10%" }}>
                                    <TouchableOpacity style={{ width: "100%", borderRadius: 10, padding: "3%" }}
                                        onPress={closeModal}>
                                        <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 15, color: "#0055C0" }}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: "100%", borderRadius: 10, padding: "3%" }}
                                        onPress={() => {
                                            navigation.navigate("EditarRemedio", { remedio: modalRemedio })
                                            closeModal()
                                        }}>
                                        <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 15, color: "#0055C0" }}>Editar</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ alignContent: "center" }}>
                                    <ImageViewer placeholderImageSource={img} selectedImage={"data:image/png;base64," + modalRemedio.image} />
                                </View>
                                <Text style={estilos.infoModal}>{modalRemedio.nome}</Text>
                                <Text style={estilos.infoModal}>{modalRemedio.dosagem}</Text>
                                <TouchableOpacity
                                    style={{ width: "100%", backgroundColor: "#E32F50", borderRadius: 10, marginTop: "10%", padding: "3%" }}
                                    onPress={() => {
                                        excluirRemedio(modalRemedio)
                                        closeModal()
                                        getRemedios();
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 20, color: "white" }}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default MeusRemedios;