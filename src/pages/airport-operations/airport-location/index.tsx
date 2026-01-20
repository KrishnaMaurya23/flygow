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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Using PersonOutline as mock for the user icon
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../../layouts/AdminLayout";
import GlobalTable from "../../../components/globaltable";
import { colors } from "../../../utils/constants";
import AirportLocationDrawer from "./AirportLocationDrawer";
import StatusChip from "../../../components/status-chip";

// Custom styled search field
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

// Custom status filter dropdown
const StatusFilterSelect = styled(Select)(() => ({
  borderRadius: "100px",
  backgroundColor: colors["Primary-50"], // Light blue background like in image
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

interface LocationData {
  id: string; // Unique ID for table
  locationId: string;
  locationCity: string;
  locationName: string;
  supervisor: string;
  supervisorContact: string;
  status: any; // Rendered component
  action: any; // Rendered component
}

const createLocationData = (
  id: string,
  locationId: string,
  locationCity: string,
  locationName: string,
  supervisor: string,
  supervisorContact: string,
  status: any,
  action: any
): LocationData => {
  return { id, locationId, locationCity, locationName, supervisor, supervisorContact, status, action };
};

export default function AirportLocation() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("desc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "update">("create");
  const [selectedLocation, setSelectedLocation] = useState<any>(undefined);
  const [count] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedLocation(undefined);
    setIsDrawerOpen(true);
  };

  const handleOpenUpdate = (data: any) => {
    setDrawerMode("update");
    setSelectedLocation(data);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const columns = useMemo(() => [
    { id: "locationId", label: t("airportLocationPage.columns.locationId"), minWidth: 120, sortable: true },
    { id: "locationCity", label: t("airportLocationPage.columns.locationCity"), minWidth: 150, sortable: true },
    { id: "locationName", label: t("airportLocationPage.columns.locationName"), minWidth: 250, sortable: true },
    { id: "supervisor", label: t("airportLocationPage.columns.supervisor"), minWidth: 150, sortable: true },
    { id: "supervisorContact", label: t("airportLocationPage.columns.supervisorContact"), minWidth: 180, sortable: false },
    { id: "status", label: t("airportLocationPage.columns.status"), minWidth: 120, sortable: false },
    { id: "action", label: "", minWidth: 100, sortable: false, align: "right" },
  ], [t]);

  // Mock Data
  const rows: LocationData[] = useMemo(() => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      const isActive = i === 0 || i > 5; // First and last few active
      const statusLabel = isActive ? "Active" : "In-active";
      const statusType = isActive ? "active" : "inactive"; // Assuming StatusChip supports these or similar

      // Need to check StatusChip supported types. 
      // Based on typical usage: 'active', 'blocked' (red), etc.
      // Let's use 'active' and 'inactive' (or 'blocked' if needed).
      // Let's assume StatusChip handles display label internally or we pass it?
      // Usually StatusChip takes a status string and maps it to color/label.
      // If StatusChip is simple, maybe just passing children?
      // Checking StatusChip usage elsewhere might be good, but for now assuming standard prop `status`

      const rowData = {
        locationId: "123455",
        locationCity: "Riyadh",
        locationName: "King Abdulaziz International Airport (JED)",
        supervisor: "Atif Aslam",
        supervisorContact: "+966 9877827388",
      };

      data.push(createLocationData(
        `loc-${i}`,
        rowData.locationId,
        rowData.locationCity,
        rowData.locationName,
        rowData.supervisor,
        rowData.supervisorContact,
        // <StatusChip status={isActive ? "active" : "blocked"} />, // Mocking blocked as orange/inactive if needed
        // Actually let's just use a Box for now to match exact design if StatusChip differs
        // Image shows Green 'Active' and Orange 'In-active'
        isActive ? (
          <Box sx={{
            backgroundColor: colors["Success-50"],
            color: colors["Success-700"],
            borderRadius: "100px",
            padding: "4px 12px",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: 500
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors["Success-500"], marginRight: "8px" }} />
            Active
          </Box>
        ) : (
          <Box sx={{
            backgroundColor: colors["Warning-50"],
            color: colors["Warning-700"],
            borderRadius: "100px",
            padding: "4px 12px",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: 500
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors["Warning-500"], marginRight: "8px" }} />
            In-active
          </Box>
        ),
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton size="small" onClick={() => handleOpenUpdate(rowData)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <PersonOutlineIcon fontSize="small" />
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
            {t("airportLocationPage.title")}
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
            {t("airportLocationPage.create")}
          </Button>
        </Stack>

        {/* Search & Filter Bar */}
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <SearchField
            placeholder={t("airportLocationPage.search")}
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
              return `${t("airportLocationPage.status")}: ${selected === 'all' ? t("airportLocationPage.all") : selected}`;
            }}
          >
            <MenuItem value="all">{t("airportLocationPage.all")}</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">In-active</MenuItem>
          </StatusFilterSelect>
        </Stack>

        {/* Table Section */}
        <GlobalTable<LocationData>
          columns={columns as any}
          rows={rows}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={true}
          rowKey="id"
        />
      </Box>

      {/* Drawer */}
      <AirportLocationDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        initialData={selectedLocation}
      />
    </AdminLayout>
  );
}
