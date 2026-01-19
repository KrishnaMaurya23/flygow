import React, { useState, useEffect } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    TextField,
    FormControlLabel,
    Checkbox,
    Stack,
    styled,
    FormGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/constants";
import { StyledActionButton } from "../../../utils/helper";

const StyledTextField = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "white",
        "& fieldset": {
            borderColor: colors["Gray-200"],
        },
        "&:hover fieldset": {
            borderColor: colors["Gray-300"],
        },
        "&.Mui-focused fieldset": {
            borderColor: colors["Primary-500"],
            borderWidth: "1px",
        },
    },
    "& .MuiInputBase-input": {
        padding: "12px 16px",
        fontSize: "16px",
        color: colors["Gray-900"],
        "&::placeholder": {
            color: colors["Gray-400"],
            opacity: 1,
        },
    },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
    color: colors["Gray-300"],
    "&.Mui-checked": {
        color: colors["Primary-500"],
    },
    "& .MuiSvgIcon-root": {
        borderRadius: "4px",
    }
}));

interface AccessRight {
    id: string;
    label: string;
    children?: AccessRight[];
}

interface UserRoleDrawerProps {
    open: boolean;
    onClose: () => void;
    mode: "create" | "update";
    initialData?: {
        name: string;
        permissions: string[];
    };
}

const UserRoleDrawer: React.FC<UserRoleDrawerProps> = ({
    open,
    onClose,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const [roleTitle, setRoleTitle] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    useEffect(() => {
        if (open && initialData) {
            setRoleTitle(initialData.name);
            setSelectedPermissions(initialData.permissions);
        } else if (open) {
            setRoleTitle("");
            setSelectedPermissions([]);
        }
    }, [open, initialData]);

    const accessRights: AccessRight[] = [
        { id: "personalized-dashboard", label: t("roleDrawer.personalizedDashboard") },
        { id: "app-users", label: t("roleDrawer.appUsers") },
        { id: "user-cohorts", label: t("roleDrawer.userCohorts") },
        { id: "notification-management", label: t("roleDrawer.notificationManagement") },
        { id: "support-tickets", label: t("roleDrawer.supportTickets") },
        {
            id: "audit-reports",
            label: t("roleDrawer.auditReports"),
            children: [
                { id: "user-login-security-logs", label: t("roleDrawer.userLoginSecurityLogs") },
                { id: "administration-logs", label: t("roleDrawer.administrationLogs") },
                { id: "data-deletion-logs", label: t("roleDrawer.dataDeletionLogs") },
            ],
        },
        { id: "manage-legal-docs", label: t("roleDrawer.manageLegalDocs") },
        {
            id: "manage-admin-users",
            label: t("roleDrawer.manageAdminUsers"),
            children: [
                { id: "admin-users", label: t("roleDrawer.adminUsers") },
                { id: "role-access", label: t("roleDrawer.roleAccess") },
            ],
        },
    ];

    const handleTogglePermission = (id: string, children?: AccessRight[]) => {
        let newSelected = [...selectedPermissions];
        const isSelected = newSelected.includes(id);

        if (isSelected) {
            newSelected = newSelected.filter((p) => p !== id);
            if (children) {
                const childIds = children.map((c) => c.id);
                newSelected = newSelected.filter((p) => !childIds.includes(p));
            }
        } else {
            newSelected.push(id);
            if (children) {
                newSelected.push(...children.map((c) => c.id));
            }
        }
        setSelectedPermissions(Array.from(new Set(newSelected)));
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{ zIndex: 3000 }}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: "640px" },
                    padding: 0,
                    borderRadius: { sm: "24px 0 0 24px" },
                },
            }}
        >
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{ padding: "32px", borderBottom: `1px solid ${colors["Gray-100"]}` }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "24px", color: colors["Gray-900"] }}>
                            {mode === "create" ? t("roleDrawer.createTitle") : t("roleDrawer.updateTitle")}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ backgroundColor: colors["Gray-50"], "&:hover": { backgroundColor: colors["Gray-100"] } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                    <Stack spacing={4}>
                        {/* Role Title */}
                        <Box>
                            <Typography sx={{ mb: 1.5, fontWeight: 500, color: colors["Gray-700"], fontSize: "14px" }}>
                                {t("roleDrawer.roleTitle")}
                            </Typography>
                            <StyledTextField
                                fullWidth
                                placeholder={t("roleDrawer.typeHere")}
                                value={roleTitle}
                                onChange={(e) => setRoleTitle(e.target.value)}
                            />
                        </Box>

                        {/* Access Rights */}
                        <Box>
                            <Typography sx={{ fontWeight: 600, color: colors["Gray-900"], fontSize: "18px" }}>
                                {t("roleDrawer.accessRights")}
                            </Typography>
                            <Typography sx={{ mb: 3, color: colors["Gray-500"], fontSize: "14px" }}>
                                {t("roleDrawer.accessRightsSubtitle")}
                            </Typography>

                            <FormGroup>
                                {accessRights.map((right) => (
                                    <Box key={right.id} sx={{ mb: 0.5 }}>
                                        <FormControlLabel
                                            control={
                                                <StyledCheckbox
                                                    checked={selectedPermissions.includes(right.id)}
                                                    onChange={() => handleTogglePermission(right.id, right.children)}
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontSize: "16px", fontWeight: 500, color: colors["Gray-700"] }}>
                                                    {right.label}
                                                </Typography>
                                            }
                                        />
                                        {right.children && (
                                            <Box sx={{ ml: 4, mt: 0.5 }}>
                                                {right.children.map((child) => (
                                                    <FormControlLabel
                                                        key={child.id}
                                                        sx={{ display: "block", mb: 0.5 }}
                                                        control={
                                                            <StyledCheckbox
                                                                checked={selectedPermissions.includes(child.id)}
                                                                onChange={() => handleTogglePermission(child.id)}
                                                            />
                                                        }
                                                        label={
                                                            <Typography sx={{ fontSize: "14px", fontWeight: 400, color: colors["Gray-600"] }}>
                                                                {child.label}
                                                            </Typography>
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </FormGroup>
                        </Box>
                    </Stack>
                </Box>

                {/* Footer */}
                <Box sx={{ padding: "32px", borderTop: `1px solid ${colors["Gray-100"]}`, backgroundColor: colors["Gray-50"] }}>
                    <Typography sx={{ mb: 4, color: colors["Gray-500"], fontSize: "13px", lineHeight: "1.5" }}>
                        {t("roleDrawer.disclaimer")}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="flex-end"
                    >
                        {mode === "update" && (
                            <StyledActionButton
                                buttonType="error"
                                variant="outlined"
                                onClick={onClose}

                            >
                                {t("roleDrawer.deleteRole")}
                            </StyledActionButton>
                        )}
                        <StyledActionButton
                            buttonType="secondary"

                            variant="contained"
                            onClick={onClose}

                        >
                            {mode === "create" ? t("roleDrawer.createRole") : t("roleDrawer.updateRole")}
                        </StyledActionButton>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

export default UserRoleDrawer;
