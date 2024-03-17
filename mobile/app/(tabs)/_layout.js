import React from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Tabs, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#3f51b5',
            tabBarStyle: {
                backgroundColor: 'black',
                opacity: 0.8,
                borderBlockColor: 'black',
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Feather size={28} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="compass" color={color} />,
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="event"
                options={{
                    headerShown: false,
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="video"
                options={{
                    headerShown: false,
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="history" color={color} />,
                }}
            />
        </Tabs>
    );
}
