import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollIntoView() {
  function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger();

    const handleClick = () => {
      document.querySelector("#back-to-top-anchor").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 16,
            right: { xs: 16, md: "calc(50% - 450px)" },
          }}
        >
          {children}
        </Box>
      </Fade>
    );
  }
  return (
    <ScrollTop>
      <Fab aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
}
