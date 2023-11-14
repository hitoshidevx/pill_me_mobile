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
import Footer from "./Footer"

const Home = () => {

    const navigation = useNavigation();

    const estilos = StyleSheet.create({

        main: {
            flex: 1,
            backgroundColor: "#169567",
            justifyContent: "center",
            alignItems: "center"
        },
        texto: {
            color: "white",
            fontWeight: 700,
            width: "70%",
            fontSize: 25,
            textAlign: "center"
        },
        botaoCadastro: {
            backgroundColor: '#0DAF75',
            width: "70%",
            height: 50,
            marginLeft: 20,
            marginTop: "3rem",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        botaoLogin: {
            backgroundColor: '#00D488',
            width: "70%",
            height: 50,
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        textoBotao: {
            color: 'white',
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 600
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={estilos.main} >
                <Text style={estilos.texto}>Te ajudamos a lembrar de tomar aquele remédio!</Text>

                    <TouchableOpacity style={estilos.botaoCadastro} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={estilos.textoBotao} >Cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.botaoLogin} onPress={() => navigation.navigate('Login')}>
                        <Text style={estilos.textoBotao} >Login</Text>
                    </TouchableOpacity>
                
                <Image source={require('../assets/home.png')} />
            </View>
            <Footer />
        </View>
    )
}

export default Home;