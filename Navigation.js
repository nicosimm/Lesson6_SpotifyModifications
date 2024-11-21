import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Add" component={Add} options={{ title: 'Add Song' }} />
                <Stack.Screen name="Edit" component={Edit} options={{ title: 'Edit Song' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
