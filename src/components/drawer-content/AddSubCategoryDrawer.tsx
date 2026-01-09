import { Button, IconButton, Stack, Typography, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSubCategorySchema } from "../../utils/yup-config";
import { useCreateSubCategoryMutation } from "../../rtk/endpoints/contentModerationApi";
import { useDispatch } from "react-redux";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useEffect } from "react";
import { StyledHeaderTypography } from "../../utils/helper";
import StyledSelector from "../Styled-Selector";

interface SubCategoryFormInputs {
  categoryId: string;
  subCategoryName: string;
}

interface AddSubCategoryDrawerProps {
  handleClose: () => void;
  categoryId: string;
  categoryName: string;
}

export default function AddSubCategoryDrawer({ handleClose, categoryId, categoryName }: AddSubCategoryDrawerProps) {
  const dispatch = useDispatch();
  const [createSubCategory, { isSuccess, isLoading }] = useCreateSubCategoryMutation();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubCategoryFormInputs>({
    resolver: yupResolver(addSubCategorySchema),
    defaultValues: {
      categoryId: categoryId,
      subCategoryName: "",
    },
  });

  const onSubmit = async (data: SubCategoryFormInputs) => {
    try {
      await createSubCategory({ 
        categoryId, 
        subCategoryName: data.subCategoryName 
      }).unwrap();
      handleClose();
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          message: "Subcategory created successfully",
          severity: "success",
        })
      );
    }
  }, [isSuccess, dispatch]);

  return (
    <Stack gap={2} height={"100%"}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <Typography variant="h4">Add Sub Category</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} style={{height:"100%"}}>
        <Stack justifyContent={"space-between"} height={"100%"}>
          <Stack gap={2}>
            {/* Category Name Field (Read-only) */}
            <StyledHeaderTypography title="Category" />
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <StyledSelector
                field={field}
                error={errors.categoryId}
                options={[{label: categoryName, value: categoryId}] }  
                disabled={true}              
              />
            )}
          />

            {/* Sub Category Name Field */}
            <Box>
              <label
                style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}
              >
                Sub Category Name
              </label>
              <input
                {...register("subCategoryName")}
                placeholder="Enter Sub Category Name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid #BFDDFD",
                  marginTop: 4,
                  fontSize: 16,
                }}
              />
              {errors.subCategoryName && (
                <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  {errors.subCategoryName.message}
                </p>
              )}
            </Box>

            <p style={{ fontSize: 12, fontWeight: 400, color: "#031C5F",lineHeight:"18px" }}>
              It is recommended not to change the text of the subcategory. The
              changes in the subcategory are updated in all content details that are already associated with it.
            </p>
          </Stack>
          <Stack alignItems={"flex-end"} >
            <Button 
              type="submit" 
              variant="primarySquare" 
              sx={{width:"fit-content"}}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save and Update"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
