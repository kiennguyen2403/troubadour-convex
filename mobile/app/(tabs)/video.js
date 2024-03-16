import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from 'expo-av';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import app from '../../package.json'

export default function Tab() {
    const { id } = useLocalSearchParams();
    const event = useQuery(api.event.getById, { id: id });

    const MuxVideo = muxReactNativeVideo(Video);

    return (
        <View style={styles.container}>
            <MuxVideo
                style={styles.video}
                source={{
                    uri: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4',
                }}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                controls
                muxOptions={{
                    application_name: app.name,            // (required) the name of your application
                    application_version: app.version,      // the version of your application (optional, but encouraged)
                    data: {
                        env_key: 'YOUR_ENVIRONMENT_KEY',     // (required)
                        player_software_version: '5.0.2',     // (optional, but encouraged) the version of react-native-video that you are using
                        player_name: 'React Native Player',  // See metadata docs for available metadata fields https://docs.mux.com/docs/web-integration-guide#section-5-add-metadata
                        video_id: 'My Video Id',
                        video_title: 'My awesome video',
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        flex: 1,
        width: "100%",
    },
});
