import { Box, Stack, Typography } from "@mui/material";
import AdminLayout from "../../../layouts/AdminLayout";
import CustomerInfoCard from "./CustomerDetails";
import ShipmentsGrid from "./ShipmentsGrid";
import { colors } from "../../../utils/constants";

export default function CustomerDetails() {
    return (
        <AdminLayout>
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "24px",

                    width: "100%",
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
                    boxSizing: "border-box",
                }}
            >
                <Stack spacing={6}>
                    <CustomerInfoCard />

                    <Box sx={{ padding: "32px !important", "@media (max-width: 600px)": { padding: "16px !important", }, }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "20px",
                                fontWeight: 700,
                                color: colors["Gray-900"],
                                mb: 3,

                            }}
                        >
                            Shipment history
                        </Typography>
                        <ShipmentsGrid />
                    </Box>
                </Stack>
            </Box>
        </AdminLayout>
    );
}
