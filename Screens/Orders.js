import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import OrderItem from '../Components/OrderItem';

const Orders = props => {

    const orders = useSelector(state => state.orderReducer.orders);
    const navigation = useNavigation();

    return (
        <View style={{height: '100%'}}>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Orders'/>
            </Appbar.Header>
            <FlatList data={orders} 
            keyExtractor={(item, index) => `${index + 1}`}
            renderItem={(data) => <OrderItem item={data.item}/>}/>
        </View>
    );
}

export default Orders;