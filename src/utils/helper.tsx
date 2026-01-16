import { styled, type Theme } from "@mui/material/styles";
import { colors } from "./constants";
import CryptoJS from "crypto-js";

import {
  TextField,
  Typography,
  Button,
  type TypographyProps,
  type ButtonProps,
} from "@mui/material";


// Replace with your actual color palette object

export const ROWS_LIMIT = 100;

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.primary.light, // light background
    color: theme.palette.secondary[900], // text color
    borderRadius: 12,
    fontSize: "16px"
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
  },
  "& .MuiInputLabel-root": {
    display: "none", // Hide labels in auth layout
  },

  "& .MuiInputLabel-root.Mui-focused": {
    display: "none", // Hide labels in auth layout
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    display: "none", // Hide labels in auth layout
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.secondary[900],
  },
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid #D1D5DB`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `1px solid #D1D5DB`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `1px solid #9CA3AF`,
    },
    "& legend": {
      maxWidth: 0,
      transition: "max-width 0.1s ease-in-out",
    },
    // "&.Mui-focused legend": {
    //   width:"50%",

    // },
  },

  "& .MuiSvgIcon-root": {
    fill: colors["Gray-400"],
  },

  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #F97066",
    color: "#FF1100"
  },

  "& .MuiFormLabel-root.Mui-error": {
    color: "#FF1100",
    fontWeight: 500,
    fontSize: "14px",
    "&.Mui-focused ~ .MuiOutlinedInput-root .MuiInputBase-input, &.Mui-error ~ .MuiOutlinedInput-root .MuiInputBase-input": {
      color: "#F97066",
    },
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#FF1100",
  },
  "& .MuiFormHelperText-root": {
    fontSize: 12,
    marginLeft: 0,
    backgroundColor: "transparent",
    border: "none",
  },
}));

// styled typography for page heading

export const StyledHeaderTypography = styled((props: TypographyProps) => (
  <Typography {...props} />
))(({ theme: _theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "600",
  color: colors["Gray-900"],
}));

// Styled Action Button for Shipment Details
interface StyledActionButtonProps extends ButtonProps {
  buttonType?: "error" | "warning" | "success" | "primary" | "secondary";
  buttonStyle?: "rounded" | "flat";
}

export const StyledActionButton = styled(Button)<StyledActionButtonProps>(
  ({ buttonType = "primary", buttonStyle = "flat", variant }) => {
    const colorMap = {
      error: {
        borderColor: colors["Error-600"],
        color: colors["Error-600"],
        bg: colors["Error-600"],
        hoverBorderColor: colors["Error-700"],
        hoverBg: colors["Error-50"],
        hoverBgFilled: colors["Error-700"],
      },
      warning: {
        borderColor: colors["Warning-600"],
        color: colors["Warning-600"],
        bg: colors["Warning-600"],
        hoverBorderColor: colors["Warning-700"],
        hoverBg: colors["Warning-50"],
        hoverBgFilled: colors["Warning-700"],
      },
      success: {
        borderColor: colors["Success-600"],
        color: colors["Success-600"],
        bg: colors["Success-button"],
        hoverBorderColor: colors["Success-700"],
        hoverBg: colors["Success-50"],
        hoverBgFilled: colors["Success-700"],
      },
      primary: {
        borderColor: colors["Primary-600"],
        color: colors["Primary-600"],
        bg: colors["Primary-600"],
        hoverBorderColor: colors["Primary-700"],
        hoverBg: colors["Primary-50"],
        hoverBgFilled: colors["Primary-700"],
      },
      secondary: {
        borderColor: colors["Gray-600"],
        color: colors["Gray-600"],
        bg: colors["Gray-600"],
        hoverBorderColor: colors["Gray-700"],
        hoverBg: colors["Gray-100"],
        hoverBgFilled: colors["Gray-700"],
      },
    };

    const selectedColors = colorMap[buttonType];
    const borderRadius = buttonStyle === "rounded" ? "100px" : "8px";
    const isFilled = variant === "contained";

    return {
      textTransform: "none",
      borderColor: isFilled ? "transparent" : selectedColors.borderColor,
      color: isFilled ? "white" : selectedColors.color,
      backgroundColor: isFilled ? selectedColors.bg : "transparent",
      borderRadius: borderRadius,
      padding: "10px 24px",
      fontSize: "18px", // Adjusted as per user's earlier manual change
      fontWeight: 600,
      borderWidth: isFilled ? "0px" : "1px",
      boxShadow: "none", // Remove default MUI shadow for contained buttons
      "&:hover": {
        borderColor: isFilled ? "transparent" : selectedColors.hoverBorderColor,
        backgroundColor: isFilled ? selectedColors.hoverBgFilled : selectedColors.hoverBg,
        borderWidth: isFilled ? "0px" : "0px", // Keep border on hover if outlined
      },
    };
  }
);

const IV_KEY = import.meta.env.VITE_IV_KEY || "";
const AES_KEY = import.meta.env.VITE_AES_KEY || ""; // 16 bytes for IV

// export function encryptAES(plaintext: string): string {
//   try {
//     const key = CryptoJS.enc.Utf8.parse(AES_KEY);
//     const iv = CryptoJS.enc.Utf8.parse(IV_KEY);

//     const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // return hex
//   } catch (error) {
//     console.error("Encryption error:", error);
//     return "";
//   }
// }

// export function decryptAES(cipherHex: string): string {
//   try {
//     const key = CryptoJS.enc.Utf8.parse(AES_KEY);
//     const iv = CryptoJS.enc.Utf8.parse(IV_KEY);

//     const cipherParams = CryptoJS.enc.Hex.parse(cipherHex);
//     const encryptedBase64 = CryptoJS.enc.Base64.stringify(cipherParams);

//     const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return decrypted.toString(CryptoJS.enc.Utf8);
//   } catch (error) {
//     console.error("Decryption error:", error);
//     return cipherHex;
//   }
// }



export function encryptAES(plaintext: string): string {
  try {
    const key = CryptoJS.enc.Hex.parse(AES_KEY); // Hex decoding
    const iv = CryptoJS.enc.Hex.parse(IV_KEY);   // Hex decoding

    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // Return raw hex like backend
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
}

export function decryptAES(cipherHex: string | null | undefined): string {
  try {
    if (!cipherHex) return "";
    const key = CryptoJS.enc.Hex.parse(AES_KEY);
    const iv = CryptoJS.enc.Hex.parse(IV_KEY);

    // Convert hex to Base64 for CryptoJS decryption
    const cipherParams = CryptoJS.enc.Hex.parse(cipherHex);
    const encryptedBase64 = CryptoJS.enc.Base64.stringify(cipherParams);

    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
}


