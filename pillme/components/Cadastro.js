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
import Footer from './Footer';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiCadastro = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
})

const apiKEY = "AIzaSyCTfD20veiK1KRrq4wocpCWIa-8eFj09JE"

const Cadastro = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] = useState(null)

    const registerUser = (email, password, name) => {
        apiCadastro.post("accounts:signUp?key=" + apiKEY, {
            email: email, 
            password: password, 
            displayName: name, 
            returnSecureToken:true
        })
        .then((resposta) => {
            AsyncStorage.setItem("userToken", resposta.data.localId)
            AsyncStorage.setItem("idToken", resposta.data.idToken)
            console.log("Deu bom no cadastro: ", resposta.data)
            navigation.navigate("Main")
        })
        .catch((err) => console.log("Erro ao fazer Signup - ", err))
    }

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center"
        },
        sectionCadastro: {
            backgroundColor: "#55B7FF",
            justifyContent: "center",
            padding: "10%",
            borderRadius: 10,
            marginTop: "30%"
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
            marginTop: "15%",
            padding: "5%",
            color: "#C6C6C6",
            fontWeight: 600,
            fontSize: 20,
            borderRadius: 10,
            textAlign: "center"
        },
        botaoCadastro: {
            backgroundColor: '#0171FF',
            width: "100%",
            height: 50,
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center"
        },
        textoBotaoCadastro: {
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
                    <View style={estilos.sectionCadastro}>
                        <Text style={estilos.textoCadastro}>Cadastro</Text>
                        <TextInput style={estilos.inputCadastro} placeholder="Digite seu nome..." 
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput style={estilos.inputCadastro} placeholder="Digite seu e-mail..." 
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput style={estilos.inputCadastro} placeholder="Digite sua senha..." secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput style={estilos.inputCadastro} placeholder="Digite Novamente..." secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />  
                    </View>
                    <TouchableOpacity style={estilos.botaoCadastro} onPress={() => registerUser(email, password, name) }>
                        <Text style={estilos.textoBotaoCadastro}>Pronto</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{textAlign: "center", fontSize: 20, color: "#ACACAC", marginTop: "10%", fontWeight: 400, textDecorationLine: "underline"}}>Já tem conta? Faça login aqui!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Cadastro;