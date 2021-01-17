import React from 'react';
import axios from 'axios';

import classes from './HomePage.module.css';

import * as XLSX from "xlsx";

import { API_URL, MENU_OPTIONS, TEMPLATE_VIEW } from "../../assets/constant"

import MenuOptions from "../../Component/MenuOptions/MenuOptions"


class HomePage extends React.Component {
    state = {
        file: "",
        fileData: [],
        showTemplate: false,
        templateId: "",
        heading: "",
        email: "",
        amount: "",
        instructions: "",
        attention: "",
        message: "",
        footer: "",
        name: "",
        date: "",
        organization: "",
        attachment: null,
        userRecords: []

    };

    filePathset(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        this.setState({ file });
        console.log(this.state.file);
    }

    readFile() {
        var f = this.state.file;
        var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
            // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            /* Update state */
            let finalData = this.convertToJson(data)
            this.setState({ fileData: finalData });
            // console.log(this.convertToJson(data)); // shows data in json format
        };
        reader.readAsBinaryString(f);
    }

    convertToJson(csv) {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        //return result; //JavaScript object
        return result; //JSON
    }
    sendMail(id, amount, name, date, organization) {
        if (this.state.templateId == "1") {
            let heading = TEMPLATE_VIEW[0]["heading"]
            let instructions = TEMPLATE_VIEW[0]["instructions"]
            let message = `Please Confirm the Credit balance as of Rs. ${amount}  as on ${date} carefully and either confirm its correctness, or report any differences directly to our auditors,(Firm & Local Address), who are performing an audit of our financial statements.`
            let footer = TEMPLATE_VIEW[0]["footer"]
            this.setState({ showTemplate: true, email: id, organization: organization, name: name, amount: amount, date: date, heading: heading, instructions: instructions, message: message, footer: footer })
        }

        if (this.state.templateId == "2") {
            let heading = TEMPLATE_VIEW[1]["heading"]
            let instructions = TEMPLATE_VIEW[1]["instructions"]
            let message = `Please Confirm the Credit balance as of Rs. ${amount}  as on ${date} carefully and either confirm its correctness, or report any differences directly to our auditors,(Firm & Local Address), who are performing an audit of our financial statements.`
            let footer = TEMPLATE_VIEW[1]["footer"]
            this.setState({ showTemplate: true, email: id, organization: organization, name: name, amount: amount, date: date, heading: heading, instructions: instructions, message: message, footer: footer })
        }

        if (this.state.templateId == "3") {
            let heading = TEMPLATE_VIEW[2]["heading"]
            let instructions = TEMPLATE_VIEW[2]["instructions"]
            let message = `In connection with the audit of our financial statements, please provide directly to auditors, (Firm & Local Address), the following information with regard to our deposits / Investments held by you as of ${date}`
            let footer = `A complete list of all deposits / investments owned by us which are in your custody as of ${date}`
            this.setState({ showTemplate: true, email: id, organization: organization, name: name, amount: amount, date: date, heading: heading, instructions: instructions, message: message, footer: footer })
        }

        if (this.state.templateId == "4") {
            let heading = TEMPLATE_VIEW[3]["heading"]
            let instructions = TEMPLATE_VIEW[3]["instructions"]
            let message = `In connection with the audit of our financial statements, please provide directly to auditors, (Firm & Local Address), the following information with regard to our deposits / Investments held by you as of ${date}`
            let footer = `A complete list of all deposits / investments owned by us which are in your custody as of ${date}`
            this.setState({ showTemplate: true, email: id, organization: organization, name: name, amount: amount, date: date, heading: heading, instructions: instructions, message: message, footer: footer })
        }


    }
    changeTemplate = (e) => {
        this.setState({ templateId: e.target.value });
    }

    handleInputChanges = (e, name) => {
        switch (name) {
            case "heading":
                this.setState({ heading: e.target.value });
                break;
            case "instructions":
                this.setState({ instructions: e.target.value });
                break;
            case "attention":
                this.setState({ attention: e.target.value });
                break;
            case "message":
                this.setState({ message: e.target.value });
                break;
            case "footer":
                this.setState({ footer: e.target.value });
                break;
            default:
                console.log('Name not identified!!')
        }
    }

    handleMailSubmit = (e) => {
        e.preventDefault();

        let url = API_URL + "api/excel/sendMail/"
        var data = new FormData();
        data.append('heading', this.state.heading);
        data.append('instructions', this.state.instructions);
        data.append('attention', this.state.attention);
        data.append('message', this.state.message);
        data.append('footer', this.state.footer);
        data.append('templateId', this.state.templateId);
        data.append('email', this.state.email);
        data.append('amount', this.state.amount);
        data.append('organization', this.state.organization);
        data.append('name', this.state.name);
        data.append('userId', this.props.userId);
        data.append('attachment', this.state.attachment);

        axios({
            method: 'post',
            url: url,
            data: data
        }).then(response => {
            if (response.data.status === 200) {
                this.setState({ showTemplate: false, })

            }
            else {
                alert(response.data.error)
            }


        })
            .catch(err => {
                console.log(err)
            })
    }

    attachmentUpload(e) {
        let file = e.target.files[0]
        this.setState({ attachment: file })
    }

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
                <div>
                    {this.state.showTemplate ? <div className={classes.EditorContainer}>
                        <div className={classes.EmailFormData}>
                            {(this.state.templateId == 1) ? <div className={classes.FirstTemplate}>
                                <form className={classes.Login} onSubmit={this.handleMailSubmit}>
                                    <h2>HEADER</h2>
                                    <textarea className={classes.FormInput} type="name" name="heading" value={this.state.heading} onInput={(e) => this.handleInputChanges(e, "heading")} required />
                                    <h2>INSTRUCTIONS</h2>
                                    <textarea className={classes.FormInput} type="name" name="instructions" value={this.state.instructions} onInput={(e) => this.handleInputChanges(e, "instructions")} required />
                                    <h2>ATTENTION</h2>
                                    <textarea className={classes.FormInput} type="name" name="attention" value={this.state.attention} onInput={(e) => this.handleInputChanges(e, "attention")} required />
                                    <h2>MESSAGE</h2>
                                    <textarea className={classes.FormInput} type="name" name="message" value={this.state.message} onInput={(e) => this.handleInputChanges(e, "message")} required />
                                    <h2>FOOTER</h2>

                                    <textarea className={classes.FormInput} type="name" name="footer" value={this.state.footer} onInput={(e) => this.handleInputChanges(e, "footer")} required />

                                    <input className={classes.FormSubmit} type="submit" value="Submit" />
                                </form>
                            </div> :
                                (this.state.templateId == 2) ? <div className={classes.FirstTemplate}>
                                    <form className={classes.Login} onSubmit={this.handleMailSubmit}>
                                        <h2>HEADER</h2>
                                        <textarea className={classes.FormInput} type="name" name="heading" value={this.state.heading} onInput={(e) => this.handleInputChanges(e, "heading")} required />
                                        <h2>INSTRUCTIONS</h2>
                                        <textarea className={classes.FormInput} type="name" name="instructions" value={this.state.instructions} onInput={(e) => this.handleInputChanges(e, "instructions")} required />
                                        <h2>ATTENTION</h2>
                                        <textarea className={classes.FormInput} type="name" name="attention" value={this.state.attention} onInput={(e) => this.handleInputChanges(e, "attention")} required />
                                        <h2>MESSAGE</h2>
                                        <textarea className={classes.FormInput} type="name" name="message" value={this.state.message} onInput={(e) => this.handleInputChanges(e, "message")} required />
                                        <h2>FOOTER</h2>

                                        <textarea className={classes.FormInput} type="name" name="footer" value={this.state.footer} onInput={(e) => this.handleInputChanges(e, "footer")} required />

                                        <input className={classes.FormSubmit} type="submit" value="Submit" />
                                    </form>
                                </div> :
                                    (this.state.templateId == 3) ? <div className={classes.FirstTemplate}>
                                        <form className={classes.Login} onSubmit={this.handleMailSubmit}>
                                            <h2>HEADER</h2>
                                            <textarea className={classes.FormInput} type="name" name="heading" value={this.state.heading} onInput={(e) => this.handleInputChanges(e, "heading")} required />
                                            <h2>INSTRUCTIONS</h2>
                                            <textarea className={classes.FormInput} type="name" name="instructions" value={this.state.instructions} onInput={(e) => this.handleInputChanges(e, "instructions")} required />
                                            <h2>ATTENTION</h2>
                                            <textarea className={classes.FormInput} type="name" name="attention" value={this.state.attention} onInput={(e) => this.handleInputChanges(e, "attention")} required />
                                            <h2>MESSAGE</h2>
                                            <textarea className={classes.FormInput} type="name" name="message" value={this.state.message} onInput={(e) => this.handleInputChanges(e, "message")} required />
                                            <h2>FOOTER</h2>

                                            <textarea className={classes.FormInput} type="name" name="footer" value={this.state.footer} onInput={(e) => this.handleInputChanges(e, "footer")} required />

                                            <input className={classes.FormSubmit} type="submit" value="Submit" />
                                        </form>
                                    </div> :
                                        <div className={classes.FirstTemplate}>
                                            <form className={classes.Login} onSubmit={this.handleMailSubmit}>
                                                <h2>HEADER</h2>
                                                <textarea className={classes.FormInput} type="name" name="heading" value={this.state.heading} onInput={(e) => this.handleInputChanges(e, "heading")} required />
                                                <h2>INSTRUCTIONS</h2>
                                                <textarea className={classes.FormInput} type="name" name="instructions" value={this.state.instructions} onInput={(e) => this.handleInputChanges(e, "instructions")} required />
                                                <h2>ATTENTION</h2>
                                                <textarea className={classes.FormInput} type="name" name="attention" value={this.state.attention} onInput={(e) => this.handleInputChanges(e, "attention")} required />
                                                <h2>MESSAGE</h2>
                                                <textarea className={classes.FormInput} type="name" name="message" value={this.state.message} onInput={(e) => this.handleInputChanges(e, "message")} required />
                                                <h2>FOOTER</h2>

                                                <textarea className={classes.FormInput} type="name" name="footer" value={this.state.footer} onInput={(e) => this.handleInputChanges(e, "footer")} required />

                                                <input className={classes.FormSubmit} type="submit" value="Submit" />
                                            </form>
                                        </div>}

                        </div>
                    </div> : null}
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
                            {this.state.fileData == [] ? <div className={classes.TopPart}>

                            </div> :

                                <table className={classes.TopPart}>
                                    <th>Email-ID</th>
                                    <th>Name</th>
                                    <th>Organization</th>
                                    <th>Cost</th>
                                    <th>Date</th>
                                    <th>Attachemnt</th>
                                    <th>Template</th>
                                    <th>Send</th>
                                    {
                                        this.state.fileData.map((listValue) => {
                                            if (listValue["Name"] !== "") {
                                                return (
                                                    <tr >
                                                        <td>{listValue["Email ID"]}</td>
                                                        <td>{listValue["Name"]}</td>
                                                        <td>{listValue["Organization Name"]}</td>
                                                        <td>{listValue["Price (in Rupees)"]}</td>
                                                        <td>{listValue["Date"]}</td>
                                                        <td><input
                                                            className={classes.ChooseFile}
                                                            type="file"
                                                            name="attachment"
                                                            onChange={(e) => this.attachmentUpload(e)}

                                                        /></td>
                                                        <td><select onChange={this.changeTemplate} name="template">
                                                            <option value="">Choose a template</option>
                                                            <option value="1">LETTER OF CONFIRMATION OF ACCOUNTS Payable</option>
                                                            <option value="2">LETTER OF CONFIRMATION OF ACCOUNTS RECEIVABLE</option>
                                                            <option value="3">LETTER OF CONFIRMATION OF DEPOSITS / INVESTMENTS</option>
                                                            <option value="4">LETTER OF CONFIRMATION OF INVENTORIES HELD BY OTHERS</option>
                                                        </select></td>

                                                        <td><button onClick={() => this.sendMail(listValue["Email ID"], listValue["Price (in Rupees)"], listValue["Name"], listValue["Date"], listValue["Organization Name"])}>Send</button></td>
                                                    </tr>
                                                )
                                            };
                                        })}

                                </table>
                            }

                            <div className={classes.BottomPart}>
                                <div className={classes.LeftBottom}>
                                    <a href={`${API_URL}api/excel/fileDownload/`} className={classes.DownTemplate}>
                                        Download Template

                            </a>

                                </div>
                                <div className={classes.RightBottom}>
                                    <div className={classes.DownTemplate}>
                                        <input
                                            type="file"
                                            id="file"
                                            ref="fileUploader"
                                            onChange={this.filePathset.bind(this)}

                                        />
                                        {/* Upload Template */}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        this.readFile();
                                    }}
                                >
                                    Read File
        </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
export default HomePage;

