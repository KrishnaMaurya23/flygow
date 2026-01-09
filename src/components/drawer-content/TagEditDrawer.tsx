import {
  IconButton,
  Stack,
  Typography,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { decryptAES, StyledTextField } from "../../utils/helper";
import { useEffect } from "react";
import {
  useEditMetaDataMutation
} from "../../rtk/endpoints/contentModerationApi";
import { useSearchParams } from "react-router-dom";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useDispatch } from "react-redux";
import StyledSelector from "../Styled-Selector";

// Define form schema using Yup
const schema = yup.object().shape({
  categoryId: yup.string().required("Category is required"),
 
    aiGeneratedSummary: yup.string().required("Summary is required"),
});

interface TagEditDrawerProps {
  handleClose: () => void;
  summary?: string;
  categoryName?: string;
  categoryId?: string;
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

export default function TagEditDrawer({ handleClose, summary="", categoryName="", categoryId="" }: TagEditDrawerProps) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  
 
  const [editMetaData, { isSuccess: isEditSuccess }] = useEditMetaDataMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: categoryId,
      aiGeneratedSummary: summary,
    },
  });

  const onSubmit = async (data: any) => {
    // Handle form submission
    try {
      if (!id) {
            dispatch(showAlert({ message: "Missing content id in URL", severity: "error" }));
            return
           }
      await editMetaData({id:decryptAES(id),body:{aiGeneratedSummary:data.aiGeneratedSummary}}).unwrap();
    } catch (error) {
      // Handle error
    }
  };

 
  
  useEffect(() => {
    if (isEditSuccess) {
      handleClose();
      dispatch(showAlert({ message: "Metadata updated successfully", severity: "success" }));
    }
  }, [isEditSuccess]);
  return (
    <Stack gap={2}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Edit Metadata</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {/* Category Selector */}
        <Stack gap={2}>
          <StyledTypo title="Category" />
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
          <Divider />
        </Stack>
        
        <Stack>
          <StyledTypo title="AI Generated Summary" />
          <Controller
            name="aiGeneratedSummary"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                multiline
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "0px",
                  },
                }}
                rows={3}
                placeholder="Type Here..."
                error={!!errors.summary}
                helperText={errors.summary?.message?.toString() || ""}
              />
            )}
          />
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"flex-end"} mt={2}>
          <Button
            type="submit"
            variant="primarySquare"
            sx={{ width: "fit-content" }}
          >
            Save and Update
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
