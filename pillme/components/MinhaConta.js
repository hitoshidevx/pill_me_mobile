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

function MinhaConta() {

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
            marginTop: "20%"
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
            marginTop: "2rem",
            padding: ".7rem",
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
            marginTop: "3rem",
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
                <View style={{width: "80%", marginTop: "15%"}}>
                    <View style={estilos.sectionCadastro}>
                        <Text style={estilos.textoCadastro}>Minha Conta</Text>
                        <Text style={estilos.inputCadastro}>Nome</Text>
                        <Text style={estilos.inputCadastro}>E-mail</Text>
                        <Text style={estilos.inputCadastro}>Seus Remédios: 0</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MinhaConta;