import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Stack } from 'expo-router';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="compass" color={color} />,
                }}
            />

            <Tabs.Screen
                name="history"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
                }}
            />
        </Tabs>
    );
}
