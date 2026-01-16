import { Stack } from "@mui/material";
import AdminLayout from "../../../layouts/AdminLayout";
import CustomerInfoCard from "./CustomerDetails";
import AddressDetailsCard from "./AddressDetails";

export default function CustomerDetails() {
    return (
        <AdminLayout>
            <Stack gap={1.5}>
                <CustomerInfoCard />
                <AddressDetailsCard />
            </Stack>
        </AdminLayout>
    );
}
