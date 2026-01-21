import React, { useState, useEffect } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    styled,
    Switch,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/constants";
import { StyledActionButton } from "../../utils/helper";

const StyledTextField = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "white",
        "& fieldset": {
            borderColor: colors["Gray-200"],
        },
        "&:hover fieldset": {
            borderColor: colors["Gray-300"],
        },
        "&.Mui-focused fieldset": {
            borderColor: colors["Primary-500"],
            borderWidth: "1px",
        },
    },
    "& .MuiInputBase-input": {
        padding: "12px 16px",
        fontSize: "16px",
        color: colors["Gray-900"],
        "&::placeholder": {
            color: colors["Gray-400"],
            opacity: 1,
        },
    },
}));

const StyledSelect = styled(Select)(() => ({
    borderRadius: "8px",
    backgroundColor: "white",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: colors["Gray-200"],
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: colors["Gray-300"],
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: colors["Primary-500"],
        borderWidth: "1px",
    },
    "& .MuiSelect-select": {
        padding: "12px 16px",
        fontSize: "16px",
        color: colors["Gray-900"],
    },
}));

interface CancellationPolicyDrawerProps {
    open: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    initialData?: any;
}

const CancellationPolicyDrawer: React.FC<CancellationPolicyDrawerProps> = ({
    open,
    onClose,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const [deliveryStage, setDeliveryStage] = useState("");
    const [description, setDescription] = useState("");
    const [penaltyType, setPenaltyType] = useState("fixedAmount");
    const [fixedAmount, setFixedAmount] = useState("");
    const [percentage, setPercentage] = useState("");
    const [allowCancellation, setAllowCancellation] = useState(true);

    useEffect(() => {
        if (open && initialData) {
            setDeliveryStage(initialData.stage || "");
            setDescription(initialData.description || "");
            setPenaltyType(initialData.penaltyType || "fixedAmount");
            setFixedAmount(initialData.fixedAmount || "");
            setPercentage(initialData.percentage || "");
            setAllowCancellation(initialData.allowCancellation !== false);
        } else if (open) {
            setDeliveryStage("");
            setDescription("");
            setPenaltyType("fixedAmount");
            setFixedAmount("");
            setPercentage("");
            setAllowCancellation(true);
        }
    }, [open, initialData]);

    const handleSave = () => {
        console.log("Saving policy:", {
            deliveryStage,
            description,
            penaltyType,
            fixedAmount,
            percentage,
            allowCancellation,
        });
        onClose();
    };

    const deliveryStages = [
        { value: "orderConfirmed", label: t("cancellationPolicyPage.stages.orderConfirmed") },
        { value: "pickedUpByPartner", label: t("cancellationPolicyPage.stages.pickedUpByPartner") },
        { value: "arrivedAtPickupAirport", label: t("cancellationPolicyPage.stages.arrivedAtPickupAirport") },
        { value: "arrivedAtDestinationAirport", label: t("cancellationPolicyPage.stages.arrivedAtDestinationAirport") },
        { value: "deliveredToRecipient", label: t("cancellationPolicyPage.stages.deliveredToRecipient") },
    ];

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                zIndex: 1300,
                "& .MuiDrawer-paper": {
                    width: { xs: "100%", sm: "640px" },
                    borderRadius: { sm: "24px 0 0 24px" },
                    backgroundColor: colors["Gray-50"],
                    zIndex: 1300,
                },
            }}
        >
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{ padding: "32px", borderBottom: `1px solid ${colors["Gray-100"]}`, backgroundColor: "white" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography sx={{ fontSize: "28px", fontWeight: 600, color: colors["Gray-900"], mb: 1 }}>
                                {mode === "add" ? t("cancellationPolicyPage.drawer.addTitle") : t("cancellationPolicyPage.drawer.editTitle")}
                            </Typography>
                            <Typography sx={{ fontSize: "16px", color: colors["Gray-500"] }}>
                                {t("cancellationPolicyPage.drawer.subtitle")}
                            </Typography>
                        </Box>
                        <IconButton onClick={onClose} sx={{ color: colors["Gray-500"] }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                    <Stack spacing={3}>
                        {/* Delivery Stage */}
                        <Box>
                            <Typography sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: colors["Gray-700"] }}>
                                {t("cancellationPolicyPage.drawer.deliveryStage")}
                            </Typography>
                            <FormControl fullWidth>
                                <StyledSelect
                                    value={deliveryStage}
                                    onChange={(e) => setDeliveryStage(e.target.value as string)}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        {t("cancellationPolicyPage.drawer.selectStage")}
                                    </MenuItem>
                                    {deliveryStages.map((stage) => (
                                        <MenuItem key={stage.value} value={stage.value}>
                                            {stage.label}
                                        </MenuItem>
                                    ))}
                                </StyledSelect>
                            </FormControl>
                        </Box>

                        {/* Cancellation Description */}
                        <Box>
                            <Typography sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: colors["Gray-700"] }}>
                                {t("cancellationPolicyPage.drawer.cancellationDescription")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                multiline
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t("cancellationPolicyPage.drawer.descriptionPlaceholder")}
                            />
                        </Box>

                        {/* Penalty Type */}
                        <Box>
                            <Typography sx={{ mb: 2, fontSize: "14px", fontWeight: 500, color: colors["Gray-700"] }}>
                                {t("cancellationPolicyPage.drawer.penaltyType")}
                            </Typography>
                            <RadioGroup
                                value={penaltyType}
                                onChange={(e) => setPenaltyType(e.target.value)}
                            >
                                <FormControlLabel
                                    value="fixedAmount"
                                    control={<Radio sx={{ color: colors["Gray-300"], "&.Mui-checked": { color: colors["Primary-500"] } }} />}
                                    label={
                                        <Typography sx={{ fontSize: "14px", color: colors["Gray-700"] }}>
                                            {t("cancellationPolicyPage.drawer.fixedAmount")}
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    value="percentage"
                                    control={<Radio sx={{ color: colors["Gray-300"], "&.Mui-checked": { color: colors["Primary-500"] } }} />}
                                    label={
                                        <Typography sx={{ fontSize: "14px", color: colors["Gray-700"] }}>
                                            {t("cancellationPolicyPage.drawer.percentage")}
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    value="fixedAmountPlusPercentage"
                                    control={<Radio sx={{ color: colors["Gray-300"], "&.Mui-checked": { color: colors["Primary-500"] } }} />}
                                    label={
                                        <Typography sx={{ fontSize: "14px", color: colors["Gray-700"] }}>
                                            {t("cancellationPolicyPage.drawer.fixedAmountPlusPercentage")}
                                        </Typography>
                                    }
                                />
                            </RadioGroup>
                        </Box>

                        {/* Amount/Percentage Fields */}
                        {(penaltyType === "fixedAmount" || penaltyType === "fixedAmountPlusPercentage") && (
                            <Box>
                                <StyledTextField
                                    fullWidth
                                    value={fixedAmount}
                                    onChange={(e) => setFixedAmount(e.target.value)}
                                    placeholder={t("cancellationPolicyPage.drawer.amountPlaceholder")}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ mr: 1, color: colors["Gray-500"] }}>SAR</Typography>,
                                    }}
                                />
                            </Box>
                        )}

                        {penaltyType === "fixedAmountPlusPercentage" && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography sx={{ fontSize: "24px", fontWeight: 600, color: colors["Gray-900"] }}>+</Typography>
                            </Box>
                        )}

                        {(penaltyType === "percentage" || penaltyType === "fixedAmountPlusPercentage") && (
                            <Box>
                                <StyledTextField
                                    fullWidth
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                    placeholder={t("cancellationPolicyPage.drawer.percentagePlaceholder")}
                                    InputProps={{
                                        endAdornment: <Typography sx={{ ml: 1, color: colors["Gray-500"] }}>%</Typography>,
                                    }}
                                />
                            </Box>
                        )}

                        {/* Allow Cancellation Toggle */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: 500, color: colors["Gray-700"] }}>
                                {t("cancellationPolicyPage.drawer.allowCancellation")}
                            </Typography>
                            <Switch
                                checked={allowCancellation}
                                onChange={(e) => setAllowCancellation(e.target.checked)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: colors["Primary-500"],
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: colors["Primary-500"],
                                    },
                                }}
                            />
                        </Box>
                    </Stack>
                </Box>

                {/* Footer */}
                <Box sx={{ padding: "32px", borderTop: `1px solid ${colors["Gray-100"]}`, backgroundColor: "white" }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <StyledActionButton
                            buttonType="primary"
                            variant="outlined"
                            onClick={onClose}
                        >
                            {t("cancellationPolicyPage.drawer.cancel")}
                        </StyledActionButton>
                        <StyledActionButton
                            buttonType="secondary"
                            variant="contained"
                            onClick={handleSave}
                        >
                            {t("cancellationPolicyPage.drawer.savePolicy")}
                        </StyledActionButton>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CancellationPolicyDrawer;
