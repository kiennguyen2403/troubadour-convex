import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
// import CodeBlock from "./code-block";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setLiveTitle,
  setLiveDescription,
  setLiveGenre,
  selectLiveDescription,
  selectLiveGenre,
  selectLiveTitle,
  selectFile,
  selectisOffline,
  selectLiveDate,
  selectLiveLocation,
  selectTicketPrice,
  selectTicketsNumber,
} from "../../redux/live-upload-slice";
import { selectToken } from "../../redux/auth-slice";
import { useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { api } from "../../../convex/_generated/api";
import { useAction } from "convex/react";

export default function MultipleStepFormLive({
  component,
  steps,
  isOptionOpen,
  setIsOptionOpen,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const title = useSelector(selectLiveTitle);
  const description = useSelector(selectLiveDescription);
  const genre = useSelector(selectLiveGenre);
  const file = useSelector(selectFile);
  const isOffline = useSelector(selectisOffline);
  const date = useSelector(selectLiveDate);
  const location = useSelector(selectLiveLocation);
  const price = useSelector(selectTicketPrice);
  const ticketsNumber = useSelector(selectTicketsNumber);

  const createEvent = useAction(api.muxActions.createMuxEvent);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [result, setResult] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`);
      // const lat = response.data.results[0].geometry.location.lat;
      // const lng = response.data.results[0].geometry.location.lng;
      const lat = -37.8102;
      const lng = 144.9628;
      const res = await createEvent({
        name: title,
        description: description,
        status: "idle",
        genre: [],
        xCoordinate: lat,
        yCoordinate: lng,
        ticketsNumber: parseInt(ticketsNumber),
        comments: [],
        date: date.toString(),
        isOffline: isOffline,
        price: parseInt(price),
        users: [],

      });
      setResult(res);
    } catch (error) {
      console.log(error);
      setResult(false);
    }
    setIsLoading(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const isStepOptional = (step) => {
    return false;
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
  }, [isOptionOpen]);

  return (
    <Dialog
      open={isOptionOpen}
      style={{ width: "100%", height: "100%" }}
      fullWidth={true}
    >
      <DialogTitle>
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
        <Box sx={{ width: "100%", height: "100%" }}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box
                sx={{
                  backgroundColor: "background.default",
                  padding: "16px",
                  borderRadius: "4px",
                  overflowX: "auto",
                  display: "flex",
                  flexDirection: "row",
                  // alignItems: 'flex-start',
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ mt: 2, mb: 1, color: result ? "green" : "red" }}
                  textAlign="center"
                >
                  {result
                    ? result
                    : "There is error when uploading the file!!!"}
                </Typography>
                {result ? (
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                    }}
                    size="small"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleClose}>Exit</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {component[activeStep]}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button color="inherit" onClick={handleClose} sx={{ mr: 1 }}>
                  Exit
                </Button>
                <LoadingButton
                  loading={isLoading}
                  onClick={
                    activeStep === steps.length - 1 ? handleUpload : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Upload" : "Next"}
                </LoadingButton>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
