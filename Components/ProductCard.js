import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Button, Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../Constants/ColorConst';
import { addToCart, removeFromCart } from '../Store/Actions/CartActions';
import QuantitySelector from './QuantitySelector';

const ProductCard = ({product}) => {

    const navigation = useNavigation();
    const cart = useSelector(state => state.cartReducer.cart);
    const item = cart.find(item => item.id === product.id);
    const qty = item === undefined ? 0 : item.qty;
    const dispatch = useDispatch();

    return (
        <Card elevation={7} style={styles.container}>
            <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple('white')}
            onPress={() => navigation.navigate('Product Details', {...product})}>
                <Card.Title title={product.name} titleNumberOfLines={2}/>
                <Card.Cover source={{uri: product.image}} 
                style={styles.image}/>
                <Card.Content>
                    <Title>Rs. </Title>
                    <Title>{product.price.toFixed(2)}</Title>
                </Card.Content>
            </TouchableNativeFeedback>
            <Card.Actions>
                {qty === 0? 
                <Button onPress={() => dispatch(addToCart(product))}>
                    <Text style={{color: COLORS.SECONDARY}}>
                        Add To Cart
                    </Text>
                </Button>: 
                <QuantitySelector qty={qty}
                style={{width: 150}}
                addHandler={() => dispatch(addToCart(product))}
                subsHandler={() => dispatch(removeFromCart(product))}
                /> 
                }
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width / 2.2,
        margin: 10, 
        overflow: 'hidden',
        borderRadius: 10,
        padding: 10
    },
    image: {
        width: 185, 
        height: 200
    }
})

export default ProductCard;