import { useRoutes } from "react-router-dom";

// Auth & Common Pages
import LoginPage from "../pages/login";
import ForgotPassword from "../pages/forgot-password";
import CheckMail from "../pages/check-mail";
import ResetPasswordPage from "../pages/reset-password";
import ChangePasswordPage from "../pages/change-password";

// App Section Pages
import Dashboard from "../pages/dashboard";
import Shipments from "../pages/shipments";
import ShipmentDetails from "../pages/shipments/shipment-details";
import Customers from "../pages/customers";
import AirportHandler from "../pages/airport-handler";
import Transactions from "../pages/transactions";
import CouponManagement from "../pages/coupon-management";
import AppUsers from "../pages/app-users";
import UserCohorts from "../pages/user-cohorts";

// Content Moderation
import ContentLibrary from "../pages/content-moderation/content-library";
import FlaggedContentReports from "../pages/content-moderation/flagged-content-reports";
import VettingLogs from "../pages/content-moderation/vetting-logs";
import ScrapperLogs from "../pages/content-moderation/scrapper-logs";
import ScrapperRules from "../pages/content-moderation/scrapper-rules";
import ManageTags from "../pages/content-moderation/manage-tags";
import ManageCategories from "../pages/content-moderation/manage-categories";
import CategoryDetail from "../pages/content-moderation/manage-categories/category-detail";

// Other Main Pages
import NotificationManagement from "../pages/notification-management";
import SupportTickets from "../pages/support-tickets";

// Audit Reports
import AuditReports from "../pages/audit-reports";
import UserLoginSecurityLogs from "../pages/audit-reports/user-login-security-logs";
import AdministrativeActionLogs from "../pages/audit-reports/administrative-action-logs";
import DataDeletionLogs from "../pages/audit-reports/data-deletion-logs";

// Legal & Admin
import ManageLegalDocs from "../pages/manage-legal-docs";
import AdminUsers from "../pages/manage-admin-users/admin-users";
import UserRoles from "../pages/manage-admin-users/user-roles";
import UserDetails from "../pages/app-users/user-details";
import FlaggedContentReportsDetail from "../pages/content-moderation/flagged-content-reports/flagged-content-report-detail";
import ContentDetail from "../pages/content-moderation/content-library/content-detail";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import ScrapperLogDetail from "../pages/content-moderation/scrapper-logs/scrapper-log-detail";
import TermCondition from "../pages/manage-legal-docs/term-condition";
import PrivacyPolicy from "../pages/manage-legal-docs/privacy-policy";
import FAQs from "../pages/manage-legal-docs/faqs";
import CreateEditNotification from "../pages/notification-management/create-edit-notification";
import AdminUsersDetail from "../pages/manage-admin-users/admin-users/admin-users-detail";
import SupportTicketDetail from "../pages/support-tickets/support-ticket-detail";
import AboutUs from "../pages/manage-legal-docs/about-us";
import OTPVerificationPage from "../pages/otp-verification";
import SubCategoryDetail from "../pages/content-moderation/manage-categories/category-detail/sub-category-detail";

// Airport Operations
import MasterCityTable from "../pages/airport-operations/master-city-table";
import AirportLocation from "../pages/airport-operations/airport-location";
import ShipmentPricing from "../pages/airport-operations/shipment-pricing";
import DeliveryAssignment from "../pages/airport-operations/delivery-assignment";

export default function AppRoutes() {
  const routes = useRoutes([
    // Public Routes
    {
      path: "/",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/otp-verification",
      element: (
        <PublicRoute>
          <OTPVerificationPage />
        </PublicRoute>
      ),
    },
    {
      path: "/login-otp-verification",
      element: (
        <PublicRoute>
          <OTPVerificationPage />
        </PublicRoute>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      ),
    },
    {
      path: "/check-mail",
      element: (
        <PublicRoute>
          <CheckMail />
        </PublicRoute>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <PublicRoute>
          <ResetPasswordPage />
        </PublicRoute>
      ),
    },

    // Private Routes
    {
      path: "/change-password",
      element: (
        <PrivateRoute>
          <ChangePasswordPage />
        </PrivateRoute>
      ),
    },

    // Dashboard
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },

    // Shipments
    {
      path: "/shipments",
      element: (
        <PrivateRoute>
          <Shipments />
        </PrivateRoute>
      ),
    },
    {
      path: "/shipments/shipment-details",
      element: (
        <PrivateRoute>
          <ShipmentDetails />
        </PrivateRoute>
      ),
    },

    // Customers
    {
      path: "/customers",
      element: (
        <PrivateRoute>
          <Customers />
        </PrivateRoute>
      ),
    },

    // Airport Handler
    {
      path: "/airport-handler",
      element: (
        <PrivateRoute>
          <AirportHandler />
        </PrivateRoute>
      ),
    },

    // Transactions
    {
      path: "/transactions",
      element: (
        <PrivateRoute>
          <Transactions />
        </PrivateRoute>
      ),
    },

    // Airport Operations
    {
      path: "/airport-operations/master-city-table",
      element: (
        <PrivateRoute>
          <MasterCityTable />
        </PrivateRoute>
      ),
    },
    {
      path: "/airport-operations/airport-location",
      element: (
        <PrivateRoute>
          <AirportLocation />
        </PrivateRoute>
      ),
    },
    {
      path: "/airport-operations/shipment-pricing",
      element: (
        <PrivateRoute>
          <ShipmentPricing />
        </PrivateRoute>
      ),
    },
    {
      path: "/airport-operations/delivery-assignment",
      element: (
        <PrivateRoute>
          <DeliveryAssignment />
        </PrivateRoute>
      ),
    },

    // Coupon Management
    {
      path: "/coupon-management",
      element: (
        <PrivateRoute>
          <CouponManagement />
        </PrivateRoute>
      ),
    },

    // App Routes
    {
      path: "/app-users",
      element: (
        <PrivateRoute>
          <AppUsers />
        </PrivateRoute>
      ),
    },
    {
      path: "/user-cohorts",
      element: (
        <PrivateRoute>
          <UserCohorts />
        </PrivateRoute>
      ),
    },
    //user details
    {
      path: "/app-users/user-details",
      element: (
        <PrivateRoute>
          <UserDetails status="Active" />
        </PrivateRoute>
      ),
    },

    // Content Moderation
    {
      path: "/content-moderation/content-library",
      element: (
        <PrivateRoute>
          <ContentLibrary />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/content-library/content-detail",
      element: (
        <PrivateRoute>
          <ContentDetail />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/flagged-content-reports",
      element: (
        <PrivateRoute>
          <FlaggedContentReports />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/flagged-content-reports-detail",
      element: (
        <PrivateRoute>
          <FlaggedContentReportsDetail />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/vetting-logs",
      element: (
        <PrivateRoute>
          <VettingLogs />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/scrapper-logs",
      element: (
        <PrivateRoute>
          <ScrapperLogs />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/scrapper-logs/scrapper-log-detail",
      element: (
        <PrivateRoute>
          <ScrapperLogDetail />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/blocked-keywords",
      element: (
        <PrivateRoute>
          <ScrapperRules />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/manage-tags",
      element: (
        <PrivateRoute>
          <ManageTags />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/manage-categories",
      element: (
        <PrivateRoute>
          <ManageCategories />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/manage-categories/:id",
      element: (
        <PrivateRoute>
          <CategoryDetail />
        </PrivateRoute>
      ),
    },
    {
      path: "/content-moderation/manage-categories/sub-category-detail/:id/:subCategoryId",
      element: (
        <PrivateRoute>
          <SubCategoryDetail />
        </PrivateRoute>
      ),
    },

    // Notifications and Support
    {
      path: "/notification-management",
      element: (
        <PrivateRoute>
          <NotificationManagement />
       </PrivateRoute>
      ),
    },
    {
      path: "/notification-management/create-notification",
      element: (
        <PrivateRoute>
          <CreateEditNotification />
       </PrivateRoute>
      ),
    },
    {
      path: "/notification-management/edit-notification",
      element: (
       <PrivateRoute>
          <CreateEditNotification />
       </PrivateRoute>
      ),
    },
    {
      path: "/support-tickets",
      element: (
        <PrivateRoute>
          <SupportTickets />
        </PrivateRoute>
      ),
    },
    {
      path: "/support-tickets/support-ticket-detail",
      element: (
        <PrivateRoute>
          <SupportTicketDetail />
        </PrivateRoute>
      ),
    },
    // Audit Reports
    {
      path: "/audit-reports",
      element: (
        <PrivateRoute>
          <AuditReports />
        </PrivateRoute>
      ),
    },
    {
      path: "/audit-reports/user-login-security-logs",
      element: (
        <PrivateRoute>
          <UserLoginSecurityLogs />
        </PrivateRoute>
      ),
    },
    {
      path: "/audit-reports/administrative-action-logs",
      element: (
        <PrivateRoute>
          <AdministrativeActionLogs />
        </PrivateRoute>
      ),
    },
    {
      path: "/audit-reports/data-deletion-logs",
      element: (
        <PrivateRoute>
          <DataDeletionLogs />
        </PrivateRoute>
      ),
    },

    // Legal Docs
    {
      path: "/manage-legal-docs",
      element: (
        <PrivateRoute>
          <ManageLegalDocs />
        </PrivateRoute>
      ),
    },
    {
      path: "/manage-legal-docs/term-condition",
      element: (
        <PrivateRoute>
          <TermCondition />
        </PrivateRoute>
      ),
    },{
      path: "/manage-legal-docs/privacy-policy",
      element: (
        <PrivateRoute>
          <PrivacyPolicy />
        </PrivateRoute>
      ),
    },
    {
      path: "/manage-legal-docs/about-us",
      element: (
        <PrivateRoute>
          <AboutUs />
        </PrivateRoute>
      ),
    },{
      path: "/manage-legal-docs/faqs",
      element: (
        <PrivateRoute>
          <FAQs />
        </PrivateRoute>
      ),
    },

    // Admin Users
    {
      path: "/manage-admin-users/admin-users",
      element: (
        <PrivateRoute>
          <AdminUsers />
        </PrivateRoute>
      ),
    },
    {
      path: "/manage-admin-users/admin-users/admin-users-detail",
      element: (
        <PrivateRoute>
          <AdminUsersDetail />
        </PrivateRoute>
      ),
    },
    {
      path: "/manage-admin-users/user-roles",
      element: (
        <PrivateRoute>
          <UserRoles />
        </PrivateRoute>
      ),
    },
  ]);

  return routes;
}
