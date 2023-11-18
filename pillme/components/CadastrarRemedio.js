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
import DateTimePicker from '@react-native-community/datetimepicker';
import {  format  } from 'date-fns';

const apiKEY = axios.create({
    baseURL: "https://pill-time-3d9f9-default-rtdb.firebaseio.com"
})

function CadastrarRemedio({navigation}) {

    // Lógica dos Placeholders
    const [isNomeFocus, setNomeFocus] = useState(false)
    const [isDosagemFocus, setDosagemFocus] = useState(false)
    const [isDataInicialFocus, setDataInicialFocus] = useState(false)
    const [isIntervaloFocus, setIntervaloFocus] = useState(false)
    const [isDataFinalFocus, setDataFinalFocus] = useState(false)

    // States do remédio + userToken
    const [nome, setNome] = useState("")
    const [dosagem, setDosagem] = useState("")
    const [dataInicialSelecionada, setDataInicialSelecionada] = useState(new Date())
    const [intervalo, setIntervalo] = useState(0)
    const [dataFinalSelecionada, setDataFinalSelecionada] = useState(new Date())

    // Testando logica
    const [horaInicio, setHoraInicio] = useState(new Date());
    const [dataNotificacao, setDataNotificacao] = useState(new Date());


    const [showDateTimePicker, setShowDateTimePicker] = useState(false);

    const handleInitialDateChange = () => {
        const currentDate = dataInicialSelecionada;
        setShowDateTimePicker(Platform.OS === 'ios');
        setDataInicialSelecionada(currentDate);
    };

    const handleFinalDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataFinalSelecionada;
        setShowDateTimePicker(Platform.OS === 'ios');
        setDataFinalSelecionada(currentDate);
    };

    // Função para criar o remédio
    const createRemedy = async () => {
        try {
            const userId = await AsyncStorage.getItem("userToken")

            const dataInicialUTC = format(dataInicialSelecionada, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const dataFinalUTC = format(dataFinalSelecionada, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

            const resposta = await apiKEY.post("/medicamentos.json", {
                nome: nome,
                dosagem: dosagem,
                dataInicial: dataInicialUTC,
                intervalo: parseInt(intervalo),
                dataFinal: dataFinalUTC,
                userId: userId
            })
            
            if(resposta.status === 200) {
                navigation.navigate("MeusRemedios", {screen: "MeusRemedios"})
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
            fontWeight: 400,
            borderRadius: 10,
            backgroundColor: "#EDEDED",
            marginBottom: "10%",
            color: "#6D6D6D"
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
                <TextInput style={estilos.inputText} placeholder={isNomeFocus ? "" : "Nome do Remédio"} placeholderTextColor="#6D6D6D" 
                    onFocus={() => setNomeFocus(true)}
                    onBlur={() => setNomeFocus(false)}
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput style={estilos.inputText} placeholder={isDosagemFocus ? "" : "Dosagem"} placeholderTextColor="#6D6D6D" 
                    onFocus={() => setDosagemFocus(true)}
                    onBlur={() => setDosagemFocus(false)} 
                    value={dosagem}
                    onChangeText={(text) => setDosagem(text)}
                />
                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginBottom: "10%"}}>
                    <DateTimePicker 
                        mode="datetime" 
                        display='clock' 
                        value={dataInicialSelecionada} 
                        placeholderText='Data'  
                        onChange={handleInitialDateChange}
                    />
                </View>
                <TextInput style={estilos.inputText} placeholder={isIntervaloFocus ? "" : "Intervalo"} placeholderTextColor="#6D6D6D" 
                    onFocus={() => setIntervaloFocus(true)}
                    onBlur={() => setIntervaloFocus(false)} 
                    value={intervalo}
                    onChangeText={(text) => setIntervalo(text)}
                />
                <DateTimePicker
                    mode="date"
                    display='clock' 
                    value={dataFinalSelecionada} 
                    placeholderText='Final' 
                    style={{marginBottom: "10%"}} 
                    onChange={handleFinalDateChange}
                    />
                <TouchableOpacity style={estilos.selectImage} onPress={() => createRemedy()}>
                    <Text style={{color: "#B4B4B4", fontSize: 17, fontWeight: 600, textAlign: "center"}}>Pronto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CadastrarRemedio;