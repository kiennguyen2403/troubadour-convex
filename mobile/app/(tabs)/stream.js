import React, { useRef, useState } from 'react';
import { View } from "react-native";
import { LiveStreamView, LiveStreamMethods } from '@api.video/react-native-livestream';
import RTMPPublisher from 'react-native-rtmp-publisher';

const config = {
    cameraConfig: {
        cameraId: 1,
        cameraFrontMirror: false
    },
    videoConfig: {
        preset: 4,
        bitrate: 2000000,
        profile: 2,
        fps: 30,
        videoFrontMirror: true,
    },
    audioConfig: {
        bitrate: 128000,
        profile: 1,
        samplerate: 44100,
    }
};

export default function Tab() {
    const ref = useRef(null);
    const [streaming, setStreaming] = useState(false);
    const streamKey = '5b2a4a75-86c2-177c-72a2-45ab2b5e2583';
    const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;

    async function startStream() {
        try {
            await ref.current.startStream();
            setStreaming(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <RTMPPublisher
                ref={ref}
                streamURL={url}
                streamName={streamKey}
                onConnectionFailedRtmp={() => {
                    console.log('Connection failed');
                }}
                onConnectionStartedRtmp={() => {

                }}
                onConnectionSuccessRtmp={() => {

                }}
                onDisconnectRtmp={() => {

                }}
                onNewBitrateRtmp={() => {

                }}
                onStreamStateChanged={(status) => {

                }}
            />
        </View>
    );
};


