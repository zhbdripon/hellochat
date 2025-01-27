import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CompactTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    height: "2.8rem",
    marginBottom: "12px",
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 12px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    transform: "translate(14px, -9px) scale(0.75)",
  },
}));

export default CompactTextField;
