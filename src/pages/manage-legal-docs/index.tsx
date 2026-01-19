import { Box, Typography } from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";
import GlobalTable from "../../components/globaltable";
import { createLegalDocsData, LegalDocsColumns } from "../../utils/types";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useGetLegalDocsListQuery } from "../../rtk/endpoints/adminApi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const mapNameToPath = (name: string) => {
  const key = name.trim().toLowerCase();
  if (key.includes("privacy")) return "/manage-legal-docs/privacy-policy";
  if (key.includes("term")) return "/manage-legal-docs/term-condition";
  if (key.includes("faq")) return "/manage-legal-docs/faqs";
  if (key.includes("about")) return "/manage-legal-docs/about-us";
  return "/manage-legal-docs";
};
const staticLegalDocs = [
  { name: "Privacy Policy", lastUpdatedOn: new Date().toISOString() },
  { name: "Term and Condition", lastUpdatedOn: new Date().toISOString() },
  { name: "FAQs", lastUpdatedOn: new Date().toISOString() },
  { name: "About Us", lastUpdatedOn: new Date().toISOString() },
];

export default function ManageLegalDocs() {
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const { data } = useGetLegalDocsListQuery({ sort });

  const rows = useMemo(() => {
    const list: { name: string; lastUpdatedOn: string }[] =
      data?.data?.data && data.data.data.length > 0 ? data.data.data : staticLegalDocs;
    return list.map((item) =>
      createLegalDocsData(
        <Link
          to={mapNameToPath(item.name)}
          style={{
            textDecoration: "none",
            color: "#000",
            display: "block",
            width: "100%",
          }}
        >
          {item.name}
        </Link>,
        dayjs.utc(item.lastUpdatedOn).format("YYYY-MM-DD hh:mm A [UTC]")
      )
    );
  }, [data]);
  return (
    <AdminLayout>
      <Box mb={3} sx={{
        display: "flex", flexDirection: "column", gap: 2,
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "24px !important",
      }}>
        <Typography variant="h4" fontWeight={600}>
          {/* Manage Legal Docs */}
          Legal and Support Docs
        </Typography>

        <GlobalTable rows={rows} columns={LegalDocsColumns} order={sort}
          setOrder={setSort} />
      </Box>
    </AdminLayout>
  );
}
