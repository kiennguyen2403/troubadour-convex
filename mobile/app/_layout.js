import { Stack } from 'expo-router/stack';
import ConvexClientProvider from '../convexProvider/ConvexClientProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserButton } from '@clerk/clerk-react';

export default function AppLayout() {
    return (
        <ConvexClientProvider>
            <PaperProvider>
                <Stack
                    screenOptions={{
                        headerTitle: 'Troubadour',
                    }}>
                    <Stack.Screen name="signin" options={{ headerShown: false }} />
                    <Stack.Screen name="signup" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerTitle: "Troubadour",
                        }} />
                </Stack>
            </PaperProvider>
        </ConvexClientProvider>
    );
}
