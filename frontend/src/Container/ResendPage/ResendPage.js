import React from 'react';
import axios from 'axios';

import classes from './ResendPage.module.css';


import { API_URL, MENU_OPTIONS, TEMPLATE_VIEW } from "../../assets/constant"

import MenuOptions from "../../Component/MenuOptions/MenuOptions"

import { PieChart } from 'react-minimal-pie-chart';


class ResendPage extends React.Component {
    state = {
        userRecords: []
    };

    componentDidMount() {
        let url = `${API_URL}api/excel/noResponse/${this.props.userId}`
        axios.get(url)
            .then(res => {
                this.setState({ userRecords: res.data })
            })
            .catch(res => {
                alert("nor send")
            })

    }

    reSendMail = (mailId) => {
        let url = `${API_URL}api/excel/resendMail/${mailId}`
        axios.get(url)
            .then(res => {
                alert("Mail Sent")
            })

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
                        {(this.state.resendMailList === []) ? null :
                            <table className={classes.TopPart}>
                                <th>Subject</th>
                                <th>Email ID</th>
                                <th>Organization</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Resend</th>


                                {
                                    this.state.userRecords.map((listValue) => {

                                        return (
                                            <tr >
                                                <td>{listValue["subject"]}</td>
                                                <td>{listValue["toMail"]}</td>
                                                <td>{listValue["organization"]}</td>
                                                <td>{listValue["amount"]}</td>
                                                <td>{listValue["date"]}</td>
                                                <td><button onClick={() => this.reSendMail(listValue["id"])}>Send</button></td>
                                            </tr>
                                        )
                                            ;
                                    })}

                            </table>}


                    </div>



                </div>
            </div>
        );

    }
}
export default ResendPage;

