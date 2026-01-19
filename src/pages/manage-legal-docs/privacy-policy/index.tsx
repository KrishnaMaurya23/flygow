import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AdminLayout from "../../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import GlobalDialog from "../../../components/dialog";
import CommonDialog from "../../../components/dialog/dialog-content/CommonDialog";
import {
  useGetLegalDocsQuery,
  useUpdateLegalDocsMutation,
} from "../../../rtk/endpoints/legalDocsApi";
import CmsPageSkeleton from "../../../components/skeletons/CmsPageSkeleton";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../rtk/feature/alertSlice";

const staticPrivacyPolicy = "<h2>Privacy Policy</h2><p>Your privacy is important to us. It is Flygo's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p><p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>";

const getBackButtonHandler = (hasUnsavedChanges: boolean, handleCloseWithUnsavedChanges: () => void, navigate: (path: number) => void) => {
  return hasUnsavedChanges ? handleCloseWithUnsavedChanges : () => navigate(-1);
};

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [originalValue, setOriginalValue] = useState("");
  const [quillReady, setQuillReady] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [unsavedChangesDialog, setUnsavedChangesDialog] = useState(false);
  const { data, isLoading, isFetching, isSuccess } = useGetLegalDocsQuery({
    type: "privacy_policy",
    faqId: -1,
    page: -1,
    limit: -1,
  });
  const [updateLegalDocs, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateLegalDocsMutation();
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseWithUnsavedChanges = () => {
    setUnsavedChangesDialog(true);
  }

  const handleConfirmClose = () => {
    setUnsavedChangesDialog(false);
    navigate(-1);
  }

  const handleCancelClose = () => {
    setUnsavedChangesDialog(false);
  }

  // Check if form has unsaved changes
  const hasUnsavedChanges = () => {
    return value !== originalValue;
  };
  const handleSubmit = async () => {
    try {
      if (value === "<p><br></p>") {
        return;
      }
      await updateLegalDocs({
        type: "privacy_policy",
        content: value,
      }).unwrap();
    } catch (error) {
      console.error("Something went wrong", error);
    }
    finally {
      setOpenDialog(false);
    }
  };
  useEffect(() => {
    if (data?.data?.body !== undefined && data.data.body !== null && data.data.body !== "") {
      setValue(data.data.body);
      setOriginalValue(data.data.body);
      setQuillReady(true);
    } else if (!isLoading && !isFetching) {
      setValue(staticPrivacyPolicy);
      setOriginalValue(staticPrivacyPolicy);
      setQuillReady(true);
    }
  }, [data, isSuccess, isLoading, isFetching]);
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(showAlert({
        message: "Privacy Policy updated successfully",
        severity: "success",
      }));
    }
  }, [isUpdateSuccess]);
  return (
    <AdminLayout>
      <Box sx={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "24px !important",
      }}>
        {isLoading || isFetching ? (
          <CmsPageSkeleton />
        ) : (
          <Box mb={3} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}
            >
              <Stack
                flexDirection={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={1}
              >
                <IconButton onClick={getBackButtonHandler(hasUnsavedChanges(), handleCloseWithUnsavedChanges, navigate)}>
                  <KeyboardBackspaceIcon />
                </IconButton>
                <Typography variant="h4" fontWeight={600}>
                  Privacy Policy
                </Typography>
              </Stack>
              <Button
                variant="primarySquare"
                disabled={value.trim() === "<p><br></p>" || isUpdating}
                onClick={handleOpenDialog}
              >
                Update
              </Button>
            </Stack>
            {quillReady && (
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            )}
          </Box>
        )}
        <GlobalDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          component={
            <CommonDialog
              title="Update Document"
              subTitle="Are you sure you want to update this document?"
              handleCancel={handleCloseDialog}
              handleConfirm={handleSubmit}
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
      </Box>
    </AdminLayout>
  );
}
