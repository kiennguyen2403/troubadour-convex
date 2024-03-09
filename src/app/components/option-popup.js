import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function OptionButton({ children, handleListItemClick }) {
    return (
        <ListItem disableGutters>
            <ListItemButton onClick={handleListItemClick} key={children}>
                <ListItemText primary={children} />
            </ListItemButton>
        </ListItem>
    );
}


export default function OptionPopup({ open, handleClose, handleOnClick, childrens, title }) {
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <List sx={{ pt: 0 }}>
                {childrens.map((child) => (
                    <OptionButton handleListItemClick={handleOnClick}>{child}</OptionButton>
                ))}
            </List>
        </Dialog>
    )
}