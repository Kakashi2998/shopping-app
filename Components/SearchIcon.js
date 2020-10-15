import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";

const SearchIcon = (props) => {
  const navigation = useNavigation();

  return (
    <Appbar.Action
      icon="search"
      color="white"
      onPress={() => navigation.navigate("Search Products")}
    />
  );
};

export default SearchIcon;
