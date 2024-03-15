import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { useQueries, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { GenreButton } from '../components/genreButton';

export default function Tab() {
    const genres = useQuery(api.genre.get, {});
    const [searchQuery, setSearchQuery] = useState('');

    const generateColor = (index, totalCards) => {
        const hue = (index / totalCards) * 360;
        return `hsl(${hue}, 70%, 50%)`;
    };

    return (
        <View style={{
            width: '100%',
            height: "100%",
            margin: "auto"
        }}>
            <SafeAreaView>
                <ScrollView>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: 10,
                            position: 'fixed'
                        }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                        <View style={styles.container}>

                            <View style={styles.column}>
                                {
                                    genres?.slice(0, Math.ceil(genres.length / 2))
                                        .map((genre, index) =>
                                            <GenreButton
                                                key={index}
                                                genre={genre.name}
                                                color={generateColor(index, genres.length)}
                                            />
                                        )

                                }
                            </View>
                            <View style={styles.column}>
                                {
                                    genres?.slice(Math.ceil(genres.length / 2), genres.length - 1)
                                        .map((genre, index) =>
                                            <GenreButton
                                                key={index}
                                                genre={genre.name}
                                                color={generateColor(index, genres.length)}
                                            />
                                        )

                                }

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
        justifyContent: "center",
    },
    column: {
        flex: 1, // Each column takes equal space

    },
});