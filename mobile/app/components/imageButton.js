import * as React from 'react';
import { Card } from 'react-native-paper';

export const ImageButton = ({ src, title, description, eventHandler }) => {
    return (
        <Card onPress={eventHandler} style={{
            margin: 10,
            width: 190,
            height: 190
        }}>
            <Card.Cover
                source={{ uri: src ?? 'https://via.placeholder.com/200' }}
             
            />
            <Card.Title
                title={title}
                subtitle={description}
            />
        </Card>
    );
};