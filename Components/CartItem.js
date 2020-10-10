import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../Store/Actions/CartActions';
import QuantitySelector from './QuantitySelector';

const CartItem = ({item}) => {

    const dispatch = useDispatch();

    return (
        <Surface style={{margin: 10, elevation: 7, overflow: 'hidden'}}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: item.image}} 
                style={{height: 200, width: 150, margin: 10}}/>
                <Title style={{width: 200}} numberOfLines={4}>{item.name}</Title>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Title style={{width: 200, marginLeft: 10}}>Total Price: {item.price * item.qty}</Title>
                <QuantitySelector
                style={{marginLeft: 70}}
                qty={item.qty} 
                addHandler={() => dispatch(addToCart(item))}
                subsHandler={() => dispatch(removeFromCart(item))} />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    quantity: {
        marginRight: -200,
    }
})

export default CartItem;