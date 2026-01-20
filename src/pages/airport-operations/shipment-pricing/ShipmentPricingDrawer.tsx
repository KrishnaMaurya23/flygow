import React, { useState, useEffect } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Stack,
    TextField,
    styled,
    MenuItem,
    Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import { StyledActionButton } from "../../../utils/helper";

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

const StyledSelectComponent = (props: any) => {
    return (
        <StyledSelect
            MenuProps={{
                style: { zIndex: 3001 },
                ...props.MenuProps
            }}
            {...props}
        />
    );
};

interface ShipmentPricingDrawerProps {
    open: boolean;
    onClose: () => void;
    mode: "create" | "update";
    initialData?: any;
}

const ShipmentPricingDrawer: React.FC<ShipmentPricingDrawerProps> = ({
    open,
    onClose,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        row1Source: "",
        row1Dest: "",
        row1Price: "",
        row2Source: "",
        row2Dest: "",
        row2Price: "",
        row3Source: "", // Assuming the 3rd row follows pattern
        row3Dest: "",
        row3Price: "",
    });

    useEffect(() => {
        if (open && initialData) {
            // Mock pre-filling for update
            setFormData({
                row1Source: "Jeddah",
                row1Dest: "Jeddah Airport",
                row1Price: "10",
                row2Source: "Jeddah Airport",
                row2Dest: "Riyadh",
                row2Price: "20",
                row3Source: "Riyadh", // Hypothetical 3rd leg
                row3Dest: "Riyadh Center",
                row3Price: "10",
            });
        } else if (open) {
            setFormData({
                row1Source: "",
                row1Dest: "",
                row1Price: "",
                row2Source: "",
                row2Dest: "",
                row2Price: "",
                row3Source: "",
                row3Dest: "",
                row3Price: "",
            });
        }
    }, [open, initialData]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log("Submit pricing:", formData);
        onClose();
    };

    const renderSelect = (value: string, onChange: (val: string) => void, placeholder: string) => (
        <StyledSelectComponent
            fullWidth
            displayEmpty
            value={value}
            onChange={(e: any) => onChange(e.target.value as string)}
            renderValue={(selected: any) => {
                if (!selected) {
                    return <Typography sx={{ color: colors["Gray-400"] }}>{placeholder}</Typography>;
                }
                return selected;
            }}
        >
            <MenuItem value="Jeddah">Jeddah</MenuItem>
            <MenuItem value="Riyadh">Riyadh</MenuItem>
            <MenuItem value="Dammam">Dammam</MenuItem>
            <MenuItem value="Jeddah Airport">Jeddah Airport</MenuItem>
        </StyledSelectComponent>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{ zIndex: 3000 }}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: "800px" }, // Wider drawer for this layout
                    padding: 0,
                    borderRadius: { sm: "24px 0 0 24px" },
                },
            }}
        >
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{ padding: "32px", borderBottom: `1px solid ${colors["Gray-100"]}` }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "24px", color: colors["Gray-900"] }}>
                            {mode === "create" ? t("shipmentPricingPage.drawer.createTitle") : t("shipmentPricingPage.drawer.editTitle")}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ backgroundColor: colors["Gray-50"], "&:hover": { backgroundColor: colors["Gray-100"] } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                    <Stack spacing={4}>

                        {/* Row 1 */}
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.sourceCity")}
                                </Typography>
                                {renderSelect(formData.row1Source, (v) => handleChange("row1Source", v), t("shipmentPricingPage.drawer.selectLocation"))}
                            </Box>

                            <Box sx={{ paddingTop: "40px" }}>
                                <Typography sx={{ color: colors["Gray-900"], fontWeight: 500 }}>{t("shipmentPricingPage.drawer.to")}</Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.airportLocation")}
                                </Typography>
                                {renderSelect(formData.row1Dest, (v) => handleChange("row1Dest", v), t("shipmentPricingPage.drawer.selectLocation"))}
                            </Box>

                            <Box sx={{ width: "150px" }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.price")}
                                </Typography>
                                <StyledTextField
                                    fullWidth
                                    placeholder="SAR 10" // Mock placeholder from image
                                    value={formData.row1Price}
                                    onChange={(e) => handleChange("row1Price", e.target.value)}
                                />
                            </Box>
                        </Stack>

                        {/* Row 2 */}
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.airportLocation")}
                                </Typography>
                                {renderSelect(formData.row2Source, (v) => handleChange("row2Source", v), t("shipmentPricingPage.drawer.selectLocation"))}
                            </Box>

                            <Box sx={{ paddingTop: "40px" }}>
                                <Typography sx={{ color: colors["Gray-900"], fontWeight: 500 }}>{t("shipmentPricingPage.drawer.to")}</Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.destinationCity")}
                                </Typography>
                                {renderSelect(formData.row2Dest, (v) => handleChange("row2Dest", v), t("shipmentPricingPage.drawer.selectLocation"))}
                            </Box>

                            <Box sx={{ width: "150px" }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.price")}
                                </Typography>
                                <StyledTextField
                                    fullWidth
                                    placeholder="SAR 20"
                                    value={formData.row2Price}
                                    onChange={(e) => handleChange("row2Price", e.target.value)}
                                />
                            </Box>
                        </Stack>

                        {/* Row 3 - Labels as per image "Airport Location" -> "Destination city" again? */}
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.airportLocation")}
                                </Typography>
                                {renderSelect(formData.row3Source, (v) => handleChange("row3Source", v), t("shipmentPricingPage.drawer.selectLocation"))}
                            </Box>

                            <Box sx={{ paddingTop: "40px" }}>
                                <Typography sx={{ color: colors["Gray-900"], fontWeight: 500 }}>{t("shipmentPricingPage.drawer.to")}</Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.destinationCity")}
                                </Typography>
                                {renderSelect(formData.row3Dest, (v) => handleChange("row3Dest", v), t("shipmentPricingPage.drawer.selectLocation"))}
                            </Box>

                            <Box sx={{ width: "150px" }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                    {t("shipmentPricingPage.drawer.price")}
                                </Typography>
                                <StyledTextField
                                    fullWidth
                                    placeholder="SAR 10"
                                    value={formData.row3Price}
                                    onChange={(e) => handleChange("row3Price", e.target.value)}
                                />
                            </Box>
                        </Stack>

                    </Stack>
                </Box>

                {/* Footer */}
                <Box sx={{ padding: "32px", borderTop: `1px solid ${colors["Gray-100"]}`, backgroundColor: colors["Gray-50"] }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <StyledActionButton
                            buttonType="success"
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ color: "white" }}
                        >
                            {mode === "create" ? t("shipmentPricingPage.drawer.create") : t("shipmentPricingPage.drawer.save")}
                        </StyledActionButton>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

export default ShipmentPricingDrawer;
