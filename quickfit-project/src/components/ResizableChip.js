
import Chip from "@mui/material/Chip";

const SuccessSlider = styled(Chip)(({ theme }) => ({
  root: {
    fontSize: (props) => `${props.size * 0.8125}rem`,
    height: (props) => `${props.size * 32}px`,
    borderRadius: "9999px"
  },
  deleteIcon: {
    height: (props) => `${props.size * 22}px`,
    width: (props) => `${props.size * 22}px`,
  }
}));

export default function StyledCustomization() {
  return <SuccessSlider defaultValue={30} />;
}

function ResizableChip(props) {
  const { size = 1, ...restProps } = props;
  const classes = useStyles({ size });

  return (
    <Chip
      className={classes.root}
      classes={{ avatar: classes.avatar, deleteIcon: classes.deleteIcon }}
      {...restProps}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: (props) => `${props.size * 0.8125}rem`,
    height: (props) => `${props.size * 32}px`,
    borderRadius: "9999px"
  },
  deleteIcon: {
    height: (props) => `${props.size * 22}px`,
    width: (props) => `${props.size * 22}px`,
  }
}));

export default ResizableChip;
