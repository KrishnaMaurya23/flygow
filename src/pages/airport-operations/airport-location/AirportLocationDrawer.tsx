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

// Enhance StyledSelect usage in component instead or modify styled component to accept default props.
// Ideally, we can attach default props via styled or HOC, but altering the component usage is safer.
// Let's modify the component to pass MenuProps.
// Wait, styled components don't easily accept default props for nested structures like MenuProps unless we wrapping it.
// I will create a wrapper or just pass MenuProps in the JSX usage.
// Let's check the JSX usage in this file. It is used in multiple places.
// To avoid repeating `MenuProps={{ style: { zIndex: 3001 } }}` everywhere, I will redefine StyledSelect as a functional component wrapping the styled Select.

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

interface AirportLocationDrawerProps {
    open: boolean;
    onClose: () => void;
    mode: "create" | "update";
    initialData?: any;
}

const AirportLocationDrawer: React.FC<AirportLocationDrawerProps> = ({
    open,
    onClose,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        locationCity: "Riyadh", // Default for demo
        locationId: "",
        locationName: "",
        supervisor: "Atif Aslam", // Default for demo
        supervisorPhone: "",
    });

    useEffect(() => {
        if (open && initialData) {
            setFormData({
                locationCity: initialData.locationCity || "Riyadh",
                locationId: initialData.locationId || "12345",
                locationName: initialData.locationName || "King Abdulaziz International Airport (JED)",
                supervisor: initialData.supervisor || "Atif Aslam",
                supervisorPhone: initialData.supervisorContact || "+966 9877827388",
            });
        } else if (open) {
            setFormData({
                locationCity: "",
                locationId: "",
                locationName: "",
                supervisor: "",
                supervisorPhone: "",
            });
        }
    }, [open, initialData]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // Handle create/update logic here
        console.log("Submit location:", formData);
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
                            {mode === "create" ? t("airportLocationPage.drawer.createTitle") : t("airportLocationPage.drawer.editTitle")}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ backgroundColor: colors["Gray-50"], "&:hover": { backgroundColor: colors["Gray-100"] } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                    <Stack spacing={3}>
                        {/* Location City */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("airportLocationPage.drawer.locationCity")}
                            </Typography>
                            <StyledSelectComponent
                                fullWidth
                                displayEmpty
                                value={formData.locationCity}
                                onChange={(e: any) => handleChange("locationCity", e.target.value as string)}
                                renderValue={(selected: any) => {
                                    if (!selected) {
                                        return <Typography sx={{ color: colors["Gray-400"] }}>{t("airportLocationPage.drawer.selectCity")}</Typography>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="Riyadh">Riyadh</MenuItem>
                                <MenuItem value="Jeddah">Jeddah</MenuItem>
                                <MenuItem value="Dammam">Dammam</MenuItem>
                            </StyledSelectComponent>
                        </Box>

                        {/* Location ID */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("airportLocationPage.drawer.locationId")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                placeholder={t("airportLocationPage.drawer.enterLocationId")}
                                value={formData.locationId}
                                onChange={(e) => handleChange("locationId", e.target.value)}
                            />
                        </Box>

                        {/* Location Name */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("airportLocationPage.drawer.locationName")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                placeholder={t("airportLocationPage.drawer.enterLocationName")}
                                value={formData.locationName}
                                onChange={(e) => handleChange("locationName", e.target.value)}
                            />
                        </Box>

                        {/* Supervisor */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("airportLocationPage.drawer.supervisor")}
                            </Typography>
                            <StyledSelectComponent
                                fullWidth
                                displayEmpty
                                value={formData.supervisor}
                                onChange={(e: any) => handleChange("supervisor", e.target.value as string)}
                                renderValue={(selected: any) => {
                                    if (!selected) {
                                        return <Typography sx={{ color: colors["Gray-400"] }}>{t("airportLocationPage.drawer.selectSupervisor")}</Typography>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="Atif Aslam">Atif Aslam</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </StyledSelectComponent>
                        </Box>

                        {/* Supervisor Phone */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("airportLocationPage.drawer.supervisorPhone")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                placeholder={t("airportLocationPage.drawer.enterSupervisorPhone")}
                                value={formData.supervisorPhone}
                                onChange={(e) => handleChange("supervisorPhone", e.target.value)}
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
                            {mode === "create" ? t("airportLocationPage.drawer.create") : t("airportLocationPage.drawer.save")}
                        </StyledActionButton>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

export default AirportLocationDrawer;
