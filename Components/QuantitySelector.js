import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, Title } from 'react-native-paper';

const QuantitySelector = ({qty, addHandler, subsHandler, style = {}}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <IconButton icon='remove' onPress={subsHandler} style={styles.buttons}/>
            <Title style={styles.qty}>{qty}</Title>
            <IconButton icon='add' onPress={addHandler} style={styles.buttons}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },  
    buttons: {
        backgroundColor: 'orange',
        borderRadius: 10
    },
    qty: {
        marginTop: 5,
        color: 'green'
    }
})

export default QuantitySelector;