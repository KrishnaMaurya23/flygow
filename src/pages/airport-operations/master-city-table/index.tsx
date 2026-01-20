import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  styled
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/EditOutlined"; // Check exact icon
import DeleteIcon from "@mui/icons-material/DeleteOutline"; // Check exact icon
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../../layouts/AdminLayout";
import GlobalTable from "../../../components/globaltable";
import { colors } from "../../../utils/constants";
import CityDrawer from "./CityDrawer";

// Custom styled search field to match image
const SearchField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "100px",
    backgroundColor: colors["Gray-50"], // Light background
    paddingRight: "16px",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none", // Or standard focus ring
      // boxShadow: "0 0 0 2px rgba(0,0,0,0.1)"
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
  },
}));

interface CityData {
  id: string;
  name: string;
  action: any; // React node
}

const createCityData = (id: string, name: string, action: any): CityData => {
  return { id, name, action };
};

export default function MasterCityTable() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]); // Even if checkbox false, table might expect this
  const [order, setOrder] = useState<string>("desc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "update">("create");
  const [selectedCity, setSelectedCity] = useState<{
    name: string;
  } | undefined>(undefined);
  const [count] = useState(1); // Mock count

  const columns = useMemo(() => [
    { id: "name", label: t("masterCityPage.city"), minWidth: 200, sortable: true },
    { id: "action", label: "", minWidth: 100, sortable: false, align: "right" },
  ], [t]);

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedCity(undefined);
    setIsDrawerOpen(true);
  };

  const handleOpenUpdate = (cityName: string) => {
    setDrawerMode("update");
    setSelectedCity({ name: cityName });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  // Mock Data
  const rows: CityData[] = useMemo(() => {
    // Generate some rows like in the image "Riyadh"
    const data = [];
    for (let i = 0; i < 8; i++) {
      data.push(createCityData(
        `city-${i}`,
        "Riyadh",
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton size="small" onClick={() => handleOpenUpdate("Riyadh")}>
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
            {t("masterCityPage.title")}
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
            {t("masterCityPage.create")}
          </Button>
        </Stack>

        {/* Search Bar */}
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 3 }}>
          {/* Note: Image shows search bar on the right? Or full width?
                 Image 1: Search bar is on the right, wide.
                 Wait, Image 1: The search bar is below the header. It seems to be right aligned or taking some width.
                 Let's make it fixed width on the right or full width if simpler.
                 Looking at image again... it looks like it's right aligned, maybe 300px.
              */}
          <SearchField
            placeholder={t("masterCityPage.search")}
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
        <GlobalTable<CityData>
          columns={columns as any}
          rows={rows}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={false} // No checkbox in image
          rowKey="id"
        />
      </Box>

      {/* City Drawer */}
      <CityDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        initialData={selectedCity}
      />
    </AdminLayout>
  );
}
