import { Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { StyledTextField } from "../../utils/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faqFormSchema } from "../../utils/yup-config";
import { Controller } from "react-hook-form";
import GlobalDialog from "../dialog";
import { useState, useEffect } from "react";
import CommonDialog from "../dialog/dialog-content/CommonDialog";
import { useGetLegalDocsQuery, useUpdateLegalDocsMutation } from "../../rtk/endpoints/legalDocsApi";
import { useDispatch } from "react-redux";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useTranslation } from "react-i18next";

interface AddEditDrawerProps {
  type?: string;
  id?: string;
  handleClose: () => void;
}

interface FAQFormInputs {
  question: string;
  answer: string;
}

export default function AddEditFAQDrawer({ handleClose, type = "new", id }: AddEditDrawerProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [unsavedChangesDialog, setUnsavedChangesDialog] = useState(false);
  const [formData, setFormData] = useState<FAQFormInputs>({ question: "", answer: "" });

  // API hooks
  const [updateLegalDocs, { isLoading: isUpdating }] = useUpdateLegalDocsMutation();

  // Fetch existing FAQ data when editing
  const { data: existingFaqData, isLoading: isLoadingFaq } = useGetLegalDocsQuery(
    { type: "faq", faqId: type === "edit" && id ? (id) : -1, page: -1, limit: -1 },
    { skip: type === "new" || !id }
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    if (!isUpdating) {
      setOpenDialog(false);
    }
  }

  const handleCloseWithUnsavedChanges = () => {
    setUnsavedChangesDialog(true);
  }

  const handleConfirmClose = () => {
    setUnsavedChangesDialog(false);
    handleClose();
  }

  const handleCancelClose = () => {
    setUnsavedChangesDialog(false);
  }
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FAQFormInputs>({
    defaultValues: { question: "", answer: "" },
    resolver: yupResolver(faqFormSchema),
  });

  // Set form data when editing existing FAQ
  useEffect(() => {
    if (type === "edit" && existingFaqData?.data) {
      const faq = existingFaqData.data;
      const formValues = {
        question: faq.question || "",
        answer: faq.answer || ""
      };
      reset(formValues);
    }
  }, [existingFaqData, type, reset]);

  const onSubmit = async (data: FAQFormInputs) => {
    setFormData(data);
    handleOpenDialog();
  };



  const handleConfirm = async () => {
    try {
      const payload = {
        type: "faq",
        question: formData.question,
        answer: formData.answer,
        ...(type === "edit" && id && { faqId: (id) })
      };

      await updateLegalDocs(payload).unwrap();
      handleCloseDialog();
      handleClose();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      dispatch(showAlert({
        message: 'Failed to save FAQ. Please try again.',
        severity: 'error',
      }));
    }
  };

  // Check if form has unsaved changes (only for edit mode)
  const hasUnsavedChanges = () => {
    return type === "edit" && isDirty;
  };

  if (type === "edit" && isLoadingFaq) {
    return (
      <Stack gap={2}>
        <Typography variant="h4">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography variant="h4">{type === "new" ? t("addFaq") : t("editFaq")}</Typography>
        <IconButton onClick={hasUnsavedChanges() ? handleCloseWithUnsavedChanges : handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Stack>
            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}>
              {t("question")}
            </label>
            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  error={!!errors.question}
                  helperText={errors.question?.message}
                  multiline
                  maxRows={6}
                />
              )}
            />
          </Stack>

          <Stack>
            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD" }}>
              {t("answer")}
            </label>
            <Controller
              name="answer"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  error={!!errors.answer}
                  helperText={errors.answer?.message}
                  multiline
                  maxRows={6}
                />
              )}
            />
          </Stack>

          <Button
            type="submit"
            variant="primarySquare"
            disabled={isUpdating}
          >
            {isUpdating ? t("buttons.saving") : (type === "new" ? t("buttons.save") : t("saveAndUpdate"))}
          </Button>
        </Stack>
      </form>

      <GlobalDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        component={
          <CommonDialog
            title={type === "new" ? "Add FAQ" : "Update FAQ"}
            subTitle={type === "new" ? "Are you sure you want to add this FAQ?" : "Are you sure you want to update this FAQ?"}
            handleCancel={handleCloseDialog}
            handleConfirm={handleConfirm}
          />
        }
      />

      <GlobalDialog
        open={unsavedChangesDialog}
        handleClose={handleCancelClose}
        component={
          <CommonDialog 
            title="Unsaved Changes" 
            subTitle="You have unsaved changes. Do you want to discard or save before exiting?" 
            handleCancel={handleCancelClose} 
            handleConfirm={handleConfirmClose}
          />
        }
      />
    </Stack>
  );
}
