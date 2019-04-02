/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FlexContainer
} from '@edulastic/common';
import { Link } from 'react-router-dom';
import {
  // eslint-disable-next-line no-unused-vars
  getTestItemsSelector,
  // eslint-disable-next-line no-unused-vars
  getItemsTypesSelector,
  // eslint-disable-next-line no-unused-vars
  getTestsItemsCountSelector,
  // eslint-disable-next-line no-unused-vars
  getTestsItemsLimitSelector,
  // eslint-disable-next-line no-unused-vars
  getTestsItemsPageSelector
} from '../../selectors/testItems';
import ListHeader from './ListHeader';
import SortBar from './SortBar';
import Score from './Score';

export default class ExpressGrader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      searchStr: '',
      // eslint-disable-next-line react/no-unused-state
      blockStyle: 'tile',
      // eslint-disable-next-line react/no-unused-state
      isShowFilter: false,
    };
  }

  handleCreate = () => {
    // eslint-disable-next-line react/prop-types
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      creating
    } = this.props;
    const { assignmentId, classId } = this.props.match.params;

    return (
      <div>
        <ListHeader
          onCreate={this.handleCreate}
          creating={creating}
          assignmentId={assignmentId}
          classId={classId}
        />
        <StyledFlexContainer
          justifyContent="space-between"
        >
          <PaginationInfo>
            <a>&lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link></a> / <a>CALIFORNIA VERSION 4</a> / <a>CLASS 1</a>
          </PaginationInfo>
          <SortBar />
        </StyledFlexContainer>
        <Score />
      </div>
    );
  }
}

ExpressGrader.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  count: PropTypes.number.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  windowWidth: PropTypes.number.isRequired
};

const PaginationInfo = styled.span`
  font-weight: bold;
  font-size: 10px;
  word-spacing:5px;
  display:inline-block;
  color:#1890ffd9;
`;
const StyledFlexContainer = styled(FlexContainer)`
  margin:30px auto;
  width:95%;

`;
