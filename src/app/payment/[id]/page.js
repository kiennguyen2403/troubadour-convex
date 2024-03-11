"use client";
import { React, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import InputAdornment from '@mui/material/InputAdornment';
import TodayIcon from '@mui/icons-material/Today';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
// import { api } from "../../api/api";
import { useRouter } from 'next/navigation'
import { selectToken } from "@/redux/auth-slice";
import { useSelector } from "react-redux";
import { api } from "../../../../convex/_generated/api";
import { useAction } from "convex/react";

export default function Payment({ params }) {

    const token = useSelector(selectToken);
    const id = params.id;
    const [isErrorDisplay, setIsErrorDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const buyTicket = useAction(api.ticket.buy);
    const router = useRouter();

    const handlePurchase = async () => {
        try {
            setIsLoading(true);
            const result = await buyTicket({ id: id }, { token: token });
            if (result.error) {
                setIsLoading(false);
                setIsErrorDisplay(true);
                return;
            }
            router.push("event" + id);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <Container component="main" maxWidth="lg" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: "8%",
                    height: "200%",
                    width: 600,
                    height: 500,
                    borderRadius: 10,
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                }}
            >

                <Box sx={{
                    margin: "5%",
                    marginTop: "10%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography component="h1" variant="h5" marginBottom="8%">
                        Payment
                    </Typography>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PaymentIcon />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                        required
                        margin="normal"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        id="Card Number"
                        label="Card Number"
                        name="cardnumber"
                        autoComplete="off"
                        autoFocus
                    />
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TodayIcon />
                                    </InputAdornment>
                                )
                            }}
                            required
                            margin="normal"
                            id="Expiry Date"
                            label="Expiry Data"
                            placeholder="mm/yy"
                            name="Expiry Date"
                        />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }}
                            required
                            label="CVV"
                            id="CVV"
                            name="CVV"
                            placeholder="XXX"
                            margin="normal" />
                    </div>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                        required
                        margin="normal"
                        id="Name on Card"
                        label="Name on Card"
                        name="Name on Card"
                        placeholder="Name on Card"
                        autoComplete="off"

                    />

                    <LoadingButton
                        sx={{
                            marginTop: "10%",
                            width: "50%",
                            height: "50%",
                        }}
                        variant="contained"
                        color="primary"
                        loadingPosition="start"
                        onClick={handlePurchase}
                        loading={isLoading}
                        startIcon={<AccountCircleIcon />}
                    >
                        Pay
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
}