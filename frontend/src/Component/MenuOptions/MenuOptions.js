import React from 'react';
import axios from 'axios';
import classes from "./MenuOptions.module.css"


import { MENU_OPTIONS } from "../../assets/constant"
import { Link } from 'react-router-dom';

class MenuOptions extends React.Component {
    state = {}

    changeActive(id) {
        this.props.switchActiveTab(id)
    }

    render() {
        return (

            <div onClick={() => this.changeActive(this.props.id)
            } className={[classes.LinkContainer, this.props.id === this.props.active ? classes.Active : null].join(' ')}>
                <div className={classes.LinkCon}>
                    <div className={classes.OptionContainer}>
                        {this.props.title}

                    </div>
                </div>
            </div>

        );

    }
}
export default MenuOptions;

