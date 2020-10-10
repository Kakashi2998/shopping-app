import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import QuantitySelector from '../Components/QuantitySelector';
import SearchIcon from '../Components/SearchIcon';
import { addToCart, removeFromCart } from '../Store/Actions/CartActions';

const ProductDetails = ({route: {params}}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);
    const item = cart.find(item => item.id === params.id);
    const qty = item === undefined ? 0 : item.qty;

    const addCart = () => {
        dispatch(addToCart(params));
    }

    const subsHandler = () => {
        dispatch(removeFromCart(params));
    }

    return (
        <View style={{height: '100%'}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content/>
                <SearchIcon/>
                <CartIcon/>
            </Appbar.Header>
            <ScrollView>
                <Image source={{uri: params.image}} 
                style={{width: 450, height: 450, overflow: 'visible'}}/>
                <View style={{margin: 10}}>
                    <Title>{params.name}</Title>
                    <Subheading>Price:  Rs. {params.price}</Subheading>
                </View>
            </ScrollView>
            {qty === 0? 
            <Button mode='contained' onPress={addCart} style={styles.orderButton}>
                Add to Cart
            </Button>: 
            <View style={{flexDirection: 'row'}}>
                <Button mode='contained' style={{...styles.orderButton, width: 300}}
                onPress={() => navigation.navigate('Cart')}>
                    Go to Cart
                </Button>
                <QuantitySelector qty={qty} addHandler={addCart} subsHandler={subsHandler}/>
            </View>
            }
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

export default ProductDetails;