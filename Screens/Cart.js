import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../Components/CartItem';

const Cart = props => {

    const navigation = useNavigation();
    const cartItems = useSelector(state => state.cartReducer.cart)
    .sort((a,b) => a.name.localeCompare(b.name));
    const totalPrice = useSelector(state => state.cartReducer.totalPrice)

    return (
        <View style={{height: '100%'}}>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Cart'/>
            </Appbar.Header>
            <ScrollView>
                {cartItems.map(item => 
                    <CartItem item={item} key={item.id}/>   
                )}
            </ScrollView>
                <Title>Total Price: {totalPrice}</Title>
            <Button mode='contained' style={styles.orderButton}>
                Order
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    orderButton: {
        bottom: 0, 
        height: 50, 
        justifyContent: 'center', 
        borderRadius: 0
    }
})

export default Cart;