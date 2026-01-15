
// Updated AdminLayout.tsx with theme-based typography, palette usage, and cleaned-up code

import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Divider,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowDown,
} from "@mui/icons-material";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../rtk/feature/authSlice";
import GlobalDialog from "../components/dialog";
import CommonDialog from "../components/dialog/dialog-content/CommonDialog";
import { useLogoutMutation } from "../rtk/endpoints/authApi";
import { decryptAES } from "../utils/helper";
import LanguageMenu from "../components/language-switcher/LanguageMenu";
import createAppTheme from "../theme";
import type { RootState } from "../rtk/store";

function Action() {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleChangePassword = () => {
    navigate("/change-password");
    handleMenuClose();
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleLogout = () => {
    setOpenDialog(true);
    handleMenuClose();
  };
  const handleLogoutConfirm = async () => {
    try {
      await logout({});
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box display="flex" alignItems="center" gap={1}>
          <Stack direction="row" onClick={handleMenuClick} alignItems="center">
            <Stack
              direction="column"
              gap={0}
              sx={{ display: { xs: "none", sm: "flex" }, marginRight: "60px" }}
            >
              <Typography variant="headerTitle">Admin Flygow</Typography>
              <Typography variant="headerSubtitle" color="secondary.500">
                adminflygow@yopmail.com
              </Typography>
            </Stack>
            <IconButton size="small">
              <KeyboardArrowDown />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          maxWidth: "300px",
          py: 2,
          "& .MuiPaper-root": {
            borderRadius: 2.5,
            width: "270px",
            minWidth: "270px",
            top: "70px !important",
          },
        }}
      >
        <Stack sx={{ display: { xs: "flex", sm: "flex" }, px: 2, mt: 1 }}>
          <Typography variant="headerTitle">Admin Flygow</Typography>
          <Typography variant="headerSubtitle" sx={{ wordWrap: "break-word" }}>
            adminflygow@yopmail.com
          </Typography>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        <MenuItem sx={{ fontSize: "14px", fontWeight: 400, color: "#384250" }} onClick={handleChangePassword}>
          {t("changePassword.title")}
        </MenuItem>
        <Divider sx={{ mt: 2 }} />
        <LanguageMenu onClose={handleMenuClose} />
        <Divider sx={{ mt: 2 }} />

        <MenuItem sx={{ fontSize: "14px", fontWeight: 400, color: "#384250" }} onClick={handleLogout}>
          {t("logout.confirm")}
        </MenuItem>
      </Menu>

      <GlobalDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        component={
          <CommonDialog
            handleCancel={handleCloseDialog}
            title={t("logout.title")}
            subTitle={t("logout.message")}
            handleConfirm={handleLogoutConfirm}
          />
        }
      />
    </>
  );
}

function useToolpadRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const normalizePathname = React.useCallback((pathname: string) => {
    const rules: Array<{ pattern: RegExp; normalized: string }> = [
      // Airport Operations sub-routes
      { pattern: /^\/airport-operations\/master-city-table(?:\/.*)?$/i, normalized: "/airport-operations/master-city-table" },
      { pattern: /^\/airport-operations\/airport-location(?:\/.*)?$/i, normalized: "/airport-operations/airport-location" },
      { pattern: /^\/airport-operations\/shipment-pricing(?:\/.*)?$/i, normalized: "/airport-operations/shipment-pricing" },
      { pattern: /^\/airport-operations\/delivery-assignment(?:\/.*)?$/i, normalized: "/airport-operations/delivery-assignment" },

      // Content Moderation → Manage Categories and its deep routes
      { pattern: /^\/content-moderation\/manage-categories\/sub-category-detail\/.*/i, normalized: "/content-moderation/manage-categories" },
      { pattern: /^\/content-moderation\/manage-categories\/.*/i, normalized: "/content-moderation/manage-categories" },

      // Content Moderation → Content Library detail
      { pattern: /^\/content-moderation\/content-library\/content-detail(?:\/.*)?$/i, normalized: "/content-moderation/content-library" },

      // Content Moderation → Flagged Content Reports detail
      { pattern: /^\/content-moderation\/flagged-content-reports-detail(?:\/.*)?$/i, normalized: "/content-moderation/flagged-content-reports" },

      // Content Moderation → Scrapper Logs detail
      { pattern: /^\/content-moderation\/scrapper-logs\/scrapper-log-detail(?:\/.*)?$/i, normalized: "/content-moderation/scrapper-logs" },

      // Manage Admin Users → Admin Users detail
      { pattern: /^\/manage-admin-users\/admin-users\/admin-users-detail(?:\/.*)?$/i, normalized: "/manage-admin-users/admin-users" },

      // App Users → User details
      { pattern: /^\/app-users\/user-details(?:\/.*)?$/i, normalized: "/app-users" },
    ];

    for (const { pattern, normalized } of rules) {
      if (pattern.test(pathname)) return normalized;
    }
    return pathname;
  }, []);

  return {
    pathname: normalizePathname(location.pathname),
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => navigate(path.toString()),
  };
}

// Custom hook to determine which navigation item should be selected based on path
function useNavigationSelection() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to check if a path should be considered selected
  const isPathSelected = (segment: string) => {
    // Remove leading slash and split path
    const pathParts = currentPath.replace(/^\//, '').split('/');
    
    // Check if the segment matches any part of the current path
    return pathParts.includes(segment);
  };

  return { isPathSelected, currentPath };
}

export default function AdminLayout(props: any) {
  const { t } = useTranslation();
  const direction = useSelector((state: RootState) => state.language.direction);
  const muiTheme = useTheme();
  const appTheme = createAppTheme(direction);
  const { window } = props;
  const router = useToolpadRouter();
  const { isPathSelected } = useNavigationSelection();

  // Add data attributes to navigation items for custom selection
  React.useEffect(() => {
    const addDataAttributes = () => {
      const navigationItems = document.querySelectorAll('.MuiListItemButton-root');
      navigationItems.forEach((item) => {
        const textElement = item.querySelector('.MuiTypography-root');
        if (textElement) {
          const text = textElement.textContent?.toLowerCase().replace(/\s+/g, '-');
          if (text) {
            // Map text to segment names
            const segmentMap: { [key: string]: string } = {
              'dashboard': 'dashboard',
              'shipments': 'shipments',
              'customers': 'customers',
              'airport-handler': 'airport-handler',
              'transactions': 'transactions',
              'notification-management': 'notification-management',
              'manage-legal-docs': 'manage-legal-docs',
              'airport-operations': 'airport-operations',
              'manage-admin-users': 'manage-admin-users',
              'coupon-management': 'coupon-management',
              // Children mapping to enable submenu selection
              'master-city-table': 'master-city-table',
              'airport-location': 'airport-location',
              'shipment-pricing': 'shipment-pricing',
              'delivery-assignment': 'delivery-assignment',
              'admin-users': 'admin-users',
              'user-roles': 'user-roles',
            };
            
            const segment = segmentMap[text];
            if (segment) {
              item.setAttribute('data-segment', segment);
            }
          }
        }
      });
    };

    // Add a small delay to ensure the navigation is rendered
    const timer = setTimeout(addDataAttributes, 100);
    return () => clearTimeout(timer);
  }, []);

  const NAVIGATION: Navigation = [
    { 
      segment: "dashboard", 
      title: t("dashboard"), 
      icon: <Box sx={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #384250" }} />
    },
    { 
      segment: "shipments", 
      title: t("shipments"), 
      icon: <Box sx={{ width: 24, height: 24, backgroundColor: "#12B76A", borderRadius: 1 }} />
    },
    { 
      segment: "customers", 
      title: t("customers"), 
      icon: <Box sx={{ width: 24, height: 24, backgroundColor: "#384250", borderRadius: "50%" }} />
    },
    { 
      segment: "airport-handler", 
      title: t("airportHandler"), 
      icon: <Box sx={{ width: 24, height: 24, backgroundColor: "#384250", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
    },
    { 
      segment: "transactions", 
      title: t("transactions"), 
      icon: <Box sx={{ width: 24, height: 24, backgroundColor: "#384250", borderRadius: 1 }} />
    },
    {
      segment: "notification-management",
      title: t("notificationManagement"),
      icon: <img src="/assets/icons/NotificationManagement.svg" alt="Notification Management" style={{ width: 24, height: 24 }} />,
    },
    {
      segment: "manage-legal-docs",
      title: t("manageLegalDocs"),
      icon: <img src="/assets/icons/ManageLegalDocs.svg" alt="Manage Legal Docs" style={{ width: 24, height: 24 }} />,
    },
    {
      segment: "airport-operations",
      title: t("airportOperations"),
      icon: <Box sx={{ width: 24, height: 24, backgroundColor: "#12B76A", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />,
      children: [
        { segment: "master-city-table", title: t("masterCityTable") },
        { segment: "airport-location", title: t("airportLocation") },
        { segment: "shipment-pricing", title: t("shipmentPricing") },
        { segment: "delivery-assignment", title: t("deliveryAssignment") },
      ],
    },
    {
      segment: "manage-admin-users",
      title: t("manageAdminUsers"),
      icon: <img src="/assets/icons/ManageAdminUsers.svg" alt="Manage Admin Users" style={{ width: 24, height: 24 }} />,
      children: [
        { segment: "admin-users", title: t("adminUsers") },
        { segment: "user-roles", title: t("userRoles") },
      ],
    },
    {
      segment: "coupon-management",
      title: t("couponManagement"),
      icon: <Box sx={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #384250", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>%</Box>,
    },
  ];
  const isXs = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isMd = useMediaQuery(muiTheme.breakpoints.down('md'));

  const sidebarWidth = isXs ? "100%" : (isMd ? "70%" : 240);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={appTheme}
      window={window ? window() : undefined}
    >
      <DashboardLayout
        disableCollapsibleSidebar={true}
        sx={{
          backgroundColor: muiTheme.palette.background.default,
          "& .MuiCollapse-wrapperInner .MuiList-root":{
            padding: "0px !important",
          },
          "& .MuiDrawer-paper": {
            backgroundColor: muiTheme.palette.background.default,
            border: "none",
          },
          "& .MuiBox-root": { 
            padding: "2px",
            scrollbarWidth: "none",
          },
          "& .MuiListItemButton-root": {
            backgroundColor: "#fff",
            marginBottom: 1.5,
          },
          "& .MuiListItemButton-root.Mui-selected": {
            backgroundColor: muiTheme.palette.primary.light,
            position: "relative", // Ensure relative positioning for pseudo-element
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 14, // decreased height
              bottom: 14, // decreased height
              width: "4px", // thickness of the line
              borderRadius: "4px",
              backgroundColor: "#0E6A37",
              display: "block",
            },
          },
          "& .MuiListItemButton-root.Mui-selected .MuiTypography-root": {
            color: "#0E6A37",
          },
          // Set selected icon color to match selected text color (for <img> SVGs, use filter)
          // "& .MuiListItemButton-root.Mui-selected img": {
          //   filter: "invert(41%) sepia(97%) saturate(747%) hue-rotate(186deg) brightness(101%) contrast(101%)",
          // },
          "& .MuiListItemButton-root.Mui-selected img": {
            filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
          },
          // Custom navigation selection based on path
          ...(isPathSelected("dashboard") && {
            "& .MuiListItemButton-root[data-segment='dashboard']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("shipments") && {
            "& .MuiListItemButton-root[data-segment='shipments']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("customers") && {
            "& .MuiListItemButton-root[data-segment='customers']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("airport-handler") && {
            "& .MuiListItemButton-root[data-segment='airport-handler']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("transactions") && {
            "& .MuiListItemButton-root[data-segment='transactions']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("coupon-management") && {
            "& .MuiListItemButton-root[data-segment='coupon-management']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...((isPathSelected("airport-operations") || isPathSelected("master-city-table") || isPathSelected("airport-location") || isPathSelected("shipment-pricing") || isPathSelected("delivery-assignment")) && {
            "& .MuiListItemButton-root[data-segment='airport-operations']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("master-city-table") && {
            "& .MuiListItemButton-root[data-segment='master-city-table']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("airport-location") && {
            "& .MuiListItemButton-root[data-segment='airport-location']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("shipment-pricing") && {
            "& .MuiListItemButton-root[data-segment='shipment-pricing']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("delivery-assignment") && {
            "& .MuiListItemButton-root[data-segment='delivery-assignment']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
            },
          }),
          ...(isPathSelected("user-cohorts") && {
            "& .MuiListItemButton-root[data-segment='user-cohorts']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          ...(isPathSelected("content-moderation") && {
            "& .MuiListItemButton-root[data-segment='content-moderation']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          // Ensure Manage Categories submenu is selected on its pages and nested details
          ...((isPathSelected("manage-categories") || isPathSelected("category-detail") || isPathSelected("sub-category-detail")) && {
            "& .MuiListItemButton-root[data-segment='manage-categories']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          ...(isPathSelected("notification-management") && {
            "& .MuiListItemButton-root[data-segment='notification-management']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          ...(isPathSelected("support-tickets") && {
            "& .MuiListItemButton-root[data-segment='support-tickets']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          ...(isPathSelected("audit-reports") && {
            "& .MuiListItemButton-root[data-segment='audit-reports']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          ...(isPathSelected("manage-legal-docs") && {
            "& .MuiListItemButton-root[data-segment='manage-legal-docs']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          ...(isPathSelected("manage-admin-users") && {
            "& .MuiListItemButton-root[data-segment='manage-admin-users']": {
              backgroundColor: muiTheme.palette.primary.light,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 14,
                bottom: 14,
                width: "4px",
                borderRadius: "4px",
                backgroundColor: "#0E6A37",
                display: "block",
              },
              "& .MuiTypography-root": {
                color: "#0E6A37",
              },
              "& img": {
                filter: "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)",
              },
            },
          }),
          "& .MuiListItemIcon-root": {
            minWidth: "28px",
          },
          "& .MuiListItemText-root .MuiTypography-root": {
            fontSize: "13px",
            whiteSpace: "break-spaces",
            lineHeight: "0.885rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          "& .MuiAppBar-root": {
            backgroundColor: muiTheme.palette.background.default,
            border: "none",
          },
        }}
        slots={{ toolbarActions: Action }}
        branding={{
          logo: (
            <Box display="flex" alignItems="center">
              <img
                src="/assets/icons/flygow_logo_dashboard.svg"
                alt="Flygow Logo"
                style={{ width: "208px", height: "68px", marginRight: "4px" }}
              />
            </Box>
          ),
          title: "",
        }}
        sidebarExpandedWidth={sidebarWidth}
      >
        <Box sx={{ p: 2, marginTop: "0px !important" }}>
          <PageContainer
            sx={{
              backgroundColor: muiTheme.palette.primary.light,
              borderRadius: 6,
              boxShadow: 1,
              p: 2,
              "& .MuiBox-root": {
                marginTop: 0,
              },
              "& .MuiStack-root": {
                marginTop: 0,
              },
            }}
            title=""
            breadcrumbs={[]}
          >
            {props.children}
          </PageContainer>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
