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
import { decryptAES, encryptAES, StyledTextField } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/yup-config";
import { useLoginMutation } from "../../rtk/endpoints/authApi";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useDispatch } from "react-redux";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage(): JSX.Element {
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
      const encryptedData = {
        email: encryptAES(data.email),
        password: data.password,
        deviceToken: "",
        deviceType: "web",
        actionType: "signin",
      };
      await login(encryptedData).unwrap();
      // Store the email for OTP verification
      sessionStorage.setItem('loginEmail', data.email);
    } catch (err: any) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // Get the email from sessionStorage
      const loginEmail = sessionStorage.getItem('loginEmail') || "";
      // Navigate to OTP verification with token from login response
      navigate("/login-otp-verification", {
        state: {
          email: loginEmail,
          token: successData?.data?.token || "",
          type: "login"
        },
      });
  dispatch(showAlert({ message: "OTP has been sent to your Email", severity: "success" }));

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
              Sign In
            </Typography>
            <StyledTextField
              fullWidth
              variant="outlined"
              type="text"
              // label="Email Address"
              placeholder="Enter Email Address"
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
              placeholder="Enter Password"
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
              Forgot Password?
            </Typography>

            <Button
              fullWidth
              type="submit"
              variant="secondary"
              disabled={isSubmitting || !isFormValid}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
