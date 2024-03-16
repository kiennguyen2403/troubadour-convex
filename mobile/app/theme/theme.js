import {
    MD3DarkTheme as DefaultTheme,
} from 'react-native-paper';


export const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        background: '#000',
    }
}