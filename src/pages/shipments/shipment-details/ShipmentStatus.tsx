import { Box, Typography, Stack, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InventoryIcon from "@mui/icons-material/Inventory";

interface InfoItemProps {
  label: string;
  value: string;
  isGreyedOut?: boolean;
}

const InfoItem = ({ label, value, isGreyedOut }: InfoItemProps) => (
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
        color: isGreyedOut ? colors["Gray-400"] : colors["Gray-900"],
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

interface TimelineItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  isLast?: boolean;
  isActive?: boolean;
  isPending?: boolean;
  children?: React.ReactNode;
}

const TimelineItem = ({ icon, title, description, isLast, isActive, isPending, children }: TimelineItemProps) => (
  <Box sx={{ display: "flex", gap: 3, minHeight: isLast ? "auto" : "80px" }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "32px" }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isPending ? "transparent" : colors["Gray-100"],
          border: isPending ? `1.5px solid ${colors["Gray-200"]}` : "none",
          zIndex: 1,
        }}
      >
        {isPending ? (
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors["Gray-300"] }} />
        ) : (
          icon
        )}
      </Box>
      {!isLast && (
        <Box
          sx={{
            width: "1.5px",
            flexGrow: 1,
            backgroundColor: isPending || !isActive ? "transparent" : colors["Gray-200"],
            borderLeft: isPending || !isActive ? `1.5px dashed ${colors["Gray-200"]}` : "none",
            marginTop: "-2px",
            marginBottom: "-2px",
          }}
        />
      )}
    </Box>
    <Box sx={{ pb: isLast ? 0 : 4 }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: colors["Gray-900"],
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: colors["Gray-500"],
          }}
        >
          {description}
        </Typography>
      )}
      {children}
    </Box>
  </Box>
);

export default function ShipmentStatusCard() {
  const { t } = useTranslation();

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
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
        gap: { xs: 4, md: 0 },
        boxSizing: "border-box",
      }}
    >
      {/* Left Column: Shipment Details */}
      <Box sx={{ pr: { md: 6 }, padding: "10px 10px !important" }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: colors["Gray-900"],
              mb: 3,
            }}
          >
            {t("infoLabels.inboundShipmentDetails", "Inbound Shipment Details")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 3,
            }}
          >
            <InfoItem label={t("infoLabels.deliveryCompany", "Delivery company")} value="Mrsool" />
            <InfoItem label={t("infoLabels.deliveryOrderId", "Delivery Order ID")} value="MR12345" />
            <InfoItem label={t("infoLabels.deliveryPersonName", "Delivery Person Name")} value="Ahmed Ali" />
            <InfoItem label={t("infoLabels.phoneNumber", "phone number")} value="+966 8976543210" />
            <InfoItem label={t("infoLabels.airportHandlerName", "Airport handler name")} value="Name goes here" />
            <InfoItem label={t("infoLabels.shipmentReceivedTime", "Shipment received time")} value="10:10 am" />
            <Box sx={{ gridColumn: "span 2" }}>
              <InfoItem label={t("infoLabels.locationName", "Location Name")} value="12345" />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: colors["Gray-900"],
              mb: 3,
            }}
          >
            {t("infoLabels.outboundShipmentDetails", "Outbound Shipment Details")}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              color: colors["Gray-400"],
            }}
          >
            {t("infoLabels.notAssignedYet", "Not assigned yet!")}
          </Typography>
        </Box>
      </Box>

      {/* Middle Divider (Grid Item) */}
      {/* <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "1.5px",
          backgroundColor: colors["Gray-100"],
          height: "100%",
        }}
      /> */}
      <Divider orientation="vertical" />

      {/* Right Column: Shipment Status */}
      <Box sx={{ pl: { md: 6 }, padding: "10px 20px !important" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: colors["Gray-900"],
            mb: 3,
          }}
        >
          {t("infoLabels.shipmentStatus", "Shipment Status")}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TimelineItem
            icon={<CheckCircleIcon sx={{ fontSize: 20, color: colors["Gray-600"] }} />}
            title="Order confirmed"
            description="(Driver is on its way) at Aug 9, 3:19pm"
            isActive
          />
          <TimelineItem
            icon={<ScheduleIcon sx={{ fontSize: 20, color: colors["Gray-600"] }} />}
            title="Picked Up by Partner"
            description="Estimated by 10 :00 pm"
            isActive
          />
          <TimelineItem
            icon={<InventoryIcon sx={{ fontSize: 20, color: colors["Gray-600"] }} />}
            title="Arrived at Pickup Airport/Carrier"
            isActive
          >
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: colors["Gray-500"], mb: 1 }}>
                In Transit
              </Typography>
              <Stack gap={1}>
                <Typography variant="body2" sx={{ color: colors["Gray-500"] }}>Nanimo, BC CA at Aug 10, 9:19pm</Typography>
                <Typography variant="body2" sx={{ color: colors["Gray-500"] }}>Dammam, BC CA at Aug 11, 4:19pm</Typography>
                <Typography variant="body2" sx={{ color: colors["Gray-500"] }}>Khobar, BC CA at Aug 12, 3:19pm</Typography>
              </Stack>
            </Box>
          </TimelineItem>
          <TimelineItem
            title="Arrived at Destination Airport"
            description="Estimated by 04:00 pm"
            isPending
          />
          <TimelineItem
            title="Delivered to Recipient"
            description="Estimated by 9:00 pm"
            isLast
            isPending
          />
        </Box>
      </Box>
    </Box>
  );
}
