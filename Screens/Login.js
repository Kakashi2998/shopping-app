import React from "react";
import firebase from "firebase";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import LoginWithEmail from "../Components/LoginWithEmail";

const Login = (props) => {
  const navigation = useNavigation();

  const initState = {
    email: "",
    password: "",
  };
  const [inputState, setInputState] = React.useState(initState);

  const setinput = (input, value) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        [input]: value,
      };
    });
  };

  const signInWithGoogleAsync = async () => {
    const result = await Google.logInAsync({
      androidClientId:
        "108910296796-loo2b13ojga8mmcbhfoicu0vlgtct22m.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    console.log("signInWithGoogleAsync -> result", result);

    if (result.type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        result.idToken
      );
      firebase.auth().signInWithCredential(credential);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  };

  const signInWithFacebookAsync = async () => {
    await Facebook.initializeAsync({
      appId: "1000784873753905",
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential);
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      console.log("signInWithFacebookAsync -> response", response.json());
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  }

  const signInEmail = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(inputState.email, inputState.password);
      console.log("sign in successfull");
    } catch (error) {
      console.log("signInEmail -> error", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{height: '100%'}}>
      <Appbar.Header>
        <Appbar.Content title="Login or Sign up" />
      </Appbar.Header>
      <View style={{padding: 20}}>
        <LoginWithEmail submitHandler={signInEmail}/>
        <Button onPress={() => navigation.navigate("SignUp")}>Sign up</Button>
        <View style={{ flexDirection: "row" }}>
          <Button onPress={() => signInWithGoogleAsync()}>
            Sign In with Google
          </Button>
          <Button onPress={() => signInWithFacebookAsync()}>
            Sign In with Facebook
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  }
})

export default Login;
