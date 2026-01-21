import { useState } from "react";
import { Box, Stack, Typography, IconButton, Divider, useTheme } from "@mui/material";
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

export default function ShipmentDetailsCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";

  const [dialogType, setDialogType] = useState<"cancel" | "onHold" | null>(null);

  const handleOpenDialog = (type: "cancel" | "onHold") => {
    setDialogType(type);
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  const handleConfirm = (data: any) => {
    console.log("Confirmed action:", dialogType, data);
    handleCloseDialog();
  };

  const dialogContent = () => {
    if (dialogType === "cancel") {
      return (
        <CommonActionDialog
          title={t("shipmentDetails.dialogs.cancel.title")}
          subtitle={t("shipmentDetails.dialogs.cancel.subtitle")}
          reason={t("shipmentDetails.dialogs.cancel.reasonLabel")}
          placeholder={t("shipmentDetails.dialogs.placeholder")}
          handleCancel={handleCloseDialog}
          onSubmit={handleConfirm}
        />
      );
    }
    if (dialogType === "onHold") {
      return (
        <CommonActionDialog
          title={t("shipmentDetails.dialogs.onHold.title")}
          subtitle={t("shipmentDetails.dialogs.onHold.subtitle")}
          reason={t("shipmentDetails.dialogs.onHold.reasonLabel")}
          placeholder={t("shipmentDetails.dialogs.placeholder")}
          handleCancel={handleCloseDialog}
          onSubmit={handleConfirm}
        />
      );
    }
    return <></>;
  };

  return (
    <Box
      component="section"
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
            {t("shipmentDetails.title")}
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
          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: colors["Gray-600"],
            }}
          >
            {t("shipmentDetails.status")}
          </Box>
          {t("shipmentDetails.arrivedAtPickup")}
        </Typography>
      </Stack>

      {/* Shipment ID and Action Buttons Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ padding: "10px 10px !important" }}
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
            {t("shipmentDetails.shipmentId")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: colors["Gray-900"],
            }}
          >
            F-y390rks91
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
            fullWidth={false}
            sx={{ width: { xs: "100%", sm: "auto" } }}
            onClick={() => handleOpenDialog("cancel")}
          >
            {t("shipmentDetails.cancelShipment")}
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            buttonType="secondary"
            buttonStyle="rounded"
            fullWidth={false}
            sx={{ width: { xs: "100%", sm: "auto" } }}
            onClick={() => handleOpenDialog("onHold")}
          >
            {t("shipmentDetails.onHoldShipment")}
          </StyledActionButton>
        </Stack>
      </Stack>

      {/* Package and Timeline Information Section */}
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
        <InfoItem label={t("shipmentDetails.package")} value="Medium" />
        <InfoItem label={t("shipmentDetails.weight")} value="2kg - 10kg" />
        <InfoItem label={t("shipmentDetails.orderedPlaced")} value="10 Jun, at 02:00 pm" />
        <InfoItem label={t("shipmentDetails.estimatedDelivery")} value="10 Jun, at 09:00 am" />
      </Box>

      <Divider />

      {/* Price Details Section */}
      <Box sx={{ padding: "10px 10px !important" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: colors["Gray-900"],
            marginBottom: 2,
          }}
        >
          {t("shipmentDetails.priceDetails")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          <InfoItem label={t("shipmentDetails.price")} value="SAR 120.00" />
          <InfoItem label={t("shipmentDetails.vat")} value="SAR 2.00" />
          <InfoItem label={t("shipmentDetails.totalPrice")} value="SAR 122.00" />
        </Box>
      </Box>

      <GlobalDialog
        open={!!dialogType}
        handleClose={handleCloseDialog}
        component={dialogContent()}
      />
    </Box>
  );
}
