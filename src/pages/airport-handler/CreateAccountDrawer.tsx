import React from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    TextField,
    Select,
    MenuItem,
    Stack,
    styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/constants";
import { StyledActionButton } from "../../utils/helper";

// Styled components to match the premium look
const StyledTextField = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "white",
        "& fieldset": {
            borderColor: colors["Gray-200"],
        },
        "& hover fieldset": {
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
    "& hover .MuiOutlinedInput-notchedOutline": {
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

interface CreateAccountDrawerProps {
    open: boolean;
    onClose: () => void;
}

const CreateAccountDrawer: React.FC<CreateAccountDrawerProps> = ({
    open,
    onClose,
}) => {
    const { t } = useTranslation();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            BackdropProps={{
                sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            }}
            sx={{
                zIndex: 3000,
            }}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: "640px" },
                    borderRadius: { sm: "24px 0 0 24px" },
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                },
            }}

        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 5,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "24px",
                        color: colors["Gray-900"],
                        letterSpacing: "-0.02em",
                    }}
                >
                    {t("createAccountDrawer.title")}
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        backgroundColor: colors["Gray-50"],
                        color: colors["Gray-500"],
                        "&:hover": { backgroundColor: colors["Gray-100"] },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Form Fields */}
            <Stack spacing={3} sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontSize: "14px",
                            fontWeight: 500,
                            color: colors["Primary-900"],
                        }}
                    >
                        {t("createAccountDrawer.firstName")}
                    </Typography>
                    <StyledTextField
                        fullWidth
                        placeholder={t("createAccountDrawer.firstName")}
                    />
                </Box>

                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontSize: "14px",
                            fontWeight: 500,
                            color: colors["Primary-900"],
                        }}
                    >
                        {t("createAccountDrawer.lastName")}
                    </Typography>
                    <StyledTextField
                        fullWidth
                        placeholder={t("createAccountDrawer.lastName")}
                    />
                </Box>

                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontSize: "14px",
                            fontWeight: 500,
                            color: colors["Primary-900"],
                        }}
                    >
                        {t("createAccountDrawer.email")}
                    </Typography>
                    <StyledTextField
                        fullWidth
                        placeholder={t("createAccountDrawer.email")}
                    />
                </Box>

                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontSize: "14px",
                            fontWeight: 500,
                            color: colors["Primary-900"],
                        }}
                    >
                        {t("createAccountDrawer.phone")}
                    </Typography>
                    <StyledTextField
                        fullWidth
                        placeholder={t("createAccountDrawer.phone")}
                    />
                </Box>

                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontSize: "14px",
                            fontWeight: 500,
                            color: colors["Primary-900"],
                        }}
                    >
                        {t("createAccountDrawer.location")}
                    </Typography>
                    <StyledSelect
                        fullWidth
                        displayEmpty
                        defaultValue=""
                        renderValue={(value: any) => {
                            if (value === "") {
                                return (
                                    <Typography sx={{ color: colors["Gray-400"] }}>
                                        {t("createAccountDrawer.selectLocation")}
                                    </Typography>
                                );
                            }
                            return value;
                        }}
                    >
                        <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                        <MenuItem value="UAE">UAE</MenuItem>
                    </StyledSelect>
                </Box>
            </Stack>

            {/* Action Button */}
            <Box sx={{ pt: 4, marginLeft: "auto" }}>
                <StyledActionButton type="submit" variant="contained" buttonType="success">
                    {t("createAccountDrawer.submit")}
                </StyledActionButton>
            </Box>
        </Drawer>
    );
};

export default CreateAccountDrawer;
