import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import ProductDetails from '../Screens/ProductDetails';
import Products from '../Screens/Products';
import { createStackNavigator } from '@react-navigation/stack';

// enableScreens();
// const Stack = createNativeStackNavigator();

const Stack = createStackNavigator();

const ProductStackNavigator = props => {
    return (
        <Stack.Navigator headerMode keyboardHandlingEnabled={false}>
            <Stack.Screen name='Products' component={Products}/>
            <Stack.Screen name='Product Details' component={ProductDetails}/>
        </Stack.Navigator>
    );
}

export default ProductStackNavigator;