import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

function Footer() {

    const estilo = StyleSheet.create({
        footer: {
            height: 100,
            backgroundColor: "#00D488",
            justifyContent: "center",
            alignItems: "center"
        },
        textoFooter: {
            color: "white",
            opacity: "75%",
            fontSize: 20,
            textAlign: "center",
            fontWeight: 400
        }
    })

    return(
        <View style={estilo.footer}>
            <Text style={estilo.textoFooter}> Todos os direitos reservados para Pill Time</Text>
        </View>
    )
}

export default Footer;