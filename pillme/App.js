import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';

{/*  Integrantes do grupo:
RM 93442 - Gabriel Hitoshi Furone Yokogawa
RM 93150 - Guilherme Martins Nascimento
RM 93205 - Luis Fernando Nascimento de Oliveira
RM 94990 - Pedro Augusto Pereira Viana
RM 95800 - Yasmin Cabral Dias
*/}


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
