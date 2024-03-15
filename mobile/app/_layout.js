import { Stack } from 'expo-router/stack';
import ConvexClientProvider from '../convexProvider/ConvexClientProvider';
import { Provider as PaperProvider } from 'react-native-paper';

export default function AppLayout() {
    return (
        <ConvexClientProvider>
            <PaperProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </PaperProvider>
        </ConvexClientProvider>
    );
}
