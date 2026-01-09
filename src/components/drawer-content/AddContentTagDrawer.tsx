import { Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTagSchema } from "../../utils/yup-config";
import { useState } from "react";
import StyledDynamicSelector from "../Styled-Dynamic-Selector";

interface TagFormInputs {
    tagName: string;
  categoryName: string;
}

interface AddContentCategoryDrawerProps {
  handleClose: () => void;
}
export default function AddContentTagDrawer({ handleClose }: AddContentCategoryDrawerProps) {
  const [categoryPage, setCategoryPage] = useState(0);
    const [categorySearchQuery, setCategorySearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    
  const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<TagFormInputs>({
        defaultValues: { tagName:"", categoryName: "" },
        resolver: yupResolver(addTagSchema),
      });
    
      const onSubmit = (data: TagFormInputs) => {
        // Handle form submission
        // Form data: data
      };
      const allCategories = [
        "Fitness & Lifestyle",
        "Wellness",
        "Hypertension",
        "Lorem Ipsum 1",
        "Lorem Ipsum 2",
        "Lorem Ipsum 3",
        "Lorem Ipsum 4",
        "Lorem Ipsum 5",
        "Lorem Ipsum 6",
        "Lorem Ipsum 7",
        "Lorem Ipsum 8",
        "Lorem Ipsum 9",
        "Lorem Ipsum 10",
      ];
  return (
    <Stack gap={2}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <Typography variant="h4">Add Tag</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}>
          Tag Name
        </label>
        <input
          {...register("tagName")}
          placeholder="Lorem Ipsum"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #BFDDFD",
            marginTop: 4,
            fontSize: 16,
          }}
        />
        {errors.tagName && (
          <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
            {errors.tagName.message}
          </p>
        )}
        <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}>
          Tag Category
        </label>
        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => (
            <StyledDynamicSelector
              field={field}
                     error={errors.categoryName}
                     options={allCategories.map((item) => ({ label: item, value: item })) as any}
                     searchQuery={categorySearchQuery}
                     setSearchQuery={setCategorySearchQuery}
                     hasMore={false}
                     loading={false}
                     onLoadMore={() => {}}
                   />
                   )}
                   />
        {errors.categoryName && (
          <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
            {errors.categoryName.message}
          </p>
        )}
        <p style={{ fontSize: 12, fontWeight: 400, color: "#031C5F" }}>
          It is recommended not to change the text of the category. The changes
          in the category are updated in all tags and the content details that
          are already associated with it.
        </p>
        <Stack alignItems={"flex-end"}>
          <Button
            type="submit"
            variant="primarySquare"
            sx={{ width: "fit-content" }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}