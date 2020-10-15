import React from 'react';
import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
// import ImagePicker from 'react-native-image-picker';
import { COLORS } from '../Constants/ColorConst';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { createProduct } from '../Store/Actions/ProductActions';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const CreateProduct = props => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const initialInputState = {
        name: '',
        price: '',
        image: ''
    };
    
    const [inputState, setInputState] = React.useState(initialInputState);
    
    const [invalidInputs, setinvalidInputs] = React.useState([]);
    
    const changeInput = (input, value) => {
        setInputState(prevState => {
            return {
                ...prevState,
                [input]: value
            }
        });
    }
    
    const validate = () => {
        const invalidInputs = [];
        Object.keys(inputState).forEach(key => {
            switch(key){
                case 'price': {
                    if(inputState[key] > 0 && inputState[key] <= 50000) 
                    return;
                    else break;
                };
                default: {
                    if(inputState[key].length !== 0) 
                    return;
                    else break;
                }
            };
            // console.log("validate -> key", key)
            invalidInputs.push(key);
        })
        setinvalidInputs(invalidInputs);
        return invalidInputs.length === 0;
    }
    
    const saveProduct = () => {
        // console.log("saveProduct -> validate", validate())
        if(validate()){
            Alert.alert(
                'Create product?:',
                inputState.name,
                [
                    {text: 'cancel'},
                    {text: 'ok', onPress: () => {
                        dispatch(createProduct(inputState.name, +inputState.price, inputState.image));
                        setInputState(initialInputState);
                            navigation.navigate('Products');
                        }
                    }
                ],
                
                {cancelable: true}
                )
            }
            else alert('Please enter valid values');
        }
        
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (pickerResult.cancelled === true) {
            return;
        }
    
        changeInput('image', pickerResult.uri);
        console.log("pickImage -> pickerResult.uri", pickerResult.uri)
        };

    return (
        <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()} 
        style={{height: '100%'}}
        >

            <Appbar.Header style={{backgroundColor: COLORS.PRIMARY}}>
                <Appbar.Content title='Create Product'/>
                <Appbar.Action icon='done' onPress={() => saveProduct()}/>
            </Appbar.Header>

                
            <TextInput 
            mode='outlined' 
            label='Item Name'
            style={styles.input}
            value={inputState.name}
            onChangeText={value => changeInput('name', value)}
            error={invalidInputs.includes('name')}
            />

            <View 
            style={{...styles.input, flexDirection: 'row'}}
            >
                <Text 
                style={{fontSize: 30, marginTop: 10}}
                >
                    Rs.
                </Text>
                <TextInput 
                mode='outlined' 
                label='Item Price' 
                keyboardType='decimal-pad' 
                style={{width: 300}}
                value={inputState.price}
                onChangeText={value => changeInput('price', value)}
                error={invalidInputs.includes('price')}
                />
            </View>
            {inputState.image === ''?
                <Button 
                onPress={pickImage}
                mode='contained'
                style={styles.input}>
                    Pick Image
                </Button>
                :
                <View style={styles.input}>
                    <Image source={{uri: inputState.image}} 
                    style={styles.image}
                    />
                    <Button 
                    onPress={pickImage}
                    >
                        <Text style={{color: 'red'}}>
                            Retake Image
                        </Text>
                    </Button>
                </View>
            }

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        alignContent: 'center'
    },
    image: {
        height: 300, 
        width: 380, 
    }
})

export default CreateProduct;