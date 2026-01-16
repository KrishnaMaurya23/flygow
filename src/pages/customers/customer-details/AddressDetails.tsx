import { Box, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface AddressItemProps {
    label: string;
    address: string;
    type: string;
}

const AddressItem = ({ label, address, type }: AddressItemProps) => (
    <Box sx={{ padding: "16px", borderRadius: "12px", border: `1px solid ${colors["Gray-100"]}`, backgroundColor: colors["Gray-50"] }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <LocationOnIcon sx={{ color: colors["Gray-400"], fontSize: "18px" }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: colors["Gray-700"] }}>
                {label} ({type})
            </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: colors["Gray-600"], lineHeight: 1.5 }}>
            {address}
        </Typography>
    </Box>
);

export default function AddressDetailsCard() {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "24px !important",
                width: "100%",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: colors["Gray-900"],
                    mb: 3,
                }}
            >
                {t("customerDetails.savedAddresses")}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 2,
                }}
            >
                <AddressItem label={t("customerDetails.home")} address="21st Street, Al Zahra, Jeddah, Saudi Arabia" type={t("customerDetails.primary")} />
                <AddressItem label={t("customerDetails.office")} address="King Fahd Road, Al Olaya, Riyadh, Saudi Arabia" type={t("customerDetails.work")} />
                <AddressItem label={t("customerDetails.other")} address="456 Prince Sultan Rd, Al Rawdah, Jeddah, Saudi Arabia" type={t("customerDetails.other")} />
            </Box>
        </Box>
    );
}
