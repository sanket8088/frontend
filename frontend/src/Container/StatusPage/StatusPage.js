import React from 'react';
import axios from 'axios';

import classes from './StatusPage.module.css';


import { API_URL, MENU_OPTIONS, TEMPLATE_VIEW } from "../../assets/constant"

import MenuOptions from "../../Component/MenuOptions/MenuOptions"


class StatusPage extends React.Component {
    state = {
        userRecords: []
    };

    componentDidMount() {
        let url = `${API_URL}api/excel/allResponse/${this.props.userId}`
        axios.get(url)
            .then(res => {
                this.setState({ userRecords: res.data })
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
                        {this.state.fileData === [] ? <div className={classes.TopPart}>

                        </div> :

                            <table className={classes.TopPart}>
                                <th>Email-ID</th>
                                <th>Response</th>
                                <th>Description</th>
                                {/* <th>Name</th>

                                <th>Organization</th>
                                <th>Price</th>
                                <th>Date</th> */}


                                {
                                    this.state.userRecords.map((listValue) => {
                                        if (listValue["Name"] !== "") {
                                            return (
                                                <tr >
                                                    <td>{listValue["senderMail"]}</td>
                                                    <td>{listValue["response"]}</td>
                                                    <td>{listValue["description"]}</td>
                                                    {/* <td>{listValue["name"]}</td>
                                                    <td>{listValue["organization"]}</td>
                                                    <td>{listValue["price"]}</td>
                                                    <td>{listValue["sendDate"]}</td> */}
                                                </tr>
                                            )
                                        };
                                    })}

                            </table>
                        }

                    </div>



                </div>
            </div>
        );

    }
}
export default StatusPage;

