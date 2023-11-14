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

const Cadastro = () => {

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#169567",
            justifyContent: "center",
            alignItems: "center"
        },
        textoCadastro: {
            color: "white",
            fontWeight: 700,
            fontSize: 30,
            textAlign: "center"
        },
        inputCadastro: {
            width: "50%",
            backgroundColor: "#9ED4A6",
            marginTop: "2rem",
            padding: ".7rem",
            color: "white",
            fontWeight: 600,
            fontSize: 20,
            borderRadius: 10
        },
        botaoCadastro: {
            backgroundColor: '#00D488',
            width: "50%",
            height: 50,
            marginLeft: 20,
            marginTop: "3rem",
            borderRadius: 10,
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
                <Text style={estilos.textoCadastro}>Cadastro</Text>
                <TextInput style={estilos.inputCadastro} placeholder="Nome" />
                <TextInput style={estilos.inputCadastro} placeholder="E-mail" />
                <TextInput style={estilos.inputCadastro} placeholder="Senha" />
                <TouchableOpacity style={estilos.botaoCadastro}>
                    <Text style={estilos.textoBotaoCadastro}>Pronto</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    )
}

export default Cadastro;