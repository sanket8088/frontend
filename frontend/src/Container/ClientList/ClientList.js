import React from 'react';
import axios from 'axios';

import classes from './ClientList.module.css';
import { API_URL, MENU_OPTIONS, TEMPLATE_VIEW } from "../../assets/constant"
import MenuOptions from "../../Component/MenuOptions/MenuOptions"

class ProfilePage extends React.Component {
    state = {
        allCompanyName: [],
        selectedCompany: "",
        allClienList: [],
        userRecords: []
    };


    componentDidMount() {
        let url = `${API_URL}api/excel/allUserOrders/${this.props.userId}`
        axios.get(url)
            .then(res => {
                let allData = res.data
                this.setState({
                    allCompanyName: allData.data
                });
            })

    }

    defaultLabelStyle = {

    };
    change = (e) => {
        this.setState({ selectedCompany: e.target.value });
        let url = `${API_URL}api/excel/singleUserCompany/`
        var data = new FormData();
        data.append('userId', this.props.userId);
        data.append('company', e.target.value);
        var config = {
            method: 'post',
            url: url,
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(response.data.data);
                this.setState({ userRecords: response.data.data })
            })
            .catch((error) => {
                console.log(error);
            });

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
                        <div className={classes.TopBar}>
                            <label for="company">Select the company from dropdown:</label>
                            <select onChange={(e) => {
                                this.change(e)
                            }} name="company" value={this.state.selectedCompany}>
                                {this.state.allCompanyName.map((item) => {
                                    return <option value={item}>{item}</option>
                                })}
                            </select>
                        </div>
                        <div className={classes.CompanyName}>{this.state.selectedCompany}</div>

                        <div className={classes.Content}>
                            {this.state.allClienList === [] ? null :
                                <table className={classes.TopPart}>
                                    <th>Subject</th>
                                    <th>Email ID</th>
                                    <th>Organization</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Status</th>


                                    {
                                        this.state.userRecords.map((listValue) => {

                                            return (
                                                <tr >
                                                    <td>{listValue["subject"]}</td>
                                                    <td>{listValue["toMail"]}</td>
                                                    <td>{listValue["organization"]}</td>
                                                    <td>{listValue["amount"]}</td>
                                                    <td>{listValue["created_at"]}</td>
                                                    <td>{listValue["responded"] === 1 ? "Responded" : "No Response"}</td>

                                                </tr>
                                            )
                                                ;
                                        })}

                                </table>}


                        </div>


                    </div>



                </div>
            </div>
        );

    }
}

export default ProfilePage;

