import React, { useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminLayout from "../../../layouts/AdminLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { decryptAES } from "../../../utils/helper";
import { colors } from "../../../utils/constants";

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    const normalized = status.toLowerCase().replace(/\s+/g, "-");
    switch (normalized) {
      case "delivered":
        return { color: colors["Success-600"], bg: colors["Success-50"] };
      case "picked-up":
      case "picked up":
        return { color: colors["Warning-600"], bg: colors["Warning-50"] };
      case "in-transit":
        return { color: colors["Primary-600"], bg: colors["Primary-50"] };
      case "out-for-delivery":
      case "out for delivery":
        return { color: colors["Primary-700"], bg: colors["Primary-100"] };
      case "order-confirmed":
      case "order confirmed":
        return { color: colors["Success-500"], bg: colors["Success-50"] };
      case "on-hold":
        return { color: colors["Warning-500"], bg: colors["Warning-50"] };
      case "cancelled":
        return { color: colors["Error-600"], bg: colors["Error-50"] };
      default:
        return { color: colors["Gray-600"], bg: colors["Gray-100"] };
    }
  };

  const { color, bg } = getStatusColor(status);
  return (
    <Box
      sx={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "8px",
        backgroundColor: bg,
        color: color,
        fontSize: "14px",
        fontWeight: 500,
      }}
    >
      {status}
    </Box>
  );
};

// Timeline Status Component
const TimelineItem = ({
  status,
  description,
  time,
  isCompleted,
  isActive,
  subItems,
}: {
  status: string;
  description?: string;
  time: string;
  isCompleted: boolean;
  isActive: boolean;
  subItems?: string[];
}) => {
  return (
    <Box sx={{ marginBottom: "24px", position: "relative", paddingLeft: "32px" }}>
      {/* Timeline line */}
      {!isActive && (
        <Box
          sx={{
            position: "absolute",
            left: "7px",
            top: "24px",
            width: "2px",
            height: "calc(100% + 8px)",
            backgroundColor: isCompleted
              ? colors["Success-500"]
              : colors["Gray-200"],
          }}
        />
      )}

      {/* Timeline dot */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "4px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: isCompleted
            ? colors["Success-500"]
            : isActive
            ? colors["Primary-500"]
            : colors["Gray-300"],
          border: `2px solid ${colors["Base-White"]}`,
          zIndex: 1,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: colors["Gray-900"],
          marginBottom: "4px",
        }}
      >
        {status}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            color: colors["Gray-600"],
            marginBottom: "4px",
          }}
        >
          {description}
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{
          fontSize: "14px",
          color: colors["Gray-500"],
          marginBottom: subItems ? "8px" : 0,
        }}
      >
        {time}
      </Typography>
      {subItems && subItems.length > 0 && (
        <Box sx={{ marginTop: "8px", paddingLeft: "16px" }}>
          {subItems.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                fontSize: "14px",
                color: colors["Gray-600"],
                marginBottom: "4px",
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default function ShipmentDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shipmentId = decryptAES(searchParams.get("id"));

  // Sample data - replace with API call using shipmentId
  const [shipmentData] = useState({
    shipmentId: shipmentId || "F-y390rks91",
    transitTime: "23 hrs 45 mins",
    packageType: "Medium",
    delivery: "On Time",
    weight: "2kg - 10kg",
    orderedPlaced: "10 Jun, at 02:00 pm",
    estimatedDelivery: "10 Jun, at 09:00 am",
    status: "Arrived at Pickup Airport",
    price: "SAR 120.00",
    vat: "SAR 2.00",
    totalPrice: "SAR 122.00",
    senderName: "Olivia Rhye",
    senderPhone: "+1 9877827388",
    pickupLocation: "21st Street, abc, Jeddah",
    receiverName: "Olivia Rhye",
    receiverPhone: "+1 9877827388",
    dropLocation: "21st Street, abc, Riyadh",
    inboundDeliveryCompany: "Mrsool",
    inboundDeliveryOrderId: "MR12345",
    inboundDeliveryPersonName: "Ahmed Ali",
    inboundPhoneNumber: "+966 8976543210",
    inboundAirportHandlerName: "Name goes here",
    inboundShipmentReceivedTime: "10:10 am",
    inboundLocationName: "12345",
    outboundDeliveryCompany: "Mrsool",
    outboundDeliveryOrderId: "MR12345",
    outboundDeliveryPersonName: "Ahmed Ali",
    outboundPhoneNumber: "+966 8976543210",
    outboundAirportHandlerName: "Name goes here",
    outboundShipmentDispatchedTime: "11:23 am",
    outboundZoneCode: "12345",
  });

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | React.ReactNode;
  }) => (
    <Box sx={{ marginBottom: "16px" }}>
      <Typography
        variant="body2"
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          color: colors["Gray-600"],
          marginBottom: "4px",
        }}
      >
        {label}:
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          color: colors["Gray-900"],
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <AdminLayout>
      <Box sx={{ padding: "24px" }}>
        {/* Header with Back Button */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: "24px" }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/shipments")}
            sx={{
              color: colors["Gray-700"],
              textTransform: "none",
              "&:hover": {
                backgroundColor: colors["Gray-50"],
              },
            }}
          >
            Back
          </Button>
          <Typography
            variant="h3"
            fontWeight={600}
            sx={{ color: colors["Gray-900"] }}
          >
            Shipment Details
          </Typography>
        </Stack>

        {/* Status Banner */}
        <Box
          sx={{
            backgroundColor: colors["Primary-50"],
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: colors["Primary-700"],
            }}
          >
            Status- {shipmentData.status}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderColor: colors["Error-600"],
                color: colors["Error-600"],
                "&:hover": {
                  borderColor: colors["Error-700"],
                  backgroundColor: colors["Error-50"],
                },
              }}
            >
              Cancel Shipment
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderColor: colors["Warning-600"],
                color: colors["Warning-600"],
                "&:hover": {
                  borderColor: colors["Warning-700"],
                  backgroundColor: colors["Warning-50"],
                },
              }}
            >
              On-Hold Shipment
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Shipment Details Card */}
            <Paper
              sx={{
                padding: "24px",
                borderRadius: "16px",
                marginBottom: "24px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: colors["Gray-900"],
                  marginBottom: "20px",
                }}
              >
                Shipment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InfoRow label="Shipment ID" value={shipmentData.shipmentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoRow label="Package" value={shipmentData.packageType} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoRow label="Weight" value={shipmentData.weight} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoRow
                    label="Ordered Placed"
                    value={shipmentData.orderedPlaced}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoRow
                    label="Estimated delivery"
                    value={shipmentData.estimatedDelivery}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Price Details Card */}
            <Paper
              sx={{
                padding: "24px",
                borderRadius: "16px",
                marginBottom: "24px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: colors["Gray-900"],
                  marginBottom: "20px",
                }}
              >
                Price details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <InfoRow label="Price" value={shipmentData.price} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoRow label="VAT" value={shipmentData.vat} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoRow
                    label="Total Price"
                    value={shipmentData.totalPrice}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Sender & Receiver Details Card */}
            <Paper
              sx={{
                padding: "24px",
                borderRadius: "16px",
                marginBottom: "24px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: colors["Gray-900"],
                      marginBottom: "20px",
                    }}
                  >
                    Sender details
                  </Typography>
                  <InfoRow
                    label="Sender's Name"
                    value={shipmentData.senderName}
                  />
                  <InfoRow
                    label="Phone Number"
                    value={shipmentData.senderPhone}
                  />
                  <InfoRow
                    label="Pickup location"
                    value={shipmentData.pickupLocation}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: colors["Gray-900"],
                      marginBottom: "20px",
                    }}
                  >
                    Receiver details
                  </Typography>
                  <InfoRow
                    label="Receiver's Name"
                    value={shipmentData.receiverName}
                  />
                  <InfoRow
                    label="Phone Number"
                    value={shipmentData.receiverPhone}
                  />
                  <InfoRow
                    label="Drop location"
                    value={shipmentData.dropLocation}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Map Placeholder */}
            <Paper
              sx={{
                padding: "24px",
                borderRadius: "16px",
                marginBottom: "24px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors["Gray-50"],
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: colors["Gray-500"] }}
              >
                Map View - Route from {shipmentData.pickupLocation} to{" "}
                {shipmentData.dropLocation}
              </Typography>
            </Paper>

            {/* Inbound & Outbound Shipment Details */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: colors["Gray-900"],
                      marginBottom: "20px",
                    }}
                  >
                    Inbound Shipment Details
                  </Typography>
                  <InfoRow
                    label="Delivery company"
                    value={shipmentData.inboundDeliveryCompany}
                  />
                  <InfoRow
                    label="Delivery Order ID"
                    value={shipmentData.inboundDeliveryOrderId}
                  />
                  <InfoRow
                    label="Delivery Person Name"
                    value={shipmentData.inboundDeliveryPersonName}
                  />
                  <InfoRow
                    label="phone number"
                    value={shipmentData.inboundPhoneNumber}
                  />
                  <InfoRow
                    label="Airport handler name"
                    value={shipmentData.inboundAirportHandlerName}
                  />
                  <InfoRow
                    label="Shipment received time"
                    value={shipmentData.inboundShipmentReceivedTime}
                  />
                  <InfoRow
                    label="Location Name"
                    value={shipmentData.inboundLocationName}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: colors["Gray-900"],
                      marginBottom: "20px",
                    }}
                  >
                    Outbound Shipment Details
                  </Typography>
                  <InfoRow
                    label="Delivery company"
                    value={shipmentData.outboundDeliveryCompany}
                  />
                  <InfoRow
                    label="Delivery Order ID"
                    value={shipmentData.outboundDeliveryOrderId}
                  />
                  <InfoRow
                    label="Delivery Person Name"
                    value={shipmentData.outboundDeliveryPersonName}
                  />
                  <InfoRow
                    label="phone number"
                    value={shipmentData.outboundPhoneNumber}
                  />
                  <InfoRow
                    label="Airport handler name"
                    value={shipmentData.outboundAirportHandlerName}
                  />
                  <InfoRow
                    label="Shipment dispatched time"
                    value={shipmentData.outboundShipmentDispatchedTime}
                  />
                  <InfoRow
                    label="Zone Code"
                    value={shipmentData.outboundZoneCode}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column - Shipment Status Timeline */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: "24px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: colors["Gray-900"],
                  marginBottom: "24px",
                }}
              >
                Shipment Status
              </Typography>
              <TimelineItem
                status="Order confirmed"
                description="(Driver is on its way)"
                time="Aug 9, 3:19pm"
                isCompleted={true}
                isActive={false}
              />
              <TimelineItem
                status="Picked Up by Partner"
                description="Estimated by 10:00 pm"
                time=""
                isCompleted={false}
                isActive={true}
              />
              <TimelineItem
                status="Arrived at Pickup Airport/Carrier"
                description="In Transit"
                time=""
                isCompleted={false}
                isActive={true}
                subItems={[
                  "Nanimo, BC CA at Aug 10, 9:19pm",
                  "Dammam, BC CA at Aug 11, 4:19pm",
                  "Khobar, BC CA at Aug 12, 3:19pm",
                ]}
              />
              <TimelineItem
                status="Arrived at Destination Airport"
                description=""
                time="Khobar, BC CA at Aug 12, 4:19pm"
                isCompleted={false}
                isActive={false}
              />
              <TimelineItem
                status="Delivered to Recipient"
                description=""
                time="Delivered on: Jun 10, 01:45 pm"
                isCompleted={false}
                isActive={false}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

