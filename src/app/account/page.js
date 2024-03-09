"use client";
import { React, useEffect, useState } from "react";
import axios from "axios";
// import { api } from "../../api/api";
import { Grid, Typography } from "@mui/material";
import { Box } from '@mui/material';
import { Divider } from "@mui/material";
import ClippedDrawer from "@/app/components/header";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/auth-slice";
import PlanButton from "./components/plan-button";
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';

export default function Account() {

    const router = useRouter();
    const token = useSelector(selectToken);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [plan, setPlan] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const getUserInformation = async () => {
        try {
            const result = await axios.get(api.user.me, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    Authorization: "Bearer " + token,
                }
            });
            console.log(result.data)
            setEmail(result.data.email);
            setUsername(result.data.accountname);
            setCreateDate(result.data.dateCreated.slice(0, 10));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserInformation()
    }, [email, username])


    const handlePayment = (plan) => {
        router.push("/payment/" + plan);
    }



    const Profile =
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", }}>
            <Typography variant="h3" component="div" gutterBottom style={{ float: "left", marginRight: "auto", }}>
                Account overview
            </Typography>
            <Typography variant="h4" component="div" gutterBottom style={{ float: "left", marginRight: "auto", marginTop: "3%" }}>
                Profile
            </Typography>
            {[{
                "index": 0,
                "title": "Username",
                "value": username
            },
            {
                "index": 1,
                "title": "Email",
                "value": email
            },
            {
                "index": 2,
                "title": "Create",
                "value": createDate
            },

            ].map((item) =>
                <Box sx={{ display: "flex", flexDirection: "row", width: "15%", marginTop: "2%" }}>
                    <Typography variant="p" component="div" gutterBottom style={{ float: "left", }}>
                        {item.title}:
                    </Typography>
                    <Typography variant="p" component="div" gutterBottom style={{ float: "left", marginLeft: "10%" }}>
                        {item.value}
                    </Typography>
                    <Divider />
                </Box>)}
            <Typography variant="h4" component="div" gutterBottom style={{ float: "left", marginRight: "auto", marginTop: "3%" }}>
                Plan
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", width: "60%", marginTop: "2%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <PlanButton
                            title="Free"
                            price="0$"
                            features={["1GB storage", "1GB bandwidth", "1 live stream"]}
                            eventHandler={() => { handlePayment("Free"); }} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <PlanButton
                            title="Premium"
                            price="10$"
                            features={["10GB storage", "10GB bandwidth", "10 live stream"]}
                            eventHandler={() => { handlePayment("Premium"); }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>

    const Loading =
        <Box sx={{ width: "100%", height: "100%", marginTop: "20%" }}>
            <CircularProgress />
        </Box>


    return (
        <ClippedDrawer Component={isLoading ? [Loading] : [Profile]} />
    );
}