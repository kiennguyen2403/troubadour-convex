import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageButton from '../components/imageButton';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Tab() {
    // const tickets = useQuery(api.ticket.getByUser, {}) ?? [];

    return (
        <View style={{
            margin: "auto",
            width: "100%",
            height: "100%"
        }}>
            <SafeAreaView>
                <ScrollView style={{
                    width: "100%",
                    height: "100%"
                }}>
                    <View style={{
                        width: "100%",

                    }}>
                        <Text variant="titleLarge" style={{
                            width: "100%",
                            textAlign: "left"
                        }}>
                            Recently Watch
                        </Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            bounces={true}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}>


                        </ScrollView>
                    </View>

                    <View>
                        <Text variant="titleLarge"> Playlists</Text>
                    </View>
                    <View>
                        <Text variant="titleLarge"> Songs</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


