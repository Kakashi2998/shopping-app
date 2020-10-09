import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Button, Card, Title } from 'react-native-paper';

const ProductCard = ({product}) => {

    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple('white')}
        style={{padding: 10}}
        onPress={() => navigation.navigate('Product Details', {...product})}>
            <Card elevation={7} style={{width: 185}}>
                <Card.Title title={product.name} titleNumberOfLines={3}/>
                <Card.Cover source={{uri: product.image}} style={{width: 180}}/>
                <Card.Content>
                    <Title>Rs. {product.price}</Title>
                </Card.Content>
                <Card.Actions>
                    <Button>Add To Cart</Button>
                </Card.Actions>
            </Card>
        </TouchableNativeFeedback>
    );
}

export default ProductCard;