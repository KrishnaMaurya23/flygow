import { useState } from "react";
import { Box, Stack, Typography, IconButton, useTheme, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import { StyledActionButton } from "../../../utils/helper";
import GlobalDialog from "../../../components/dialog";
import CommonActionDialog from "../../../components/dialog/dialog-content/CommonActionDialog";

interface InfoItemProps {
    label: string;
    value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
    <Box sx={{ flex: 1 }}>
        <Typography
            variant="body2"
            sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: colors["Gray-500"],
                marginBottom: "8px",
            }}
        >
            {label}
        </Typography>
        <Typography
            variant="body1"
            sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: colors["Gray-900"],
            }}
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

    const [dialogType, setDialogType] = useState<"block" | "delete" | "reactivate" | null>(null);

    const handleOpenDialog = (type: "block" | "delete" | "reactivate") => {
        setDialogType(type);
    };

    const handleCloseDialog = () => {
        setDialogType(null);
    };

    const handleConfirm = (data: any) => {
        console.log(`Confirmed ${dialogType}:`, data);
        handleCloseDialog();
    };

    const dialogContent = () => {
        if (!dialogType) return <></>;

        const config = {
            block: {
                title: t("customerPage.dialogs.block.title"),
                subtitle: t("customerPage.dialogs.block.subtitle"),
                reason: t("customerPage.dialogs.block.reasonLabel"),
            },
            delete: {
                title: t("customerPage.dialogs.delete.title"),
                subtitle: t("customerPage.dialogs.delete.subtitle"),
                reason: t("customerPage.dialogs.delete.reasonLabel"),
            },
            reactivate: {
                title: t("customerPage.dialogs.reactivate.title"),
                subtitle: t("customerPage.dialogs.reactivate.subtitle"),
                reason: t("customerPage.dialogs.reactivate.reasonLabel"),
            },
        }[dialogType];

        return (
            <CommonActionDialog
                title={config.title}
                subtitle={config.subtitle}
                reason={config.reason}
                placeholder={t("customerPage.dialogs.placeholder")}
                handleCancel={handleCloseDialog}
                onSubmit={handleConfirm}
            />
        );
    };

    return (
        <Box sx={{ width: "100%", }}>
            {/* Page Header */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0, p: 1 }}>
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
                        fontSize: "24px",
                        fontWeight: 700,
                        color: colors["Gray-900"],
                    }}
                >
                    {t("customerDetails.title")}
                </Typography>
            </Stack>
            <Box sx={{ padding: "32px !important", "@media (max-width: 600px)": { padding: "16px !important", }, }}>
                {/* Account Status and Action Buttons */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 400,
                                color: colors["Gray-500"],
                                mb: 1,
                            }}
                        >
                            Account Status
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: 500,
                                color: colors["Gray-900"],
                            }}
                        >
                            {t("active")}
                        </Typography>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                        <StyledActionButton
                            variant="outlined"
                            buttonType="secondary" // Or success if available, using secondary for now
                            buttonStyle="flat"
                            onClick={() => handleOpenDialog("reactivate")}
                        >
                            {t("customerPage.menu.reactivate")}
                        </StyledActionButton>
                        <StyledActionButton
                            variant="contained"
                            buttonType="error"
                            buttonStyle="flat"
                            onClick={() => handleOpenDialog("delete")}
                        >
                            {t("buttons.delete")}
                        </StyledActionButton>
                        <StyledActionButton
                            variant="outlined"
                            buttonType="error"
                            buttonStyle="flat"
                            onClick={() => handleOpenDialog("block")}
                        >
                            {t("buttons.block")}
                        </StyledActionButton>
                    </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} />

                {/* Info Row */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={8}
                    sx={{ pt: 1 }}
                >
                    <InfoItem label="Customer Name" value="John Doe" />
                    <InfoItem label="Phone Number" value="+966 9877827388" />
                    <InfoItem label="Email Address" value="johndoe@gmail.com" />
                </Stack>
                <Divider sx={{ my: 2 }} />
            </Box>

            <GlobalDialog
                open={!!dialogType}
                handleClose={handleCloseDialog}
                component={dialogContent()}
            />
        </Box>
    );
}
