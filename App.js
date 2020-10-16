import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import DrawerNavigator from "./Navigators/DrawerNavigator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ProductReducer from "./Store/Reducers/ProductReducer";
import CartReducer from "./Store/Reducers/CartReducer";
import { Provider as ReduxProvider } from "react-redux";
import OrdersReducer from "./Store/Reducers/OrdersReducer";
import ReduxThunk from "redux-thunk";
import firebase from 'firebase/app';
import { firebaseConfig } from "./Config/FirebaseConfig";

const reducer = combineReducers({
  productReducer: ProductReducer,
  cartReducer: CartReducer,
  orderReducer: OrdersReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(ReduxThunk)));
const store = createStore(reducer, applyMiddleware(ReduxThunk));

firebase.initializeApp(firebaseConfig);

const App = (props) => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider
        settings={{ icon: (props) => <MaterialIcons {...props} /> }}
      >
        <DrawerNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
