import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Keyboard, View } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard';

const SearchProducts = props => {

    const navigation = useNavigation();
    const isFocussed = useIsFocused();
    const searchBarRef = useRef();
    const [searchText, setSearchText] = React.useState('');
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        if(isFocussed)
            searchBarRef.current.focus();
    }, [isFocussed])

    const allProducts = useSelector(state => state.productReducer.products);
    
    const onSearch = () => {
        setProducts(
            allProducts
            .filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} 
        style={{height: '100%'}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Searchbar style={{width: 300, height: 40}} 
                placeholder='Search' ref={searchBarRef} 
                onChangeText={setSearchText} value={searchText}
                onSubmitEditing={onSearch}/>
            </Appbar.Header>
            <FlatList data={products} 
            renderItem={data => <ProductCard product={data.item}/>}
            numColumns={2}/>
        </TouchableWithoutFeedback>
    );
}

export default SearchProducts;