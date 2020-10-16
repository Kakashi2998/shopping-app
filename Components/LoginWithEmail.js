import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const LoginWithEmail = ({submitHandler}) => {

    const initInputState = {
        email: '',
        password: ''
    }

    const [inputState, setInputState] = React.useState(initInputState);

  return (
    <>
      <TextInput
        mode="outlined"
        label="Email Id"
        value={inputState.email}
        onChangeText={(value) => setinput("email", value)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={inputState.password}
        onChangeText={(value) => setinput("password", value)}
        style={styles.input}
      />
      <Button onPress={signInEmail}>Login</Button>
    </>
  );
};

const styles = StyleSheet.create({
    input: {
      marginVertical: 10
    }
  })

export default LoginWithEmail;
