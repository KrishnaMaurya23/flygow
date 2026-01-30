import { useEffect, useState, type JSX } from "react";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import PublicLayout from "../../layouts/PublicLayout";
import { StyledTextField } from "../../utils/helper";
import { encryptionService } from "../../utils/EncryptionService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/yup-config";
import { useLoginMutation } from "../../rtk/endpoints/authApi";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data: successData, isSuccess }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const watchedFields = watch();
  const isFormValid = watchedFields.email && watchedFields.password;

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // const encryptedEmail = await encryptionService.encrypt(data.email);
      // const encryptedPassword = await encryptionService.encrypt(data.password);

      // if (!encryptedEmail || !encryptedPassword) {
      //   throw new Error("Encryption failed");
      // }

      // await login({
      //   email: encryptedEmail,
      //   password: encryptedPassword,
      // }).unwrap();
      // Store the email for OTP verification
      sessionStorage.setItem('loginEmail', data.email);
      const loginEmail = sessionStorage.getItem('loginEmail') || "";

      navigate("/login-otp-verification", {
        state: {
          email: loginEmail,
          verifyToken: successData?.data?.verifyToken || "",
          type: "login"
        },
      });
    } catch (err: any) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // Get the email from sessionStorage
      const loginEmail = sessionStorage.getItem('loginEmail') || "";
      // Navigate to OTP verification with verifyToken from login response
      navigate("/login-otp-verification", {
        state: {
          email: loginEmail,
          verifyToken: successData?.data?.verifyToken || "",
          type: "login"
        },
      });
  dispatch(showAlert({ message: t("otpVerification.otpSentMessage"), severity: "success" }));

    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const user = successData?.data;
  // dispatch(loginUser(user));
  // dispatch(showAlert({ message: "Login successful", severity: "success" }));
  // navigate("/app-users");
  //   }
  // }, [isSuccess]);


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
            <Typography variant="h5" textAlign="start" mb={2}>
              {t("login.title")}
            </Typography>
            <StyledTextField
              fullWidth
              variant="outlined"
              type="text"
              // label="Email Address"
              placeholder={t("login.emailPlaceholder")}
              margin="normal"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0 }}>
                      <img
                        src="/assets/icons/sms.svg"
                        alt="email-icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              // label="Password"
              type={showPassword ? "text" : "password"}
              placeholder={t("login.passwordPlaceholder")}
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
                        style={{ width: "20px", height: "20px" }}
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

            <Typography
              variant="subtitle2"
              textAlign="right"
              mt={1}
              mb={2.5}
              sx={{ 
                cursor: "pointer",
                color: "#0E6A37",
                "&:hover": {
                  textDecoration: "underline",
                }
              }}
              onClick={() => navigate("/forgot-password")}
            >
              {t("login.forgotPassword")}
            </Typography>

            <Button
              fullWidth
              type="submit"
              variant="secondary"
              disabled={isSubmitting || !isFormValid}
            >
              {t("login.loginButton")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
