import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

type log = {
  id: string;
  heading: string;
  description: string;
  link: string;
}
interface VettingValidationDrawerProps {
  validationLog: log[];
  handleClose: () => void;
}
export default function VettingValidationDrawer({
  handleClose,
  validationLog,
}: VettingValidationDrawerProps) {
  return (
    <Stack gap={2}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Validation Sources</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      {validationLog?.length === 0 ? <Typography variant="h6">No Log Available</Typography> : validationLog?.map((log) => (
        <Stack key={log.id} gap={0.5}>
          <Typography variant="h6" fontWeight={600}>{log.heading}</Typography>
          <Typography variant="h6">{log.description}</Typography>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <img src="/assets/icons/link-icon.svg" alt="link-icon" style={{width:"18px", height:"18px"}}/>
            <Link to={log.link} style={{fontSize:"12px", fontWeight:400}}>{log.link}</Link>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
