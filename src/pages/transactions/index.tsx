import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import GlobalSearch from "../../components/global-search/GlobalSearch";
import {
  TransactionColumns,
  type TransactionData,
} from "../../utils/types";
import { colors } from "../../utils/constants";
import SelectFilter from "../../components/select-filter/SelectFilter";

// Status color function for Transactions
const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "successful":
      return { color: colors["Success-600"] };
    case "pending":
      return { color: colors["Warning-600"] };
    case "failed":
      return { color: colors["Error-600"] };
    default:
      return { color: colors["Gray-600"] };
  }
};

// Status badge component (Dot style as per image)
const StatusBadge = ({ status }: { status: string }) => {
  const { color } = getStatusColor(status);
  const { t } = useTranslation();

  let label = "";
  if (status.toLowerCase() === "successful") label = t("successful");
  else if (status.toLowerCase() === "pending") label = t("pending");
  else if (status.toLowerCase() === "failed") label = t("failed");

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "fit-content" }}>
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
      <Typography sx={{ color, fontSize: "14px", fontWeight: 400 }}>
        {label}
      </Typography>
    </Stack>
  );
};

// Helper to create transaction with status tracking and styling
const createTransactionStyled = (
  transactionId: string,
  name: string,
  paymentType: string,
  amount: string,
  vat: string,
  dateOfPayment: string,
  statusValue: string
): TransactionData & { statusValue: string; _transactionIdRaw: string; _nameRaw: string } => {
  return {
    transactionId: (
      <Typography sx={{ color: colors["Gray-500"], fontSize: "14px" }}>
        {transactionId}
      </Typography>
    ),
    name: (
      <Typography sx={{ fontWeight: 600, color: colors["Gray-900"], fontSize: "14px" }}>
        {name}
      </Typography>
    ),
    paymentType: (
      <Typography sx={{ color: colors["Gray-900"], fontSize: "14px" }}>
        {paymentType}
      </Typography>
    ),
    amount: (
      <Typography sx={{ color: colors["Gray-900"], fontSize: "14px" }}>
        {amount}
      </Typography>
    ),
    vat: <Typography sx={{ color: colors["Gray-900"], fontSize: "14px" }}>{vat}</Typography>,
    dateOfPayment: (
      <Typography sx={{ color: colors["Gray-900"], fontSize: "14px" }}>
        {dateOfPayment}
      </Typography>
    ),
    status: <StatusBadge status={statusValue} />,
    statusValue,
    _transactionIdRaw: transactionId,
    _nameRaw: name,
  };
};

export default function Transactions() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<string>("desc");
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [count] = useState(10); // Based on image showing 10 rows

  // Sample data based on image
  const sampleTransactions = useMemo(() => [
    createTransactionStyled("32455466", "Olivia Rhye", "Credit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Successful"),
    createTransactionStyled("32455466", "Phoenix Baker", "Credit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Pending"),
    createTransactionStyled("32455466", "Lana Steiner", "Credit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Successful"),
    createTransactionStyled("32455466", "Demi Wilkinson", "Debit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Successful"),
    createTransactionStyled("32455466", "Candice Wu", "Debit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Failed"),
    createTransactionStyled("32455466", "Natali Craig", "Credit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Successful"),
    createTransactionStyled("32455466", "Drew Cano", "Refund", "- SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Successful"),
    createTransactionStyled("32455466", "Orlando Diggs", "Debit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Successful"),
    createTransactionStyled("32455466", "Andi Lane", "Credit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Failed"),
    createTransactionStyled("32455466", "Kate Morrison", "Debit Card", "SAR 32", "SAR 2", "12 Apr 2024, 06:00pm", "Pending"),
  ], [t]);

  const filteredTransactions = useMemo(() => {
    let filtered = sampleTransactions;

    if (search) {
      filtered = filtered.filter(
        (tr) =>
          tr._transactionIdRaw.toLowerCase().includes(search.toLowerCase()) ||
          tr._nameRaw.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((tr) => tr.statusValue === statusFilter);
    }

    return filtered;
  }, [search, statusFilter, sampleTransactions]);

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
            {t("transactionsPage.title")}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
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
                  { title: t("successful"), value: "Successful" },
                  { title: t("pending"), value: "Pending" },
                  { title: t("failed"), value: "Failed" },
                ]}
                setFilter={setStatusFilter}
                setPage={setPage}
              />
            </Box>
            <Button
              variant="contained"
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
              {t("buttons.export")}
            </Button>
          </Stack>
        </Stack>

        {/* Table Section */}
        <GlobalTable<TransactionData>
          columns={TransactionColumns}
          rows={filteredTransactions as TransactionData[]}
          page={page}
          setPage={setPage}
          count={count}
          order={order}
          setOrder={setOrder}
          enableCheckbox={false}
          rowKey="_transactionIdRaw"
        />
      </Box>
    </AdminLayout>
  );
}
