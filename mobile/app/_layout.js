import { Stack } from 'expo-router/stack';
import ConvexClientProvider from '../convexProvider/ConvexClientProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
