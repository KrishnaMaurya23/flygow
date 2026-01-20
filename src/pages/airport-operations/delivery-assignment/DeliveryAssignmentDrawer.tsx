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

interface DeliveryAssignmentDrawerProps {
    open: boolean;
    onClose: () => void;
    mode: "create" | "update";
    initialData?: any;
}

const DeliveryAssignmentDrawer: React.FC<DeliveryAssignmentDrawerProps> = ({
    open,
    onClose,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        shipmentType: "",
        assignmentStage: "",
        defaultAssignmentRule: "",
        note: ""
    });

    useEffect(() => {
        if (open && initialData) {
            setFormData({
                shipmentType: initialData.shipmentType || "Sed ut perspiciatis",
                assignmentStage: initialData.assignmentStage || "Quis autem vel eum iure",
                defaultAssignmentRule: initialData.defaultAssignmentRule || "Sed ut perspiciatis",
                note: initialData.note || ""
            });
        } else if (open) {
            setFormData({
                shipmentType: "",
                assignmentStage: "",
                defaultAssignmentRule: "",
                note: ""
            });
        }
    }, [open, initialData]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // Handle create/update logic here
        console.log("Submit assignment:", formData);
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{ zIndex: 3000 }}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: "640px" },
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
                            {mode === "create" ? t("deliveryAssignmentPage.drawer.createTitle") : t("deliveryAssignmentPage.drawer.editTitle")}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ backgroundColor: colors["Gray-50"], "&:hover": { backgroundColor: colors["Gray-100"] } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                    <Stack spacing={4}>
                        {/* Shipment Type */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("deliveryAssignmentPage.drawer.shipmentType")}
                            </Typography>
                            <StyledSelectComponent
                                fullWidth
                                displayEmpty
                                value={formData.shipmentType}
                                onChange={(e: any) => handleChange("shipmentType", e.target.value as string)}
                                renderValue={(selected: any) => {
                                    if (!selected) {
                                        return <Typography sx={{ color: colors["Gray-400"] }}>{t("deliveryAssignmentPage.drawer.selectShipmentType")}</Typography>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="Sed ut perspiciatis">Sed ut perspiciatis</MenuItem>
                                <MenuItem value="Type B">Type B</MenuItem>
                            </StyledSelectComponent>
                        </Box>

                        {/* Assignment Stage */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("deliveryAssignmentPage.drawer.assignmentStage")}
                            </Typography>
                            <StyledSelectComponent
                                fullWidth
                                displayEmpty
                                value={formData.assignmentStage}
                                onChange={(e: any) => handleChange("assignmentStage", e.target.value as string)}
                                renderValue={(selected: any) => {
                                    if (!selected) {
                                        return <Typography sx={{ color: colors["Gray-400"] }}>{t("deliveryAssignmentPage.drawer.selectAssignmentStage")}</Typography>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="Quis autem vel eum iure">Quis autem vel eum iure</MenuItem>
                                <MenuItem value="Stage 2">Stage 2</MenuItem>
                            </StyledSelectComponent>
                        </Box>

                        {/* Default Assignment Rule */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("deliveryAssignmentPage.drawer.defaultAssignmentRule")}
                            </Typography>
                            <StyledSelectComponent
                                fullWidth
                                displayEmpty
                                value={formData.defaultAssignmentRule}
                                onChange={(e: any) => handleChange("defaultAssignmentRule", e.target.value as string)}
                                renderValue={(selected: any) => {
                                    if (!selected) {
                                        return <Typography sx={{ color: colors["Gray-400"] }}>{t("deliveryAssignmentPage.drawer.selectAssignmentRule")}</Typography>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="Sed ut perspiciatis">Sed ut perspiciatis</MenuItem>
                                <MenuItem value="Rule B">Rule B</MenuItem>
                            </StyledSelectComponent>
                        </Box>

                        {/* Note */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("deliveryAssignmentPage.drawer.note")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                multiline
                                rows={1} // The image shows a single line height text field actually, but let's see. It looks like normal input.
                                // Image 2 shows "Note" input box empty. Looks like single line or small multiline.
                                value={formData.note}
                                onChange={(e) => handleChange("note", e.target.value)}
                            />
                        </Box>

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
                            {mode === "create" ? t("deliveryAssignmentPage.drawer.create") : t("deliveryAssignmentPage.drawer.save")}
                        </StyledActionButton>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

export default DeliveryAssignmentDrawer;
