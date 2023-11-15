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

const Cadastro = ({navigation}) => {

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
                        <TextInput style={estilos.inputCadastro} placeholder="Digite seu nome..." />
                        <TextInput style={estilos.inputCadastro} placeholder="Digite seu e-mail..." />
                        <TextInput style={estilos.inputCadastro} placeholder="Digite sua senha..." />
                    </View>
                    <TouchableOpacity style={estilos.botaoCadastro} onPress={() => navigation.navigate("Login")}>
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