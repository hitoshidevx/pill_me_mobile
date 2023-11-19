import React, { useContext, useEffect, useState } from 'react';
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

const apiMinhaConta = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
})

const apiKeyRemedy = axios.create({
    baseURL: "https://pill-time-3d9f9-default-rtdb.firebaseio.com"
})

const apiKEY = "AIzaSyCTfD20veiK1KRrq4wocpCWIa-8eFj09JE"

function MinhaConta() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [remedios, setRemedios] = useState(null)

    const getUser = async () => {
        try {
            const value = await AsyncStorage.getItem("idToken");

            const resposta = await apiMinhaConta.post("accounts:lookup?key=" + apiKEY, 
            {
                idToken: value
            })

            if(resposta.status === 200) {
                setName(resposta.data.users[0].displayName)
                setEmail(resposta.data.users[0].email)

            }

        } catch (error) {
            console.log('Erro ao obter o token:', error);
        }
    }

    const getRemedios = async () => {
        try {
            const userId = await AsyncStorage.getItem("userToken");
            const resposta = await apiKeyRemedy.get(`/medicamentos.json?userId=${userId}`);

            if (resposta.status === 200) {
                const remedios = resposta.data;
                let remediosNum = 0;

                for (const remedioKey in remedios) {
                    if (remedios[remedioKey].userId === userId) {
                        remediosNum = remediosNum + 1
                    }
                }
                
                setRemedios(remediosNum)
            }
        } catch (error) {
            console.log("Deu erro aqui: ", error)
        }
    };



    useEffect(() => {
        getUser();
        getRemedios();
    }, [])

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center"
        },
        sectionCadastro: {
            backgroundColor: "#55B7FF",
            justifyContent: "center",
            padding: "15%",
            borderRadius: 10,
            marginTop: "10%"
        },
        textoCadastro: {
            color: "white",
            fontWeight: 700,
            fontSize: 30,
            textAlign: "center"
        },
        inputCadastro: {
            width: "100%",
            backgroundColor: "#fff",
            marginTop: "20%",
            padding: "5%",
            color: "#C6C6C6",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            borderRadius: 10
        }
    })

    return (
        <View style={{flex: 1}}>
            <View style={estilos.main}>
                <View style={{width: "80%", marginTop: "15%"}}>
                    <View style={estilos.sectionCadastro}>
                        <Text style={estilos.textoCadastro}>Minha Conta</Text>
                        <Text style={estilos.inputCadastro} >Nome: {name}</Text>
                        <Text style={estilos.inputCadastro}>E-mail: {email}</Text>
                        <Text style={estilos.inputCadastro}>Seus Remédios: {remedios}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MinhaConta;