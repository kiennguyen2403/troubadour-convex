import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLocalSearchParams } from "expo-router";


export default function Tab() {
    const { id } = useLocalSearchParams()
    const event = useQuery(api.event.getById, { id: "1" });
    return (
        <View style={styles.container}>
           
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
