import { Button, Stack, Typography, } from "@mui/material";
import { useTranslation } from "react-i18next";



interface CommonDialogProps {
  handleCancel: () => void;
  handleConfirm: (data:any) => void;
  title: string;
  subTitle: string;
}
export default function CommonDialog({
  handleCancel,
  handleConfirm,
  title,
  subTitle
}: CommonDialogProps) {
  const { t } = useTranslation();
  const submitHandler = (data: any) => {
    handleConfirm(data);
  };
  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <img
          src="/assets/icons/alert.svg"
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
        <Button variant="primary" onClick={handleCancel}>
          {t("buttons.noCancel")}
        </Button>
        <Button variant="secondary" onClick={submitHandler}>
          {t("buttons.confirm")}
        </Button>
      </Stack>
    </Stack>
  );
}
