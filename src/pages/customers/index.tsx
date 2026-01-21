import { useState, useMemo } from "react";
import type { JSX } from "react";
import {
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import GlobalSearch from "../../components/global-search/GlobalSearch";
import {
  CustomerColumns,
  createCustomerData,
  type CustomerData,
} from "../../utils/types";
import { colors } from "../../utils/constants";
import SelectFilter from "../../components/select-filter/SelectFilter";
import GlobalDialog from "../../components/dialog";
import CommonActionDialog from "../../components/dialog/dialog-content/CommonActionDialog";

// Status color function for Customers
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

// Status badge component for Customers
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

// Customer Actions Component with Menu and Dialogs
const CustomerActions = ({ userId, status }: { userId: string; status: string }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogType, setDialogType] = useState<"block" | "delete" | "reactivate" | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = (type: "block" | "delete" | "reactivate") => {
    setDialogType(type);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogType(null);
  };

  const handleConfirm = (data: any) => {
    console.log(`Confirmed ${dialogType} for user ${userId}:`, data);
    handleDialogClose();
  };

  const dialogContent = () => {
    if (!dialogType) return <></>;

    const config = {
      block: {
        title: t("customerPage.dialogs.block.title"),
        subtitle: t("customerPage.dialogs.block.subtitle"),
        reason: t("customerPage.dialogs.block.reasonLabel"),
      },
      delete: {
        title: t("customerPage.dialogs.delete.title"),
        subtitle: t("customerPage.dialogs.delete.subtitle"),
        reason: t("customerPage.dialogs.delete.reasonLabel"),
      },
      reactivate: {
        title: t("customerPage.dialogs.reactivate.title"),
        subtitle: t("customerPage.dialogs.reactivate.subtitle"),
        reason: t("customerPage.dialogs.reactivate.reasonLabel"),
      },
    }[dialogType];

    return (
      <CommonActionDialog
        title={config.title}
        subtitle={config.subtitle}
        reason={config.reason}
        placeholder={t("customerPage.dialogs.placeholder")}
        handleCancel={handleDialogClose}
        onSubmit={handleConfirm}
      />
    );
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
        <MenuItem onClick={(e) => {
          e.stopPropagation();
          handleDialogOpen("reactivate");
        }}>
          <Typography fontSize="14px" color={colors["Gray-700"]}>{t("customerPage.menu.reactivate")}</Typography>
        </MenuItem>
        <MenuItem onClick={(e) => {
          e.stopPropagation();
          handleDialogOpen("block");
        }}>
          <Typography fontSize="14px" color={colors["Gray-700"]}>{t("customerPage.menu.block")}</Typography>
        </MenuItem>
        <MenuItem onClick={(e) => {
          e.stopPropagation();
          handleDialogOpen("delete");
        }}>
          <Typography fontSize="14px" color={colors["Error-600"]}>{t("customerPage.menu.delete")}</Typography>
        </MenuItem>
      </Menu>

      <div onClick={(e) => e.stopPropagation()}>
        <GlobalDialog
          open={!!dialogType}
          handleClose={handleDialogClose}
          component={dialogContent()}
        />
      </div>
    </>
  );
};

// Helper to create customer with status tracking
const createCustomerWithStatus = (
  userId: string,
  name: string | null,
  registrationDate: string,
  phoneNumber: string | null,
  statusValue: string,
): CustomerData & { statusValue: string } => {
  return {
    ...createCustomerData(
      userId,
      name,
      registrationDate,
      phoneNumber,
      <StatusBadge status={statusValue} />,
      // Render Actions
      <Stack direction="row" spacing={1}>
        <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
        <CustomerActions userId={userId} status={statusValue} />
      </Stack>
    ),
    statusValue,
  };
};

// Sample data based on image
const sampleCustomers: (CustomerData & { statusValue: string })[] = [
  createCustomerWithStatus("001", "Olivia Rhye", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("002", "Phoenix Baker", "Mar 20, 2025", "+966 9877827388", "Blocked"),
  createCustomerWithStatus("003", "Lana Steiner", "Mar 20, 2025", "+966 9877827388", "Deleted"),
  createCustomerWithStatus("004", "Demi Wilkinson", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("005", "Candice Wu", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("006", "Natali Craig", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("007", "Drew Cano", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("008", "Orlando Diggs", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("009", "Andi Lane", "Mar 20, 2025", "+966 9877827388", "Active"),
  createCustomerWithStatus("010", "Kate Morrison", "Mar 20, 2025", "+966 9877827388", "Active"),
];

export default function Customers() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [count] = useState(100);

  const filteredCustomers = useMemo(() => {
    let filtered = sampleCustomers;

    if (search) {
      filtered = filtered.filter(
        (customer) =>
          customer.userId.toLowerCase().includes(search.toLowerCase()) ||
          customer.name?.toLowerCase().includes(search.toLowerCase()) ||
          customer.phoneNumber?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((customer) => customer.statusValue === statusFilter);
    }

    return filtered;
  }, [search, statusFilter]);

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
            Customers
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: "320px" }}>
              <GlobalSearch
                setSearchQuery={setSearch}
                placeholder="Search"
                isIconFront={true}
              />
            </Box>
            <Box sx={{ width: "160px" }}>
              <SelectFilter
                title="Status:All"
                filterList={[
                  { title: "Active", value: "Active" },
                  { title: "Blocked", value: "Blocked" },
                  { title: "Deleted", value: "Deleted" },
                ]}
                setFilter={setStatusFilter}
                setPage={setPage}
              />
            </Box>
          </Stack>
        </Stack>

        {/* Table Section */}
        <GlobalTable<CustomerData>
          columns={CustomerColumns}
          rows={filteredCustomers as CustomerData[]}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={true}
          rowKey="userId"
          url="/customers/customer-details"
        />
      </Box>
    </AdminLayout>
  );
}
