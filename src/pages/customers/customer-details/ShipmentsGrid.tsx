import { Box, Typography, Stack } from "@mui/material";
import { colors } from "../../../utils/constants";

interface ShipmentCardProps {
    id: string;
    type: string;
    status: string;
    time?: string;
    activeStep: number;
}

const ShipmentCard = ({ id, type, status, time, activeStep }: ShipmentCardProps) => (
    <Box
        sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "8px 16px !important",
            border: `1px solid ${colors["Gray-200"]}`,
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
                borderColor: colors["Gray-300"],
                boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1)",
            },
        }}
    >
        <Stack direction="row" spacing={2} alignItems="center">
            <Box
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: colors["Gray-100"],
                    flexShrink: 0,
                }}
            />
            <Box sx={{ overflow: "hidden" }}>
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: colors["Gray-900"],
                        lineHeight: 1.2,
                        mb: 0.5
                    }}
                >
                    {id}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: colors["Gray-500"]
                    }}
                >
                    {type}
                </Typography>
            </Box>
        </Stack>

        {/* Horizontal Stepper */}
        <Box sx={{ position: "relative", py: 1, px: 0.5 }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 4,
                    right: 4,
                    height: "1px",
                    backgroundColor: colors["Gray-100"],
                    zIndex: 0,
                    transform: "translateY(-50%)",
                }}
            />
            <Stack direction="row" justifyContent="space-between" sx={{ position: "relative", zIndex: 1 }}>
                {[0, 1, 2, 3, 4].map((step) => (
                    <Box
                        key={step}
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: step <= activeStep ? colors["Gray-400"] : colors["Gray-200"],
                            border: "1px solid white",
                        }}
                    />
                ))}
            </Stack>
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Typography
                sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: colors["Gray-900"],
                    maxWidth: "60%",
                    lineHeight: 1.4
                }}
            >
                {status}
            </Typography>
            {time && (
                <Typography
                    sx={{
                        fontSize: "11px",
                        fontWeight: 400,
                        color: colors["Gray-500"],
                        textAlign: "right"
                    }}
                >
                    {time}
                </Typography>
            )}
        </Stack>
    </Box>
);

export default function ShipmentsGrid() {
    const shipments = [
        { id: "F-y390rks91", type: "Medium (2kg - 10kg)", status: "Waiting for update from carrier", activeStep: 0 },
        { id: "F-y390rks91", type: "Medium (2kg - 10kg)", status: "Reached Sorting Hub", time: "Today 2 hr ago", activeStep: 2 },
        { id: "F-y390rks91", type: "Medium (2kg - 10kg)", status: "Delivered", time: "August 21 at 12:45 pm", activeStep: 4 },
        { id: "F-y390rks91", type: "Medium (2kg - 10kg)", status: "Waiting for update from carrier", activeStep: 0 },
        { id: "F-y390rks91", type: "Medium (2kg - 10kg)", status: "Reached Sorting Hub", time: "Today 2 hr ago", activeStep: 2 },
        { id: "F-y390rks91", type: "Medium (2kg - 10kg)", status: "Delivered", time: "August 21 at 12:45 pm", activeStep: 4 },
    ];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                },
                gap: 3,


            }}
        >
            {shipments.map((shipment, index) => (
                <ShipmentCard key={index} {...shipment} />
            ))}
        </Box>
    );
}
