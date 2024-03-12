import React from 'react';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';


const SearchBarWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    transition: 'width 0.3s ease-in-out',
    '&:hover': {
        width: '30%',
    },
    padding: '5px 10px',
    width: '25%',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        transition: 'opacity 0.3s ease-in-out',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '17ch',
            '&:focus': {
                width: '100%',
            },
        },
    },
}));

const SearchBar = ({ value, setValue }) => {
    return (
        <SearchBarWrapper>
            <SearchIcon />
            <StyledInputBase placeholder="Finding something..." onChange={(e) => { setValue(e.target.value); }} value={value} />
        </SearchBarWrapper>
    );
};

export default SearchBar;