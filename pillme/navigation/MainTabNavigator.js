import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import MeusRemedios from '../components/MeusRemedios';
import CadastrarRemedio from '../components/CadastrarRemedio';
import MinhaConta from '../components/MinhaConta';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator
const Stack = createStackNavigator();

const MeusRemediosStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PillMe"
        component={MeusRemedios}
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
        }}
      />
    </Stack.Navigator>
  );
};

const CadastrarRemedioStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PillMe"
        component={CadastrarRemedio}
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
        }}
      />
    </Stack.Navigator>
  );
};

const MinhaContaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PillMe"
        component={MinhaConta}
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
        }}
      />
    </Stack.Navigator>
  );
};

function MainTabNavigator() {


  return (
    <BottomTab.Navigator
      initialRouteName="MeusRemedios"
      labeled={false}
      barStyle={{ backgroundColor: '#0171FF' }}
    >
      <BottomTab.Screen
        name="MeusRemedios"
        component={MeusRemediosStack}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="pill" color="#fff" size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name="CadastrarRemedio"
        component={CadastrarRemedioStack}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="plus" color="#fff" size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name="MinhaConta"
        component={MinhaContaStack}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color="#fff" size={26} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}


export default MainTabNavigator;