import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Appbar, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../Constants/ColorConst";
import { clearCart } from "../Store/Actions/CartActions";
import { addOrder } from "../Store/Actions/OrderActions";
import * as Location from "expo-location";

const OrderDelivery = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const cartPrice = useSelector((state) => state.cartReducer.totalPrice);

  const [inputState, setInputState] = useState({
    name: "",
    number: "",
    address: "",
  });

  const [invalidInputs, setInvalidInputs] = React.useState([]);

  /** on TextChange handler */
  const setInput = (input, value) => {
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [input]: value,
      };
    });
  };

  /** check form validity */
  const validate = () => {
    const invalidInputs = [];
    Object.keys(inputState).forEach((key) => {
      const input = inputState[key];
      switch (key) {
        case "number": {
          if (input.length !== 10 || input <= 0) invalidInputs.push(key);
        }
        default: {
          if (input.length === 0) invalidInputs.push(key);
        }
      }
    });
    setInvalidInputs(invalidInputs);
    return invalidInputs.length === 0;
  };

  /** Submit order */
  const order = () => {
    if (validate()) {
      Alert.alert(
        "Confirmation",
        "Place Order?",
        [
          { text: "cancel" },
          {
            text: "ok",
            onPress: () => {
              dispatch(
                addOrder(
                  cartItems,
                  cartPrice,
                  new Date().toLocaleDateString(),
                  inputState.address
                )
              );
              dispatch(clearCart());
              navigation.dispatch(StackActions.replace("Cart"));
              navigation.navigate("Orders");
              alert("Order Placed Successfully!");
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      alert("Please enter valid values!");
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      const [addressObj] = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      const address = `${addressObj.street}, ${addressObj.district}, ${addressObj.city}, ${addressObj.region} - ${addressObj.postalCode}`;
      setInput("address", address);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ height: "100%" }}
    >
      <Appbar.Header style={{ backgroundColor: COLORS.PRIMARY }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Delivery details" />
      </Appbar.Header>

      <View style={{ margin: 10 }}>
        {/** Name Input */}
        <TextInput
          mode="outlined"
          label="Name"
          style={styles.input}
          value={inputState.name}
          error={invalidInputs.includes("name")}
          onChangeText={(value) => setInput("name", value)}
        />

        {/**Phone number */}
        <TextInput
          mode="outlined"
          label="Phone Number"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          value={inputState.number}
          onChangeText={(value) => setInput("number", value)}
          error={invalidInputs.includes("number")}
        />

        {/** Address */}
        <TextInput
          mode="outlined"
          label="Address"
          multiline
          numberOfLines={3}
          style={styles.input}
          value={inputState.address}
          error={invalidInputs.includes("address")}
          onChangeText={(value) => setInput("address", value)}
          autoCapitalize="sentences"
        />

        <Button onPress={getLocation}>Use Current location</Button>

        {/** Order Button */}
        <Button onPress={order} mode="contained" style={styles.orderButton}>
          Place Order
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  orderButton: {
    backgroundColor: COLORS.SECONDARY,
    marginTop: 20,
  },
});

export default OrderDelivery;
