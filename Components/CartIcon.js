import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { Appbar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";

const CartIcon = (props) => {
  const numberOfItems = useSelector((state) => state.cartReducer.cart).length;
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("white")}
      onPress={() => navigation.navigate("CartNavigator", { screen: "Cart" })}
    >
      {numberOfItems > 0 ? (
        <Badge style={{ marginBottom: -20 }}>{numberOfItems}</Badge>
      ) : null}
      <Appbar.Action icon="shopping-cart" color="white" />
    </TouchableNativeFeedback>
  );
};

export default CartIcon;
