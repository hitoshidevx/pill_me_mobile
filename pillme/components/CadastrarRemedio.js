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

    return (
        <View>
            <Text>Cadastrar Remédio</Text>
            <TextInput placeholder="Nome do Remédio" />
            <TextInput placeholder="Dosagem" />
            <TextInput placeholder="Horario" />
        </View>
    )
}

export default CadastrarRemedio;