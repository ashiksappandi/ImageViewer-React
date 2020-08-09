import React, {Component} from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import {constants} from "../../common/utils";
import UserAvatar from "../../assets/logo.jpg";
import Divider from "@material-ui/core/Divider";

class Home extends Component{

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/')
        }

        this.state = {
            allPostsId: [],
            postDetails: {},
            allPostDetails: [],
            filteredPostDetails: [],
        }
    }

    componentDidMount(){
        this.getAllPosts().then(r => this.getPostDetails());
    }

    getAllPosts = () => {
        const headers = { 'Accept': 'application/json' }
        let that = this;
        let url = constants.userMediaUrl+"&access_token="+sessionStorage.getItem('access-token');
        return fetch(url,{
            method:'GET',
            headers
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
            that.setState({
                allPostsId:jsonResponse.data,
            });
        }).catch((error) => {
            console.log('error user data',error);
        });
    }


    getPostDetails = () => {
        this.state.allPostsId.forEach(post => {
            const headers = { 'Accept': 'application/json' }
            let that = this;
            let url = constants.userPostUrl+"/"+ post.id +"?fields=id,media_type,media_url,username,timestamp&access_token="+sessionStorage.getItem('access-token');
            return fetch(url,{
                method:'GET',
                headers
            }).then((response) =>{
                return response.json();
            }).then((jsonResponse) =>{
                jsonResponse.caption = post.caption;
                jsonResponse.likes = Math.floor(Math.random() * 10);
                that.setState({
                    postDetails:jsonResponse,
                })
                that.state.allPostDetails.push(that.state.postDetails);
                that.state.filteredPostDetails.push(that.state.postDetails);
            }).catch((error) => {
                console.log('error user data',error);
            });

        })
    }

    onSearchEntered = (value) =>{
        let newFilteredData = [];
        this.state.allPostDetails.filter(post => post.caption.toString().toLowerCase().includes(value)).map(newFilterPost => (
            newFilteredData.push(newFilterPost)
        ))
        this.setState({
            filteredPostDetails:newFilteredData
        })
    }

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    navigateToAccount = () =>{
        this.props.history.push('/profile');
    }

    onLikeClicked = (id) => {
        if (this.state.isLiked) {
            this.setState({
                isLiked:false
            });
        }else {
            this.setState({
                isLiked:true
            });
        }
    }

    render() {
        return(
            <div>
                <Header screen={"Home"}
                    searchHandler={this.onSearchEntered}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount}/>

                <div className='card-main-content'>

                    {this.state.filteredPostDetails.map(item => (
                        <Card className="card-root" key={item.id}>
                        <CardHeader
                            avatar={
                                <Avatar alt="Profile Pic" src={UserAvatar} className='avatar' style={{border: "1px solid #fff"}}/>
                            }
                            title={
                                item.username
                            }
                            subheader={ new Date(item.timestamp).toLocaleString()}
                        />
                        <CardMedia
                            className="card-media"
                            image={item.media_url}
                            title={item.caption}
                        />
                        <Divider variant="middle" className="divider-line"/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.caption.replace(/#[a-z]+/gi,'')}
                            </Typography>
                            <Typography variant="body2" className="hashtags" component="p">
                                {
                                    item.caption.toString().match(/#[a-z]+/gi) ?
                                        item.caption.toString().match(/#[a-z]+/gi).toString().replace(/,+/g, ' ') : ''
                                }
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites" onClick={this.onLikeClicked.bind(this,item.id)}>
                                {this.state.isLiked && <FavoriteIconFill style={{color:'#F44336'}}/>}
                                {!this.state.isLiked && <FavoriteIconBorder/>}
                            </IconButton>
                            <span className="post-likes">{item.likes} likes</span>
                        </CardActions>
                    </Card>
                    ))}
                </div>
            </div>
        )
    }
}

export default Home