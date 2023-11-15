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

function CadastrarRemedio() {

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
            color: "white",
            textAlign: "center",
            fontSize: 17,
            fontWeight: 600,
            borderRadius: 10,
            backgroundColor: "#0070FF",
            marginBottom: "10%"
        },
        selectImage: {
            width: "100%",
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
                <TextInput style={estilos.inputText} placeholder="Nome do Remédio" />
                <TextInput style={estilos.inputText} placeholder="Dosagem" />
                <TextInput style={estilos.inputText} placeholder="Data Inicial" />
                <TextInput style={estilos.inputText} placeholder="Intervalo" />
                <TextInput style={estilos.inputText} placeholder="Data Final" />
                <TouchableOpacity style={estilos.selectImage}>
                    <Text style={{color: "#B4B4B4", fontSize: 17, fontWeight: 600, textAlign: "center"}}>Selecionar Foto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CadastrarRemedio;