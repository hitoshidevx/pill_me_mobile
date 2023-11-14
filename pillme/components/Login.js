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
import { useNavigation } from '@react-navigation/native';
import { MeusRemedios } from './MeusRemedios'
import Footer from './Footer';

const Login = () => {

    const navigation = useNavigation();

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#169567",
            justifyContent: "center",
            alignItems: "center"
        },
        textoLogin: {
            color: "white",
            fontWeight: 700,
            fontSize: 30,
            textAlign: "center"
        },
        inputLogin: {
            width: "50%",
            backgroundColor: "#9ED4A6",
            marginTop: "2rem",
            padding: ".7rem",
            color: "white",
            fontWeight: 600,
            fontSize: 20,
            borderRadius: 10
        },
        botaoLogin: {
            backgroundColor: '#00D488',
            width: "50%",
            height: 50,
            marginLeft: 20,
            marginTop: "3rem",
            borderRadius: 10,
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
                <Text style={estilos.textoLogin}>Login</Text>
                <TextInput style={estilos.inputLogin} placeholder="E-mail" />
                <TextInput style={estilos.inputLogin} placeholder="Senha" />
                <TouchableOpacity style={estilos.botaoLogin} onPress={() => navigation.navigate('Main')}>
                    <Text style={estilos.textoBotaoLogin}>Logar</Text>
                </TouchableOpacity>
            </View>
            
            <Footer />
        </View>
    )
}

export default Login;