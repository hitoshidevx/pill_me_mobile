import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import Home from '../components/Home';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home}
                options={{
                    title: 'Pill Time',
                    headerStyle: {
                        backgroundColor: '#00D488',
                        height: 100
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 30,
                        fontWeight: 800
                    },
                    headerTitleAlign: 'center'
                }} />
            <Stack.Screen name="Login" component={Login}
                options={{
                    title: 'Pill Time',
                    headerStyle: {
                        backgroundColor: '#00D488',
                        height: 100
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 30,
                        fontWeight: 800
                    },
                    headerTitleAlign: 'center'
                }} />
            <Stack.Screen name="Cadastro" component={Cadastro}
                options={{
                    title: 'Pill Time',
                    headerStyle: {
                        backgroundColor: '#00D488',
                        height: 100
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 30,
                        fontWeight: 800
                    },
                    headerTitleAlign: 'center'
                }} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
