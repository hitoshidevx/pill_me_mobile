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


const apiKEY = axios.create({
    baseURL: "https://pill-time-3d9f9-default-rtdb.firebaseio.com"
})

function MeusRemedios() {

    const [lista, setLista] = useState([]);

    // Modal
    const [modalVisible, setModalVisible] = useState(false)

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const getRemedios = async () => {

        try {
            const userId = await AsyncStorage.getItem("userToken");
            const resposta = await apiKEY.get(`/medicamentos.json?userId=${userId}`);

            if (resposta.status === 200) {
                const remedios = resposta.data;
                const novaLista = []

                for (const remedio in remedios) {
                    if (remedios[remedio].userId == userId) {
                        novaLista.push(remedios[remedio])
                    }
                }

                setLista(novaLista)
            }

        } catch (error) {
            console.log("Deu erro aqui: ", error)
        }
    }

    useEffect(() => {
        getRemedios();
    })

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
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                        Não há produtos cadastrados.
                    </Text>
                ) : (
                    lista.map((remedio, index) => (
                        <View key={index} style={{ width: "80%" }}>
                            <TouchableOpacity style={estilos.pillSection} onPress={() => openModal()}>
                                <Text style={{ color: "white", fontSize: 30, fontWeight: 600 }}>{remedio.nome}</Text>
                                <Text style={{ color: "#4F9CFF", fontSize: 20, fontWeight: 500 }}>Alarme em: {remedio.intervalo}</Text>
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

                        <CountdownCircleTimer
                            isPlaying
                            duration={10} // Duração do contador em segundos
                            size={200}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[7, 5, 2, 0]}
                            onComplete={() => {
                                // Implementar lógica que adiciona a notificação do timer
                                closeModal();
                            }}
                        >
                            {({ remainingTime }) => (
                                <Text style={{ fontSize: 20 }}>{remainingTime}</Text>
                            )}
                        </CountdownCircleTimer>

                        <TouchableOpacity style={{ width: "45%", backgroundColor: "#0055C0", borderRadius: 10, marginTop: "15%", padding: "3%" }} onPress={closeModal}>
                            <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 20, color: "white" }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default MeusRemedios;