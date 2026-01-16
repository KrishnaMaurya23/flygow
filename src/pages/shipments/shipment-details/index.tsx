import {  Stack } from "@mui/material";
import AdminLayout from "../../../layouts/AdminLayout";
import ShipmentDetailsCard from "./ShipmentDetails";
import SenderDetailsCard from "./SenderDetails";
import ShipmentStatusCard from "./ShipmentStatus";

export default function ShipmentDetails() {
  return (
    <AdminLayout>
      <Stack  gap={1.5}>
      <ShipmentDetailsCard />
        <SenderDetailsCard />
        <ShipmentStatusCard />
      </Stack>
    </AdminLayout>
  );
}