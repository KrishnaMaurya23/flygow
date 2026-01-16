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
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import GlobalSearch from "../../components/global-search/GlobalSearch";
import {
  ShipmentColumns,
  createShipmentData,
  type ShipmentData,
} from "../../utils/types";
import { colors } from "../../utils/constants";

// Shared status color function - used by both StatusBadge and filter chips
const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase().replace(/\s+/g, "-");
  switch (normalized) {
    case "delivered":
      return { color: colors["Success-600"], bg: colors["Success-50"] };
    case "picked-up":
    case "picked up":
      return { color: colors["Warning-600"], bg: colors["Warning-50"] };
    case "in-transit":
      return { color: colors["Primary-600"], bg: colors["Primary-50"] };
    case "out-for-delivery":
    case "out for delivery":
      return { color: colors["Primary-700"], bg: colors["Primary-100"] };
    case "order-confirmed":
    case "order confirmed":
      return { color: colors["Success-500"], bg: colors["Success-50"] };
    case "on-hold":
      return { color: colors["Warning-500"], bg: colors["Warning-50"] };
    case "cancelled":
      return { color: colors["Error-600"], bg: colors["Error-50"] };
    default:
      return { color: colors["Gray-600"], bg: colors["Gray-100"] };
  }
};

// Status badge component for shipments
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

// Helper to create shipment with status tracking
const createShipmentWithStatus = (
  shipmentId: string,
  name: string | null,
  phoneNumber: string | null,
  orderTimeStamp: string,
  packageType: string,
  pickupCity: string,
  dropCity: string,
  statusValue: string,
  action: JSX.Element
): ShipmentData & { statusValue: string } => {
  return {
    ...createShipmentData(
      shipmentId,
      name,
      phoneNumber,
      orderTimeStamp,
      packageType,
      pickupCity,
      dropCity,
      <StatusBadge status={statusValue} />,
      action
    ),
    statusValue,
  };
};

// Sample data - replace with API call
const sampleShipments: (ShipmentData & { statusValue: string })[] = [
  createShipmentWithStatus(
    "F-y390rks91",
    "Olivia Rhye",
    "+966 9877827388",
    "Mar 20, 2025",
    "Small",
    "Al Mansour",
    "Al Mansour",
    "Delivered",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Phoenix Baker",
    "+966 9877827388",
    "Mar 20, 2025",
    "Medium",
    "Al Mansour",
    "Al Mansour",
    "In-transit",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Lana Steiner",
    "+966 9877827388",
    "Mar 20, 2025",
    "Large",
    "Al Mansour",
    "Al Mansour",
    "Picked Up",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Demi Wilkinson",
    "+966 9877827388",
    "Mar 20, 2025",
    "Small",
    "Al Mansour",
    "Al Mansour",
    "Order Confirmed",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Candice Wu",
    "+966 9877827388",
    "Mar 20, 2025",
    "Medium",
    "Al Mansour",
    "Al Mansour",
    "Out for Delivery",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Natali Craig",
    "+966 9877827388",
    "Mar 20, 2025",
    "Small",
    "Al Mansour",
    "Al Mansour",
    "Cancelled",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Drew Cano",
    "+966 9877827388",
    "Mar 20, 2025",
    "Large",
    "Al Mansour",
    "Al Mansour",
    "On-Hold",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Orlando Diggs",
    "+966 9877827388",
    "Mar 20, 2025",
    "Medium",
    "Al Mansour",
    "Al Mansour",
    "Delivered",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Andi Lane",
    "+966 9877827388",
    "Mar 20, 2025",
    "Small",
    "Al Mansour",
    "Al Mansour",
    "In-transit",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
  createShipmentWithStatus(
    "F-y390rks91",
    "Kate Morrison",
    "+966 9877827388",
    "Mar 20, 2025",
    "Large",
    "Al Mansour",
    "Al Mansour",
    "Picked Up",
    <IconButton size="small">
      <VisibilityIcon fontSize="small" />
    </IconButton>
  ),
];

// Status filter tabs
const statusFilters = [
  { label: "Delivered", count: 20, value: "Delivered" },
  { label: "Picked Up", count: 10, value: "Picked Up" },
  { label: "In-transit", count: 50, value: "In-transit" },
  { label: "Out for Delivery", count: 20, value: "Out for Delivery" },
  { label: "Order Confirmed", count: 20, value: "Order Confirmed" },
  { label: "On-Hold", count: 20, value: "On-Hold" },
  { label: "Cancelled", count: 10, value: "Cancelled" },
];

export default function Shipments() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");
  const [count] = useState(100); // Total count from API

  // Filter shipments based on search
  const filteredShipments = useMemo(() => {
    let filtered = sampleShipments;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (shipment) =>
          shipment.shipmentId.toLowerCase().includes(search.toLowerCase()) ||
          shipment.name?.toLowerCase().includes(search.toLowerCase()) ||
          shipment.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
          shipment.pickupCity.toLowerCase().includes(search.toLowerCase()) ||
          shipment.dropCity.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search]);

  return (
    <AdminLayout>
      <Box sx={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "24px !important",
      }}>
        {/* Page Heading and Search in same container */}
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
            Shipments
          </Typography>
          <Box
            sx={{
              width: "376px",
              "& > div": {
                width: "100%",
                height: "44px",
              },
            }}
          >
            <GlobalSearch
              setSearchQuery={setSearch}
              placeholder="Search"
              isIconFront={true}
            />
          </Box>
        </Stack>

        {/* Status Filter Tabs */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "24px", flexWrap: "wrap", gap: 1 }}
        >
          {statusFilters.map((filter) => {
            const { color, bg } = getStatusColor(filter.value);
            return (
              <Chip
                key={filter.value}
                label={`${filter.label} (${filter.count})`}
                sx={{
                  backgroundColor: bg,
                  color: color,
                  fontSize: "14px",
                  height: "36px",
                  fontWeight: 400,
                  pointerEvents: "none",
                }}
              />
            );
          })}
        </Stack>

        {/* Global Table */}
        <GlobalTable<ShipmentData>
          columns={ShipmentColumns}
          rows={filteredShipments as ShipmentData[]}
          page={page}
          setPage={setPage}
          count={count}
          selected={selected}
          setSelected={setSelected}
          order={order}
          setOrder={setOrder}
          enableCheckbox={true}
          rowKey="shipmentId"
          url="/shipments/shipment-details"
        />
      </Box>
    </AdminLayout>
  );
}
