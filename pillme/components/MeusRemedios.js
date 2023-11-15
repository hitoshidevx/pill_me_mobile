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

function MeusRemedios() {

    const estilos = StyleSheet.create({
        mainSection: {
            width: "80%",
            alignItems: "center"
        },
        estiloText: {
            textAlign: "center",
            fontWeight: "600",
            color: "#4583D0",
            fontSize: 25,
            marginTop: "15%",
            marginBottom: "15%"
        },
        pillSection: {
            width: "100%",
            backgroundColor: "#0171FF",
            borderRadius: 10,
            padding: "5%",
            alignItems: "flex-start",
            marginBottom: "20%"
        }
    })

    return (
        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
            <View style={estilos.mainSection}>
                <Text style={estilos.estiloText}>Meus Remédios</Text>
                <TouchableOpacity style={estilos.pillSection}> 
                    <Text style={{color: "white", fontSize: 30, fontWeight: 600}}>Remédio 1</Text>
                    <Text style={{color: "#4F9CFF", fontSize: 20, fontWeight: 500}}>Alarme em: 1h</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.pillSection}> 
                    <Text style={{color: "white", fontSize: 30, fontWeight: 600}}>Remédio 2</Text>
                    <Text style={{color: "#4F9CFF", fontSize: 20, fontWeight: 500}}>Alarme em: 5h</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.pillSection}> 
                    <Text style={{color: "white", fontSize: 30, fontWeight: 600}}>Remédio 3</Text>
                    <Text style={{color: "#4F9CFF", fontSize: 20, fontWeight: 500}}>Alarme em: 10h</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MeusRemedios;