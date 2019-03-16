import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select} from 'antd';
import {Doughnut} from 'react-chartjs-2';
import {setDatas, setFilteredDatas} from '../../../Store/Actions/Action';

import './RightPanel.css';

const Option = Select.Option;

class RightPanel extends Component {

    state = {
        selectedPerson: ''
    }

    optionGenerator = () => {

        let content = this.props.persons.map((person, index) => {
            return (<Option key={index} value={person}>{person}</Option>);
        });

        return content;
    }

    changeHandler = (value) => {

        this.setState({selectedPerson: value});
    }

    // Sets the given and received amount of money for each person
    getValues = () => {

        let {selectedPerson} = this.state;

        let given = 0;
        let received = 0;
        
        let senders = {

        };

        let receivers = {

        };

        this.props.datas.forEach((data) => {
            // Calculates how much money was sended from the selected person
            // Stores the amount in the receivers object for each receiver
            if(data.sender === selectedPerson) {
                
                if(!receivers[data.receiver]) {
                    receivers[data.receiver] = data.amount;
                }

                else {
                    receivers[data.receiver] += data.amount;
                }

                given += data.amount;
            }

            // Calculates how much money was received by the selected person
            // Stores the amount in the senders object for each sender
            else if(data.receiver === selectedPerson) {

                if(!senders[data.sender]) {
                    senders[data.sender] = data.amount;
                }

                else {
                    senders[data.sender] += data.amount;
                }

                received += data.amount;
            }
        });

        return [received, given, this.calculateDifferences(senders, receivers)];
    }

    // Calculates how much money still needs to be paid
    calculateDifferences = (senders, receivers) => {

        let differences = {

        }

        // Check all the senders
        for(let person in senders) {
            if(receivers[person]) {
                // If the money difference is 0, then continue
                if(senders[person] - receivers[person] === 0) {
                    // The difference is done for this person
                    receivers[person] = undefined;
                    continue;
                }
                
                differences[person] = senders[person] - receivers[person];
                receivers[person] = undefined; 
            }

            else {
                differences[person] = senders[person];
            }
        }

        // Check if there are other persons to deal with
        for(let person in receivers) {
            if(receivers[person] === undefined) {
                continue;
            }

            // The minus sign indicates, that it's money to pay back
            differences[person] = -1 * receivers[person];
        }

        return differences;
    }

    render () {

        let image = null;
        
        if(this.state.selectedPerson) {
            try {
                image = require(`../../../Assets/Images/${this.state.selectedPerson}.png`);
            }

            // Use the default avatar if no avatar was found
            catch(error) {
                image = require("../../../Assets/Images/-.png");
            }
        }
        
        else {
            image = require("../../../Assets/Images/-.png");
        }

        let values = this.getValues();

        let differences = Object.keys(values[2]).map((key) => {
            return [key, values[2][key]];
        });

        let moneyToGive = [];
        let moneyToGet = [];

        differences.forEach((data) => {
            if(data[1] < 0) {
                moneyToGet.push(<><label>{data[0]} : <span style={{color: "green"}}>{data[1] * -1} Ft</span></label><br /></>);
            }

            else {
                moneyToGive.push(<><label>{data[0]} : <span style={{color: "red"}}>{data[1]} Ft</span></label><br /></>);
            }
        });

        const data = {
            labels: [
                'Received (Ft)',
                'Given (Ft)'
            ],
            datasets: [{
                data: values,
                backgroundColor: [
                '#FF6384',
                '#36A2EB'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
                ]
            }],
          text: '23%'
        };

        return (
            <div className="RightPanel">
                <img src={image} style={{marginTop: "10px", width: 120, height: 120}} alt="Avatar" />
                <Select value={this.state.selectedPerson} style={{width: '80%'}} onChange={this.changeHandler}>
                    {this.optionGenerator()}
                </Select>
                <h3>Total: </h3>
                <Doughnut data={data} />
                <label>Given: <span style={{color: '#36A2EB'}}>{values[1]}</span> Ft</label>
                <br />
                <label>Received: <span style={{color: '#FF6384'}}>{values[0]}</span> Ft</label>
                <br />
                <br />
                <h3>Money to pay: </h3>
                <br />
                {moneyToGive.length !== 0 ? moneyToGive : <p>-</p>}
                <br />
                <h3>Money to get: </h3>
                <br />
                {moneyToGet.length !== 0 ? moneyToGet : <p>-</p>}
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
        setsDatas: (datas) => dispatch(setDatas(datas)),
        setsFilteredDatas: (datas) => dispatch(setFilteredDatas(datas))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);