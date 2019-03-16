import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Input, Select, Button, Menu, Icon, Alert} from 'antd';
import { DatePicker } from 'antd';
import axios from '../../../AxiosSettings';
import {getDatas, setFilteredDatas} from '../../../Store/Actions/Action';

import './LeftPanel.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class LeftPanel extends Component {

    state = {
        sender: '',
        receiver: '',
        amount: '',
        relation: 'Equal',
        date: '',
        startDate: '',
        endDate: '',
        details: '',
        message: ''
    }

    optionGenerator = () => {

        let content = this.props.persons.map((person, index) => {
            return (<Option key={index} value={person}>{person}</Option>);
        });

        return content;
    }

    // Filters the datas
    clickHandler = () => {

        let filters = [];

        for(let key in this.state) {
            if(this.state[key]) {

                if(key === "amount") {
                    filters.push([key, this.state[key], this.state["relation"]]);
                }

                else {
                    filters.push([key, this.state[key]]);
                }
            }
        }
        
        let filteredDatas;

        filteredDatas = this.props.datas.filter((data) => {
            let x = true;

            for(let i of filters) {

                if(i[0] === "relation") {
                    continue;
                }

                else if(i[0] === "amount") {

                    if(i[2] === "Equal") {
                        x = data[i[0]] === +i[1];
                    }

                    else if(i[2] === "More than") {
                        x = data[i[0]] > +i[1];
                    }

                    else if(i[2] === "Less than") {
                        x = data[i[0]] < +i[1];
                    }

                    if(!x){
                        break;
                    }
                }

                else if(i[0] === "startDate") {

                    x = new Date(data["date"]) >= new Date(i[1]);

                    if(!x){
                        break;
                    }
                }

                else if(i[0] === "endDate") {
                    
                    x = new Date(data["date"]) <= new Date(i[1]);
                }

                else {
                    x = data[i[0]] === i[1];
                    
                    if(!x) {
                        break;
                    }
                }
            };

            return x;
        });

        this.props.setsFilteredDatas(filteredDatas);

    }

    changeHandler = (name, value) => {

        this.setState({
            [name] : value
        });
        
    }

    dateChangeHandler = (name, value) => {

        if(!value) {
            this.setState({
                date: ""
            });

            return;
        }
        
        let date = `${value._d.getFullYear()}/${value._d.getMonth() + 1}/${value._d.getDate()}`;

        this.setState({
            [name]: date
        });
    }

    submitHandler = () => {

        if(!this.validate()) {  
            this.setState({message: "Please fill all the fields."});
            return;
        }

        let datas = {
            sender: this.state.sender,
            receiver: this.state.receiver,
            amount: this.state.amount,
            date: this.state.date,
            details: this.state.details
        }
        
        axios.post("/transfer", datas)
            .then(() => {
                this.props.reload();
            })
            .catch(error => {
                this.setState({message: "Server error."});
            });
    }

    validate = () => {

        if(this.state.sender !== "" && this.state.receiver !== "" && this.state.date !== "" && this.state.amount !== "") {
            return true;
        }

        return false;
    }

    closeHandler = () => {
        this.setState({message: ""});
    }

    render () {

        let message = null;

        if(this.state.message === "Sended.") {
            message = <Alert message={this.state.message} type="success" closable showIcon afterClose={this.closeHandler}/>;
        }

        else if(this.state.message === "Please fill all the fields.") {
            message = <Alert message={this.state.message} type="warning" closable showIcon afterClose={this.closeHandler}/>;
        }

        else if(this.state.message === "") {
            message = null;
        }

        else {
            message = <Alert message={this.state.message} type="error" closable showIcon afterClose={this.closeHandler}/>;
        }

        return (
            <div className="LeftPanel">
            <Icon type="home" style={{fontSize: 28, color: '#fff', marginTop: 20}} /><h2 id="title">Family Bank</h2>
            <Tabs >
                <TabPane tab="Upload" key="1">
                {message}
                    <form>
                        <fieldset>
                            <label>Sender: </label>
                            <Select value={this.state.sender} style={{left: 30, width: '80%'}} onChange={value => this.changeHandler("sender", value)}>
                                {this.optionGenerator()}
                            </Select>
                        </fieldset>
                        <fieldset>
                            <label>Receiver: </label>
                            <Select value={this.state.receiver} style={{left: 30, width: '80%'}} onChange={value => this.changeHandler("receiver", value)}>
                                {this.optionGenerator()}
                            </Select>
                        </fieldset>
                        <fieldset>
                            <label>Amount (Ft): </label>
                            <Input style={{left: 30, width: '80%'}} value={this.state.amount} onChange={value => this.changeHandler("amount", value.target.value)} />
                        </fieldset>
                        <fieldset>
                            <label>Date: </label>
                            <DatePicker style={{left: 30, width: '80%'}} onChange={value => this.dateChangeHandler("date", value)} />
                        </fieldset>
                        <fieldset>
                            <label>Details: </label>
                            <Input style={{left: 30, width: '80%'}} value={this.state.details} onChange={value => this.changeHandler("details", value.target.value)} />
                        </fieldset>
                        <Button type="primary" onClick={this.submitHandler}>Send</Button>
                    </form>
                </TabPane>
                <TabPane tab="Filters" key="2">
                    <Menu
                    style={{ width: 256, overflow: 'auto', height: '70vh'}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" /><span>Partners</span></span>}>
                            <MenuItemGroup key="g1" title="Sender">
                                <Select value={this.state.sender} style={{ width: 139}} onChange={value => this.changeHandler("sender", value)}>
                                    {this.optionGenerator()}
                                    <Option value="">-</Option>
                                </Select>
                            </MenuItemGroup>
                            <MenuItemGroup key="g2" title="Receiver">
                                <Select value={this.state.receiver} style={{ width: 139}} onChange={value => this.changeHandler("receiver", value)}>
                                    {this.optionGenerator()}
                                    <Option value="">-</Option>
                                </Select>
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="bank" /><span>Money</span></span>}>
                            <MenuItemGroup key="g3" title="Amount (Ft)">
                                <Input style={{ width: 139}} value={this.state.amount} onChange={value => this.changeHandler("amount", value.target.value)} />
                            </MenuItemGroup>
                            <MenuItemGroup key="g4" title="Relation">
                                <Select defaultValue={this.state.relation} style={{ width: 139}} onChange={value => this.changeHandler("relation", value)}>
                                    <Option value="More than">More than</Option>
                                    <Option value="Equal">Equal</Option>
                                    <Option value="Less than">Less than</Option>
                                </Select>
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="calendar" /><span>Date</span></span>}>
                            <MenuItemGroup key="g5" title="From">
                                <DatePicker style={{ width: 139}} onChange={(value) => this.dateChangeHandler("startDate", value)} />
                            </MenuItemGroup>
                            <MenuItemGroup key="g6" title="To">
                                <DatePicker style={{ width: 139}} onChange={(value) => this.dateChangeHandler("endDate", value)} />
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="key" /><span>Other</span></span>}>
                            <MenuItemGroup key="g5" title="Details">
                                <Input style={{ width: 139}} value={this.state.details} onChange={value => this.changeHandler("details", value.target.value)} />
                            </MenuItemGroup>
                        </SubMenu>
                        <Button type="primary" onClick={this.clickHandler}>Query</Button>
                    </Menu>
                </TabPane>
            </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons,
        datas: state.datas
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reload: () => dispatch(getDatas()),
        setsFilteredDatas: (datas) => dispatch(setFilteredDatas(datas))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);