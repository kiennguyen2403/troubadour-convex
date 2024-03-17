import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { ImageButton } from '../../components/imageButton';
import { router } from 'expo-router';

export default function Tab() {
    const events = useQuery(api.event.get);

    return (
        <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black"
        }}>
            <SafeAreaView>
                <ScrollView style={{
                    width: "100%",
                    height: "100%",

                }}>
                    <View style={{
                        width: "100%",

                    }}>
                        <Text variant="titleLarge" style={{
                            padding: 10,
                            width: "100%",
                            textAlign: "left"
                        }}> Live Events</Text>
                        <ScrollView
                            horizontal={true}
                            centerContent={true}
                            showsHorizontalScrollIndicator={false}
                            bounces={true}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}>
                            {
                                events?.map((event, index) => {
                                    return (
                                        <ImageButton
                                            key={index}
                                            src={event?.image || "https://picsum.photos/200?" + index}
                                            title={event?.name}
                                            description={event?.description}
                                            eventHandler={() => {
                                                router.navigate({
                                                    pathname: "/video",
                                                    params: {
                                                        id: event?._id
                                                    }
                                                });
                                            }} />
                                    )
                                })
                            }

                        </ScrollView>
                    </View>

                    <View>
                        <Text variant="titleLarge"> Custom</Text>
                    </View>
                    <View>
                        <Text variant="titleLarge"> Recent</Text>
                    </View>
                    <View>
                        <Text variant="titleLarge"> Top Trending</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
