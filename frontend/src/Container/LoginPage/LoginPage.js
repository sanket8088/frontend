import React from 'react';
import axios from 'axios';

import classes from './LoginPage.module.css';
import { API_URL } from "../../assets/constant"

class LoginPage extends React.Component {
    state = {
        usernameVal: '',
        passwordVal: '',
        login: true,
        buttonChange: "REGISTER",
        registerName: "",
        registerAddress: "",
        registermail: "",
        registerOrganization: "",
        registerPassword: "",
        retypepassword: "",
        registerGst: "",
        registerPhone: "",
        showResetPassword: false,
        ResetPassword: ""
    }

    changeToggleGrade = () => {
        (this.state.login) ? this.setState({ login: false, buttonChange: "LOGIN" }) : this.setState({ login: true, buttonChange: "REGISTER" })


    }

    handleLoginSubmit = (e) => {
        e.preventDefault();

        let url = API_URL + "api/user/login/"
        var data = new FormData();
        data.append('password', this.state.passwordVal);
        data.append('email', this.state.usernameVal);



        axios({
            method: 'post',
            url: url,
            data: data
        }).then(response => {
            if (response.data.status == 200) {
                this.props.onUserLogin(response.data.user.id);
                this.props.history.push("/dashboard");
            }
            else {
                alert(response.data.error)
            }


        })
            .catch(err => {
                console.log(err)
            })
    }


    handleResetSubmit = (e) => {
        e.preventDefault();
        let url = API_URL + "api/user/forgot_password/"
        var data = new FormData();
        data.append('email', this.state.ResetPassword);
        axios({
            method: 'post',
            url: url,
            data: data
        }).then(response => {
            if (response.data.status === 200) {
                alert("Reset Link has been sent to your mail id")
            }
            else {
                alert(response.data.error)
            }


        })
            .catch(err => {
                console.log(err)
            })
    }

    handleRegisterSubmit = (e) => {
        e.preventDefault();

        const data = {
            first_name: this.state.registerName,
            address: this.state.registerAddress,
            email: this.state.registermail,
            organisation: this.state.registerOrganization,
            password: this.state.registerPassword,
            retypepassword: this.state.retypepassword,
            gst: this.state.registerGst,
            contact_number: this.state.registerPhone,
        }
        if (data.password === data.retypepassword) {
            var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
            if (gstinformat.test(data.gst)) {
                alert("popop")
                let url = API_URL + "api/user/"

                axios.post(url, data)
                    .then(response => {
                        console.log(response)
                        alert("Email verification mail send on the registered mail id")
                        this.changeToggleGrade()

                    })
                    .catch(err => {
                        alert("User already exist.")
                        console.log(err)
                    })

            }
            else {
                alert("Invalid GST Format")
                return

            }
        }
        else {

            alert("Both password does not match")
            return
        }
    }

    handleInputChanges = (e, name) => {
        switch (name) {
            case "username":
                this.setState({ usernameVal: e.target.value });
                break;
            case "password":
                this.setState({ passwordVal: e.target.value });
                break;
            default:
                console.log('Name not identified!!')
        }
    }

    handleResetChanges = (e, name) => {
        switch (name) {
            case "username":
                this.setState({ ResetPassword: e.target.value });
                break;
            default:
                console.log('Name not identified!!')
        }
    }

    handleRegisterChanges = (e, name) => {
        switch (name) {
            case "registerName":
                this.setState({ registerName: e.target.value });
                break;
            case "registerAddress":
                this.setState({ registerAddress: e.target.value });
                break;
            case "registermail":
                this.setState({ registermail: e.target.value });
                break;
            case "registerOrganization":
                this.setState({ registerOrganization: e.target.value });
                break;
            case "registerPassword":
                this.setState({ registerPassword: e.target.value });
                break;
            case "retypepassword":
                this.setState({ retypepassword: e.target.value });
                break;
            case "registerGst":
                this.setState({ registerGst: e.target.value });
                break;
            case "registerPhone":
                this.setState({ registerPhone: e.target.value });
                break;
            default:
                console.log('Name not identified!!')
        }
    }

    render() {
        return (
            <div className={classes.MainPage}>
                {this.state.showResetPassword ?
                    <div>
                        <div onClick={() => {
                            this.setState({
                                showResetPassword: false
                            })


                        }} className={classes.ForgetPasswordWrap}>
                        </div>
                        <div className={classes.ForgetPassword}>
                            <div className={classes.PasswordHeader}>
                                Forget Password ?
                        </div>
                            <form className={classes.ResetLogin} onSubmit={this.handleResetSubmit}>
                                <input className={classes.FormInput} type="name" name="username" placeholder="Enter your email" value={this.state.ResetPassword} onInput={(e) => this.handleResetChanges(e, "username")} required />
                                <input className={classes.FormSubmit} type="submit" value="Submit" />
                            </form>
                        </div>
                    </div> : null}
                <div className={classes.Container}>
                    <div className={classes.LeftPanel}>
                        <h1 className={classes.TopPart}>Ease your</h1>
                        <h1 className={classes.BottomPart}>Email <span className={classes.BottomBold}>Confirmations</span></h1>
                    </div>
                    <div className={classes.MainContainer}>

                        {(this.state.login) ? <form className={classes.Login} onSubmit={this.handleLoginSubmit}>
                            <input className={classes.FormInput} type="name" name="username" placeholder="E-mail" value={this.state.usernameVal} onInput={(e) => this.handleInputChanges(e, "username")} required />
                            <input className={classes.FormInput} type="password" name="password" placeholder="Password" value={this.state.passwordVal} onInput={(e) => this.handleInputChanges(e, "password")} required />

                            <input className={classes.FormSubmit} type="submit" value="Submit" />
                        </form> :
                            <form className={classes.Register} onSubmit={this.handleRegisterSubmit}>
                                <input className={classes.FormInput} type="name" name="name" placeholder="Name*" value={this.state.registerName} onInput={(e) => this.handleRegisterChanges(e, "registerName")} required />

                                <input className={classes.FormInput} type="name" name="address" placeholder="Address*" value={this.state.registerAddress} onInput={(e) => this.handleRegisterChanges(e, "registerAddress")} required />

                                <input className={classes.FormInput} type="name" name="username" placeholder="E-mail*" value={this.state.registermail} onInput={(e) => this.handleRegisterChanges(e, "registermail")} required />

                                <input className={classes.FormInput} type="name" name="organisation" placeholder="Organization Name" value={this.state.registerOrganization} onInput={(e) => this.handleRegisterChanges(e, "registerOrganization")} />
                                <input className={classes.FormInput} type="password" name="registerPassword" placeholder="Password" value={this.state.registerPassword} onInput={(e) => this.handleRegisterChanges(e, "registerPassword")} required />
                                <input className={classes.FormInput} type="password" name="retypepassword" placeholder="Password" value={this.state.retypepassword} onInput={(e) => this.handleRegisterChanges(e, "retypepassword")} required />
                                <input className={classes.FormInput} type="name" name="gst" placeholder="GSTIN*" value={this.state.registerGst} onInput={(e) => this.handleRegisterChanges(e, "registerGst")} required />

                                <input className={classes.FormInput} type="name" name="phone" placeholder="Phone*" value={this.state.registerPhone} onInput={(e) => this.handleRegisterChanges(e, "registerPhone")} required />



                                <input className={classes.FormSubmit} type="submit" value="Submit" />
                            </form>
                        }

                        <div className={classes.BottomOptions}>
                            <div onClick={() => {
                                this.setState({
                                    showResetPassword: true
                                })
                            }} className={classes.BottomLeftSide}>Forgot Password</div>
                            <div onClick={this.changeToggleGrade} className={classes.BottomRightSide}>{this.state.buttonChange}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default LoginPage;

