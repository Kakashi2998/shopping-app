import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CartIcon from '../Components/CartIcon';
import ProductCard from '../Components/ProductCard';
import { COLORS } from '../Constants/ColorConst';

const SearchProducts = props => {

    const navigation = useNavigation();
    const isFocussed = useIsFocused();
    const searchBarRef = useRef();
    const [searchText, setSearchText] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const allProducts = useSelector(state => state.productReducer.products);

    {/** Focus on searchbar if screen is focussed */}
    React.useEffect(() => {
        if(isFocussed)
            searchBarRef.current.focus();
    }, [isFocussed])

    
    {/** Searchbar input handler */}
    const onSearch = () => {
        setProducts(
            allProducts
            .filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} 
        style={{height: '100%'}}>

            {/** Header */}
            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Searchbar style={{width: 300, height: 40}} 
                placeholder='Search' ref={searchBarRef} 
                onChangeText={setSearchText} value={searchText}
                onSubmitEditing={onSearch}/>
                <CartIcon/>
            </Appbar.Header>

            {/** Search Result */}
            <FlatList data={products} 
            renderItem={data => <ProductCard product={data.item}/>}
            numColumns={2}/>

        </TouchableWithoutFeedback>
    );
}

export default SearchProducts;