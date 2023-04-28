import * as React from "react";
// MUI Component Imports
import { 
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
// MUI Icon Imports
import CloseIcon from "@mui/icons-material/Close";

export default function ImageSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  
  // For making snackbar transition up on popup
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }


  const buttons = (
    <>
      <Button
        variant="contained"
        onClick={handleClick({
          vertical: "bottom",
          horizontal: "center",
        })}
      >
        Top-Center
      </Button>
    </>
  );

  return (
    <div>
      {buttons }
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Photo captured"
        key={vertical + horizontal}
        TransitionComponent={TransitionUp}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}