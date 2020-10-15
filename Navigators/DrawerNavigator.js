import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductStackNavigator from "./ProductStackNavigator";
import Orders from "../Screens/Orders";
import CartStackNavigator from "./CartStackNavigator";
import DrawerContent from "../Components/DrawerContent";
import CreateProduct from "../Screens/CreateProduct";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{ width: 200 }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="ProductNavigator"
          component={ProductStackNavigator}
        />
        <Drawer.Screen name="CartNavigator" component={CartStackNavigator} />
        <Drawer.Screen name="Orders" component={Orders} />
        <Drawer.Screen name="CreateProduct" component={CreateProduct} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
