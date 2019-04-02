import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Radio } from 'antd';

import {
  withWindowSizes,
  Card,
  FlexContainer
} from '@edulastic/common';
import {
  mobileWidth,
  desktopWidth,
  tabletWidth
} from '@edulastic/colors';
import styled from 'styled-components';
import { withNamespaces } from '@edulastic/localization';
import { receiveAssignmentsAction } from '../../actions/assignments';
import {
  getAssignmentsSelector
} from '../../selectors/assignments';

import SortBar from './SortBar';
import FilterBar from './FilterBar';
import TableList from './TableList';
import ListHeader from '../../components/common/ListHeader';
import MobileTableList from './MobileTableList';

class Assignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStr: '',
      blockStyle: 'tile',
      isShowFilter: false
    };
  }

  componentDidMount() {
    const { loadAssignments } = this.props;
    loadAssignments();
  }

  handleCreate = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  render() {
    const {
      assignments,
      creating,
      t,
      windowWidth,
      windowHeight
    } = this.props;
    return (
      <div>
        <ListHeader
          onCreate={this.handleCreate}
          creating={creating}
          title={t('common.assignmentsTitle')}
          btnTitle="NEW ASSESSMENT"
        />
        <Container>
          <FlexContainer>
            <Main>
              <FlexContainerA
                justifyContent="space-between"
                style={{ marginBottom: 10 }}
              >
                <PaginationInfo>
                  1 to 20 of <i>25668</i>
                </PaginationInfo>
                <FullFlexContainer>
                  <SortBar
                      onSortChange={this.handleSortChange}
                      onStyleChange={this.handleStyleChange}
                    />
                  <StyledFlexContainer>
                    <FilterBar windowWidth={windowWidth} windowHeight={windowHeight} />
                    <DRadio value={1}><span style={{ paddingLeft: '15px', display: 'inline-block' }}>Assigned</span></DRadio>
                    <DRadio value={2}><span style={{ paddingLeft: '15px', display: 'inline-block' }}>Drafts</span></DRadio>
                  </StyledFlexContainer>
                </FullFlexContainer>

              </FlexContainerA>
              <StyledCard>
                <TableList assignments={assignments} />
                <MobileTableList assignments={assignments} windowWidth={windowWidth} windowHeight={windowHeight}/>
              </StyledCard>
            </Main>
          </FlexContainer>
        </Container>
      </div>
    );
  }
}

Assignments.propTypes = {
  assignments: PropTypes.array.isRequired,
  loadAssignments: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
};

const enhance = compose(
  withWindowSizes,
  withNamespaces('header'),
  connect(
    state => ({
      assignments: getAssignmentsSelector(state)
    }),
    {
      loadAssignments: receiveAssignmentsAction
    }
  )
);

export default enhance(Assignments);


const Container = styled.div`
  padding: 20px 35px 20px 35px;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;

  @media (max-width: 920px) {
    padding:0px;
    width:100%; 
  }
`;

const FlexContainerA = styled(FlexContainer)`
  width:100%;
  @media (max-width: 920px) {
    width:98%;
    margin:auto;

  }
`;

const PaginationInfo = styled.span`
  font-weight: 600;
  font-size: 13px;
  display:inline-block;
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
  @media (max-width: 77s0px) {
    display: none;
  }
`;

const Main = styled.div`
  flex: 1;
  width: 100%;
`;
const DRadio = styled(Radio)`
`;
const StyledCard = styled(Card)`
  border-radius: 5;
  width:100%;
  @media (max-width: 920px) {
    width:98%;
    margin:auto;

  }
`;
const FullFlexContainer = styled(FlexContainer)`
@media (max-width: 770px) {
  width: 100%;

}
  justify-content: flex-end;
`;
const StyledFlexContainer = styled(FlexContainer)`
  @media (max-width: ${tabletWidth}) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: 770px) {
    display: flex;
    justify-content: space-between;
    flex-direction:row-reverse;
    width: 100%;

  }
`;