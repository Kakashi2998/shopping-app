import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Card, Surface, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CartItem from '../Components/CartItem';
import { COLORS } from '../Constants/ColorConst';

const Cart = props => {

    const navigation = useNavigation();
    const cartItems = useSelector(state => state.cartReducer.cart)
    .sort((a,b) => a.name.localeCompare(b.name));
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);
    const isCartEmpty = cartItems.length === 0;

    return (
        <View style={{height: '100%'}}>

            {/** Header */}
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Cart'/>
            </Appbar.Header>

            {/** Cart Items */}
            <ScrollView>
            {isCartEmpty ? 
                <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 300}}>
                    Your cart is empty!
                </Text>
                :
                cartItems.map(item => 
                    <CartItem item={item} key={item.id}/>
                )
            }
            </ScrollView>

            {/** Price and order button */}
            <Surface style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                <View style={{height: 70}}>
                    <Title style={{fontSize: 20}}>Total Price: </Title>
                    <Title style={{fontSize: 25}}>Rs.{totalPrice.toFixed(2)}</Title>
                </View>
                {isCartEmpty? 
                <Button mode='contained' 
                style={{...styles.orderButton, backgroundColor: COLORS.SECONDARY}}
                onPress={() => navigation.navigate('Products')}>
                    Add Products
                </Button> 
                :
                <Button mode='contained' style={styles.orderButton}
                onPress={() => navigation.navigate('OrderDetails')}>
                    Order
                </Button>
            }
            </Surface>

        </View>
    );
}

const styles = StyleSheet.create({
    orderButton: {
        height: 50, 
        justifyContent: 'center',
        borderRadius: 10,
        width: 150,
        backgroundColor: 'green',
        marginVertical: 10,
        marginRight: 10
    }
})

export default Cart;