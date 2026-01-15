import i18n from '../locales';

export const colors = {
  // Health-Nav
  "Base-White": "#FFFFFF",
  "Base-Black": "#000000",
  "Gray-50": "#F9FAFB",
  "Gray-100": "#F3F4F6",
  "Gray-200": "#E5E7EB",
  "Gray-300": "#D2D6DB",
  "Gray-400": "#9DA4AE",
  "Gray-500": "#6C737F",
  "Gray-600": "#4D5761",
  "Gray-700": "#384250",
  "Gray-800": "#1F2A37",
  "Gray-900": "#111927",
  "Gray-1000": "#475467",
  "Primary-50": "#e3f0f8",
  "Primary-100": "#bad8ef",
  "Primary-200": "#90c0e5",
  "Primary-300": "#69a8d9",
  "Primary-400": "#4e97d3",
  "Primary-500": "#3786cc",
  "Primary-600": "#307abf",
  "Primary-700": "#2869ad",
  "Primary-800": "#21599b",
  "Primary-900": "#153c7c",
  "Error-50": "#FEF3F2",
  "Error-100": "#FEE4E2",
  "Error-200": "#FECDCA",
  "Error-300": "#FDA29B",
  "Error-400": "#F97066",
  "Error-500": "#F04438",
  "Error-600": "#D92D20",
  "Error-700": "#B42318",
  "Error-800": "#912018",
  "Error-900": "#7A271A",
  "Warning-50": "#FFFAEB",
  "Warning-100": "#FEF0C7",
  "Warning-200": "#FEDF89",
  "Warning-300": "#FEC84B",
  "Warning-400": "#FDB022",
  "Warning-500": "#F79009",
  "Warning-600": "#DC6803",
  "Warning-700": "#B54708",
  "Warning-800": "#93370D",
  "Warning-900": "#7A2E0E",
  "Success-50": "#ECFDF3",
  "Success-100": "#D1FADF",
  "Success-200": "#A6F4C5",
  "Success-300": "#6CE9A6",
  "Success-400": "#32D583",
  "Success-500": "#12B76A",
  "Success-600": "#039855",
  "Success-700": "#027A48",
  "Success-800": "#05603A",
  "Success-900": "#054F31",
};

export function getAPPUserDialogContent(type: string) {
  const t = i18n.t;
  switch (type) {
    case "block":
      return {
        title: t("blockUser.title"),
        subtitle: t("blockUser.subtitle"),
        reason: t("blockUser.reason")
      };
    case "delete":
      return {
        title: t("deleteUser.title"),
        subtitle: t("deleteUser.subtitle"),
        reason: t("deleteUser.reason")
      };
    case "reactive":
      return {
        title: t("reactivateUser.title"),
        subtitle: t("reactivateUser.subtitle"),
        reason: t("reactivateUser.reason")
      };
    case "blockBulk":
      return {
        title: t("blockBulkUsers.title"),
        subtitle: t("blockBulkUsers.subtitle"),
        reason: t("blockBulkUsers.reason")
      };
    case "deleteBulk":
      return {
        title: t("deleteBulkUsers.title"),
        subtitle: t("deleteBulkUsers.subtitle"),
        reason: t("deleteBulkUsers.reason")
      };
    case "reactiveBulk":
      return {
        title: t("reactivateBulkUsers.title"),
        subtitle: t("reactivateBulkUsers.subtitle"),
        reason: t("reactivateBulkUsers.reason")
      };
    default:
      return {
        title: "",
        subtitle: "",
        reason: ""
      };
  }
}
export function getAdminUserDialogContent(type: string) {
  const t = i18n.t;
  switch (type) {
    case "block":
      return {
        title: t("blockSubAdmin.title"),
        subtitle: t("blockSubAdmin.subtitle"),
        reason: t("blockSubAdmin.reason")
      };
    case "delete":
      return {
        title: t("deleteSubAdmin.title"),
        subtitle: t("deleteSubAdmin.subtitle"),
        reason: t("deleteSubAdmin.reason")
      };
    case "reactive":
      return {
        title: t("reactivateSubAdmin.title"),
        subtitle: t("reactivateSubAdmin.subtitle"),
        reason: t("reactivateSubAdmin.reason")
      };
    case "blockBulk":
      return {
        title: t("blockBulkSubAdmins.title"),
        subtitle: t("blockBulkSubAdmins.subtitle"),
        reason: t("blockBulkSubAdmins.reason")
      };
    case "deleteBulk":
      return {
        title: t("deleteBulkSubAdmins.title"),
        subtitle: t("deleteBulkSubAdmins.subtitle"),
        reason: t("deleteBulkSubAdmins.reason")
      };
    case "reactiveBulk":
      return {
        title: t("reactivateBulkSubAdmins.title"),
        subtitle: t("reactivateBulkSubAdmins.subtitle"),
        reason: t("reactivateBulkSubAdmins.reason")
      };
    default:
      return {
        title: "",
        subtitle: "",
        reason: ""
      };
  }
}
export function getContentLibraryDialogContent(type: string) {
  const t = i18n.t;
  switch (type) {
    case "publish":
      return {
        title: t("publishContent.title"),
        subtitle: t("publishContent.subtitle"),
      };
    case "delete":
      return {
        title: t("deleteContent.title"),
        subtitle: t("deleteContent.subtitle"),
      };
    case "hidden":
      return {
        title: t("hideContent.title"),
        subtitle: t("hideContent.subtitle"),
      };
    case "publishBulk":
      return {
        title: t("publishBulkContent.title"),
        subtitle: t("publishBulkContent.subtitle"),
      };
    case "deleteBulk":
      return {
        title: t("deleteBulkContent.title"),
        subtitle: t("deleteBulkContent.subtitle"),
      };
    case "hiddenBulk":
      return {
        title: t("hideBulkContent.title"),
        subtitle: t("hideBulkContent.subtitle"),
      };
    default:
      return {
        title: "",
        subtitle: "",
      };
  }
}
// These filter lists need to be functions to access translations dynamically
export const getContentLibraryFilterList = () => {
  const t = i18n.t;
  return [
    {
      title: t("active"),
      value: "active",
    },
    {
      title: t("hidden"),
      value: "hidden",
    },
    {
      title: t("deleted"),
      value: "deleted",
    },
  ];
};

export const getSupportStatusFilterList = () => {
  const t = i18n.t;
  return [
    {
      title: t("ongoing"),
      value: "ongoing",
    },
    {
      title: t("resolved"),
      value: "resolved",
    },
  ];
};

export const getAdminUserStatusFilterList = () => {
  const t = i18n.t;
  return [
    {
      title: t("active"),
      value: "active",
    },
    {
      title: t("blocked"),
      value: "blocked",
    },
    {
      title: t("deleted"),
      value: "deleted",
    },
  ];
};

export const getAdminUserRoleFilterList = () => {
  const t = i18n.t;
  return [
    {
      title: t("superAdmin"),
      value: "super-admin",
    },
    {
      title: t("contentModerator"),
      value: "content-moderator",
    },
    {
      title: t("marketing"),
      value: "marketing",
    },
    {
      title: t("complianceOfficer"),
      value: "compliance-officer",
    },
    {
      title: t("supportDesk"),
      value: "support-desk",
    }
  ];
};

export const getAppUserStatusFilterList = () => {
  const t = i18n.t;
  return [
    {
      title: t("active"),
      value: "active",
    },
    {
      title: t("blocked"),
      value: "blocked",
    },
    {
      title: t("deleted"),
      value: "deleted",
    },
  ];
};

// Keep old exports for backward compatibility (will be deprecated)
export const contentLibraryFilterList = getContentLibraryFilterList();
export const supportStatusFilterList = getSupportStatusFilterList();
export const AdminUserStatusFilterList = getAdminUserStatusFilterList();
export const AdminUserRoleFilterList = getAdminUserRoleFilterList();
export const AppUserStatusFilterList = getAppUserStatusFilterList();

export const accessRights = [
  { label: "App users", value: "689072215b454dbe03014d93" },
  { label: "User Cohorts", value: "689072215b454dbe03014d94" },
  {
    label: "Content Moderation",
    value: "689072215b454dbe03014d95",
    children: [
      { label: "Content Library", value: "689072265b454dbe03014d9b" },
      { label: "Flagged Content Reports", value: "689072265b454dbe03014d9c" },
      { label: "Vetting Logs", value: "689072265b454dbe03014d9d" },
      { label: "Scrapper Logs", value: "689072265b454dbe03014d9e" },
      { label: "Manage Tags", value: "689072265b454dbe03014d9f" },
      { label: "Manage Categories", value: "689072265b454dbe03014da0" },
    ],
  },
  { label: "Notification Management", value: "689072215b454dbe03014d96" },
  { label: "Support Tickets", value: "689072215b454dbe03014d97" },
  {
    label: "Audit reports",
    value: "689072215b454dbe03014d98",
    children: [
      {
        label: "User Login and Security Logs",
        value: "689072265b454dbe03014da1",
      },
      { label: "Administration Logs", value: "689072265b454dbe03014da2" },
      { label: "Data Deletion Logs", value: "689072265b454dbe03014da3" },
    ],
  },
  { label: "Manage Legal Docs", value: "689072215b454dbe03014d99" },
  {
    label: "Manage Admin Users",
    value: "689072215b454dbe03014d9a",
    children: [
      { label: "Admin Users", value: "689072265b454dbe03014da4" },
      { label: "Role Access", value: "689072265b454dbe03014da5" },
    ],
  },
];