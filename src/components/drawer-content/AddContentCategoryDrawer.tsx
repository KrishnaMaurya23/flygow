import { Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCategorySchema } from "../../utils/yup-config";
import { useCreateCategoryMutation } from "../../rtk/endpoints/contentModerationApi";
import { useDispatch } from "react-redux";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useEffect } from "react";


interface CategoryFormInputs {
  categoryName: string;
}

// Yup validation schema

interface AddContentCategoryDrawerProps{
    handleClose:()=>void;
}
export default function AddContentCategoryDrawer({handleClose}:AddContentCategoryDrawerProps){
  const dispatch = useDispatch();
  const [createCategory, { isSuccess, isLoading }] = useCreateCategoryMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: yupResolver(addCategorySchema),
  });

  const onSubmit = async (data: CategoryFormInputs) => {
    try {
      await createCategory({ categoryName: data.categoryName,subcategories:[] }).unwrap();
      handleClose();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          message: "Category created successfully",
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
          <Typography variant="h4">Add Category</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} style={{height:"100%"}}>
          <Stack justifyContent={"space-between"} height={"100%"}>
          <Stack>
          <label
            style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}
          >
            Category Name
          </label>
          <input
            {...register("categoryName")}
            placeholder="Enter Category Name"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #BFDDFD",
              marginTop: 4,
              fontSize: 16,
            }}
          />
          {errors.categoryName && (
            <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
              {errors.categoryName.message}
            </p>
          )}
          <p style={{ fontSize: 12, fontWeight: 400, color: "#031C5F",lineHeight:"18px" }}>
            It is recommended not to change the text of the category. The
            changes in the category are updated in all tags and the content
            details that are already associated with it.
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