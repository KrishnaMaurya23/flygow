import { type JSX, useEffect, useState } from "react";
import { Box, Button, Typography, Grid, useTheme, Stack, IconButton } from "@mui/material";
import PublicLayout from "../../layouts/PublicLayout";
import OTPInput from "../../components/Otp";
import { useNavigate, useLocation } from "react-router-dom";
import { encryptionService } from "../../utils/EncryptionService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../rtk/feature/alertSlice";
import { loginUser } from "../../rtk/feature/authSlice";
import { useResendMutation, useVerifyOtpMutation, useVerifyResetPasswordOtpMutation } from "../../rtk/endpoints/authApi";


export default function OTPVerificationPage(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [resend, { isSuccess, data: resendData }] = useResendMutation();
  const [verifyOtp, { isSuccess: isVerifyOtpSuccess, data }] = useVerifyOtpMutation();
  const [verifyResetPasswordOtp, { isSuccess: isVerifyResetOtpSuccess, data: resetOtpData }] = useVerifyResetPasswordOtpMutation();

  const { email: stateEmail, verifyToken, type } = location.state || "";
  
  // Determine flow type from props or location state
  const currentFlowType = type || "login";
  
  // Get email from state or sessionStorage as fallback
  const email = stateEmail || sessionStorage.getItem('loginEmail') || "";
  
  // Mask email for security
  const maskEmail = (email: string) => {
    try {
      // Check if email is empty or null
      if (!email || typeof email !== 'string') {
        return "";
      }

      // Trim whitespace
      const trimmedEmail = email.trim();
      
      // Check if email is empty after trimming
      if (!trimmedEmail) {
        return "";
      }

      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        console.warn('Invalid email format provided to maskEmail function:', email);
        return "***@***.***"; // Return masked placeholder for invalid emails
      }

      // Split email into username and domain
      const parts = trimmedEmail.split('@');
      if (parts.length !== 2) {
        console.warn('Email does not contain exactly one @ symbol:', email);
        return "***@***.***";
      }

      const [username, domain] = parts;

      // Validate username and domain
      if (!username || !domain) {
        console.warn('Invalid email structure - missing username or domain:', email);
        return "***@***.***";
      }

      // Check if username is too short to mask
      if (username.length <= 2) {
        return trimmedEmail; // Return original email if username is too short
      }

      // Create masked username
      const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
      
      return `${maskedUsername}@${domain}`;
    } catch (error) {
      console.error('Error in maskEmail function:', error);
      return "***@***.***"; // Return safe fallback
    }
  };
  
  const maskedEmail = maskEmail(email);
  const [timer, setTimer] = useState(60);
  const inputLength = 4;
  const [otp, setOtp] = useState<string[]>(new Array(inputLength).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!email) {
      dispatch(showAlert({
        message: 'Email is not available.',
        severity: 'error',
      }));
      return;
    }
    try {
      const encryptedEmail = await encryptionService.encrypt(email);
      
      if (!encryptedEmail) {
        throw new Error("Encryption failed");
      }

      await resend({
        email: encryptedEmail,
        deviceType: "web",
        actionType: "resend_otp",
      }).unwrap();
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(showAlert({
        message: 'OTP sent to your email',
        severity: 'success',
      }));
      setTimer(60);
      
      // Update the current page state with new verifyToken from resend response
      const currentPath = currentFlowType === "login" ? "/login-otp-verification" : "/otp-verification";
      navigate(currentPath, {
        state: {
          email: email,
          type: currentFlowType,
          verifyToken: resendData?.data?.token // resend API still returns token
        },
      });
    }
  }, [isSuccess, currentFlowType, email, navigate, resendData?.data?.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    try {
      const encryptedEmail = await encryptionService.encrypt(email);
      
      if (!encryptedEmail) {
        throw new Error("Encryption failed");
      }

      if (currentFlowType === "login") {
        // Login flow - use verifyOtp with verifyToken
        await verifyOtp({
          email: encryptedEmail,
          otp: fullOtp,
          verifyToken: verifyToken,
        }).unwrap();
      } else {
        // Forgot password flow - use verifyResetPasswordOtp
        await verifyResetPasswordOtp({
          email: encryptedEmail,
          otp: fullOtp,
        }).unwrap();
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  // Handle login OTP verification success
  useEffect(() => {
    if (isVerifyOtpSuccess && currentFlowType === "login") {
      dispatch(showAlert({
        message: 'OTP verified Successfully',
        severity: 'success',
      }));
      // For login flow, set user data and navigate to dashboard
      const user = data?.data;
      dispatch(loginUser(user));
      navigate("/dashboard");
    }
  }, [isVerifyOtpSuccess, currentFlowType, data?.data, dispatch, navigate]);

  // Handle reset password OTP verification success
  useEffect(() => {
    if (isVerifyResetOtpSuccess && currentFlowType !== "login") {
      dispatch(showAlert({
        message: 'OTP verified Successfully',
        severity: 'success',
      }));
      // For forgot password flow, navigate to reset password
      navigate(`/reset-password?token=${resetOtpData?.data?.accessToken}`);
    }
  }, [isVerifyResetOtpSuccess, currentFlowType, resetOtpData?.data, dispatch, navigate]);

  const isOtpComplete = otp.every((digit) => digit !== "");

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
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent="flex-start"
              gap={1}
              mb={2}
            >
              <IconButton
                onClick={() => navigate(-1)}
                sx={{ color: "text.primary" }}
              >
                <img
                  src="/assets/icons/back-arrow.svg"
                  alt="back-arrow"
                  style={{ width: 30, height: 30 }}
                />
              </IconButton>
              <Typography variant="h5" textAlign="center" >
                OTP Verification
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" textAlign="center">
                A 4 Digit Code has been sent to
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                sx={{
                  color: "#0E6A37",
                }}
              >
                {maskedEmail}
              </Typography>
            </Stack>
            <OTPInput otp={otp} setOtp={setOtp} inputLength={inputLength} />
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6" textAlign="center">
                Didn't Receive OTP?
              </Typography>
              <Stack flexDirection={"row"} gap={1} alignItems="center">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  onClick={!isResendDisabled ? handleResend : undefined}
                  sx={{
                    cursor: isResendDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Resend OTP
                </Typography>
                {isResendDisabled && (
                  <>
                    <Typography variant="h6" fontWeight={600} >
                      in
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#F3FAFE",
                        borderRadius: "20px",
                        px: 2,
                        py: 0.25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "60px",
                      }}
                    >
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        variant="timer"
                        sx={{ color: "#0E6A37" }}
                      >
                        {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </Stack>

            <Button
              fullWidth
              variant="secondary"
              onClick={!isOtpComplete ? undefined : handleSubmit}
              sx={{
                cursor: !isOtpComplete ? "not-allowed" : "pointer",
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
