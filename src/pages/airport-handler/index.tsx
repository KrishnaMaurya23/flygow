import { useState, useMemo } from "react";
import type { JSX } from "react";
import {
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import GlobalSearch from "../../components/global-search/GlobalSearch";
import {
  AirportHandlerColumns,
  createAirportHandlerData,
  type AirportHandlerData,
} from "../../utils/types";
import { colors } from "../../utils/constants";
import SelectFilter from "../../components/select-filter/SelectFilter";

// Status color function for Airport Handler
const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "active":
      return { color: colors["Success-600"], bg: colors["Success-50"] };
    case "blocked":
      return { color: colors["Warning-600"], bg: colors["Warning-50"] };
    default:
      return { color: colors["Gray-600"], bg: colors["Gray-100"] };
  }
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const { color, bg } = getStatusColor(status);
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Chip
      label={`• ${displayStatus}`}
      sx={{
        color,
        backgroundColor: bg,
        fontSize: "14px",
        fontWeight: 400,
        height: "24px",
        "& .MuiChip-label": {
          padding: "0 8px",
        },
      }}
    />
  );
};

// Helper to create airport handler with status tracking
const createAirportHandlerWithStatus = (
  userId: string,
  accountName: string | null,
  emailAddress: string | null,
  location: string,
  locationId: string,
  lastLogin: string,
  statusValue: string,
  action: JSX.Element
): AirportHandlerData & { statusValue: string } => {
  return {
    ...createAirportHandlerData(
      userId,
      accountName,
      emailAddress,
      location,
      locationId,
      lastLogin,
      <StatusBadge status={statusValue} />,
      action
    ),
    statusValue,
  };
};

// Sample data based on image
const sampleHandlers: (AirportHandlerData & { statusValue: string })[] = [
  createAirportHandlerWithStatus("001", "Olivia Rhye", "olivia@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("002", "Phoenix Baker", "phoenix@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Blocked",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("003", "Lana Steiner", "lana@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Blocked",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("004", "Demi Wilkinson", "demi@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("005", "Candice Wu", "candice@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("006", "Natali Craig", "natali@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("007", "Drew Cano", "drew@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("008", "Orlando Diggs", "orlando@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("009", "Andi Lane", "andi@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createAirportHandlerWithStatus("010", "Kate Morrison", "kate@untitledui.com", "Saudi Arabia", "#SAU-11", "10/09/2025, 10:00:00 GMT+3", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
];

import CreateAccountDrawer from "./CreateAccountDrawer";

export default function AirportHandler() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [count] = useState(100);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const filteredHandlers = useMemo(() => {
    let filtered = sampleHandlers;

    if (search) {
      filtered = filtered.filter(
        (handler) =>
          handler.userId.toLowerCase().includes(search.toLowerCase()) ||
          handler.accountName?.toLowerCase().includes(search.toLowerCase()) ||
          handler.emailAddress?.toLowerCase().includes(search.toLowerCase()) ||
          handler.location.toLowerCase().includes(search.toLowerCase()) ||
          handler.locationId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((handler) => handler.statusValue === statusFilter);
    }

    if (locationFilter !== "All") {
      filtered = filtered.filter((handler) => handler.location === locationFilter);
    }

    return filtered;
  }, [search, statusFilter, locationFilter]);

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
            {t("airportHandlerAccounts.title")}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDrawer}
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
            {t("airportHandlerAccounts.createAccount")}
          </Button>
        </Stack>

        {/* Filters Section */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: "24px" }}
        >
          <Box sx={{ width: "320px" }}>
            <GlobalSearch
              setSearchQuery={setSearch}
              placeholder="Search"
              isIconFront={true}
            />
          </Box>
          <Box sx={{ width: "160px" }}>
            <SelectFilter
              title={`Status: ${statusFilter}`}
              filterList={[
                { title: "All", value: "All" },
                { title: "Active", value: "Active" },
                { title: "Blocked", value: "Blocked" },
              ]}
              setFilter={setStatusFilter}
              setPage={setPage}
            />
          </Box>
          <Box sx={{ width: "160px" }}>
            <SelectFilter
              title={`Location: ${locationFilter}`}
              filterList={[
                { title: "All", value: "All" },
                { title: "Saudi Arabia", value: "Saudi Arabia" },
              ]}
              setFilter={setLocationFilter}
              setPage={setPage}
            />
          </Box>
        </Stack>

        {/* Table Section */}
        <GlobalTable<AirportHandlerData>
          columns={AirportHandlerColumns}
          rows={filteredHandlers as AirportHandlerData[]}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={true}
          rowKey="userId"
        />
      </Box>

      {/* Create Account Drawer */}
      <CreateAccountDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </AdminLayout>
  );
}
