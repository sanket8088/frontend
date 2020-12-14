import React from 'react';
import axios from 'axios';

import classes from './AnalyticsPage.module.css';


import { API_URL, MENU_OPTIONS, TEMPLATE_VIEW } from "../../assets/constant"

import MenuOptions from "../../Component/MenuOptions/MenuOptions"

import { PieChart } from 'react-minimal-pie-chart';


class AnalyticsPage extends React.Component {
    state = {
        totalEmail: 0,
        responded: 0
    };

    componentDidMount() {
        let url = `${API_URL}api/excel/compareMails/${this.props.userId}`
        axios.get(url)
            .then(res => {
                let totalEmail = res.data.totalMail
                let responded = res.data.totalMail - res.data.responsedMail
                this.setState({ totalEmail: totalEmail, responded: responded })
            })

    }

    defaultLabelStyle = {

    };


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
                        {(this.state.totalMail <= 0) ? null :
                            <PieChart radius={25}
                                animate={true}

                                data={
                                    [
                                        { title: 'Response', value: this.state.responded, color: '#E38627' },
                                        { title: 'No Response', value: this.state.totalEmail, color: '#C13C37' }
                                    ]}
                                label={({ dataEntry }) => dataEntry.value}

                                labelStyle={{
                                    fontSize: '5px',
                                    fontFamily: 'sans-serif',
                                }}
                            />};


                    </div>



                </div>
            </div>
        );

    }
}
export default AnalyticsPage;

