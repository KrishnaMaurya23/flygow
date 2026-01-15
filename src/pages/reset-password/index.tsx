import React, { useEffect, type JSX } from "react";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import PublicLayout from "../../layouts/PublicLayout";
import { StyledTextField } from "../../utils/helper";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassSchema } from "../../utils/yup-config";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "../../rtk/endpoints/authApi";
import { useTranslation } from "react-i18next";

interface ResetPasswordFormInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage(): JSX.Element {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let token = searchParams.get("token");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const dispatch = useDispatch();
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(resetPassSchema),
  });

  const watchedFields = watch();
  const isFormValid = watchedFields.password && watchedFields.confirmPassword && !errors.password && !errors.confirmPassword;

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      // console.log("Reset Password Data:", data);
      // dispatch(showAlert({
      //   message: "Password reset successfully.",
      //   severity: "success",
      // }));
      // navigate("/");
      await resetPassword({
        token: token || "",
        new_password: (data.password),
      }).unwrap();
    } catch (error: any) {
      console.error("Reset Password Error:", error);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      token = null;
    }
  }, [isSuccess]);
  // Watch password for confirm validation
  const password = watch("password");

  // Show success screen after successful password reset
  if (isSuccess) {
    return (
      <PublicLayout>
        <Grid container>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              px: 4,
            }}
          >
            <Stack
              spacing={3}
              alignItems="center"
              sx={{ maxWidth: 400, textAlign: "center" }}
            >
              {/* Success Icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/assets/icons/forgot_password.svg"
                  alt="password-reset-success"
                  style={{
                    width: "211px",
                    height: "211px",
                  }}
                />
              </Box>

              {/* Success Heading */}
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: "#000000",
                  fontSize: "28px",
                }}
              >
                {t("resetPassword.resetSuccessTitle")}
              </Typography>

              {/* Success Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "#6C737F",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                {t("resetPassword.resetSuccessMessage")}
              </Typography>

              {/* Log In Button */}
              <Button
                variant="secondary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  maxWidth: 320,
                }}
                onClick={() => navigate("/")}
              >
                {t("resetPassword.logInButton")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Grid container>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            px: 4,
          }}
        >
          <Box
            width="100%"
            maxWidth={320}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h5" textAlign="center" mb={2}>
             {t("resetPassword.changePasswordTitle")}
            </Typography>

            {/* Password Field */}
            <StyledTextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label={t("resetPassword.newPassword")}
              placeholder={t("resetPassword.newPasswordPlaceholder")}
              margin="normal"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0 }}>
                      <img
                        src="/assets/icons/lock.svg"
                        alt="lock-icon"
                        loading="lazy"
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <img
                          src={showPassword ? "/assets/icons/eye-slash.svg" : "/assets/icons/eye.svg"}
                          alt={showPassword ? "hide-password" : "show-password"}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Confirm Password Field */}
            <StyledTextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label={t("resetPassword.confirmPassword")}
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              margin="normal"
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0 }}>
                      <img
                        src="/assets/icons/lock.svg"
                        alt="lock-icon"
                        loading="lazy"
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <img
                          src={showConfirmPassword ? "/assets/icons/eye-slash.svg" : "/assets/icons/eye.svg"}
                          alt={showConfirmPassword ? "hide-password" : "show-password"}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 2,
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="secondary"
              disabled={isSubmitting || !isFormValid}
            >
              {t("resetPassword.resetButton")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
