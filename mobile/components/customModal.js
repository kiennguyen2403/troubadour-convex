import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Checkbox } from 'react-native-paper';
import MultiSteps from "react-native-multi-steps";
import { api } from '../convex/_generated/api';
import { useAction } from 'convex/react';
import * as Location from 'expo-location';

export default function CustomModal({ isVisible, setVisible }) {
    const [mode, setMode] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [isOffline, setIsOffline] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);


    const createEvent = useAction(api.eventActions.createEvent);

    const eventSteps = [
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
                            label="Title"
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
                            label="Description"
                            value={description}
                            placeholder="Description..."
                            onChangeText={(description) => setDescription(description)}
                        />
                    </View>
                </View>,
        },
        {
            name: 'Step 3',
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
                            label="Ticket Price"
                            value={ticketPrice}
                            placeholder="Ticket Price.."
                            onChangeText={(ticketPrice) => setTicketPrice(ticketPrice)}
                        />
                    </View>


                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            label="Number of Tickets"
                            value={ticketNumber}
                            placeholder="Ticket Price.."
                            onChangeText={(ticketNumber) => setTicketNumber(ticketNumber)}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>

                            <Text>Offline Event</Text>
                            <Checkbox
                                status={isOffline ? 'checked' : 'unchecked'}
                                onPress={() => setIsOffline(!isOffline)}
                            />
                        </View>

                    </View>
                </View>
        },
    ];

    const musicSteps = [
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
                            label="Title"
                            value={title}
                            placeholder="Title..."
                            onChange={(title) => setTitle(title)}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            label="Description"
                            value={description}
                            placeholder="Description..."
                            onChange={(description) => setTitle(description)}
                        />
                    </View>
                </View>,
        },
        {
            name: 'Step 3',
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
                            label="Ticket Price"
                            value={ticketPrice}
                            placeholder="Ticket Price.."
                            onChange={(description) => setTitle(description)}
                        />
                    </View>


                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            label="Number of Tickets"
                            value={ticketNumber}
                            placeholder="Ticket Price.."
                            onChange={(description) => setTicketPrice(description)}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>

                            <Text>Offline Event</Text>
                            <Checkbox
                                status={isOffline ? 'checked' : 'unchecked'}
                                onPress={() => setIsOffline(!isOffline)}
                            />
                        </View>

                    </View>
                </View>
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
                    {!mode ?
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
                                    setMode('event');
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
                                onPress={() => {
                                    setMode('music');
                                }}
                                style={{
                                    marginTop: 20
                                }}
                            >
                                Upload New Song
                            </Button>
                            <Button
                                mode='text'
                                onPress={() => {
                                    setVisible(false);
                                }}
                                style={{
                                    marginTop: 30
                                }}
                            >
                                Close
                            </Button>
                        </View>
                        :
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
                            onSubmit={async () => {
                                if (mode == 'event') {
                                    const streamKey = await createEvent({
                                        name: title,
                                        description: description,
                                        status: "idle",
                                        genre: ["Jazz"],
                                        xCoordinate: location?.coords?.latitude ?? 37.78825,
                                        yCoordinate: location?.coords?.longitude ?? -133.4324,
                                        ticketsNumber: parseInt(ticketNumber),
                                        date: new Date().getTime().toString(),
                                        isOffline: isOffline,
                                        price: parseInt(ticketPrice),
                                        users: [],
                                    });
                                    router.navigate({
                                        params: {
                                            streamKey: streamKey,
                                        },
                                        pathname: 'stream',
                                    });
                                }
                                else if (mode == 'music') {
                                    router.navigate('Music');
                                }
                                setVisible(false);
                                setMode(null);

                            }}>
                            {mode == "event" ? eventSteps.map((step, index) => (
                                <View key={index} style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',

                                }}>
                                    {step.component}
                                </View>
                            )) : musicSteps.map((step, index) => (
                                <View key={index} style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',

                                }}>
                                    {step.component}
                                </View>
                            ))
                            }
                        </MultiSteps>
                    }
                </View>

            </Modal>
        </Portal>
    );
}
