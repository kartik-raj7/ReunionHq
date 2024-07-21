import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import style from '../../styles/navbarcomponent.module.scss';

export default function NavbarComponent() {
  const navMenus = ['Home', 'About', 'Services', 'Pricing', 'Contact'];

  return (
    <AppBar position="static" className={style.navbar}>
      <Toolbar>
        <div className={style.brand}>
          <IconButton edge="start" color="inherit" aria-label="menu" >
            <img src="/logo.png" alt="Flowbite React Logo" className={style.brandImg} />
          </IconButton>
          <Typography variant="h6" component="div">
            Brand
          </Typography>
        </div>
        <div className={`${style.navLinks} ${style.navMenu}`}>
          {navMenus.map((menu, index) => (
            <Button key={index} to="#" className={style.navLink}>
              {menu}
            </Button>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}