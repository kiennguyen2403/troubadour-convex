import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Typography from "@mui/material/Typography";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFile,
  selectTitle,
  selectDescription,
  selectGenre,
  selectPrivacy,
  selectCollaborators,
  setDescription,
  setFile,
  setGenre,
  setTitle,
  setPrivacy,
  setCollaborators,
} from "../../redux/media-upload-slice";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "../../../convex/_generated/api";
import { selectUserID } from "@/redux/auth-slice";

export default function MultipleStepForm({ component, steps, isOptionOpen, setIsOptionOpen }) {
  const dispatch = useDispatch();
  const file = useSelector(selectFile);
  const name = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const genres = useSelector(selectGenre);
  const privacy = useSelector(selectPrivacy);
  const collaborators = useSelector(selectCollaborators);
  const userId = useSelector(selectUserID);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [result, setResult] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  // convex functions
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const getMediaUrl = useMutation(api.media.getMediaUrl);
  const saveMedia = useMutation(api.media.post);

  const mediaDetails = {
    userId,
    otherUsers: collaborators,
    genres,
    name,
    privacy,
    views: 0,
    likes: 0,
    description,
  };

  const saveAfterUpload = async (uploaded) => {
    const storageId = uploaded[0].response.storageId;
    const fileUrl = await getMediaUrl({ storageId });
    await saveMedia({
      ...mediaDetails,
      storageId,
      fileUrl,
    });
  };

  const { startUpload, isUploading } = useUploadFiles(generateUploadUrl, {
    onUploadComplete: saveAfterUpload,
    onUploadError: (err) => {
      console.log(err);
    },
  });

  const handleUpload = async () => {
    try {
      setIsLoading(true);

      await startUpload([file]);

      setResult(true);
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
    dispatch(setFile(null));
    dispatch(setTitle(""));
    dispatch(setDescription(""));
    dispatch(setGenre([]));
    dispatch(setPrivacy(""));
    dispatch(setCollaborators([]));
  };

  React.useEffect(() => {
    if (isOptionOpen) {
      setActiveStep(0);
      setIsLoading(false);
      if (activeStep === steps.length) {
        setIsOptionOpen(false);
        dispatch(setFile(null));
        dispatch(setTitle(""));
        dispatch(setDescription(""));
        dispatch(setGenre([]));
        dispatch(setPrivacy(""));
        dispatch(setCollaborators([]));
      }
    }
  }, [isOptionOpen]);

  return (
    <Dialog open={isOptionOpen} style={{ width: "100%", height: "100%" }} fullWidth={true}>
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
              <Typography sx={{ mt: 2, mb: 1, color: result ? "green" : "red" }} textAlign="center">
                {result
                  ? "The file has been upload successfully!!"
                  : "There is error when uploading the file!!!"}
              </Typography>
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
                  onClick={activeStep === steps.length - 1 ? handleUpload : handleNext}
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
