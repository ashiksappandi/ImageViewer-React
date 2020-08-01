import React, {Component as that, Component} from "react";
import './Login.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from "@material-ui/core/FormHelperText";

class Login extends Component{

    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            wrongCredential: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') != null
        }
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : this.setState({usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : this.setState({passwordRequired: "dispNone"});

        if (this.state.username === "" || this.state.password === "") {
            this.setState({wrongCredential: "dispNone"});
            return
        }

        let dft_username = 'username';
        let dft_password = 'password';

        if (this.state.username === dft_username && this.state.password === dft_password) {
            sessionStorage.setItem('access-token', 'IGQVJVeXA5Q3I4aHU0RmNlbUl4VHR0cW0yQkQyQmd1OWNkYzJOVGd5ZA0M0aHFXSUZAlZAmNMMWNobGxGWXh0TVp3MjhzT2p6eEE3NVBsZA29HMDJaU256eGJVekpRZAk1zWDl4VFFvRzc5eTFDZAm1tSEJFWWVROGIzTlZAHaFZAr');
            this.setState({loggedIn: true});
            this.setState({wrongCredential: "dispNone"});
        }
        else {
            this.setState({wrongCredential: "dispBlock"});
        }


        /*        let that = this;
                let dataLogin = null

                let xhrLogin = new XMLHttpRequest();
                xhrLogin.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        console.log(xhrLogin.getResponseHeader('access-token'));

                        sessionStorage.setItem('uuid', JSON.parse(this.responseText).id);
                        sessionStorage.setItem('access-token', xhrLogin.getResponseHeader('access-token'));

                        that.setState({ loggedIn: true });
                        that.closeModalHandler();
                    }
                })


                xhrLogin.open("POST", this.props.baseUrl + "auth/login");
                xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.password));
                xhrLogin.setRequestHeader("Content-Type", "application/json");
                xhrLogin.setRequestHeader("Cache-Control", "no-cache");
                xhrLogin.send(dataLogin);
        */

    }

    render() {
        return (
            <div>
                <header className='header'>
                    <span className='hdr-logo'>Image Viewer</span>
                </header>
                <body>
                <Card className='card login-card'>
                    <CardContent>
                        <Typography variant="h5" component="h2" className='card-title login-card-title'>
                            LOGIN
                        </Typography>
                        <FormControl required className='form-control'>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required className='form-control'>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl>
                        <FormHelperText className={this.state.wrongCredential}><span className="red">Incorrect username and/or password</span></FormHelperText>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </CardActions><br></br>
                </Card>
                </body>
            </div>
        );
    }
}

export default Login;