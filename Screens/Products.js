import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Keyboard, ScrollView, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import ProductCard from '../Components/ProductCard';
import SearchIcon from '../Components/SearchIcon';
import { COLORS } from '../Constants/ColorConst';
import {dummyProducts} from '../Data/dummyProducts';
import { toggleSearch } from '../Store/Actions/ProductActions';

const Products = props => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer.products);

    return (
        <View style={{height: '100%'}}>
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Appbar.Content title='Store'/>
                <SearchIcon/>
                <CartIcon/>
                <StatusBar style='light'/>
            </Appbar.Header>
            <View style={{marginBottom: 100}}>
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