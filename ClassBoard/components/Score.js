/* eslint-disable no-mixed-operators */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Table, Progress } from 'antd';
import { themes } from '../../../../student/themes';

const classBoardTheme = themes.default.classboard;

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
    const dataSource = [];
    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/destructuring-assignment
    this.props.gradebook.itemsSummary.map((data, i) => {
      let avg_per;
      if (data.maxScore) {
        if (data.avgScore) {
          // eslint-disable-next-line radix
          avg_per = (parseInt(data.avgScore) / parseInt(data.maxScore)) * 100;
        } else {
          avg_per = 0;
        }
      } else {
        // eslint-disable-next-line radix
        // eslint-disable-next-line no-lonely-if
        if (data.avgScore) {
          // eslint-disable-next-line radix
          avg_per = ((parseInt(data.avgScore)) / 1) * 100;
        } else {
          avg_per = 0;
        }
      }

      dataSource.push({
        key: i,
        Question: i,
        Max: data.maxScore && data.maxScore || '-',
        Correct: data.correctNum,
        Partially: data.partialNum && data.partialNum || '-',
        Wrong: data.wrongNum,
        Average: data.avgScore && data.avgScore || '-',
        Average_per: parseInt(avg_per),

      });
    });

    const columns = [{
      title: 'Question',
      dataIndex: 'Question',
      key: 'Question',
      width: '13.6%',
      render: a => (<StyledParaF>Q{a + 1}</StyledParaF>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'Question' && sortedInfo.order
    },
    {
      title: 'Max Possible Score',
      dataIndex: 'Max',
      key: 'Max',
      width: '13.6%',
      render: a => (<StyledParaS>{a}</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },{
      title: 'Correct',
      dataIndex: 'Correct',
      key: 'Correct',
      width: '13.6%',
      render: a => (<StyledParaS>{a}</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Partially Correct',
      dataIndex: 'Partially',
      key: 'Partially Correct',
      width: '13.6%',
      render: a => (<StyledParaS>{a}</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Wrong',
      dataIndex: 'Wrong',
      key: 'Wrong',
      width: '13.6%',
      render: a => (<StyledParaS>{a}</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Average Score',
      dataIndex: 'Average',
      key: 'Average Score',
      width: '17.6%',
      render: a => (<StyledParaS>{a}</StyledParaS>),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Average Score %',
      dataIndex: 'Average_per',
      key: 'Average_per',
      width: '21.6%',
      render: a => (<div><StyledProgress percent={a} size="small" strokeWidth={15} strokeColor="#fdcc3a" showInfo={false} /> {a}%</div>),
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
    color: ${classBoardTheme.ScoreCardColor};
  }
  .ant-table-tbody tr td{
   border:1px solid #f8f5f5;
   margin:10px;
   border-radius:5px;
  }
`;
const StyledParaF = styled.div`
  color:${classBoardTheme.ScoreCardParaColor};
  text-align:center;

`;

const StyledParaS = styled.div`
  color:${classBoardTheme.ScoreParaColor};
  text-align:center;
  font-size:0.9em;

`;
const StyledProgress = styled(Progress)`
  width:80%;
  margin:0px auto;
  font-size:0.9em;
  color:${classBoardTheme.ScoreProgressColor};

`;
