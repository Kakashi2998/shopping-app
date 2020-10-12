import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import ProductCard from '../Components/ProductCard';
import SearchIcon from '../Components/SearchIcon';
import { COLORS } from '../Constants/ColorConst';

const Products = props => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer.products);

    return (
        <View style={{height: '100%'}}>

            {/** Header */}
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Store'/>
                <SearchIcon/>
                <CartIcon/>
                <StatusBar style='light'/>
            </Appbar.Header>

            {/** Products */}
            <View style={{marginBottom: 100, alignSelf: 'center'}}>
                <FlatList 
                data={products} 
                renderItem={(data) => <ProductCard product={data.item}/>}
                numColumns={2}
                />
            </View>

        </View>
    );
}   

export default Products;