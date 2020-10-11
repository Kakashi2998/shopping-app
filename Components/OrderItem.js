import React from 'react';
import { Text } from 'react-native';
import { List, Subheading, Surface, Title } from 'react-native-paper';

const OrderItem = ({item}) => {
    return (
        <Surface style={{margin: 10, elevation: 7, borderRadius: 10, padding: 10}}>
            <Title>Ordered {item.orderItems.length} Items</Title>
            <Subheading>At: {item.address}</Subheading>
            <Subheading>On: {item.timeStamp}</Subheading>
            <Subheading>Price: Rs.{item.price.toFixed(2)}</Subheading>
            <List.Accordion title='Items'>
                {item.orderItems.map((item, index) => 
                    <List.Item title={`${index + 1}. ${item.name}`} description={`Price: Rs.${item.price.toFixed(2)}`} key={item.id}/>
                )}
            </List.Accordion>
        </Surface>
    );
}

export default OrderItem;