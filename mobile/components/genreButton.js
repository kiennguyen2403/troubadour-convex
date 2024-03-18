import * as React from 'react';
import { Card, Text } from 'react-native-paper';

export const GenreButton = ({ genre, color, eventHandler }) => {
    return (
        <Card onPress={eventHandler} style={{
            backgroundColor: color,
            margin: 10,
            width: 190,
            height: 190
        }}>
            <Card.Content>
                <Text variant='bodyLarge'>{genre}</Text>
            </Card.Content>
        </Card>
    );
};