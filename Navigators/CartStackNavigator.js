import React from "react";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Cart from "../Screens/Cart";
import OrderDelivery from "../Screens/OrderDelivery";

enableScreens();
const Stack = createNativeStackNavigator();

const CartStackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Cart"
    >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderDetails" component={OrderDelivery} />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;
