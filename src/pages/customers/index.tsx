import { useState, useMemo } from "react";
import type { JSX } from "react";
import {
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

// Helper to create customer with status tracking
const createCustomerWithStatus = (
  userId: string,
  name: string | null,
  registrationDate: string,
  phoneNumber: string | null,
  statusValue: string,
  action: JSX.Element
): CustomerData & { statusValue: string } => {
  return {
    ...createCustomerData(
      userId,
      name,
      registrationDate,
      phoneNumber,
      <StatusBadge status={statusValue} />,
      action
    ),
    statusValue,
  };
};

// Sample data based on image
const sampleCustomers: (CustomerData & { statusValue: string })[] = [
  createCustomerWithStatus("001", "Olivia Rhye", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("002", "Phoenix Baker", "Mar 20, 2025", "+966 9877827388", "Blocked",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("003", "Lana Steiner", "Mar 20, 2025", "+966 9877827388", "Deleted",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("004", "Demi Wilkinson", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("005", "Candice Wu", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("006", "Natali Craig", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("007", "Drew Cano", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("008", "Orlando Diggs", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("009", "Andi Lane", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
  createCustomerWithStatus("010", "Kate Morrison", "Mar 20, 2025", "+966 9877827388", "Active",
    <Stack direction="row" spacing={1}>
      <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
      <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
    </Stack>
  ),
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
