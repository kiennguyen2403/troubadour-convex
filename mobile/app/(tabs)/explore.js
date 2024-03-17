import React, { useState, useEffect, useref, createRef } from 'react';
import { useQuery } from 'convex/react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { api } from '../../convex/_generated/api';
import * as Location from 'expo-location';

export default function Tab() {
    const [location, setLocation] = useState(null);
    const events = useQuery(api.event.getOfflineEvents, {});
    const mapRef = createRef();

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
            });
            setLocation(location);
            if (mapRef.current)
                mapRef.current.animateToRegion({
                    latitude: location?.coords?.latitude ?? 37.78825,
                    longitude: location?.coords?.longitude ?? -122.4324,
                    latitudeDelta: location?.coords?.latitude ?? 37.78825,
                    longitudeDelta: location?.coords?.longitude ?? -122.4324,
                });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location?.coords?.latitude ?? 37.78825,
                    longitude: location?.coords?.longitude ?? -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                ref={mapRef}
                style={styles.map}>
                {
                    events?.map((event, index) => {
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
                                    fillColor="rgba(255, 0, 0, 0.8)"
                                    fillOpacity={0.35}
                                    strokeColor="#FF0000"
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
        backgroundColor: "black"
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

