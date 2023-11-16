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

const apiLogin = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
})

const apiKEY = "AIzaSyCTfD20veiK1KRrq4wocpCWIa-8eFj09JE"

const Login = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    const loginUser = () => {
        apiLogin.post("accounts:signInWithPassword?key=" + apiKEY, {email, password, returnSecureToken: true})
        .then((resposta) => {
            if(resposta.data.registered == true) {
                // Setando no localStorage se o token do usuario para acesso nas telas de Meus Remedios, Cadastrar Remedio e Minha Conta
                AsyncStorage.setItem("userToken", resposta.data.localId)
                AsyncStorage.setItem("idToken", resposta.data.idToken)
                console.log("Deu bom no login")
                navigation.navigate("Main")
            } else {
                console.log("Deu ruim no login ein.")
                return
            }
        })
        .catch((err) => {
            console.log("Deu erro aqui: ", err)
        })
    }

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center"
        },
        sectionLogin: {
            backgroundColor: "#55B7FF",
            justifyContent: "center",
            padding: "10%",
            borderRadius: 10,
            marginTop: "30%"
        },
        textoLogin: {
            color: "white",
            fontWeight: 700,
            fontSize: 30,
            textAlign: "center"
        },
        inputLogin: {
            width: "100%",
            backgroundColor: "#fff",
            marginTop: "15%",
            padding: "5%",
            color: "#C6C6C6",
            fontWeight: 600,
            fontSize: 20,
            borderRadius: 10,
            textAlign: "center"
        },
        botaoLogin: {
            backgroundColor: '#0171FF',
            width: "100%",
            height: 50,
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center"
        },
        textoBotaoLogin: {
            color: 'white',
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 600
        }
    })

    return (
        <View style={{flex: 1}}>
            <View style={estilos.main}>
                <View style={{width: "80%"}}>
                    <View style={estilos.sectionLogin}>
                        <Text style={estilos.textoLogin}>Login</Text>
                        <TextInput style={estilos.inputLogin} placeholder="Digite seu e-mail..." 
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput style={estilos.inputLogin} placeholder="Digite sua senha..." secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity style={estilos.botaoLogin} onPress={() => loginUser()}>
                        <Text style={estilos.textoBotaoLogin}>Pronto</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                        <Text style={{textAlign: "center", fontSize: 20, color: "#ACACAC", marginTop: "10%", fontWeight: 400, textDecorationLine: "underline"}}>Não tem conta? Se cadastre!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login;