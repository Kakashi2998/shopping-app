import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Products from '../Screens/Products';
import ProductStackNavigator from './ProductStackNavigator';
import Cart from '../Screens/Cart';

const Drawer = createDrawerNavigator();

const DrawerNavigator = props => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Products' component={ProductStackNavigator}/>
                <Drawer.Screen name='Cart' component={Cart}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerNavigator;