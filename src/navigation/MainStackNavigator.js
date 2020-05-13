import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from '../screens/MainMenuScreen';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        options={({ navigation }) => ({
            headerShown: false            
        })}
        name="Menu" component={MainMenuScreen} />
      </Stack.Navigator>
    );
  }