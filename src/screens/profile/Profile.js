import React, {Component} from "react";
import Header from "../../common/header/Header";

class Profile extends Component {
    render() {
        return (
            <div>
                <Header screen={"Profile"}
                        searchHandler={this.onSearchEntered}
                        handleLogout={this.logout}/>
            </div>
        )
    }
}

export default Profile