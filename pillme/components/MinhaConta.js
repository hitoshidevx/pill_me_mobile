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

    return (
        <View>
            <Text>Minha Conta: </Text>
            <Text>Nome: </Text>
            <Text>E-mail: </Text>
            <Text>Remédios ativos: </Text>
        </View>
    )
}

export default MinhaConta;