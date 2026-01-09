import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTextField } from "../../utils/helper";
import { Controller, useForm } from "react-hook-form";
import StyledSelector from "../Styled-Selector";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledMultiSelector from "../Style-Multi-Selector";
import CommonDialog from "../dialog/dialog-content/CommonDialog";
import { userCohortSchema } from "../../utils/yup-config";
import { useState } from "react";
import GlobalDialog from "../dialog";
interface UserCohortDrawerProps {
  handleClose: () => void;
  id:string
}
const StyledTypo = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <Typography
      fontSize={"14px"}
      fontWeight={500}
      sx={{ color: theme.palette.primary[900] }}
    >
      {title}
    </Typography>
  );
};
export default function EditUserCohotDrawer({handleClose, id} : UserCohortDrawerProps) {
  const [openSave, setSaveDialog] = useState(false);
  const [data, setData] = useState({});
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "anubhav", // or any default value
      age: "18-25", // or "tech" or any default value
      gender: "male",
      location: ["delhi", "mumbai"],
      condition: ["delhi", "mumbai"],
      medication: ["delhi", "mumbai"],
      allergies: ["delhi", "mumbai"],
      interest: ["delhi", "mumbai"],
    },
    resolver: yupResolver(userCohortSchema),
  });

  const onSubmit = (data: any) => {
    setData(data);
    setSaveDialog(true);
  };
  const handleConfirm = () => {
    // Handle confirm action
    // Data: data
  };
  return (
    <Box>
      <Stack
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Add Cohort</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <StyledTypo title="Cohort Name" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="Type Name"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
        </Stack>
        <Stack flexDirection={"row"} gap={2}>
          <Stack flex={1}>
            <StyledTypo title="Age" />
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <StyledSelector
                  field={field}
                  error={errors?.age}
                  options={[
                    { label: "18-25", value: "18-25" },
                    { label: "26-35", value: "26-35" },
                    { label: "36-45", value: "36-45" },
                    { label: "46-55", value: "46-55" },
                    { label: "56-65", value: "56-65" },
                    { label: "65+", value: "65+" },
                  ]}
                />
              )}
            />
          </Stack>
          <Stack flex={1}>
            <StyledTypo title="Gender" />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <StyledSelector
                  field={field}
                  error={errors?.gender}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "LGTV", value: "lgtv" },
                  ]}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack>
          <StyledTypo title="Location" />
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <StyledMultiSelector
                field={field}
                error={errors?.location}
                options={[
                  { label: "Delhi", value: "delhi" },
                  { label: "Mumbai", value: "mumbai" },
                  { label: "Bangalore", value: "bangalore" },
                  { label: "Chennai", value: "chennai" },
                  { label: "Kolkata", value: "kolkata" },
                ]}
              />
            )}
          />
        </Stack>
        <Stack>
          <StyledTypo title="Aliments & Conditions" />
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <StyledMultiSelector
                field={field}
                error={errors?.condition}
                options={[
                  { label: "Delhi", value: "delhi" },
                  { label: "Mumbai", value: "mumbai" },
                  { label: "Bangalore", value: "bangalore" },
                  { label: "Chennai", value: "chennai" },
                  { label: "Kolkata", value: "kolkata" },
                ]}
              />
            )}
          />
        </Stack>
        <Stack>
          <StyledTypo title="Medications" />
          <Controller
            name="medication"
            control={control}
            render={({ field }) => (
              <StyledMultiSelector
                field={field}
                error={errors?.medication}
                options={[
                  { label: "Delhi", value: "delhi" },
                  { label: "Mumbai", value: "mumbai" },
                  { label: "Bangalore", value: "bangalore" },
                  { label: "Chennai", value: "chennai" },
                  { label: "Kolkata", value: "kolkata" },
                ]}
              />
            )}
          />
        </Stack>
        <Stack>
          <StyledTypo title="Allergies" />
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <StyledMultiSelector
                field={field}
                error={errors?.allergies}
                options={[
                  { label: "Delhi", value: "delhi" },
                  { label: "Mumbai", value: "mumbai" },
                  { label: "Bangalore", value: "bangalore" },
                  { label: "Chennai", value: "chennai" },
                  { label: "Kolkata", value: "kolkata" },
                ]}
              />
            )}
          />
        </Stack>
        <Stack>
          <StyledTypo title="Interest" />
          <Controller
            name="interest"
            control={control}
            render={({ field }) => (
              <StyledMultiSelector
                field={field}
                error={errors?.interest}
                options={[
                  { label: "Delhi", value: "delhi" },
                  { label: "Mumbai", value: "mumbai" },
                  { label: "Bangalore", value: "bangalore" },
                  { label: "Chennai", value: "chennai" },
                  { label: "Kolkata", value: "kolkata" },
                ]}
              />
            )}
          />
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"flex-end"} mt={2}>
          <Button
            variant="secondary2"
            sx={{ width: "fit-content" }}
            type="submit"
          >
            Edit Cohort
          </Button>
        </Stack>
      </form>
      <GlobalDialog
        open={openSave}
        handleClose={() => {
          setSaveDialog(false);
          setData({});
        }}
        component={
          <CommonDialog
            title="Edit Cohort"
            subTitle="Are you sure want to save the changes for this cohort?"
            handleCancel={() => {
              setSaveDialog(false);
              setData({});
            }}
            handleConfirm={handleConfirm}
          />
        }
      />
    </Box>
  );
}
