import {
  IconButton,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  FormGroup,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { StyledTextField } from "../../utils/helper";
import { useEffect, useState } from "react";
import GlobalDialog from "../dialog";
import CommonDialog from "../dialog/dialog-content/CommonDialog";
import {
  useCreateAdminRoleMutation,
  useGetAdminRoleByIdQuery,
  useUpdateAdminRoleMutation,
} from "../../rtk/endpoints/adminApi";
import { accessRights } from "../../utils/constants";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useDispatch } from "react-redux";
import CommonPageSkeleton from "../skeletons/CommonPageSkeleton";

interface AddEditUserRoleDrawerProps {
  handleClose: () => void;
  id: string;
  type: string;
}

type FormValues = {
  roleTitle: string;
  accessRights: string[];
};

export default function AddEditUserRoleDrawer({
  handleClose,
  id,
  type,
}: AddEditUserRoleDrawerProps) {
  const [data, setData] = useState<FormValues>({
    roleTitle: "",
    accessRights: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [
    createAdminRole,
    { isLoading: createAdminRoleLoading, isSuccess: createAdminRoleSuccess },
  ] = useCreateAdminRoleMutation();
  const {
    data: adminRoleData,
    isLoading: adminRoleLoading,
    isFetching: adminRoleFetching,
    isSuccess: adminRoleSuccess,
  } = useGetAdminRoleByIdQuery(id, {
    skip: !id,
  });
  const [
    updateAdminRole,
    { isLoading: updateAdminRoleLoading, isSuccess: updateAdminRoleSuccess },
  ] = useUpdateAdminRoleMutation();
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { roleTitle: "", accessRights: [] },
  });
  const selectedRights = watch("accessRights");

  const handleParentCheck = (parent: any, checked: boolean) => {
    let newRights = new Set(selectedRights);
    if (checked) {
      newRights.add(parent.value);
      if (parent.children) {
        parent.children.forEach((child: any) => newRights.add(child.value));
      }
    } else {
      newRights.delete(parent.value);
      if (parent.children) {
        parent.children.forEach((child: any) => newRights.delete(child.value));
      }
    }
    setValue("accessRights", Array.from(newRights));
  };

  const isParentChecked = (parent: any) => {
    if (parent.children) {
      return [parent.value, ...parent.children.map((c: any) => c.value)].every(
        (v) => selectedRights.includes(v)
      );
    }
    return selectedRights.includes(parent.value);
  };

  const isParentIndeterminate = (parent: any) => {
    if (!parent.children) return false;
    const all = [parent.value, ...parent.children.map((c: any) => c.value)];
    const checkedCount = all.filter((v) => selectedRights.includes(v)).length;
    return checkedCount > 0 && checkedCount < all.length;
  };

  const onSubmit = (data: FormValues) => {
    setData(data);
    handleOpenDialog();
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCreateConfirm = async () => {
    try {
      if (type === "create") {
        await createAdminRole({
          name: data.roleTitle,
          permissionIds: data.accessRights,
        });
      } else {
        await updateAdminRole({
          body: {
            name: data.roleTitle,
            permissionIds: data.accessRights,
          },
          id: id,
        });
      }
      handleCloseDialog();
    } catch (error) {
      // Handle error
    } finally {
      handleCloseDialog();
      handleClose();
    }
  };
  const handleUpdateConfirm = () => {
    // Handle update confirm action
    // Id: id, Data: data
  };
  useEffect(() => {
    if (createAdminRoleSuccess) {
      dispatch(
        showAlert({
          message: "Role created successfully",
          type: "success",
        })
      );
    }
  }, [createAdminRoleSuccess]);
  useEffect(() => {
    if (updateAdminRoleSuccess) {
      dispatch(
        showAlert({
          message: "Role updated successfully",
          type: "success",
        })
      );
    }
  }, [updateAdminRoleSuccess]);
  useEffect(() => {
    if (adminRoleData) {
      setData({
        roleTitle: adminRoleData.name,
        accessRights: adminRoleData.permissionIds,
      });
    }
  }, [adminRoleData, adminRoleSuccess]);
  return adminRoleLoading || adminRoleFetching ? (
    <CommonPageSkeleton />
  ) : (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} sx={{ p: 2 }}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h4">
              {type === "create" ? "Create New Admin Role" : "Edit Admin Role"}
            </Typography>
            <IconButton
              disabled={createAdminRoleLoading || updateAdminRoleLoading}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack>
            <label
              style={{
                fontWeight: 500,
                fontSize: "14px",
                color: "#031C5F",
                lineHeight: "20px",
              }}
            >
              Role Name
            </label>
            <Controller
              name="roleTitle"
              control={control}
              rules={{ required: "Role Title is required" }}
              render={({ field, fieldState }) => (
                <StyledTextField
                  {...field}
                  placeholder="Type here"
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </Stack>
          <Box>
            <Typography
              fontWeight={500}
              fontSize={14}
              mb={0.5}
              color="#031C5F"
              lineHeight="20px"
            >
              Access Rights
            </Typography>
            <Typography
              fontSize={12}
              fontWeight={400}
              color="#031C5F"
              lineHeight="18px"
              mb={1}
            >
              Select the module to which its associated user will have access.
            </Typography>
            <Controller
              name="accessRights"
              control={control}
              rules={{
                validate: (value) =>
                  (value && value.length > 0) ||
                  "At least one access right must be selected",
              }}
              render={({ field, fieldState }) => (
                <>
                  <FormGroup>
                    {accessRights.map((parent) => (
                      <Box key={parent.value} ml={2}>
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#031C5F",
                              lineHeight: "24px",
                            },
                          }}
                          control={
                            <Checkbox
                            icon={<img src={"/assets/icons/_Checkbox base.svg"} alt="check" width={20} height={20} />}
                            checkedIcon={<img src={"/assets/icons/Checkbox.svg"} alt="check" width={20} height={20} />}
                              checked={isParentChecked(parent)}
                              indeterminate={isParentIndeterminate(parent)}
                              onChange={(_, checked) =>
                                handleParentCheck(parent, checked)
                              }
                              sx={{
                                color: "#031C5F",
                                "&.Mui-checked": { color: "#031C5F" },
                              }}
                            />
                          }
                          label={parent.label}
                        />
                        {parent.children && (
                          <Box ml={3}>
                            {parent.children.map((child: any) => (
                              <FormControlLabel
                                key={child.value}
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#031C5F",
                                    lineHeight: "24px",
                                  },
                                }}
                                control={
                                  <Checkbox
                                  icon={<img src={"/assets/icons/_Checkbox base.svg"} alt="check" width={20} height={20} />}
                                  checkedIcon={<img src={"/assets/icons/Checkbox.svg"} alt="check" width={20} height={20} />}
                                    checked={field.value.includes(child.value)}
                                    onChange={(_, checked) => {
                                      const current = new Set(field.value);
                                      if (checked) {
                                        current.add(child.value);
                                      } else {
                                        current.delete(child.value);
                                      }
                                      field.onChange(Array.from(current));
                                    }}
                                    sx={{
                                      color: "#031C5F",
                                      "&.Mui-checked": { color: "#031C5F" },
                                    }}
                                  />
                                }
                                label={child.label}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </FormGroup>
                  {fieldState.error && (
                    <Typography
                      sx={{ color: "#D32F2F" }}
                      fontSize={12}
                      mt={0.5}
                    >
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Box>
          <Typography
            fontSize={12}
            fontWeight={400}
            color="#031C5F"
            lineHeight="18px"
            mt={1}
          >
            Once updated, all the users with this role will be auto-logged out
            and their access rights will be in effect from their next logged in
            session.
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="primarySquare">
              {type === "create" ? "Create Role" : "Update Role"}
            </Button>
          </Box>
        </Stack>
      </form>
      <GlobalDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        component={
          <CommonDialog
            title={
              type === "create" ? "Create New Admin Role" : "Edit Admin Role"
            }
            subTitle={
              type === "create"
                ? "Are you sure you want to create this admin role?"
                : "Are you sure you want to update this admin role?"
            }
            handleCancel={handleClose}
            handleConfirm={
              type === "create" ? handleCreateConfirm : handleUpdateConfirm
            }
          />
        }
      />
    </>
  );
}
