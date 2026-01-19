import { Box, Button, IconButton, Pagination, Stack, Typography } from "@mui/material";
import AdminLayout from "../../../layouts/AdminLayout";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react";
import GlobalDrawer from "../../../components/drawer";
import GlobalDialog from "../../../components/dialog";
import CommonDialog from "../../../components/dialog/dialog-content/CommonDialog";
import AddEditFAQDrawer from "../../../components/drawer-content/AddEditFAQDrawer";
import { useGetLegalDocsQuery, useUpdateLegalDocsMutation } from "../../../rtk/endpoints/legalDocsApi";
import CmsPageSkeleton from "../../../components/skeletons/CmsPageSkeleton";
import { logger } from "../../../utils/helper";

const renderFaqsList = (faqs: any[], handleOpenDialog: (id: string) => void, handleOpenDrawer: (type: string, id?: string) => void) => {
  if (faqs.length === 0) {
    return <Typography variant="h3">No FAQs found</Typography>;
  }

  return (faqs || []).map((faq) => (
    <Accordion key={faq._id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Stack flexDirection={{ xs: "column", sm: "row" }} justifyContent={"space-between"} alignItems={"center"} gap={2} width={"100%"}>
          <Typography component="span" fontWeight={500} fontSize={16}>{faq.question}</Typography>
          <Stack flexDirection={"row"} gap={1}>
            <IconButton onClick={() => handleOpenDialog(faq._id)}><DeleteOutlineOutlinedIcon sx={{ color: "#FF686B" }} /></IconButton>
            <IconButton onClick={() => handleOpenDrawer("edit", faq._id)}><EditOutlinedIcon sx={{ color: "#1483FF" }} /></IconButton>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails >
        <Typography component="span" fontSize={16} fontWeight={400}>{faq.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  ));
};

const staticFaqs = [
  { _id: "1", question: "What is Flygo?", answer: "Flygo is a comprehensive shipping and logistics management platform." },
  { _id: "2", question: "How do I track my shipment?", answer: "You can track your shipment using the shipment ID in the shipments section." },
  { _id: "3", question: "How to update legal documents?", answer: "Go to the Manage Legal Docs section and click on the document you want to edit." },
];

export default function FAQs() {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [faqs, setFaqs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | undefined>("");
  const { data, isLoading, isFetching, isSuccess } = useGetLegalDocsQuery({ type: "faq", faqId: -1, page: page, limit: 100 }, { refetchOnMountOrArgChange: true });
  const [updateLegalDocs, { isLoading: isDeleting }] = useUpdateLegalDocsMutation();
  const handleOpenDrawer = (type: string, id?: string) => {
    setDrawerType(type);
    setSelectedId(id);
    setOpenDrawer(true);
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setDrawerType("");
  }
  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    if (!isDeleting) {
      setOpenDialog(false)
      setSelectedId("");
    }
  }
  const handleSubmitDelete = async () => {
    try {
      if (selectedId) {
        // Find the FAQ data to get question and answer
        const faqToDelete = faqs.find(faq => faq._id === selectedId);

        const payload = {
          type: "faq",
          faqId: (selectedId),
          question: faqToDelete?.question || "",
          answer: faqToDelete?.answer || "",
          isActive: false,
        };

        await updateLegalDocs(payload).unwrap();
        handleCloseDialog();
        // The FAQ list will automatically refresh due to RTK Query cache invalidation
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      // Handle error (show toast notification, etc.)
    }
  };
  useEffect(() => {
    if (data?.data?.faqs && data.data.faqs.length > 0) {
      setFaqs(data?.data?.faqs);
    } else {
      setFaqs(staticFaqs);
    }
  }, [data, isSuccess]);
  return (
    <AdminLayout>
      <Box sx={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "24px !important",
      }}>
        {isLoading || isFetching ? <CmsPageSkeleton /> : (
          <Box mb={3} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack flexDirection={{ xs: "column", sm: "row" }} justifyContent={"space-between"} alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
              <Stack flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"} gap={1}>
                <IconButton onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon />
                </IconButton>
                <Typography variant="h4" fontWeight={600}>
                  FAQs
                </Typography>
              </Stack>
              <Button variant="primary2" onClick={() => handleOpenDrawer("new")} sx={{ width: { xs: "100%", sm: "fit-content" } }}><AddIcon />Add New FAQ</Button>
            </Stack>
            <Stack>
              {renderFaqsList(faqs, handleOpenDialog, handleOpenDrawer)}

            </Stack>
            <Pagination
              count={Math.ceil(data?.data?.total / 100)}
              variant="outlined"
              page={page}
              onChange={(event, value) => { logger(event); setPage(value) }}
              siblingCount={0}
              color="standard"
              sx={{ mx: "auto", "& .MuiPagination-ul": { flexWrap: "nowrap" } }}
            />
          </Box>)}
        <GlobalDrawer
          open={openDrawer}
          handleClose={handleCloseDrawer}
          component={<AddEditFAQDrawer handleClose={handleCloseDrawer} type={drawerType} id={selectedId} />} />
        <GlobalDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          component={<CommonDialog title="Delete FAQ" subTitle="Are you sure you want to delete this FAQ?" handleCancel={handleCloseDialog} handleConfirm={handleSubmitDelete} />} />
      </Box>
    </AdminLayout>
  );
}
