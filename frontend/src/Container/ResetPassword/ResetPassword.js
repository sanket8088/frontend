import React from 'react';
import axios from 'axios';

import classes from './ResetPassword.module.css';
import { API_URL } from "../../assets/constant"

class ResetPassword extends React.Component {
    state = {
        passwordVal: '',
        confirmPasswordVal: ''

    }


    handleLoginSubmit = (e) => {
        e.preventDefault();
        let id = window.location.pathname.split("/")[2]
        console.log(id)

        if (this.state.passwordVal === this.state.confirmPasswordVal) {
            let url = API_URL + `api/user/update/`
            var data = new FormData();
            data.append('password', this.state.passwordVal);
            data.append('resetKey', id);
            axios({
                method: 'post',
                url: url,
                data: data
            }).then(response => {
                if (response.data.status === 200) {

                    window.location.pathname = ""
                }
                else {
                    alert(response.data.error)
                }


            })
                .catch(err => {
                    console.log(err)
                })

        }

        else {
            alert("Password does not match")
        }


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


    handleInputChanges = (e, name) => {
        switch (name) {
            case "username":
                this.setState({ passwordVal: e.target.value });
                break;
            case "password":
                this.setState({ confirmPasswordVal: e.target.value });
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


    render() {
        return (
            <div className={classes.MainPage}>
                <div>
                    <form className={classes.Login} onSubmit={this.handleLoginSubmit}>
                        <input className={classes.FormInput} type="password" name="password" placeholder="Enter password" value={this.state.passwordVal} onInput={(e) => this.handleInputChanges(e, "username")} required />
                        <input className={classes.FormInput} type="password" name="password" placeholder="Re-Enter Password" value={this.state.confirmPasswordVal} onInput={(e) => this.handleInputChanges(e, "password")} required />
                        <input className={classes.FormSubmit} type="submit" value="Submit" />
                    </form>
                </div>

            </div>
        );

    }
}

export default ResetPassword;

