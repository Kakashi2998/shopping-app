import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Keyboard, ScrollView, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import ProductCard from '../Components/ProductCard';
import {dummyProducts} from '../Data/dummyProducts';
import { toggleSearch } from '../Store/Actions/ProductActions';

const Products = props => {

    const navigation = useNavigation();
    const isFocussed = useIsFocused();
    const searchBarRef = React.useRef();
    const search = useSelector(state => state.productReducer.search);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');
    
    const products = useSelector(state => state.productReducer.products)
    .filter(product => searchText !==''? product.name.toLowerCase().includes(searchText.toLowerCase()) : true);
    
    const onSearch = (text) => {
        setSearchText(text);
    }
    
    
    React.useEffect(() => {
        if(search && isFocussed){
            searchBarRef.current.focus();
            dispatch(toggleSearch());
        }
    }, [isFocussed])

    return (
        <View>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()}/>
                <Searchbar style={{width: 300, height: 40}} 
                placeholder='Search' ref={searchBarRef} 
                onChangeText={onSearch}/>
                <CartIcon/>
                <StatusBar style='light'/>
            </Appbar.Header>
            <View>
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