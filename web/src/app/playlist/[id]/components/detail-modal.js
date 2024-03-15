import React, {useState} from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function DetailModal({ isOpen, setIsOpen, title, description, image, }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newImage, setNewImage] = useState(image);

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleSave = () => {
        setIsEdit(false);
    }

    const handleCancel = () => {
        setIsEdit(false);
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>
               Edit details
            </DialogTitle>
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}
               