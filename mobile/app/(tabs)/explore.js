
import { useQuery } from 'convex/react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { api } from '../../convex/_generated/api';

export default function Tab() {
    const events = useQuery(api.event.getOfflineEvents, {});
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}>
                {
                    events?.map((event) => {
                        return (
                            <>
                                <Marker
                                    key={event?._id}
                                    coordinate={{
                                        latitude: event?.xCoordinate,
                                        longitude: event?.yCoordinate
                                    }}
                                    title={event?.name}
                                    description={event?.description}
                                />
                                <Circle
                                    key={event?._id + "circle"}
                                    center={{
                                        latitude: event?.xCoordinate,
                                        longitude: event?.yCoordinate
                                    }}
                                    radius={100}
                                    fillColor={'rgba(0, 0, 255, 0.5)'}
                                    strokeColor={'rgba(0, 0, 255, 0.5)'}
                                    strokeWidth={2}
                                />
                            </>
                        );
                    })
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

