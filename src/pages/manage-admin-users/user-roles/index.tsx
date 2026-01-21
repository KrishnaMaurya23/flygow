import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
  Menu,
  MenuItem,
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
import GlobalDialog from "../../../components/dialog";
import CommonDialog from "../../../components/dialog/dialog-content/CommonDialog";
import AlertDialog from "../../../components/dialog/dialog-content/AlertDialog";

// User Role Actions Component
const UserRoleActions = ({
  roleId,
  roleName,
  associatedUsers,
  onEdit,
  onDelete
}: {
  roleId: string;
  roleName: string;
  associatedUsers: string;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    onDelete();
  };

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            minWidth: "160px",
            boxShadow: "0px 4px 20px 0px #0000001A",
            borderRadius: "12px",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Typography fontSize="14px" color={colors["Gray-700"]}>{t("userRolesPage.menu.edit")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Typography fontSize="14px" color={colors["Error-600"]}>{t("userRolesPage.menu.delete")}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

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
  const [dialogType, setDialogType] = useState<"delete" | "unableToDelete" | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string; users: string } | null>(null);

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

  const handleDeleteClick = (roleId: string, roleName: string, users: string) => {
    setRoleToDelete({ id: roleId, name: roleName, users });
    // Check if role has associated users (in real app, this would be an API call)
    if (parseInt(users) > 0) {
      setDialogType("unableToDelete");
    } else {
      setDialogType("delete");
    }
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    setRoleToDelete(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting role:", roleToDelete);
    // Perform actual delete operation here
    handleCloseDialog();
  };

  // Sample data based on image
  const sampleUserRoles: UserRoleData[] = useMemo(() => [
    createUserRoleData("001", "Super Admin", "All", "3",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation();
          handleOpenUpdate({ name: "Super Admin", permissions: ["app-users", "user-cohorts", "support-tickets", "audit-reports", "user-login-security-logs", "administration-logs", "data-deletion-logs", "manage-legal-docs", "manage-admin-users", "admin-users", "role-access"] });
        }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <UserRoleActions
          roleId="001"
          roleName="Super Admin"
          associatedUsers="3"
          onEdit={() => handleOpenUpdate({ name: "Super Admin", permissions: ["app-users", "user-cohorts", "support-tickets", "audit-reports", "user-login-security-logs", "administration-logs", "data-deletion-logs", "manage-legal-docs", "manage-admin-users", "admin-users", "role-access"] })}
          onDelete={() => handleDeleteClick("001", "Super Admin", "3")}
        />
      </Stack>
    ),
    createUserRoleData("002", "Content Moderator", "Content Moderation", "5",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation();
          handleOpenUpdate({ name: "Content Moderator", permissions: ["content-moderation"] });
        }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <UserRoleActions
          roleId="002"
          roleName="Content Moderator"
          associatedUsers="5"
          onEdit={() => handleOpenUpdate({ name: "Content Moderator", permissions: ["content-moderation"] })}
          onDelete={() => handleDeleteClick("002", "Content Moderator", "5")}
        />
      </Stack>
    ),
    createUserRoleData("003", "Marketing", "Support & Tickets", "3",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation();
          handleOpenUpdate({ name: "Marketing", permissions: ["support-tickets"] });
        }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <UserRoleActions
          roleId="003"
          roleName="Marketing"
          associatedUsers="3"
          onEdit={() => handleOpenUpdate({ name: "Marketing", permissions: ["support-tickets"] })}
          onDelete={() => handleDeleteClick("003", "Marketing", "3")}
        />
      </Stack>
    ),
    createUserRoleData("004", "Compliance Officer", "Audit Reports", "0",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation();
          handleOpenUpdate({ name: "Compliance Officer", permissions: ["audit-reports"] });
        }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <UserRoleActions
          roleId="004"
          roleName="Compliance Officer"
          associatedUsers="0"
          onEdit={() => handleOpenUpdate({ name: "Compliance Officer", permissions: ["audit-reports"] })}
          onDelete={() => handleDeleteClick("004", "Compliance Officer", "0")}
        />
      </Stack>
    ),
    createUserRoleData("005", "Support Desk", "Support Tickets", "10",
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation();
          handleOpenUpdate({ name: "Support Desk", permissions: ["support-tickets"] });
        }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <UserRoleActions
          roleId="005"
          roleName="Support Desk"
          associatedUsers="10"
          onEdit={() => handleOpenUpdate({ name: "Support Desk", permissions: ["support-tickets"] })}
          onDelete={() => handleDeleteClick("005", "Support Desk", "10")}
        />
      </Stack>
    ),
  ], []);

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

      {/* Delete Confirmation Dialog */}
      <div onClick={(e) => e.stopPropagation()}>
        <GlobalDialog
          open={dialogType === "delete"}
          handleClose={handleCloseDialog}
          component={
            <CommonDialog
              title={t("userRolesPage.dialogs.delete.title")}
              subTitle={t("userRolesPage.dialogs.delete.subtitle")}
              handleCancel={handleCloseDialog}
              handleConfirm={handleConfirmDelete}
            />
          }
        />
      </div>

      {/* Unable to Delete Alert Dialog */}
      <div onClick={(e) => e.stopPropagation()}>
        <GlobalDialog
          open={dialogType === "unableToDelete"}
          handleClose={handleCloseDialog}
          component={
            <AlertDialog
              title={t("userRolesPage.dialogs.unableToDelete.title")}
              subTitle={t("userRolesPage.dialogs.unableToDelete.subtitle")}
              buttonText={t("userRolesPage.dialogs.unableToDelete.button")}
              handleClose={handleCloseDialog}
              isError={true}
            />
          }
        />
      </div>
    </AdminLayout>
  );
}
