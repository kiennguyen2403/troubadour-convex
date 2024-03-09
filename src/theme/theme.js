import { darkScrollbar } from '@mui/material';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        mode: "dark"
    },
    typography: {
        fontFamily: "monospace"
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '@global': darkScrollbar(),
                '*::-webkit-scrollbar': {
                    width: '0rem',
                    height: '0rem'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'transparent'
                },
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "10px"
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    borderRadius: "10px"
                }
            }
        },
    },

});

export default theme;