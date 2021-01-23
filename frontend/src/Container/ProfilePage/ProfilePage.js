import React from 'react';
import axios from 'axios';

import classes from './ProfilePage.module.css';
import { API_URL, MENU_OPTIONS, TEMPLATE_VIEW } from "../../assets/constant"
import MenuOptions from "../../Component/MenuOptions/MenuOptions"

class ProfilePage extends React.Component {
    state = {
        registerName: "",
        registerAddress: "",
        registerOrganization: "",
        registerGst: "",
        registerPhone: ""


    };

    componentDidMount() {
        let url = `${API_URL}api/user/userInfo/${this.props.userId}`
        axios.get(url)
            .then(res => {
                let allData = res.data
                this.setState({
                    registerName: allData.data.first_name
                });
                this.setState({
                    registerAddress: allData.data.address
                });
                this.setState({
                    registerOrganization: allData.data.organisation
                });
                this.setState({
                    registerGst: allData.data.gst
                });
                this.setState({
                    registerPhone: allData.data.contact_number
                });

            })

    }

    defaultLabelStyle = {

    };
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


    handleRegisterSubmit = (e) => {
        e.preventDefault();

        const data = {
            first_name: this.state.registerName,
            address: this.state.registerAddress,
            organisation: this.state.registerOrganization,
            gst: this.state.registerGst,
            contact_number: this.state.registerPhone,
            userId: this.props.userId
        }
        var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
        if (gstinformat.test(data.gst)) {
            let url = API_URL + "api/user/update/"
            console.log(data)
            axios.post(url, JSON.stringify(data))
                .then(response => {
                    console.log(response)
                    alert("Information Updateed Successfully")

                })
                .catch(err => {
                    alert("Server Error")
                    console.log(err)
                })

        }
        else {
            alert("Invalid GST Format")
            return

        }


    }

    render() {
        return (
            <div>
                <div className={classes.MainPage}>
                    <div className={classes.LeftMenu}>
                        <div className={classes.LeftMenuContainer}>
                            {
                                MENU_OPTIONS.map(item => {
                                    return <MenuOptions key={item.id} id={item.id} title={item.name} active={this.props.active} switchActiveTab={this.props.switchActiveTab} />
                                })
                            }
                        </div>

                    </div>


                    <div className={classes.Content}>
                        <form className={classes.Register} onSubmit={this.handleRegisterSubmit}>
                            <p>Name</p>
                            <input className={classes.FormInput} type="name" name="name" placeholder="Name*" value={this.state.registerName} onInput={(e) => this.handleRegisterChanges(e, "registerName")} required />

                            <p>Address</p>
                            <input className={classes.FormInput} type="name" name="address" placeholder="Address*" value={this.state.registerAddress} onInput={(e) => this.handleRegisterChanges(e, "registerAddress")} required />

                            <p>Organization</p>
                            <input className={classes.FormInput} type="name" name="organisation" placeholder="Organization Name" value={this.state.registerOrganization} onInput={(e) => this.handleRegisterChanges(e, "registerOrganization")} />

                            <p>GST</p>
                            <input className={classes.FormInput} type="name" name="gst" placeholder="GSTIN*" value={this.state.registerGst} onInput={(e) => this.handleRegisterChanges(e, "registerGst")} required />

                            <p>Phone</p>
                            <input className={classes.FormInput} type="name" name="phone" placeholder="Phone*" value={this.state.registerPhone} onInput={(e) => this.handleRegisterChanges(e, "registerPhone")} required />



                            <input className={classes.FormSubmit} type="submit" value="Update" />
                        </form>


                    </div>



                </div>
            </div>
        );

    }
}

export default ProfilePage;

