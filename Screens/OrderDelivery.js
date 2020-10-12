import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../Constants/ColorConst';
import { clearCart } from '../Store/Actions/CartActions';
import { addOrder } from '../Store/Actions/OrderActions';

const OrderDelivery = props => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.cart);
    const cartPrice = useSelector(state => state.cartReducer.totalPrice);

    const [inputState, setInputState] = useState({
        name: '',
        number: '',
        address: ''
    });

    const [invalidInputs, setInvalidInputs] = React.useState([]);

    {/** on TextChange handler */}
    const changeInput = (input, value) => {
        setInputState(prevInputState => {
            return {
                ...prevInputState,
                [input]: value
            }
        });
    } 

    {/** check form validity */}
    const checkValidity = () => {
        let isValid = true;
        setInvalidInputs([]);
        Object.keys(inputState).forEach(key => {
            if(key === 'number' && inputState[key].length !== 10){
                setInvalidInputs(prevState => [...prevState, key])
                isValid = false;
            }
            else if(inputState[key].length === 0){
                setInvalidInputs(prevState => [...prevState, key])
                isValid = false;
            }
        })
        return isValid;
    }

    {/** Submit order */}
    const order = () => {
        if(checkValidity()){
            Alert.alert('Confirmation', 'Place Order?',
            [
                {text: 'cancel'},
                {text: 'ok', onPress: () => {
                    dispatch(addOrder(cartItems, cartPrice, 
                    new Date().toLocaleDateString(), inputState.address));
                    dispatch(clearCart());
                    navigation.dispatch(StackActions.replace('Cart'));
                    navigation.navigate('Orders');
                    alert('Order Placed Successfully!');    
                }}
            ],
            {cancelable: true});
        }
        else{
            alert('Please enter valid values!');
        }
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{height: '100%'}}>
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title='Delivery details'/>
            </Appbar.Header>

            <View style={{margin: 10}}>

                {/** Name Input */}    
                <TextInput mode='outlined' 
                label='Name' 
                style={styles.input} 
                value={inputState.name} 
                error={invalidInputs.includes('name')}
                onChangeText={(value) => changeInput('name', value)}/>

                {/**Phone number */}
                <TextInput mode='outlined' 
                label='Phone Number' 
                style={styles.input} 
                keyboardType='phone-pad' 
                maxLength={10} 
                value={inputState.number}
                onChangeText={(value) => changeInput('number', value)}
                error={invalidInputs.includes('number')}/>

                {/** Address */}
                <TextInput mode='outlined' 
                label='Address' 
                multiline 
                numberOfLines={3} 
                style={styles.input}
                value={inputState.address} 
                error={invalidInputs.includes('address')}
                onChangeText={(value) => changeInput('address', value)}
                autoCapitalize='sentences'/>

                {/** Order Button */}
                <Button onPress={order} mode='contained' 
                style={styles.orderButton}>Place Order</Button>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 10
    },
    orderButton: {
        backgroundColor: COLORS.SECONDARY, 
        marginTop: 20
    }
})

export default OrderDelivery;