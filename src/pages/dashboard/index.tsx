import { Typography, Box } from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" sx={{ color: "#111927" }}>
          Dashboard
        </Typography>
      </Box>
    </AdminLayout>
  );
}

