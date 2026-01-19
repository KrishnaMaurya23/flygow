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
import AdminLayout from "../../../layouts/AdminLayout";
import GlobalTable from "../../../components/globaltable";
import GlobalSearch from "../../../components/global-search/GlobalSearch";
import {
  AdminUserColumns,
  createAdminUserData,
  type AdminUserData,
} from "../../../utils/types";
import { colors } from "../../../utils/constants";
import SelectFilter from "../../../components/select-filter/SelectFilter";
import CreateAdminDrawer from "./CreateAdminDrawer";

// Status color function for Admin Users
const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "active":
      return { color: colors["Success-600"], bg: colors["Success-50"] };
    case "blocked":
      return { color: colors["Warning-600"], bg: colors["Warning-50"] };
    case "deleted":
      return { color: colors["Error-600"], bg: colors["Error-50"] };
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

// Helper to create admin user with status tracking
const createAdminWithStatus = (
  _id: string,
  name: string,
  email: string,
  role: string,
  createdAt: string,
  statusValue: string,
  action: JSX.Element
): AdminUserData & { statusValue: string } => {
  return {
    ...createAdminUserData(
      _id,
      name,
      email,
      role,
      createdAt,
      <StatusBadge status={statusValue} />,
      action
    ),
    statusValue,
  };
};

export default function AdminUsers() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("desc");
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [count] = useState(100);

  // Sample data based on image
  const sampleAdminUsers: (AdminUserData & { statusValue: string })[] = useMemo(() => [
    createAdminWithStatus("001", "Olivia Rhye", "olivia@untitledui.com", "Super Admin", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("002", "Phoenix Baker", "phoenix@untitledui.com", "Content Moderator", "2025-05-01 11:00 AM UTC", "Blocked",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("003", "Lana Steiner", "lana@untitledui.com", "Content Moderator", "2025-05-01 11:00 AM UTC", "Deleted",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("004", "Demi Wilkinson", "demi@untitledui.com", "Super Admin", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("005", "Candice Wu", "candice@untitledui.com", "Content Moderator", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("006", "Natali Craig", "natali@untitledui.com", "Marketing", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("007", "Drew Cano", "drew@untitledui.com", "Compliance Officer", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("008", "Orlando Diggs", "orlando@untitledui.com", "Support Desk", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("009", "Andi Lane", "andi@untitledui.com", "Support Desk", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createAdminWithStatus("010", "Kate Morrison", "kate@untitledui.com", "Support Desk", "2025-05-01 11:00 AM UTC", "Active",
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
  ], []);

  const filteredAdmins = useMemo(() => {
    let filtered = sampleAdminUsers;

    if (search) {
      filtered = filtered.filter(
        (admin) =>
          admin._id.toLowerCase().includes(search.toLowerCase()) ||
          admin.name.toLowerCase().includes(search.toLowerCase()) ||
          admin.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((admin) => admin.statusValue === statusFilter);
    }

    if (roleFilter !== "All") {
      filtered = filtered.filter((admin) => admin.role === roleFilter);
    }

    return filtered;
  }, [search, statusFilter, roleFilter, sampleAdminUsers]);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

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
            {t("adminUsersTable.title")}
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
            {t("adminUsersTable.create")}
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
              placeholder={t("buttons.search")}
              isIconFront={true}
            />
          </Box>
          <Box sx={{ width: "160px" }}>
            <SelectFilter
              title={`${t("labels.status")}:All`}
              filterList={[
                { title: t("active"), value: "Active" },
                { title: t("blocked"), value: "Blocked" },
                { title: t("deleted"), value: "Deleted" },
              ]}
              setFilter={setStatusFilter}
              setPage={setPage}
            />
          </Box>
          <Box sx={{ width: "160px" }}>
            <SelectFilter
              title={`${t("adminUsersTable.role")}:All`}
              filterList={[
                { title: t("superAdmin"), value: "Super Admin" },
                { title: t("contentModerator"), value: "Content Moderator" },
                { title: t("marketing"), value: "Marketing" },
                { title: t("complianceOfficer"), value: "Compliance Officer" },
                { title: t("supportDesk"), value: "Support Desk" },
              ]}
              setFilter={setRoleFilter}
              setPage={setPage}
            />
          </Box>
        </Stack>

        {/* Table Section */}
        <GlobalTable<AdminUserData>
          columns={AdminUserColumns}
          rows={filteredAdmins as AdminUserData[]}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={true}
          rowKey="_id"
        />
      </Box>

      {/* Create Admin Drawer */}
      <CreateAdminDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </AdminLayout>
  );
}
