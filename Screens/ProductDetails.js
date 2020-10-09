import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Keyboard, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Badge, Button, Searchbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import { addToCart } from '../Store/Actions/CartActions';
import {toggleSearch} from '../Store/Actions/ProductActions';

const ProductDetails = ({route: {params}}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const searchProducts = () => {
        dispatch(toggleSearch());
        navigation.navigate('Products');
    }

    const addCart = () => {
        dispatch(addToCart(params));
    }

    return (
        <View >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content/>
                <Appbar.Action icon='search' 
                onPress={() => searchProducts()}/>
                <CartIcon/>
            </Appbar.Header>
            <Image source={{uri: params.image}} 
            style={{width: 300, height: 300}}/>
            <Text style={{fontSize: 30}}>{params.name}</Text>
            <Text>Price:  Rs. {params.price}</Text>
            <Button mode='contained' onPress={addCart}>
                Add to Cart
            </Button>
        </View>
    );
}

export default ProductDetails;