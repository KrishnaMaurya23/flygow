import { IconButton, Typography, Stack, Box, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import StyledSelector from "../Styled-Selector";
import { UpdateSubAdminRoleSchema } from "../../utils/yup-config";
import { useGetUserRolesQuery } from "../../rtk/endpoints/adminApi";
import { useEffect, useState } from "react";
import CommonPageSkeleton from "../skeletons/CommonPageSkeleton";


// Define schema for only role

type FormValues = {
  role: string;
};

interface UpdateSubAdminRoleDrawerProps {
  handleClose: () => void;
  id: string;
}

export default function UpdateSubAdminRoleDrawer({ handleClose, id }: UpdateSubAdminRoleDrawerProps) {
  const [roles, setRoles] = useState<any[]>([]);
  const {
    data: userRoles,
    isLoading: isUserRolesLoading,
    isFetching: isUserRolesFetching,
    isSuccess: isUserRolesSuccess,
  } = useGetUserRolesQuery({});
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { role: "" },
    resolver: yupResolver(UpdateSubAdminRoleSchema),
  });

  const onSubmit = (data: FormValues) => {
    // TODO: Implement invite sub-admin API call
    // Id: id, Data: data
    handleClose();
  };
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
      <Stack gap={2}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Typography variant="h4">Update Role</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
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
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="submit"
            variant="primarySquare"
            disabled={isSubmitting}
            sx={{ minWidth: 120 }}
          >
            Update Role
          </Button>
        </Box>
      </Stack>
    </form>
  ))
}