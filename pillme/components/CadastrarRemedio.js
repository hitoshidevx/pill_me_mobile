import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Modal,
    Pressable,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiKEY = axios.create({
    baseURL: "https://pill-time-3d9f9-default-rtdb.firebaseio.com"
})

function CadastrarRemedio() {

    // Lógica dos Placeholders
    const [isNomeFocus, setNomeFocus] = useState(false)
    const [isDosagemFocus, setDosagemFocus] = useState(false)
    const [isDataInicialFocus, setDataInicialFocus] = useState(false)
    const [isIntervaloFocus, setIntervaloFocus] = useState(false)
    const [isDataFinalFocus, setDataFinalFocus] = useState(false)

    // States do remédio + userToken
    const [nome, setNome] = useState("")
    const [dosagem, setDosagem] = useState("")
    const [dataInicial, setDataInicial] = useState("")
    const [intervalo, setIntervalo] = useState("")
    const [dataFinal, setDataFinal] = useState("")

    // Função para criar o remédio
    const createRemedy = async () => {
        try {
            const userId = await AsyncStorage.getItem("userToken")
            const resposta = await apiKEY.post("/medicamentos.json", {
                nome: nome,
                dosagem: dosagem,
                dataInicial: dataInicial,
                intervalo: intervalo,
                dataFinal: dataFinal,
                userId: userId
            })
            
            if(resposta.status === 200) {
                console.log(resposta.data);
            }

        } catch (error) {
            console.log("Erro durante o registro do medicamento: ", error)
        }
    }

    const estilos = StyleSheet.create({
        mainSection: {
            width: "80%",
            alignItems: "center"
        },
        estiloText: {
            textAlign: "center",
            fontWeight: 700,
            color: "#4583D0",
            fontSize: 25,
            marginTop: "10%",
            marginBottom: "10%"
        },
        inputText: {
            width: "100%",
            padding: "5%",
            textAlign: "center",
            fontSize: 17,
            fontWeight: 600,
            borderRadius: 10,
            backgroundColor: "#0070FF",
            marginBottom: "10%",
            color: "white"
        },
        selectImage: {
            width: "100%",
            backgroundColor: "white",
            padding: "5%",
            borderRadius: 10,
            shadowColor: '#000', // Cor da sombra
            shadowOffset: {
            width: 0,
            height: 4,
            },
            shadowOpacity: 0.4, // Opacidade da sombra
            shadowRadius: 2, // Raio da sombra
            elevation: 3, // Efeito de elevação para dispositivos Android
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <View style={estilos.mainSection}>
                <Text style={estilos.estiloText}>Cadastrar Remédio</Text>
                <TextInput style={estilos.inputText} placeholder={isNomeFocus ? "" : "Nome do Remédio"} placeholderTextColor="white" 
                    onFocus={() => setNomeFocus(true)}
                    onBlur={() => setNomeFocus(false)}
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput style={estilos.inputText} placeholder={isDosagemFocus ? "" : "Dosagem"} placeholderTextColor="white" 
                    onFocus={() => setDosagemFocus(true)}
                    onBlur={() => setDosagemFocus(false)} 
                    value={dosagem}
                    onChangeText={(text) => setDosagem(text)}
                />
                <TextInput style={estilos.inputText} placeholder={isDataInicialFocus ? "" : "Data Inicial"} placeholderTextColor="white" 
                    onFocus={() => setDataInicialFocus(true)}
                    onBlur={() => setDataInicialFocus(false)} 
                    value={dataInicial}
                    onChangeText={(text) => setDataInicial(text)}
                />
                <TextInput style={estilos.inputText} placeholder={isIntervaloFocus ? "" : "Intervalo"} placeholderTextColor="white" 
                    onFocus={() => setIntervaloFocus(true)}
                    onBlur={() => setIntervaloFocus(false)} 
                    value={intervalo}
                    onChangeText={(text) => setIntervalo(text)}
                />
                <TextInput style={estilos.inputText} placeholder={isDataFinalFocus ? "" : "Data Final"} placeholderTextColor="white" 
                    onFocus={() => setDataFinalFocus(true)}
                    onBlur={() => setDataFinalFocus(false)} 
                    value={dataFinal}
                    onChangeText={(text) => setDataFinal(text)}
                />
                <TouchableOpacity style={estilos.selectImage} onPress={() => createRemedy()}>
                    <Text style={{color: "#B4B4B4", fontSize: 17, fontWeight: 600, textAlign: "center"}}>Pronto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CadastrarRemedio;