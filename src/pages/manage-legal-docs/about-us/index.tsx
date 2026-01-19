import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AdminLayout from "../../../layouts/AdminLayout";
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GlobalDialog from "../../../components/dialog";
import CommonDialog from "../../../components/dialog/dialog-content/CommonDialog";
import { useGetLegalDocsQuery, useUpdateLegalDocsMutation } from "../../../rtk/endpoints/legalDocsApi";
import CmsPageSkeleton from "../../../components/skeletons/CmsPageSkeleton";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../rtk/feature/alertSlice";

const staticAboutUs = "<h2>About Flygo</h2><p>Flygo is your trusted partner in logistics and shipping management. Our platform provides end-to-end visibility and control over your supply chain, ensuring that your goods Reach their destination safely and on time.</p><p>Founded in 2024, Flygo has been committed to revolutionizing the transport industry through innovative technology and exceptional service.</p>";

export default function AboutUs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [quillReady, setQuillReady] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading, isFetching, isSuccess } = useGetLegalDocsQuery({ type: "about_us", faqId: -1, page: -1, limit: -1 });
  const [updateLegalDocs, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateLegalDocsMutation();
  const handleOpenDialog = () => {
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  const handleSubmit = async () => {
    try {
      if (value === "<p><br></p>") {
        return;
      }
      await updateLegalDocs({
        type: "about_us",
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
      setQuillReady(true);
    } else if (!isLoading && !isFetching) {
      setValue(staticAboutUs);
      setQuillReady(true);
    }
  }, [data, isSuccess, isLoading, isFetching]);
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(showAlert({
        message: "About Us updated successfully",
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
        {isLoading || isFetching ? <CmsPageSkeleton /> : (
          <Box mb={3} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack flexDirection={{ xs: "column", sm: "row" }} justifyContent={"space-between"} alignItems={"center"} gap={2}>
              <Stack flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"} gap={1}>
                <IconButton onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon />
                </IconButton>
                <Typography variant="h4" fontWeight={600}>
                  About Us
                </Typography>
              </Stack>
              <Button variant="primarySquare" disabled={value.trim() === "<p><br></p>" || isUpdating} onClick={handleOpenDialog}>Update</Button>
            </Stack>
            {quillReady && (
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            )}
          </Box>)}
        <GlobalDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          component={<CommonDialog title="Update Document" subTitle="Are you sure you want to update this document?" handleCancel={handleCloseDialog} handleConfirm={handleSubmit} />} />
      </Box>
    </AdminLayout>
  );
}
