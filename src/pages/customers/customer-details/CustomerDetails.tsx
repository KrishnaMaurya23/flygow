import { Box, Stack, Typography, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import { StyledActionButton } from "../../../utils/helper";

interface InfoItemProps {
    label: string;
    value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
    <Box sx={{ minWidth: 0 }}>
        <Typography
            variant="body2"
            sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: colors["Gray-600"],
                marginBottom: "4px",
            }}
        >
            {label}
        </Typography>
        <Typography
            variant="body1"
            sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: colors["Gray-900"],
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
            title={value}
        >
            {value}
        </Typography>
    </Box>
);

export default function CustomerInfoCard() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const isRtl = theme.direction === "rtl";

    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "24px !important",
                "@media (max-width: 600px)": {
                    padding: "16px !important",
                },
                width: "100%",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
            }}
        >
            {/* Header Section */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={2}
                sx={{ marginBottom: "24px" }}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        aria-label={t("buttons.back")}
                        sx={{
                            padding: "8px",
                            "&:hover": {
                                backgroundColor: colors["Gray-50"],
                            },
                            transform: isRtl ? "rotate(180deg)" : "none",
                        }}
                    >
                        <img
                            src="/assets/icons/back-arrow.svg"
                            alt=""
                            style={{ width: 24, height: 24 }}
                        />
                    </IconButton>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: "18px", sm: "20px" },
                            fontWeight: 600,
                            color: colors["Gray-900"],
                        }}
                    >
                        {t("customerDetails.title")}
                    </Typography>
                </Stack>
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: colors["Success-600"],
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    <Box component="span" sx={{ fontWeight: 600, color: colors["Gray-600"] }}>
                        {t("labels.status")}:
                    </Box>
                    {t("active")}
                </Typography>
            </Stack>

            {/* Customer ID and Action Buttons */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={2}
                sx={{ padding: "10px 10px !important", mb: 2 }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: colors["Gray-600"],
                        }}
                    >
                        {t("customerDetails.userId")}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: colors["Gray-900"],
                        }}
                    >
                        #001
                    </Typography>
                </Stack>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                    <StyledActionButton
                        variant="outlined"
                        buttonType="secondary"
                        buttonStyle="rounded"
                    >
                        {t("customerDetails.blockCustomer")}
                    </StyledActionButton>
                    <StyledActionButton
                        variant="outlined"
                        buttonType="error"
                        buttonStyle="rounded"
                        sx={{ borderColor: colors["Error-300"], color: colors["Error-700"] }}
                    >
                        {t("customerDetails.deleteCustomer")}
                    </StyledActionButton>
                </Stack>
            </Stack>

            {/* Grid of Info */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                    },
                    gap: 3,
                    padding: "10px 10px !important",
                }}
            >
                <InfoItem label={t("customerDetails.fullName")} value="Olivia Rhye" />
                <InfoItem label={t("customerDetails.phoneNumber")} value="+966 9877827388" />
                <InfoItem label={t("customerDetails.email")} value="olivia@example.com" />
                <InfoItem label={t("customerDetails.registrationDate")} value="Mar 20, 2025" />
                <InfoItem label={t("customerDetails.totalShipments")} value="45" />
                <InfoItem label={t("customerDetails.walletBalance")} value="SAR 250.00" />
                <InfoItem label={t("customerDetails.lastLogin")} value="2 Hours ago" />
                <InfoItem label={t("customerDetails.deviceInfo")} value="iPhone 14 Pro" />
            </Box>
        </Box>
    );
}
