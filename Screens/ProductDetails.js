import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import QuantitySelector from '../Components/QuantitySelector';
import SearchIcon from '../Components/SearchIcon';
import { COLORS } from '../Constants/ColorConst';
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

            {/** Header */}
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content/>
                <SearchIcon/>
                <CartIcon/>
            </Appbar.Header>

            {/** Content */}
            <ScrollView>
                <Image source={{uri: params.image}} 
                style={{width: 450, height: 450, overflow: 'visible'}}/>
                <View style={{margin: 10, height: 180}}>
                    <Title style={{height: 100}}>{params.name}</Title>
                    <Text style={{fontSize: 30, top: 40}}>
                        Price:  Rs. {params.price.toFixed(2)}
                    </Text>
                </View>
            </ScrollView>

            {/** Add to cart if qty=0 else quantity selector */}
            {qty === 0? 
            <Button mode='contained' onPress={addCart} style={styles.orderButton}>
                Add to Cart
            </Button>
            : 
            <View style={{flexDirection: 'row'}}>
                <Button mode='contained' 
                style={{...styles.orderButton, width: 250, backgroundColor: COLORS.SECONDARY}}
                onPress={() => navigation.navigate('Cart')}>
                    Go to Cart
                </Button>
                <QuantitySelector qty={qty} addHandler={addCart} 
                subsHandler={subsHandler}
                style={{width: 150}}/>
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
        borderRadius: 0,
        backgroundColor: COLORS.SECONDARY
    }
})

export default ProductDetails;