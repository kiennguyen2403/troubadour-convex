"use client";
import { React, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import InputAdornment from '@mui/material/InputAdornment';
import TodayIcon from '@mui/icons-material/Today';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/auth-slice";
import { api } from "../../../../convex/_generated/api";
import { useAction, useQuery } from "convex/react";

export default function Payment({ params }) {

    const id = params.id;
    const [isErrorDisplay, setIsErrorDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const event = useQuery(api.event.getById, { id });
    const userId = useSelector(selectUserID);
    const buyTicket = useAction(api.muxActions.buyTicket);
    const router = useRouter();

    const handlePurchase = async () => {
        try {
            const exp_month = expiryDate.split("/")[0];
            const exp_year = expiryDate.split("/")[1];
            setIsLoading(true);
            const result = await buyTicket({
                id: event.id,
                user: userId,
                cardNumber: cardNumber,
                cvc: cvc,
                exp_month: exp_month,
                exp_year: exp_year,
                cardHolder: cardHolder
            });

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
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
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
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
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
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            autoComplete="off"
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
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
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