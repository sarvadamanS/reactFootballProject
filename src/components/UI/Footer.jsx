import { Card, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Footer = () => {
  return (
    <>
      <Card
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: 0,
        }}
      >
        <p>Site Created by Sarvadaman Singh</p>
        <Link
          color="secondary.main"
          href="https://www.freepik.com/free-photo/white-concrete-Linkall_4410360.htm#page=3&query=background&position=38&from_view=search&track=sph&uuid=e01773c7-64d9-45da-a0c2-eaa4d8a16507"
        >
          Image by rawpixel.com
        </Link>
        -on Freepik
      </Card>
    </>
  );
};
export default Footer;
