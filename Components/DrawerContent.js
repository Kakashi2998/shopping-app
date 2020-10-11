import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../Constants/ColorConst';

const DrawerContent = ({state, navigation}) => {
    const index = state.index;
    return (
        <View style={{marginTop: 100}}>
            <Button 
            onPress={() => navigation.navigate('Products')}>
                <Text style={{color: index === 0? COLORS.PRIMARY: 'black'}}>Store</Text>
            </Button>
            <Button 
            onPress={() => navigation.navigate('CartNavigator', {screen: 'Cart'})}>
                <Text style={{color: index === 1? COLORS.PRIMARY: 'black'}}>Cart</Text>
            </Button>
            <Button onPress={() => navigation.navigate('Orders')}>
                <Text style={{color: index === 2? COLORS.PRIMARY: 'black'}}>Orders</Text>
            </Button>
        </View>
    );
}

export default DrawerContent;