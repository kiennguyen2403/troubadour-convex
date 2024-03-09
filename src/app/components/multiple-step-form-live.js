import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import CodeBlock from './code-block';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setLiveTitle, setLiveDescription, setLiveGenre, selectLiveDescription, selectLiveGenre, selectLiveTitle } from '@/redux/live-upload-slice';
import { selectToken } from '@/redux/auth-slice';
import { useRouter } from 'next/navigation'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
// import { api } from '../api/api';




export default function MultipleStepFormLive({ component, steps, isOptionOpen, setIsOptionOpen }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const token = useSelector(selectToken);
    const title = useSelector(selectLiveTitle);
    const description = useSelector(selectLiveDescription);
    const genre = useSelector(selectLiveGenre);


    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [result, setResult] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);


    const handleUpload = async () => {
        try {
            setIsLoading(true);
            // const res = await axios.post(api.media.live, {
            //     title: title,
            //     description: description,
            //     genre: genre,
            // }, {
            //     withCredentials: true,
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Credentials": true,
            //         Authorization: "Bearer " + token,
            //     }
            // });
            setResult(res.data.stream_key);
        } catch (error) {
            console.log(error);
            setResult(false);
        }
        setIsLoading(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const isStepOptional = (step) => {
        return false
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleClose = () => {
        setIsOptionOpen(false);
        dispatch(setLiveTitle(""));
        dispatch(setLiveDescription(""));
        dispatch(setLiveGenre([]));
    };

    React.useEffect(() => {
        if (isOptionOpen) {
            setActiveStep(0);
            if (activeStep === steps.length) {
                setIsOptionOpen(false);
                dispatch(setLiveTitle(""));
                dispatch(setLiveDescription(""));
                dispatch(setLiveGenre([]));
            }
        }
    }, [isOptionOpen])

    return (
        <Dialog open={isOptionOpen} style={{ width: "100%", height: "100%", }} fullWidth={true}>
            <DialogTitle >
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = (
                        //         <Typography variant="caption">Optional</Typography>
                        //     );
                        // }
                        // if (isStepSkipped(index)) {
                        //     stepProps.completed = false;
                        // }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', height: "100%", }}>

                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Box sx={{
                                backgroundColor: 'background.default',
                                padding: '16px',
                                borderRadius: '4px',
                                overflowX: 'auto',
                                display: 'flex',
                                flexDirection: 'row',
                                // alignItems: 'flex-start',
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>
                                <Typography sx={{ mt: 2, mb: 1, color: result ? "green" : "red" }} textAlign="center" >
                                    {result ? result : "There is error when uploading the file!!!"}
                                </Typography>
                                {result ? <IconButton onClick={() => {
                                    navigator.clipboard.writeText(result);
                                }} size="small">
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton> : null}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleClose}>Exit</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {component[activeStep]}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button color="inherit" onClick={handleClose} sx={{ mr: 1 }}>
                                    Exit
                                </Button>
                                <LoadingButton loading={isLoading} onClick={activeStep === steps.length - 1 ? handleUpload : handleNext}>
                                    {activeStep === steps.length - 1 ? 'Upload' : 'Next'}
                                </LoadingButton>
                            </Box>

                        </React.Fragment>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}