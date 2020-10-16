import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Appbar, Button, TextInput } from "react-native-paper";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const SignUp = (props) => {
  const initState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [inputState, setInputState] = React.useState(initState);
  const navigation = useNavigation();

  const setInput = (input, value) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        [input]: value,
      };
    });
  };

  const createAccount = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputState.email, inputState.password);

    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
    style={{height: '100%'}}>
      <Appbar.Header>
        <Appbar.Content title="Sign up" />
      </Appbar.Header>
      <View style={{padding: 20}}>
        <TextInput
          mode="outlined"
          label="Email Id"
          onChangeText={(value) => setInput("email", value)}
          value={inputState.email}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(value) => setInput("password", value)}
          value={inputState.password}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Confirm Password"
          onChangeText={(value) => setInput("confirmPassword", value)}
          value={inputState.confirmPassword}
          style={styles.input}
        />
        <Button onPress={createAccount}>Sign up</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  }
})


export default SignUp;
