import { Button, Stack, Typography } from "@mui/material";

interface AlertDialogProps {
    handleClose: () => void;
    title: string;
    subTitle: string;
    buttonText: string;
    isError?: boolean;
}

export default function AlertDialog({
    handleClose,
    title,
    subTitle,
    buttonText,
    isError = false
}: AlertDialogProps) {
    return (
        <Stack gap={2}>
            <Stack gap={1}>
                <img
                    src={isError ? "/assets/icons/error-alert.svg" : "/assets/icons/alert.svg"}
                    alt="alert-icon"
                    style={{
                        width: "56px",
                        height: "56px",
                    }}
                />
                <Typography variant="h5" fontSize={"28px"} fontWeight={600}>
                    {title}
                </Typography>
            </Stack>
            <Typography variant="subtitle1" fontSize={"22px"}>
                {subTitle}
            </Typography>
            <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={2}>
                <Button variant="secondary" onClick={handleClose}>
                    {buttonText}
                </Button>
            </Stack>
        </Stack>
    );
}
