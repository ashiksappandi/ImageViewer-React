import React, {Component} from "react";
import Header from "../../common/header/Header";

class Profile extends Component {

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    render() {
        return (
            <div>
                <Header screen={"Profile"}
                        handleLogout={this.logout}/>
            </div>
        )
    }
}

export default Profile