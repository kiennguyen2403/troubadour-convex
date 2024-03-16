import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider, TextInput } from 'react-native-paper';
import MultiSteps from "react-native-multi-steps";




export default function CustomModal({ isVisible, setVisible }) {

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    const steps = [
        {
            name: 'Step 1',
            component:
                <View style={
                    {
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <Button
                        icon='video'
                        mode='outlined'
                        onPress={() => {
                            // navigation.navigate('Stream');
                            router.push('stream')

                        }}
                        style={{
                            marginBottom: 20
                        }}
                    >
                        Create Live Event
                    </Button>
                    <Button
                        icon='music'
                        mode='outlined'
                        onPress={() => console.log('Pressed')}
                        style={{
                            marginTop: 20
                        }}
                    >
                        Upload New Song
                    </Button>
                </View>
        },
        {
            name: 'Step 2',
            component:
                <View style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            label="Name"
                            value={title}
                            placeholder="Title..."
                            onChangeText={(title) => setTitle(title)}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            label="Name"
                            value={title}
                            placeholder="Title..."
                            onChangeText={(title) => setTitle(title)}
                        />
                    </View>
                </View>,
        },
        {
            name: 'Step 3',
            component: <Text>Step 3</Text>,
        },
    ];

    return (
        <Portal>
            <Modal
                visible={isVisible}
                onDismiss={setVisible}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: "center",

                }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20,
                }}>
                    <MultiSteps
                        containerButtonStyle={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                        prevButtonStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: 'black',
                            float: 'left',
                        }}
                        nextButtonStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: 'black',
                            float: 'right',
                            borderRadius: 20,


                        }}
                        submitButtonStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: 'black',
                            float: 'right',
                        }}
                        onMoveNext={function (data) { console.log("next", data) }}
                        onMovePrevious={function (data) { console.log("previous", data) }}
                        onSubmit={function () { console.log('Submit') }}
                    >
                        {steps.map((step, index) => (
                            <View key={index} style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',

                            }}>
                                {step.component}
                            </View>
                        ))}
                    </MultiSteps>
                </View>

            </Modal>
        </Portal>
    );
}