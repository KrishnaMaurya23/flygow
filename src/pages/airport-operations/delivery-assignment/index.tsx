import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline"; // Assuming delete icon based on Image 1
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../../layouts/AdminLayout";
import GlobalTable from "../../../components/globaltable";
import { colors } from "../../../utils/constants";
import DeliveryAssignmentDrawer from "./DeliveryAssignmentDrawer";

const SearchField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "100px",
    backgroundColor: colors["Gray-50"],
    paddingRight: "16px",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
  },
}));

interface AssignmentData {
  id: string;
  shipmentType: string;
  assignmentStage: string;
  defaultAssignmentRule: string;
  notes: string;
  action: any;
}

const createAssignmentData = (
  id: string,
  shipmentType: string,
  assignmentStage: string,
  defaultAssignmentRule: string,
  notes: string,
  action: any
): AssignmentData => {
  return { id, shipmentType, assignmentStage, defaultAssignmentRule, notes, action };
};

export default function DeliveryAssignment() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("desc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "update">("create");
  const [selectedItem, setSelectedItem] = useState<any>(undefined);
  const [count] = useState(1);

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedItem(undefined);
    setIsDrawerOpen(true);
  };

  const handleOpenUpdate = (data: any) => {
    setDrawerMode("update");
    setSelectedItem(data);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const columns = useMemo(() => [
    { id: "shipmentType", label: t("deliveryAssignmentPage.columns.shipmentType"), minWidth: 200, sortable: true },
    { id: "assignmentStage", label: t("deliveryAssignmentPage.columns.assignmentStage"), minWidth: 200, sortable: true },
    { id: "defaultAssignmentRule", label: t("deliveryAssignmentPage.columns.defaultAssignmentRule"), minWidth: 200, sortable: true },
    { id: "notes", label: t("deliveryAssignmentPage.columns.notes"), minWidth: 200, sortable: true },
    { id: "action", label: "", minWidth: 100, sortable: false, align: "right" },
  ], [t]);

  const rows: AssignmentData[] = useMemo(() => {
    const data = [];
    // Mock data from image
    const mocks = [
      "Quis autem vel eum iure",
      "Ut aut reiciendis voluptatibus",
      "Sunt in culpa qui officia",
      "Mollit anim id est laborum",
      "At vero eos et accusamus",
      "Sed ut perspiciatis",
      "Sed ut perspiciatis unde",
      "Nemo enim ipsam voluptatem",
      "Duis aute irure dolor in",
      "Excepteur sint occaecat"
    ];

    for (let i = 0; i < mocks.length; i++) {
      data.push(createAssignmentData(
        `assign-${i}`,
        "Sed ut perspiciatis", // Repeated in image
        mocks[i], // Varying text from image column 2
        "Sed ut perspiciatis", // Repeated in image
        "Quis autem vel eum iure", // Repeated in image
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton size="small" onClick={() => handleOpenUpdate({
            shipmentType: "Sed ut perspiciatis",
            assignmentStage: mocks[i],
            defaultAssignmentRule: "Sed ut perspiciatis",
            note: "Quis autem vel eum iure"
          })}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ));
    }
    return data;
  }, []);

  return (
    <AdminLayout>
      <Box sx={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "24px !important",
        minHeight: "calc(100vh - 120px)",
      }}>
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "24px" }}
        >
          <Typography
            variant="h3"
            sx={{
              color: colors["Gray-900"],
              fontWeight: 600,
              fontSize: "24px",
            }}
          >
            {t("deliveryAssignmentPage.title")}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "100px",
              padding: "10px 24px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: colors["Gray-800"],
              },
            }}
          >
            {t("deliveryAssignmentPage.create")}
          </Button>
        </Stack>

        {/* Search Bar */}
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 3 }}>
          <SearchField
            placeholder={t("deliveryAssignmentPage.search")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors["Gray-500"] }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }}
          />
        </Stack>

        {/* Table Section */}
        <GlobalTable<AssignmentData>
          columns={columns as any}
          rows={rows}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={false} // Image does not show checkboxes in header, but table often has them. Image shows NO checkboxes.
          rowKey="id"
        />
      </Box>

      {/* Drawer */}
      <DeliveryAssignmentDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        initialData={selectedItem}
      />
    </AdminLayout>
  );
}
