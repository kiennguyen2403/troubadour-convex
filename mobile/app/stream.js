import React, { useEffect, useRef, useState } from 'react';
import { View } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import { Audio } from 'expo-av';
import RTMPPublisher from 'react-native-rtmp-publisher';
import { Text, IconButton } from "react-native-paper";
import { PermissionsAndroid, StyleSheet, Platform, Button } from 'react-native';
import { AudioInputType, BluetoothDeviceStatuses } from 'react-native-rtmp-publisher';
import { router } from 'expo-router';

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
    const publisherRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasBluetoothDevice, setHasBluetoothDevice] = useState(false);
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const [audioPermission, requestAudioPermission] = Audio.usePermissions();
    const [bluetoothPermission, requestBlueToothPermission] = useState(null);
    const STREAM_NAME = 'adfb3f31-95f5-4034-a77f-04caa340ab00';
    const STREAM_URL = 'rtmp://global-live.mux.com:5222/app';

    const handleOnConnectionFailed = (data) => {
        console.log('Connection Failed: ' + data);
    };

    const handleOnConnectionStarted = (data) => {
        console.log('Connection Started: ' + data);
    };

    const handleOnConnectionSuccess = () => {
        console.log('Connected');
        setIsStreaming(true);
    };

    const handleOnDisconnect = () => {
        console.log('Disconnected');
        setIsStreaming(false);
    };

    const handleOnNewBitrateReceived = (data) => {
        console.log('New Bitrate Received: ' + data);
    };

    const handleOnStreamStateChanged = (data) => {
        console.log('Stream Status: ' + data);
    };

    const handleUnmute = () => {
        publisherRef.current && publisherRef.current.unmute();
        setIsMuted(false);
    };

    const handleMute = () => {
        publisherRef.current && publisherRef.current.mute();
        setIsMuted(true);
    };

    const handleStartStream = () => {
        publisherRef.current && publisherRef.current.startStream();
    };

    const handleStopStream = () => {
        publisherRef.current && publisherRef.current.stopStream();
    };

    const handleSwitchCamera = () => {
        publisherRef.current && publisherRef.current.switchCamera();
    };

    const handleToggleMicrophoneModal = () => {
        setMicrophoneModalVisibility(!microphoneModalVisibility);
    };

    const handleMicrophoneSelect = (selectedMicrophone) => {
        publisherRef.current &&
            publisherRef.current.setAudioInput(selectedMicrophone);
    };

    const handleBluetoothDeviceStatusChange = (
        status
    ) => {
        switch (status) {
            case BluetoothDeviceStatuses.CONNECTED: {
                setHasBluetoothDevice(true);
                break;
            }

            case BluetoothDeviceStatuses.DISCONNECTED: {
                setHasBluetoothDevice(false);
                break;
            }

            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <IconButton
                icon="arrow-left"
                onPress={() => router.push("/")}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    marginTop: 40,
                    margin: 10,
                    zIndex: 100,
                }} />
            <RTMPPublisher
                ref={publisherRef}
                streamURL={STREAM_URL}
                streamName={STREAM_NAME}
                style={styles.publisher_camera}
                onDisconnect={handleOnDisconnect}
                onConnectionFailed={handleOnConnectionFailed}
                onConnectionStarted={handleOnConnectionStarted}
                onConnectionSuccess={handleOnConnectionSuccess}
                onNewBitrateReceived={handleOnNewBitrateReceived}
                onStreamStateChanged={handleOnStreamStateChanged}
                onBluetoothDeviceStatusChanged={handleBluetoothDeviceStatusChange}
            />

            <View style={styles.footer_container}>
                <View style={styles.mute_container}>
                    {isMuted ? (
                        <IconButton icon="volume-off" onPress={handleUnmute} />
                    ) : (
                        <IconButton icon="volume-high" onPress={handleMute} />
                    )}
                </View>
                <View style={styles.stream_container}>
                    {isStreaming ? (
                        <IconButton icon="pause" onPress={handleStopStream} />
                    ) : (
                        <IconButton icon="record-circle" onPress={handleStartStream} />
                    )}
                </View>
                <View style={styles.controller_container}>
                    <IconButton icon="camera-flip-outline" onPress={handleSwitchCamera} />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    publisher_camera: {
        flex: 1,
        width: '100%',
        height: '50%',
    },
    footer_container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',

    },
    mute_container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    stream_container: {
        flex: 1,
        alignItems: 'center',
    },
    controller_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});