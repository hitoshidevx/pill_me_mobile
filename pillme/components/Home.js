import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        texto: {
            color: "#6D6D6D",
            fontWeight: 500,
            width: "65%",
            fontSize: 25,
            textAlign: "center"
        },
        botaoCadastro: {
            backgroundColor: '#0171FF',
            width: "80%",
            padding: 10,
            marginLeft: 20,
            marginTop: "15%",
            justifyContent: "center",
            alignItems: "center"
        },
        textoBotao: {
            color: 'white',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 700
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={estilos.main} >
                    <Image source={require('../assets/pillit.png')} style={{width: "80%", height: "40%", marginTop: "15%"}} />
                    <Text style={estilos.texto}>Te ajudamos a lembrar de tomar aquele remédio!</Text>
                    <TouchableOpacity style={estilos.botaoCadastro} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={estilos.textoBotao}> Começar </Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home;