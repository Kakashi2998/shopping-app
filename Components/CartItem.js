import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { IconButton, Surface, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../Store/Actions/CartActions";
import QuantitySelector from "./QuantitySelector";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    Alert.alert(
      `Detete Item`,
      `This Item will be deleted from your cart`,
      [
        { text: "cancel" },
        { text: "OK", onPress: () => dispatch(deleteFromCart(item)) },
      ],
      { cancelable: true }
    );
  };

  return (
    <Surface
      style={{ margin: 10, elevation: 7, overflow: "hidden", borderRadius: 10 }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: item.image }}
          style={{ height: 200, width: 150, margin: 10 }}
        />
        <View>
          <Title style={{ width: 200 }} numberOfLines={4}>
            {item.name}
          </Title>
          <Title style={styles.price}>
            Price: {(item.price * item.qty).toFixed(2)}
          </Title>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <QuantitySelector
          style={{ width: 150 }}
          qty={item.qty}
          addHandler={() => dispatch(addToCart(item))}
          subsHandler={() => dispatch(removeFromCart(item))}
        />
        <IconButton color="red" icon="delete" onPress={deleteItem} />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  quantity: {
    marginRight: -200,
  },
  price: {
    width: 200,
    position: "absolute",
    bottom: 0,
  },
});

export default CartItem;
