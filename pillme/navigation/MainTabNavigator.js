import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MeusRemedios from '../components/MeusRemedios';
import CadastrarRemedio from '../components/CadastrarRemedio';
import MinhaConta from '../components/MinhaConta';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MeusRemedios" component={MeusRemedios} />
      <Tab.Screen name="CriarRemedio" component={CadastrarRemedio} />
      <Tab.Screen name="MinhaConta" component={MinhaConta} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
