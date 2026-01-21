import { useState, useMemo } from "react";
import type { JSX } from "react";
import {
    Typography,
    Box,
    Stack,
    IconButton,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import GlobalSearch from "../../components/global-search/GlobalSearch";
import { colors } from "../../utils/constants";
import SelectFilter from "../../components/select-filter/SelectFilter";
import CancellationPolicyDrawer from "./CancellationPolicyDrawer";

interface CancellationPolicyData {
    id: string;
    deliveryStage: string;
    description: string;
    penalty: string;
    action: JSX.Element;
}

const createPolicyData = (
    id: string,
    deliveryStage: string,
    description: string,
    penalty: string,
    action: JSX.Element
): CancellationPolicyData => ({
    id,
    deliveryStage,
    description,
    penalty,
    action,
});

export default function CancellationPolicy() {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<string>("desc");
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
    const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
    const [count] = useState(5);

    const columns = useMemo(() => [
        { id: "deliveryStage", label: t("cancellationPolicyPage.deliveryStage"), minWidth: 200, sortable: false },
        { id: "description", label: t("cancellationPolicyPage.description"), minWidth: 350, sortable: false },
        { id: "penalty", label: t("cancellationPolicyPage.penalty"), minWidth: 150, sortable: false },
        { id: "action", label: "", minWidth: 100, sortable: false },
    ], [t]);

    const handleOpenAdd = () => {
        setDrawerMode("add");
        setSelectedPolicy(null);
        setIsDrawerOpen(true);
    };

    const handleOpenEdit = (policy: any) => {
        setDrawerMode("edit");
        setSelectedPolicy(policy);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => setIsDrawerOpen(false);

    const handleDelete = (id: string) => {
        console.log("Delete policy:", id);
        // Implement delete logic
    };

    // Sample data based on image
    const samplePolicies: CancellationPolicyData[] = useMemo(() => [
        createPolicyData(
            "001",
            t("cancellationPolicyPage.stages.orderConfirmed"),
            "No Penalty for cancellation",
            t("cancellationPolicyPage.noPenalty"),
            <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => handleOpenEdit({
                    id: "001",
                    stage: "orderConfirmed",
                    description: "No Penalty for cancellation",
                    penaltyType: "none",
                    allowCancellation: true
                })}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete("001")}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
        createPolicyData(
            "002",
            t("cancellationPolicyPage.stages.pickedUpByPartner"),
            "A cancellation fee will be applied as your order has already been picked up",
            "SAR 20",
            <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => handleOpenEdit({
                    id: "002",
                    stage: "pickedUpByPartner",
                    description: "A cancellation fee will be applied as your order has already been picked up",
                    penaltyType: "fixedAmountPlusPercentage",
                    fixedAmount: "20",
                    percentage: "",
                    allowCancellation: true
                })}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete("002")}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
        createPolicyData(
            "003",
            t("cancellationPolicyPage.stages.arrivedAtPickupAirport"),
            "25% of the order total will be charged for cancellation",
            "SAR 25%",
            <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => handleOpenEdit({
                    id: "003",
                    stage: "arrivedAtPickupAirport",
                    description: "25% of the order total will be charged for cancellation",
                    penaltyType: "percentage",
                    percentage: "25",
                    allowCancellation: true
                })}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete("003")}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
        createPolicyData(
            "004",
            t("cancellationPolicyPage.stages.arrivedAtDestinationAirport"),
            "A penalty of SAR 50 or 10% of the order total, whichever is freater, will be charged",
            "SAR 50% OR 10%",
            <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => handleOpenEdit({
                    id: "004",
                    stage: "arrivedAtDestinationAirport",
                    description: "A penalty of SAR 50 or 10% of the order total, whichever is freater, will be charged",
                    penaltyType: "fixedAmountPlusPercentage",
                    fixedAmount: "50",
                    percentage: "10",
                    allowCancellation: true
                })}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete("004")}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
        createPolicyData(
            "005",
            t("cancellationPolicyPage.stages.deliveredToRecipient"),
            "No Penalty for cancellation",
            "no Penalty",
            <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => handleOpenEdit({
                    id: "005",
                    stage: "deliveredToRecipient",
                    description: "No Penalty for cancellation",
                    penaltyType: "none",
                    allowCancellation: false
                })}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete("005")}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
    ], [t]);

    const filteredPolicies = useMemo(() => {
        let filtered = samplePolicies;

        if (search) {
            filtered = filtered.filter(
                (policy) =>
                    policy.deliveryStage.toLowerCase().includes(search.toLowerCase()) ||
                    policy.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        return filtered;
    }, [search, samplePolicies]);

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
                        {t("cancellationPolicyPage.title")}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAdd}
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
                        {t("cancellationPolicyPage.addPolicy")}
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
                            placeholder={t("cancellationPolicyPage.search")}
                            isIconFront={true}
                        />
                    </Box>
                    <Box sx={{ width: "160px" }}>
                        <SelectFilter
                            title={`${t("cancellationPolicyPage.status")}:${t("cancellationPolicyPage.all")}`}
                            filterList={[
                                { title: t("active"), value: "Active" },
                                { title: t("inactive"), value: "Inactive" },
                            ]}
                            setFilter={setStatusFilter}
                            setPage={setPage}
                        />
                    </Box>
                </Stack>

                {/* Table Section */}
                <GlobalTable<CancellationPolicyData>
                    columns={columns as any}
                    rows={filteredPolicies}
                    page={page}
                    setPage={setPage}
                    count={count}
                    selected={selected}
                    setSelected={setSelected}
                    order={order}
                    setOrder={setOrder}
                    enableCheckbox={false}
                    rowKey="id"
                />
            </Box>

            {/* Cancellation Policy Drawer */}
            <CancellationPolicyDrawer
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                mode={drawerMode}
                initialData={selectedPolicy}
            />
        </AdminLayout>
    );
}
