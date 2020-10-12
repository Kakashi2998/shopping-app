import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../Constants/ColorConst';

const DrawerContent = ({state, navigation}) => {
    const index = state.index;
    return (
        <View style={{marginTop: 100}}>
            <Button 
            onPress={() => navigation.navigate('Products')}
            style={{marginVertical: 10}}>
                <Text style={{color: index === 0? COLORS.PRIMARY: COLORS.SECONDARY, fontSize: 20}}>
                    Store
                </Text>
            </Button>
            <Button 
            onPress={() => navigation.navigate('CartNavigator', {screen: 'Cart'})}
            style={{marginVertical: 10}}>
                <Text style={{color: index === 1? COLORS.PRIMARY: COLORS.SECONDARY, fontSize: 20}}>
                    Cart
                </Text>
            </Button>
            <Button onPress={() => navigation.navigate('Orders')}
            style={{marginVertical: 10}}>
                <Text style={{color: index === 2? COLORS.PRIMARY: COLORS.SECONDARY, fontSize: 20}}>
                    Orders
                </Text>
            </Button>
        </View>
    );
}

export default DrawerContent;