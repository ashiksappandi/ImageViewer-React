import React, { Component } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input";
import InputBase from "@material-ui/core/InputBase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import UserAvatar from "../../assets/logo.jpg";

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') != null
        };
    }

    handleClick = (event) =>{
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleAccount = ()=>{
        this.props.handleAccount();
        this.handleClose();
    }

    handleLogout = ()=>{
        this.props.handleLogout();
        this.handleClose();
    }

    handleClose = () =>{
        this.setState({ anchorEl: null });
    }

    render() {
        const{screen} =this.props;
        return(
            <div className="appHeader">
                <AppBar className='appHeader'>
                    <Toolbar>
                        {(screen === "Login" || screen === "Home") && <span className="header-logo">Image Viewer</span>}
                        {(screen === "Profile") && <Link style={{ textDecoration: 'none', color: 'white' }} to="/home"><span className="header-logo">Image Viewer</span></Link>}
                        <div className='grow'/>
                        {(screen === "Home") &&
                        <div className='search'>
                            <div className='searchIcon'>
                                <SearchIcon />
                            </div>
                            <InputBase onChange={(e)=>{this.props.searchHandler(e.target.value)}} placeholder="Search…" className="inputInput"/>
                        </div>
                        }
                        {(screen === "Home" || screen === "Profile")  &&
                        <div>
                            <IconButton onClick={this.handleClick}>
                                <Avatar alt="Profile Pic" src={UserAvatar} className='avatar' style={{border: "1px solid #fff"}}/>
                            </IconButton>
                            <Popover
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}>
                                <div style={{padding:'5px'}}>
                                    { (screen === "Home") &&
                                    <div>
                                        <MenuItem onClick={this.handleAccount}>My Account</MenuItem>
                                        <div className='hr'/>
                                    </div>
                                    }
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </div>
                            </Popover>
                        </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Header;