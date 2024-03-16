import { Stack } from 'expo-router/stack';
import ConvexClientProvider from '../convexProvider/ConvexClientProvider';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from './theme/theme';
import { router } from 'expo-router';

export default function AppLayout() {
    return (
        <ConvexClientProvider>
            <PaperProvider theme={theme}>
                <Stack
                    screenOptions={{
                        headerTitle: 'Troubadour',
                        headerStyle: {
                            backgroundColor: 'black',
                            opacity: 0.6,
                        },
                        headerTintColor: 'white',
                    }}>
                    <Stack.Screen name="signin" options={{ headerShown: false }} />
                    <Stack.Screen name="signup" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerTitle: "Troubadour",
                            headerRight: () =>
                                <View style={{
                                    marginLeft: 'auto',
                                    width: 70,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <MaterialIcons size={28} name="video-call" color="white" onPress={() => {
                                            router.navigate('/stream');
                                        }} />
                                        <MaterialIcons size={28} name="account-circle" color="white" onPress={() => {
                                            router.push('signin')
                                        }} />
                                    </View>

                                </View>
                        }} />
                </Stack>
            </PaperProvider>
        </ConvexClientProvider>
    );
}
