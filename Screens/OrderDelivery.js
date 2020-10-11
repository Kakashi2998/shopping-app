import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../Store/Actions/CartActions';
import { addOrder } from '../Store/Actions/OrderActions';

const OrderDelivery = props => {

    const [address, setAddress] = React.useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.cart);
    const cartPrice = useSelector(state => state.cartReducer.totalPrice);

    const order = () => {
        Alert.alert('Confirmation', 'Place Order?',
        [
            {text: 'cancel'},
            {text: 'ok', onPress: () => {
                dispatch(addOrder(cartItems, cartPrice, new Date().toLocaleDateString(), address));
                dispatch(clearCart());
                navigation.dispatch(StackActions.replace('Cart'));
                navigation.navigate('Orders');
                alert('Order Placed Successfully!');    
            }}
        ],
        {cancelable: true});
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{height: '100%'}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title='Delivery details'/>
            </Appbar.Header>
            <View style={{margin: 10}}>
                <TextInput mode='outlined' label='Name' style={styles.input}/>
                <TextInput mode='outlined' label='Phone Number' style={styles.input} 
                keyboardType='phone-pad' maxLength={10}/>
                <TextInput mode='outlined' label='Address' multiline numberOfLines={3} 
                style={styles.input} value={address} onChangeText={setAddress}/>
                <Button onPress={order}>Place Order</Button>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 10
    }
})

export default OrderDelivery;