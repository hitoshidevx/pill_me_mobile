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

const Login = ({navigation}) => {

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
                        <TextInput style={estilos.inputLogin} placeholder="Digite seu e-mail..." />
                        <TextInput style={estilos.inputLogin} placeholder="Digite sua senha..." />
                    </View>
                    <TouchableOpacity style={estilos.botaoLogin} onPress={() => navigation.navigate("Main")}>
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