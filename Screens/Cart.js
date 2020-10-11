import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Surface, Title } from 'react-native-paper';
import { add } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../Components/CartItem';
import { COLORS } from '../Constants/ColorConst';
import { deleteFromCart } from '../Store/Actions/CartActions';

const Cart = props => {

    const navigation = useNavigation();
    const cartItems = useSelector(state => state.cartReducer.cart)
    .sort((a,b) => a.name.localeCompare(b.name));
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);

    return (
        <View style={{height: '100%'}}>
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Cart'/>
            </Appbar.Header>
            <ScrollView>
                {cartItems.map(item => 
                    <CartItem item={item} key={item.id}/>
                )}
            </ScrollView>
            <Surface style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                <Title style={{fontSize: 25}}>Total Price: Rs.{totalPrice.toFixed(2)}</Title>
                <Button mode='contained' style={styles.orderButton}
                onPress={() => navigation.navigate('OrderDetails')}>
                    Order
                </Button>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    orderButton: {
        height: 50, 
        justifyContent: 'center',
        borderRadius: 0,
        width: 150,
        backgroundColor: 'green'
    }
})

export default Cart;