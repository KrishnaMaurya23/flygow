import { useEffect, type JSX } from "react";
import { Box, Button, Typography, InputAdornment, Grid, Stack, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import PublicLayout from "../../layouts/PublicLayout";
import { encryptAES, StyledTextField } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useNavigate } from "react-router-dom";
import { forgotPassSchema } from "../../utils/yup-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "../../rtk/endpoints/authApi";

type FormData = {
  email: string;
};

export default function ForgotPassword(): JSX.Element {
  const [forgotPassword, { isSuccess, data }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(forgotPassSchema),
  });

  const watchedFields = watch();
  const isFormValid = watchedFields.email && !errors.email;



  // inside your component

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      // console.log("Forgot Password Data:", data);
      // dispatch(
      //   showAlert({
      //     message: "OTP sent to your email",
      //     severity: "success",
      //   })
      // );
      // navigate("/otp-verification", {
      //   state: {
      //     email: data.email,
      //     type: "forgot-password",
      //   },
      // });
      // If you need to encrypt the email before sending it to the API
      const encryptEmail = encryptAES(data.email);
      await forgotPassword({ email: encryptEmail }).unwrap();

    } catch (error: any) {
      console.error("Forgot Password Error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          message: "OTP sent to your email",
          severity: "success",
        })
      );

      // navigate("/check-mail", {
      //   state: { email: watch("email") },
      // });
      // const token = encryptAES(watch("email"));
      // navigate(`/reset-password?token=${token}`)
      navigate("/otp-verification", {
        state: {
          email: watch("email"),
          type: "forgot-password",
          token: data?.data?.token
        },
      });
    }

  }, [isSuccess])

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
          <Box width="100%" maxWidth={320}>
            <Stack flexDirection={"row"} alignItems={"center"} justifyContent="flex-start" gap={0.5} mb={2}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  color: "text.primary", px: "8px",
                  py: "13px"
                }}
              >
                <img
                  src="/assets/icons/back-arrow.svg"
                  alt="back-arrow"
                  style={{ width: 30, height: 18 }}
                />
              </IconButton>
              <Typography
                variant="h5"
                textAlign="center"
              >
                Forgot Password
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <StyledTextField
                fullWidth
                type="email"
                label="Email Address"
                placeholder="Enter Email Address"
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 0 }}>
                        <img src="/assets/icons/sms.svg" alt="mail-icon" loading="lazy" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  marginBottom: 2,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="secondary"
                disabled={isSubmitting || !isFormValid}
              >
                Send OTP
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
