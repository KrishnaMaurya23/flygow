import api from "../services";

// Helper function to simulate API delay (used by remaining mock endpoints)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/api/v1/auth/admin/login",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/api/v1/auth/admin/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resend: builder.mutation({
      queryFn: async (body: {
        email: string;
        deviceType: string;
        actionType: string;
      }) => {
        await delay(800); // Simulate API delay
        return {
          data: {
            data: {
              token: "mock_resend_token_12345",
            },
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      queryFn: async ({
        token,
        new_password,
      }: {
        token: string;
        new_password: string;
      }) => {
        await delay(800); // Simulate API delay
        return {
          data: {
            message: "Password reset successfully",
          },
        };
      },
    }),

    verifyOtp: builder.mutation({
      query: (body: { email: string; otp: string; verifyToken: string }) => ({
        url: "/api/v1/auth/admin/verify-login-otp",
        method: "POST",
        body,
      }),
    }),
    verifyResetPasswordOtp: builder.mutation({
      query: (body: { email: string; otp: string }) => ({
        url: "/api/v1/auth/admin/verify-reset-password-otp",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      queryFn: async () => {
        await delay(500); // Simulate API delay
        return {
          data: {
            message: "Logged out successfully",
          },
        };
      },
    }),
    changePassword: builder.mutation({
      queryFn: async (body: { oldPassword: string; newPassword: string }) => {
        await delay(800); // Simulate API delay
        return {
          data: {
            message: "Password changed successfully",
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResendMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useVerifyResetPasswordOtpMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
