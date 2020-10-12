import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Subheading, Surface, Title } from 'react-native-paper';
import { COLORS } from '../Constants/ColorConst';

const OrderItem = ({item}) => {
    return (
        <Surface style={styles.container}>
            <Title>Ordered {item.orderItems.length} Items</Title>
            <Subheading>At: {item.address}</Subheading>
            <Subheading>On: {item.timeStamp}</Subheading>
            <Subheading>Price: Rs.{item.price.toFixed(2)}</Subheading>
            <List.Accordion title='Items' titleStyle={{color: COLORS.SECONDARY}}>
                {item.orderItems.map((item, index) => 
                    <List.Item title={`${index + 1}. ${item.name}`} description={`Price: Rs.${item.price.toFixed(2)}`} key={item.id}/>
                )}
            </List.Accordion>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10, 
        elevation: 7, 
        borderRadius: 10, 
        padding: 10
    }
})

export default OrderItem;