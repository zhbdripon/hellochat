import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useChannelAdd, { ChannelPayload } from "../hook/useChannelAdd";
import { useChannelAddState } from "../hook/useChannelAddState";
import useChannelCategory from "../hook/useChannelCategory";
import useServerStore from "../store/useServerStore";

const steps = [
  { label: "Name", fieldName: "name" },
  { label: "Category", fieldName: "category" },
  { label: "Topic", fieldName: "topic" },
];

const ChannelAdd = () => {
  const { newChannelData, resetNewChannelData } = useChannelAddState();
  const modalOpen = useServerStore((s) => s.channelCreateModalOpen);
  const server = useServerStore((s) => s.selectedServer)!;
  const hideChannelCreateModal = useServerStore(
    (s) => s.hideChannelCreateModal
  );

  const mutation = useChannelAdd({
    serverId: server.id,
    onSuccess: () => {
      resetNewChannelData();
      hideChannelCreateModal();
    },
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isNextDisabled = (step: number) => {
    if (isStepOptional(step)) return false;

    const { fieldName } = steps[step];
    const value = newChannelData[fieldName as keyof ChannelPayload];

    return !value;
  };

  const handleNewChannelSubmit = () => {
    mutation.mutate(newChannelData);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      handleNewChannelSubmit();
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={hideChannelCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stepper activeStep={activeStep}>
          {steps.map(({ label }, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep < steps.length && (
          <React.Fragment>
            <Box className="py-4">
              <ChannelAddSteps activeStep={activeStep} />
            </Box>
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
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isNextDisabled(activeStep)}
              >
                {activeStep === steps.length - 1 ? "Create" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default ChannelAdd;

const ChannelAddSteps = ({ activeStep }: { activeStep: number }) => {
  return (
    <>
      {activeStep === 0 && <NameStep />}
      {activeStep === 1 && <CategoryStep />}
      {activeStep === 2 && <TopicStep />}
    </>
  );
};

const NameStep = () => {
  const { newChannelData, setNewChannelData } = useChannelAddState();
  return (
    <TextField
      className="w-full"
      id="standard-basic"
      label="Channel Name"
      variant="standard"
      onChange={(e) => {
        setNewChannelData({
          ...newChannelData,
          name: e.target.value,
        });
      }}
    />
  );
};

const CategoryStep = () => {
  const server = useServerStore((s) => s.selectedServer)!;
  const [category, setCategory] = React.useState<string>("");
  const { newChannelData, setNewChannelData } = useChannelAddState();

  const {
    data: CategoryData,
    isLoading,
    error,
  } = useChannelCategory({ serverId: server.id! });
  const categories = CategoryData?.results || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) return null;

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setNewChannelData({
      ...newChannelData,
      category: event.target.value,
    });
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
      <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
        onChange={handleChange}
        label="Category"
      >
        {categories.map((category) => (
          <MenuItem value={category.id}>{category.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const TopicStep = () => {
  const { newChannelData, setNewChannelData } = useChannelAddState();

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-multiline-static"
        label="Topic"
        multiline
        rows={4}
        placeholder="What is this channel about?"
        variant="standard"
        onChange={(e) => {
          setNewChannelData({
            ...newChannelData,
            topic: e.target.value,
          });
        }}
      />
    </Box>
  );
};
