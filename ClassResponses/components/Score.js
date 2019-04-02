import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Table, Progress } from 'antd';

export default class Score extends Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      filteredInfo: null,
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: null
    };
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      filteredInfo: filters,
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: sorter
    });
  }

  clearFilters = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      filteredInfo: null,
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: null
    });
  }

  setAgeSort = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: {
        order: 'descend',
        columnKey: 'age'
      }
    });
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const dataSource = [{
      key: '1',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '2',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '3',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '4',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '5',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '6',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '7',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }, {
      key: '8',
      Domain: '2-LS2',
      Standard: '2.LS2.1',
      Question: 'Q1',
      Max: '1',
      Average: '0.96',
      Average_per: '00%'

    }];

    const columns = [{
      title: 'Domain',
      dataIndex: 'Domain',
      key: 'Domain',
      width: '13.6%',
      render: () => (<StyledDivF>2-LS2</StyledDivF>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'Domain' && sortedInfo.order

    }, {
      title: 'Standard',
      dataIndex: 'Standard',
      key: 'Standard',
      width: '13.6%',
      render: () => (<StyledDivF>2.LS2.1</StyledDivF>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Question',
      dataIndex: 'Question',
      key: 'Question',
      width: '13.6%',
      render: () => (<StyledParaF>Q1</StyledParaF>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Max Possible Score',
      dataIndex: 'Max',
      key: 'Max',
      width: '17.6%',
      render: () => (<StyledParaS>1</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Average Score',
      dataIndex: 'Average',
      key: 'Average',
      width: '17.6%',
      render: () => (<StyledParaS>0.96</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Average Score %',
      dataIndex: 'Average_per',
      key: 'Average_per',
      width: '21.6%',
      render: () => (<div><StyledProgress percent={60} size="small" strokeWidth={15} strokeColor="#fdcc3a" showInfo={false} /> 00%</div>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }];

    return (
      <StyledCard bordered={false}>
        <TableData columns={columns} dataSource={dataSource} pagination={false} />
      </StyledCard>
    );
  }
}

const StyledCard = styled(Card)`
  margin: 0px auto 60px auto;
  width:95%;
  height:auto;
  border-radius:10px;
  box-shadow:3px 2px 7px lightgray;
`;
const TableData = styled(Table)`
  text-align: center;
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
    text-align: center;
    font-size:0.9em;
    font-weight:bold;
    color:#565e6d;
  }
  .ant-table-tbody tr td{
   border:1px solid #f8f5f5;
   margin:10px;
   border-radius:5px;
  }
`;
const StyledDivF = styled.div`
  background-color:#d2f9eb;
  color:#57b495;
  width:72%;
  padding:3px 0px;
  border:0.1em solid #dcefe9;
  border-radius:5px;
  text-align:center;
  font-size:0.8em;
  font-weight:bold;
  margin:auto;
`;
const StyledParaF = styled.div`
  color:#57b495;
  text-align:center;

`;

const StyledParaS = styled.div`
  color:#565e6d;
  text-align:center;
  font-size:0.9em;

`;
const StyledProgress = styled(Progress)`
  width:80%;
  margin:0px auto;
  font-size:0.9em;
  color:#565e6d;

`;
