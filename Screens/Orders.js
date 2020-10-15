import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import OrderItem from "../Components/OrderItem";
import { COLORS } from "../Constants/ColorConst";

const Orders = (props) => {
  const orders = useSelector((state) => state.orderReducer.orders);
  const navigation = useNavigation();
  const isOrdersEmpty = orders.length === 0;

  return (
    <View style={{ height: "100%" }}>
      {/** Header */}
      <Appbar.Header style={{ backgroundColor: COLORS.PRIMARY }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Orders" />
      </Appbar.Header>

      {/** Orders */}
      {isOrdersEmpty ? (
        <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 300 }}>
          No orders yet!
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => `${index + 1}`}
          renderItem={(data) => <OrderItem item={data.item} />}
        />
      )}
    </View>
  );
};

export default Orders;
