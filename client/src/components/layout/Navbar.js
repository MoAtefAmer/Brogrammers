<<<<<<< HEAD
import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import Badge from "@material-ui/core/Badge"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { fade } from "@material-ui/core/styles/colorManipulator"
import { withStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"

const styles = theme => ({
  root: {
    width: "100%"
=======
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'

const styles = theme => ({
  root: {
    width: '100%'
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
<<<<<<< HEAD
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
=======
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
<<<<<<< HEAD
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
=======
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
<<<<<<< HEAD
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
=======
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
<<<<<<< HEAD
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
=======
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
      width: 200
    }
  },
  sectionDesktop: {
<<<<<<< HEAD
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
=======
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
    }
  }
})

class PrimarySearchAppBar extends React.Component {
<<<<<<< HEAD
  constructor(props)
  {super(props)
  this.state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    auth:false
  }
=======
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      auth: false
    }
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
  }
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
<<<<<<< HEAD
 //   this.props.callBack(null, false,"", null)
    this.setState({ mobileMoreAnchorEl: null ,
    auth:this.props.auth})
   
  }

  handleSignOut= () =>{
    sessionStorage.setItem("auth",false)
    sessionStorage.setItem("jwtToken",null)
    sessionStorage.setItem("type",null)
    console.log(sessionStorage.getItem("jwtToken") +"  heeere")
    this.state.auth=false
    this.forceUpdate()
    this.handleMenuClose()
    document.location.href = "/";
    }

    handleProfile = () =>{
      document.location.href = "/profile";
    }


  render() {
   
=======
    //   this.props.callBack(null, false,"", null)
    this.setState({ mobileMoreAnchorEl: null, auth: this.props.auth })
  }

  handleSignOut = () => {
    sessionStorage.setItem('auth', false)
    sessionStorage.setItem('jwtToken', null)
    sessionStorage.setItem('type', null)
    console.log(sessionStorage.getItem('jwtToken') + '  heeere')
    this.state.auth = false
    this.forceUpdate()
    this.handleMenuClose()
    document.location.href = '/'
  }

  handleProfile = () => {
    document.location.href = '/profile'
  }

  render() {
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
    const { anchorEl, mobileMoreAnchorEl } = this.state
    const { classes } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
<<<<<<< HEAD
    var renderMenu=""
    var renderMobileMenu = ""
    if(sessionStorage.getItem("jwtToken")!=null)
    {
     renderMenu = (
       
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
        <MenuItem onClick={this.handleSignOut}>Sign out </MenuItem>
      </Menu>
    )
    
   
    

     renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )

     }
     else{
       renderMenu=""
       renderMobileMenu=""
     }
     console.log(sessionStorage.getItem("type") + "you see")
     const hidei = sessionStorage.getItem("type")=="i"||sessionStorage.getItem("type")=="r"||sessionStorage.getItem("type")=="a"||sessionStorage.getItem("type")=="l"? {}:{display:"none"}
    return (
      <div className={classes.root}>
    <AppBar position="static">
=======
    var renderMenu = ''
    var renderMobileMenu = ''
    if (sessionStorage.getItem('jwtToken') != null) {
      renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
          <MenuItem onClick={this.handleSignOut}>Sign out </MenuItem>
        </Menu>
      )

      renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      )
    } else {
      renderMenu = ''
      renderMobileMenu = ''
    }
    console.log(sessionStorage.getItem('type') + 'you see')
    const hidei =
      sessionStorage.getItem('type') == 'i' ||
      sessionStorage.getItem('type') == 'r' ||
      sessionStorage.getItem('type') == 'a' ||
      sessionStorage.getItem('type') == 'l'
        ? {}
        : { display: 'none' }
    return (
      <div className={classes.root}>
        <AppBar position="static">
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              GAFI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
<<<<<<< HEAD
                placeholder="What do you need?" autoFocus
=======
                placeholder="What do you need?"
                autoFocus
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
<<<<<<< HEAD
            <button href="http://localhost:3001/company/approved">
              View Companies
            </button >
            <div className={classes.grow} />
            <div className={classes.sectionDesktop} style = {hidei} >
=======
            <div className={classes.grow} />
            <div className={classes.sectionDesktop} style={hidei}>
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
              <IconButton color="inherit">
                <Badge badgeContent={69} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={19} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
<<<<<<< HEAD
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
=======
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
<<<<<<< HEAD
            
            <div className={classes.sectionMobile}  >
=======

            <div className={classes.sectionMobile}>
>>>>>>> e9b960e1ba76d802bf8beb25384177ae1162c276
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    )
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PrimarySearchAppBar)
