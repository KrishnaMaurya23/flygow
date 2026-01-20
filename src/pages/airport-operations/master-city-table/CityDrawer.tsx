import React, { useState, useEffect } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Stack,
    TextField,
    styled,
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

interface CityDrawerProps {
    open: boolean;
    onClose: () => void;
    mode: "create" | "update";
    initialData?: {
        name: string;
    };
}

const CityDrawer: React.FC<CityDrawerProps> = ({
    open,
    onClose,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        if (open && initialData) {
            setCityName(initialData.name);
        } else if (open) {
            setCityName("");
        }
    }, [open, initialData]);

    const handleSubmit = () => {
        // Handle create/update logic here
        console.log("Submit city:", cityName);
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
                            {mode === "create" ? t("masterCityPage.drawer.createTitle") : t("masterCityPage.drawer.updateTitle")}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ backgroundColor: colors["Gray-50"], "&:hover": { backgroundColor: colors["Gray-100"] } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                    <Stack spacing={4}>
                        {/* City Name */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("masterCityPage.drawer.cityName")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                placeholder={t("masterCityPage.drawer.enterCityName")}
                                value={cityName}
                                onChange={(e) => setCityName(e.target.value)}
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
                            {mode === "create" ? t("masterCityPage.drawer.create") : t("masterCityPage.drawer.update")}
                        </StyledActionButton>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CityDrawer;
