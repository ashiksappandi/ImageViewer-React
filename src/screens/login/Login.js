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
import Header from '../../common/Header'

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

        let dft_username = 'admin';
        let dft_password = 'admin';

        if (this.state.username === dft_username && this.state.password === dft_password) {
            sessionStorage.setItem('access-token', 'IGQVJVeXA5Q3I4aHU0RmNlbUl4VHR0cW0yQkQyQmd1OWNkYzJOVGd5ZA0M0aHFXSUZAlZAmNMMWNobGxGWXh0TVp3MjhzT2p6eEE3NVBsZA29HMDJaU256eGJVekpRZAk1zWDl4VFFvRzc5eTFDZAm1tSEJFWWVROGIzTlZAHaFZAr');
            this.setState({loggedIn: true});
            this.setState({wrongCredential: "dispNone"});
        }
        else {
            this.setState({wrongCredential: "dispBlock"});
        }
    }


    render() {
        return (
            <div>
                <Header screen={"Login"}/>
                <body className="main-content">
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