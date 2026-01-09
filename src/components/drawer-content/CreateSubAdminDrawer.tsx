import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { encryptAES, StyledTextField } from "../../utils/helper";
import StyledSelector from "../Styled-Selector";
import { createSubAdminSchema } from "../../utils/yup-config";
import {
  useCreateAdminMutation,
  useGetUserRolesQuery,
} from "../../rtk/endpoints/adminApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showAlert } from "../../rtk/feature/alertSlice";
import CommonPageSkeleton from "../skeletons/CommonPageSkeleton";

interface CreateSubAdminDrawerProps {
  handleClose: () => void;
}
type FormValues = {
  name: string;
  email: string;
  role: string;
};

export default function CreateSubAdminDrawer({
  handleClose,
}: CreateSubAdminDrawerProps) {
  const [roles, setRoles] = useState<any[]>([]);
  const {
    data: userRoles,
    isLoading: isUserRolesLoading,
    isFetching: isUserRolesFetching,
    isSuccess: isUserRolesSuccess,
  } = useGetUserRolesQuery({});
  const [createAdmin, { isSuccess }] = useCreateAdminMutation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", role: "" },
    resolver: yupResolver(createSubAdminSchema),
  });

  const onSubmit = async (data: FormValues) => {
    // For now, just log the data
    try {
      await createAdmin({
        fullName: encryptAES(data.name),
        email: encryptAES(data.email),
        // email: encryptAES(data.email),
        role: Number(data.role),
      });
      handleClose();
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          message: "Sub-Admin created successfully",
          severity: "success",
        })
      );
    }
  }, [isSuccess]);
  useEffect(() => {
    if (userRoles?.data?.roles) {
      const roles = userRoles?.data?.roles?.map((role: any) => ({
        label: role?.role,
        value: role?.userTypeId,
      }));
      setRoles(roles);
    }
  }, [isUserRolesSuccess]);
  return (
    isUserRolesLoading || isUserRolesFetching ? (
      <CommonPageSkeleton />
    ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ borderRadius: 4 }} gap={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight={600}>
            Create Sub-Admin
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Controller
          name="name"
          control={control}
          rules={{ required: "User Name is required" }}
          render={({ field }) => (
            <Stack>
              <label
                style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}
              >
                User Name
              </label>
              <StyledTextField
                {...field}
                placeholder="Enter User Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            </Stack>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "User Email Address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field }) => (
            <Stack>
              <label
                style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}
              >
                User Email Address
              </label>
              <StyledTextField
                {...field}
                  placeholder="Enter User Email Address"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Stack>
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Stack>
              <label
                style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}
              >
                Role
              </label>
              <StyledSelector
                
                field={field}
                error={errors?.role}
                options={roles}
              />
            </Stack>
          )}
        />
        <Typography fontSize={12} color="#031C5F" mt={1} lineHeight={"18px"}>
          A confirmation email will be sent to this user’s email address with an
          auto-generated password and login URL.
        </Typography>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="submit"
            variant="primarySquare"
            disabled={isSubmitting}
            sx={{ minWidth: 120 }}
          >
            Invite User
          </Button>
        </Box>
      </Stack>
    </form>
  ))
}
