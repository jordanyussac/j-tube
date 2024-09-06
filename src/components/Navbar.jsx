import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const logo = 'https://drive.google.com/uc?export=view&id=1NoRFDgoCIach3cJMGhq2xqSjJ97f1Cdy'

const Navbar = () => (
  <Stack direction="row" alignItems={"center"} p={2} sx={{ position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between', overflowY: 'hidden', zIndex: 1}}>
    <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="logo" height={25}/>
      <Typography style={{ color: '#FFF', fontWeight: 'bold', padding: '10px'}} variant='h5' sx={{  fontSize: { xs: '0', md: '20px', sm: '0px'} }}>
        J-Tube
      </Typography>
    </Link>
    <SearchBar />
    <button type='button' onClick={() => window.open('https://jordanyussac.github.io/Jordan-s-Portfolio/')} class='blue_btn'><i class="	fa fa-user-circle"></i></button>
  </Stack>
)

export default Navbar