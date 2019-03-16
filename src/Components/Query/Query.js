import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'antd';

import './Query.css';

class Query extends Component {

    render () {
        const columns = [{
            title: 'Sender',
            dataIndex: 'sender',
          }, {
            title: 'Receiver',
            dataIndex: 'receiver',
          }, {
            title: 'Amount (Ft)',
            dataIndex: 'amount',
          }, {
            title: 'Date',
            dataIndex: 'date',
          }, {
            title: 'Details',
            dataIndex: 'details',
          }];

        return (
            <div className="Query">
                <Table columns={columns} dataSource={this.props.datas} loading={false} size="small" />
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    datas: state.filteredDatas
  }
}

export default connect(mapStateToProps)(Query);