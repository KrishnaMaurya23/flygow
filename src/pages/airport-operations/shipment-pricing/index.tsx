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
  MenuItem,
  Select
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline"; // Assuming delete icon based on Image 1
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../../layouts/AdminLayout";
import GlobalTable from "../../../components/globaltable";
import { colors } from "../../../utils/constants";
import ShipmentPricingDrawer from "./ShipmentPricingDrawer";

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

// Reusing the Status Filter style from previous page
const StatusFilterSelect = styled(Select)(() => ({
  borderRadius: "100px",
  backgroundColor: colors["Primary-50"],
  color: colors["Primary-700"],
  height: "40px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: colors["Primary-700"],
  },
  "& .MuiSelect-select": {
    paddingRight: "32px !important",
    fontWeight: 500,
  }
}));

interface PricingData {
  id: string;
  sourceCity: string;
  airportLocation: string;
  destinationCity: string;
  totalPrice: string;
  action: any;
}

const createPricingData = (
  id: string,
  sourceCity: string,
  airportLocation: string,
  destinationCity: string,
  totalPrice: string,
  action: any
): PricingData => {
  return { id, sourceCity, airportLocation, destinationCity, totalPrice, action };
};

export default function ShipmentPricing() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("desc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Note: The UI "Create Shipment Price" drawer seems to be for creating a NEW configuration.
  // The "Edit" might pre-fill existing data.
  const [drawerMode, setDrawerMode] = useState<"create" | "update">("create");
  const [selectedItem, setSelectedItem] = useState<any>(undefined);
  const [count] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedItem(undefined);
    setIsDrawerOpen(true);
  };

  const handleOpenUpdate = (data: any) => {
    setDrawerMode("update");
    setSelectedItem(data); // In real app, this would pass the specific pricing/route object
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const columns = useMemo(() => [
    { id: "sourceCity", label: t("shipmentPricingPage.columns.sourceCity"), minWidth: 150, sortable: true },
    { id: "airportLocation", label: t("shipmentPricingPage.columns.airportLocation"), minWidth: 150, sortable: true },
    { id: "destinationCity", label: t("shipmentPricingPage.columns.destinationCity"), minWidth: 150, sortable: true },
    { id: "totalPrice", label: t("shipmentPricingPage.columns.totalPrice"), minWidth: 150, sortable: true },
    { id: "action", label: "", minWidth: 100, sortable: false, align: "right" },
  ], [t]);

  const rows: PricingData[] = useMemo(() => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      // Mock data appearing in image: Jeddah -> Jeddah -> Riyadh -> SAR 20
      // Wait, "Airport Location" column has "Jeddah"? Maybe it means "Jeddah Airport"?
      // The image shows "Jeddah" in Source, "Jeddah" in Airport Location??
      // That seems redundant or maybe it's just the city name of the airport location.
      // Let's copy the image exactly: Source City "Jeddah", Airport Location "Jeddah", Destination City "Riyadh".

      data.push(createPricingData(
        `price-${i}`,
        "Jeddah",
        "Jeddah", // Matches image 1
        "Riyadh",
        "SAR 20",
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton size="small" onClick={() => handleOpenUpdate({})}>
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
            {t("shipmentPricingPage.title")}
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
            {t("shipmentPricingPage.create")}
          </Button>
        </Stack>

        {/* Search & Filter Bar */}
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <SearchField
            placeholder={t("shipmentPricingPage.search")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors["Gray-500"] }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: "240px" }}
          />
          <StatusFilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as string)}
            displayEmpty
            renderValue={(selected: any) => {
              return `${t("shipmentPricingPage.status")}: ${selected === 'all' ? t("shipmentPricingPage.all") : selected}`;
            }}
          >
            <MenuItem value="all">{t("shipmentPricingPage.all")}</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">In-active</MenuItem>
          </StatusFilterSelect>
        </Stack>

        {/* Table Section */}
        <GlobalTable<PricingData>
          columns={columns as any}
          rows={rows}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={false} // Image 1 does NOT show checkboxes
          rowKey="id"
        />
      </Box>

      {/* Drawer */}
      <ShipmentPricingDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        initialData={selectedItem}
      />
    </AdminLayout>
  );
}
