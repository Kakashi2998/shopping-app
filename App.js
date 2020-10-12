import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import DrawerNavigator from './Navigators/DrawerNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { combineReducers, createStore } from 'redux';
import ProductReducer from './Store/Reducers/ProductReducer';
import CartReducer from './Store/Reducers/CartReducer';
import { Provider as ReduxProvider } from 'react-redux';
import OrdersReducer from './Store/Reducers/OrdersReducer';

const reducer = combineReducers({
  productReducer: ProductReducer,
  cartReducer: CartReducer,
  orderReducer: OrdersReducer
})

const store = createStore(reducer);

const App = props => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider settings={{icon: props => <MaterialIcons {...props}/>}}>
        <DrawerNavigator/>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
