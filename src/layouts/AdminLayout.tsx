
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
import type { SxProps, Theme } from "@mui/material";
import {
  KeyboardArrowDown,
} from "@mui/icons-material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// @ts-ignore
import { prefixer } from "stylis";
// @ts-ignore
import rtlPlugin from "stylis-plugin-rtl";
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
import LanguageMenu from "../components/language-switcher/LanguageMenu";
import createAppTheme from "../theme";
import type { RootState } from "../rtk/store";

// Constants
const SELECTED_ITEM_COLOR = "#0E6A37";
const SELECTED_INDICATOR_WIDTH = "4px";
const SELECTED_INDICATOR_TOP = 14;
const SELECTED_INDICATOR_BOTTOM = 14;
const ICON_FILTER = "invert(30%) sepia(98%) saturate(7470%) hue-rotate(215deg) brightness(103%) contrast(104%)";

const MENU_ITEM_SX: SxProps<Theme> = {
  fontSize: "14px",
  fontWeight: 400,
  color: "#384250",
};

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'mui',
});

// Helper function to generate selected navigation item styles
const getSelectedItemStyles = (theme: Theme, includeImageFilter = false): SxProps<Theme> => ({
  backgroundColor: theme.palette.primary.light,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: SELECTED_INDICATOR_TOP,
    bottom: SELECTED_INDICATOR_BOTTOM,
    width: SELECTED_INDICATOR_WIDTH,
    borderRadius: SELECTED_INDICATOR_WIDTH,
    backgroundColor: SELECTED_ITEM_COLOR,
    display: "block",
  },
  "& .MuiTypography-root": {
    color: SELECTED_ITEM_COLOR,
  },
  ...(includeImageFilter && {
    "& img": {
      filter: ICON_FILTER,
    },
  }),
});

// Navigation icon components
const NavigationIcon: React.FC<{ variant: string }> = ({ variant }) => {
  const iconStyles: { [key: string]: SxProps<Theme> } = {
    dashboard: { width: 24, height: 24, borderRadius: "50%", border: "2px solid #384250" },
    shipments: { width: 24, height: 24, backgroundColor: "#12B76A", borderRadius: 1 },
    customers: { width: 24, height: 24, backgroundColor: "#384250", borderRadius: "50%" },
    "airport-handler": { width: 24, height: 24, backgroundColor: "#384250", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    transactions: { width: 24, height: 24, backgroundColor: "#384250", borderRadius: 1 },
    "airport-operations": { width: 24, height: 24, backgroundColor: "#12B76A", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
    "coupon-management": { width: 24, height: 24, borderRadius: "50%", border: "2px solid #384250", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" },
  };

  if (variant === "coupon-management") {
    return (
      <Box sx={iconStyles[variant]}>%</Box>
    );
  }

  return <Box sx={iconStyles[variant] || iconStyles.dashboard} />;
};

// User info component
const UserInfo: React.FC<{ showInMenu?: boolean }> = ({ showInMenu = false }) => (
  <Stack
    direction="column"
    gap={0}
    sx={{
      display: { xs: showInMenu ? "flex" : "none", sm: "flex" },
      ...(showInMenu ? { px: 2, mt: 1 } : { marginRight: "60px" }),
    }}
  >
    <Typography variant="headerTitle">Admin Flygow</Typography>
    <Typography
      variant="headerSubtitle"
      color={showInMenu ? undefined : "secondary.500"}
      sx={showInMenu ? { wordWrap: "break-word" } : undefined}
    >
      adminflygow@yopmail.com
    </Typography>
  </Stack>
);


function Action() {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const direction = useSelector((state: RootState) => state.language.direction);
  const isRTL = direction === "rtl";

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // ✅ IconButton ONLY
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleChangePassword = () => {
    navigate("/change-password");
    handleMenuClose();
  };

  const handleLogout = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleLogoutConfirm = async () => {
    try {
      await logout({});
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 🔍 Debug (remove later)
  console.log(anchorEl?.getBoundingClientRect());

  return (
    <>
      {/* Header Right/Left Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Stack direction="row" alignItems="center" spacing={1} onClick={handleMenuClick}>
          <UserInfo />

          {/* ✅ Anchor MUST be IconButton */}
          <IconButton size="small" >
            <KeyboardArrowDown />
          </IconButton>
        </Stack>
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isRTL ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isRTL ? "left" : "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2.5,
            width: "270px",
            minWidth: "270px",
            // marginTop: "8px", // ✅ DO NOT override top
            top: "70px !important"
          },
        }}
      >
        <UserInfo showInMenu />
        <Divider sx={{ mt: 2 }} />

        <MenuItem sx={MENU_ITEM_SX} onClick={handleChangePassword}>
          {t("changePassword.title")}
        </MenuItem>

        <Divider sx={{ mt: 2 }} />

        <LanguageMenu onClose={handleMenuClose} />

        <Divider sx={{ mt: 2 }} />

        <MenuItem sx={MENU_ITEM_SX} onClick={handleLogout}>
          {t("logout.confirm")}
        </MenuItem>
      </Menu>

      {/* Logout Confirmation */}
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
  const { window } = props;
  const router = useToolpadRouter();
  const { isPathSelected } = useNavigationSelection();

  // Create memoized theme to prevent unnecessary re-renders
  const theme = React.useMemo(() => createAppTheme(direction), [direction]);

  // Update document direction
  React.useEffect(() => {
    document.dir = direction;
  }, [direction]);

  // Select cache based on direction
  const currentCache = direction === 'rtl' ? cacheRtl : cacheLtr;

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
      icon: <NavigationIcon variant="dashboard" />
    },
    {
      segment: "shipments",
      title: t("shipments"),
      icon: <NavigationIcon variant="shipments" />
    },
    {
      segment: "customers",
      title: t("customers"),
      icon: <NavigationIcon variant="customers" />
    },
    {
      segment: "airport-handler",
      title: t("airportHandler"),
      icon: <NavigationIcon variant="airport-handler" />
    },
    {
      segment: "transactions",
      title: t("transactions"),
      icon: <NavigationIcon variant="transactions" />
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
      icon: <NavigationIcon variant="airport-operations" />,
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
      icon: <NavigationIcon variant="coupon-management" />,
    },
  ];
  const isXs = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isMd = useMediaQuery(muiTheme.breakpoints.down('md'));

  const sidebarWidth = isXs ? "100%" : (isMd ? "70%" : 240);

  // Generate navigation selection styles
  const getNavigationSelectionStyles = (): Record<string, SxProps<Theme>> => {
    const styles: Record<string, SxProps<Theme>> = {};

    // Segments that need image filter when selected
    const segmentsWithImageFilter = [
      "user-cohorts", "content-moderation", "manage-categories",
      "notification-management", "support-tickets", "audit-reports",
      "manage-legal-docs", "manage-admin-users"
    ];

    // Simple selected segments
    const selectedSegments = [
      "dashboard", "shipments", "customers", "airport-handler",
      "transactions", "coupon-management", "master-city-table",
      "airport-location", "shipment-pricing", "delivery-assignment"
    ];

    // Parent segments that should be selected when child is selected
    const parentChildMappings: { [key: string]: string[] } = {
      "airport-operations": ["master-city-table", "airport-location", "shipment-pricing", "delivery-assignment"],
      "manage-categories": ["category-detail", "sub-category-detail"],
    };

    // Apply styles for simple selected segments
    selectedSegments.forEach(segment => {
      if (isPathSelected(segment)) {
        styles[`& .MuiListItemButton-root[data-segment='${segment}']`] = getSelectedItemStyles(muiTheme);
      }
    });

    // Apply styles for segments with image filter
    segmentsWithImageFilter.forEach(segment => {
      if (isPathSelected(segment)) {
        styles[`& .MuiListItemButton-root[data-segment='${segment}']`] = getSelectedItemStyles(muiTheme, true);
      }
    });

    // Handle parent segments that should be selected when child is selected
    Object.entries(parentChildMappings).forEach(([parent, children]) => {
      const isParentOrChildSelected = isPathSelected(parent) || children.some(child => isPathSelected(child));
      if (isParentOrChildSelected) {
        styles[`& .MuiListItemButton-root[data-segment='${parent}']`] = getSelectedItemStyles(muiTheme);
      }
    });

    return styles;
  };

  return (
    <CacheProvider value={currentCache}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={theme}
        window={window ? window() : undefined}
      >
        <DashboardLayout
          disableCollapsibleSidebar={true}
          sx={{
            backgroundColor: muiTheme.palette.background.default,
            "& .MuiCollapse-wrapperInner .MuiList-root": {
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
              filter: ICON_FILTER,
            },
            // Custom navigation selection based on path
            ...getNavigationSelectionStyles(),
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
    </CacheProvider>
  );
}
