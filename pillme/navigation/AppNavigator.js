import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import Home from '../components/Home';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';
import EditarRemedio from '../components/EditarRemedio';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home}
                options={{
                    title: 'PillTime',
                    headerStyle: {
                        backgroundColor: '#0171FF',
                        height: 130,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 40,
                        fontWeight: 700
                    },
                    headerTitleAlign: 'center',
                }} />
            <Stack.Screen name="Login" component={Login}
                options={{
                    title: 'PillTime',
                    headerStyle: {
                        backgroundColor: '#0171FF',
                        height: 130,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 40,
                        fontWeight: 700
                    },
                    headerTitleAlign: 'center',
                }} />
            <Stack.Screen name="Cadastro" component={Cadastro}
                options={{
                    title: 'PillTime',
                    headerStyle: {
                        backgroundColor: '#0171FF',
                        height: 130,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 40,
                        fontWeight: 700
                    },
                    headerTitleAlign: 'center',
                }} />

            <Stack.Screen name="EditarRemedio" component={EditarRemedio}
                options={{
                    title: 'PillTime',
                    headerStyle: {
                        backgroundColor: '#0171FF',
                        height: 130,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 40,
                        fontWeight: 700
                    },
                    headerTitleAlign: 'center',
                }} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
