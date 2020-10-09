import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Cart = props => {

    const navigation = useNavigation();
    const cartItems = useSelector(state => state.cartReducer.cart);

    return (
        <View>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Cart'/>
            </Appbar.Header>
            <ScrollView>
                {cartItems.map(item => 
                    <Card key={item.id}>
                        <Card.Title title={item.name} subtitle={item.price}/>
                    </Card>    
                )}
            </ScrollView>
        </View>
    );
}

export default Cart;