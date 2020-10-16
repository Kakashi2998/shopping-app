import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../Components/CartIcon";
import ProductCard from "../Components/ProductCard";
import SearchIcon from "../Components/SearchIcon";
import { COLORS } from "../Constants/ColorConst";
import { fetchProducts } from "../Store/Actions/ProductActions";

const Products = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const loadingProducts = products.length === 0;
  const isFocussed = useIsFocused();
  // console.log("Products -> isFocussed", isFocussed)

  React.useEffect(() => {
    if(isFocussed)
      dispatch(fetchProducts());
  }, [isFocussed]);

  return (
    <View style={{ height: "100%" }}>
      {/** Header */}
      <Appbar.Header style={{ backgroundColor: COLORS.PRIMARY }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Store" />
        <SearchIcon />
        <CartIcon />
        <StatusBar style="light" />
      </Appbar.Header>

      {/** Products */}
      {loadingProducts ? (
        <ActivityIndicator
          animating={true}
          color={COLORS.SECONDARY}
          size={30}
        />
      ) : (
        <View style={{ marginBottom: 100, alignSelf: "center" }}>
          <FlatList
            data={products}
            renderItem={(data) => <ProductCard product={data.item} />}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

export default Products;
