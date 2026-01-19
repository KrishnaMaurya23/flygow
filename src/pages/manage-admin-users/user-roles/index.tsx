import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../../layouts/AdminLayout";
import GlobalTable from "../../../components/globaltable";
import {
  createUserRoleData,
  type UserRoleData,
} from "../../../utils/types";
import { colors } from "../../../utils/constants";
import UserRoleDrawer from "./UserRoleDrawer";

export default function UserRoles() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("desc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "update">("create");
  const [selectedRole, setSelectedRole] = useState<{
    name: string;
    permissions: string[];
  } | undefined>(undefined);

  const [count] = useState(5);

  const columns = useMemo(() => [
    { id: "id", label: t("userRolesPage.roleId"), minWidth: 100, sortable: false },
    { id: "name", label: t("userRolesPage.name"), minWidth: 150, sortable: false },
    { id: "module", label: t("userRolesPage.accessibleModules"), minWidth: 250, sortable: false },
    { id: "users", label: t("userRolesPage.associatedUsers"), minWidth: 150, sortable: true },
    { id: "action", label: "", minWidth: 100, sortable: false },
  ], [t]);

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedRole(undefined);
    setIsDrawerOpen(true);
  };

  const handleOpenUpdate = (role: any) => {
    setDrawerMode("update");
    setSelectedRole({
      name: role.name,
      permissions: role.permissions || [],
    });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  // Sample data based on image
  const sampleUserRoles: UserRoleData[] = useMemo(() => [
    createUserRoleData("001", "Super Admin", "All", "3",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={() => handleOpenUpdate({ name: "Super Admin", permissions: ["personalized-dashboard", "app-users", "user-cohorts", "notification-management", "support-tickets", "audit-reports", "user-login-security-logs", "administration-logs", "data-deletion-logs", "manage-legal-docs", "manage-admin-users", "admin-users", "role-access"] })}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createUserRoleData("002", "Content Moderator", "Content Moderation", "5",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={() => handleOpenUpdate({ name: "Content Moderator", permissions: ["content-moderation"] })}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createUserRoleData("003", "Marketing", "Notifications Management", "3",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={() => handleOpenUpdate({ name: "Marketing", permissions: ["notification-management"] })}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createUserRoleData("004", "Compliance Officer", "Audit Reports", "0",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={() => handleOpenUpdate({ name: "Compliance Officer", permissions: ["audit-reports"] })}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
    createUserRoleData("005", "Support Desk", "Support Tickets", "10",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={() => handleOpenUpdate({ name: "Support Desk", permissions: ["support-tickets"] })}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Stack>
    ),
  ], [t]);

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
            {t("userRolesPage.title")}
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
            {t("userRolesPage.create")}
          </Button>
        </Stack>

        {/* Table Section */}
        <GlobalTable<UserRoleData>
          columns={columns as any}
          rows={sampleUserRoles}
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

      {/* User Role Drawer */}
      <UserRoleDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        initialData={selectedRole}
      />
    </AdminLayout>
  );
}
