import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
import { useMemo } from "react";

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

const containerStyle = {
  width: "100%",
  height: "100%",
};

const jeddah = { lat: 21.5292, lng: 39.1611 };
const riyadh = { lat: 24.7136, lng: 46.6753 };

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasApiKey = apiKey && apiKey !== "YOUR_GOOGLE_MAPS_API_KEY_HERE";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  const center = useMemo(() => ({
    lat: (jeddah.lat + riyadh.lat) / 2,
    lng: (jeddah.lng + riyadh.lng) / 2,
  }), []);

  const path = useMemo(() => [jeddah, riyadh], []);

  // Fallback to Image if No API Key
  if (!hasApiKey) {
    return (
      <img
        src="/assets/images/map.svg"
        alt="Shipment Route Map"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }

  if (!isLoaded) return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>Loading Map...</Box>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
          },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
          { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
        ]
      }}
    >
      <Marker position={jeddah} label="S" />
      <Marker position={riyadh} label="R" />
      <Polyline
        path={path}
        options={{
          strokeColor: colors["Gray-100"] || "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 3,
        }}
      />
    </GoogleMap>
  );
};

export default function SenderDetailsCard() {
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
        gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
        gap: 0,
        boxSizing: "border-box",
        alignItems: "center",
      }}
    >
      {/* Left Section: Sender and Receiver Details */}
      <Box sx={{ minWidth: 0, paddingLeft: "10px", paddingRight: "10px" }}>
        {/* Sender Details */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: colors["Gray-900"],
              mb: 2,
            }}
          >
            {t("infoLabels.senderDetails")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
            }}
          >
            <InfoItem label={t("infoLabels.senderName")} value="Olivia Rhye" />
            <InfoItem label={t("infoLabels.phoneNumber")} value="+1 9877827388" />
            <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
              <InfoItem label={t("infoLabels.pickupLocation")} value="21st Street, abc, Jeddah" />
            </Box>
          </Box>
        </Box>

        {/* Receiver Details */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: colors["Gray-900"],
              mb: 2,
            }}
          >
            {t("infoLabels.receiverDetails")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
            }}
          >
            <InfoItem label={t("infoLabels.receiverName")} value="Olivia Rhye" />
            <InfoItem label={t("infoLabels.phoneNumber")} value="+1 9877827388" />
            <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
              <InfoItem label={t("infoLabels.dropLocation")} value="21st Street, abc, Riyadh" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Section: Map */}
      <Box
        sx={{
          width: "95%",
          height: "100%",
          minHeight: { xs: "250px", md: "340px" },
          maxHeight: { xs: "250px", md: "380px" },
          borderRadius: "33px",
          overflow: "hidden",
          border: `1px solid ${colors["Gray-100"]}`,
          backgroundColor: colors["Gray-50"],
          display: "flex",
        }}
      >
        <MapComponent />
      </Box>
    </Box>
  );
}
