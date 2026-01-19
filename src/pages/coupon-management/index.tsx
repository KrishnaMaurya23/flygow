import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import { useState, useMemo } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import { createCouponData, CouponColumns } from "../../utils/types";
import GlobalDrawer from "../../components/drawer";
import AddEditCouponDrawer from "../../components/drawer-content/AddEditCouponDrawer";
import GlobalSearch from "../../components/global-search/GlobalSearch";
import SelectFilter from "../../components/select-filter/SelectFilter";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Chip } from "@mui/material";
import { colors } from "../../utils/constants";

const staticCoupons = [
  {
    id: "1",
    couponCode: "FLY4765",
    couponName: "FLYGO10",
    discountType: "Flat",
    validity: "29 Oct 2025 - 01 Nov 2025",
    usage: "20 users",
    status: "Active",
  },
  {
    id: "2",
    couponCode: "FLY4765",
    couponName: "FLYGO10",
    discountType: "Percentage",
    validity: "29 Oct 2025 - 01 Nov 2025",
    usage: "20 users",
    status: "Expired",
  },
  {
    id: "3",
    couponCode: "FLY4765",
    couponName: "FLYGO10",
    discountType: "Flat",
    validity: "29 Oct 2025 - 01 Nov 2025",
    usage: "20 users",
    status: "Inactive",
  },
  {
    id: "4",
    couponCode: "FLY4765",
    couponName: "FLYGO10",
    discountType: "Percentage",
    validity: "29 Oct 2025 - 01 Nov 2025",
    usage: "20 users",
    status: "Active",
  },
  {
    id: "5",
    couponCode: "FLY4765",
    couponName: "FLYGO10",
    discountType: "Percentage",
    validity: "29 Oct 2025 - 01 Nov 2025",
    usage: "20 users",
    status: "Active",
  },
];

const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "active":
      return { color: colors["Success-700"], bg: colors["Success-50"] };
    case "expired":
      return { color: colors["Gray-700"], bg: colors["Gray-100"] };
    case "inactive":
      return { color: colors["Error-700"], bg: colors["Error-50"] };
    default:
      return { color: colors["Gray-700"], bg: colors["Gray-100"] };
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const { color, bg } = getStatusColor(status);
  return (
    <Chip
      label={`• ${status}`}
      sx={{
        color,
        backgroundColor: bg,
        fontSize: "12px",
        fontWeight: 500,
        height: "24px",
        "& .MuiChip-label": {
          padding: "0 10px",
        },
      }}
    />
  );
};

export default function CouponManagement() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(0);

  const filteredCoupons = useMemo(() => {
    let filtered = staticCoupons;

    if (search) {
      filtered = filtered.filter(
        (coupon) =>
          coupon.couponCode.toLowerCase().includes(search.toLowerCase()) ||
          coupon.couponName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      filtered = filtered.filter((coupon) => coupon.status === status);
    }

    return filtered;
  }, [search, status]);

  const rows = useMemo(() => {
    return filteredCoupons.map((coupon) =>
      createCouponData(
        coupon.couponCode,
        coupon.couponName,
        coupon.discountType,
        coupon.validity,
        coupon.usage,
        <StatusBadge status={coupon.status} />,
        <Stack flexDirection={"row"} gap={1}>
          <IconButton size="small">
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      )
    );
  }, [filteredCoupons]);

  return (
    <AdminLayout>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "24px !important",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Stack
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          <Typography variant="h4" fontWeight={600}>
            Coupon management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDrawer(true)}
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "100px",
              padding: "10px 24px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Create new coupon
          </Button>
        </Stack>

        <Stack
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={2}
        >
          <Box sx={{ width: { xs: "100%", md: "320px" } }}>
            <GlobalSearch
              setSearchQuery={setSearch}
              placeholder="Search by code"
              isIconFront={true}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F3FAFE",
              borderRadius: "100px",
              height: "44px",
              px: "24px !important",
              width: { xs: "100%", md: "auto" }
            }}
          >
            <input
              type="date"
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "16px",
                fontWeight: 500,
                color: "#031C5F",
                fontFamily: "inherit"
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F3FAFE",
              borderRadius: "100px",
              height: "44px",
              px: "24px !important",
              width: { xs: "100%", md: "auto" }
            }}
          >
            <input
              type="date"
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "16px",
                fontWeight: 500,
                color: "#031C5F",
                fontFamily: "inherit"
              }}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "160px" } }}>
            <SelectFilter
              title={`Status: ${status}`}
              filterList={[
                { title: "All", value: "All" },
                { title: "Active", value: "Active" },
                { title: "Inactive", value: "Inactive" },
                { title: "Expired", value: "Expired" },
              ]}
              setFilter={setStatus}
              setPage={setPage}
            />
          </Box>
        </Stack>

        <GlobalTable
          rows={rows}
          columns={CouponColumns}
          enableCheckbox
          rowKey="id"
          page={page}
          setPage={setPage}
        />
      </Box>

      <GlobalDrawer
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
        component={<AddEditCouponDrawer handleClose={() => setOpenDrawer(false)} />}
      />
    </AdminLayout>
  );
}
