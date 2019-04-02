import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'rc-progress';
import styled, { ThemeProvider } from 'styled-components';
import { withNamespaces } from '@edulastic/localization';
import { IconClockCircularOutline, IconSave } from '@edulastic/icons';
import MainWrapper from './MainWrapper';
import MainContent from './MainContent';
import MainFooter from './MainFooter';
import Sidebar from './Sidebar';
import ProgressContainer from './ProgressContainer';
import QuestionAttempt from './QuestionAttempt';
import TimeDuration from './TimeDuration';
import ResponsiveTestDuration from './ResponsiveTestDuration';
import QuitAssesment from './QuitAssesment';
import LogoImage from '../../assets/logo.png';
import SettingImage from '../../assets/screwdriver.png';
import SidebarQuestionList from './SidebarQuestionList';

import {
  Blank,
  ControlBtn,
  Main,
  Header,
  Container,
  Logo,
  DesktopMainMenu,
  FlexContainer,
  HeaderLeftMenu,
  HeaderMainMenu,
  HeaderRightMenu,
  MobileMainMenu
} from '../common';
import QuestionSelectDropdown from '../common/QuestionSelectDropdown';
import TestPreviewItem from '../../components/TestItemPreview';
import defaultTheme from '../defaultThemeStyle';
import assessmentPlayerTheme from './themeStyle';
/* eslint import/no-webpack-loader-syntax: off */
// eslint-disable-next-line

const Theme = {
  ...defaultTheme,
  ...assessmentPlayerTheme
};

class AssessmentPlayerSimple extends React.Component {
  static propTypes = {
    theme: PropTypes.object,
    isLast: PropTypes.func.isRequired,
    isFirst: PropTypes.func.isRequired,
    moveToNext: PropTypes.func.isRequired,
    moveToPrev: PropTypes.func.isRequired,
    gotoQuestion: PropTypes.func.isRequired,
    currentItem: PropTypes.any.isRequired,
    items: PropTypes.any.isRequired,
    evaluate: PropTypes.any.isRequired,
    itemRows: PropTypes.any.isRequired,
    view: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    theme: Theme
  };

  checkAnswer = () => {
    const { evaluate } = this.props;
    evaluate();
  };

  render() {
    const {
      theme,
      t,
      isLast,
      isFirst,
      moveToNext,
      moveToPrev,
      items,
      currentItem,
      gotoQuestion,
      itemRows,
      view: previewTab
    } = this.props;

    const dropdownOptions = Array.isArray(items)
      ? items.map((item, index) => index)
      : [];

    const item = items[currentItem];
    if (!item) {
      return <div />;
    }

    const percent = Math.round(
      ((currentItem + 1) * 100) / dropdownOptions.length,
    );
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <HeaderLeftMenu>
              <Logo src={LogoImage} alt="Logo" />
              <MobileMainMenu>
                <FlexContainer>
                  <ProgressContainer>
                    <Line
                      percent={percent}
                      strokeWidth="2"
                      strokeColor={theme.progressStrokeColor}
                      trailWidth="2"
                      trailColor={theme.progressTrailColor}
                    />
                  </ProgressContainer>
                  <Timer>
                    <Icon color={theme.timerIconColor} />
                    <ResponsiveTestDuration />
                  </Timer>
                </FlexContainer>
              </MobileMainMenu>
            </HeaderLeftMenu>
            <HeaderMainMenu skinB>
              <DesktopMainMenu>
                <FlexContainer>
                  <ProgressContainer>
                    <Line
                      percent={percent}
                      strokeWidth="1"
                      strokeColor={theme.progressStrokeColor}
                      trailWidth="1"
                      trailColor={theme.progressTrailColor}
                    />
                  </ProgressContainer>
                  <Time>
                    <QuestionAttempt
                      current={currentItem + 1}
                      total={items.length}
                    />
                  </Time>
                  <Timer>
                    <Icon color={theme.timerIconColor} />
                    <TimeDurationText><TimeDuration /></TimeDurationText>
                  </Timer>
                  <Timer>
                    <Save>
                      <IconSave color={theme.saveIconColor} />
                    </Save>
                    <Save>
                      <IconSave color={theme.submitIconColor} />
                    </Save>
                  </Timer>
                </FlexContainer>
              </DesktopMainMenu>
              <MobileMainMenu>
                <FlexContainer>
                  <QuestionSelectDropdown
                    key={currentItem}
                    value={currentItem}
                    onChange={gotoQuestion}
                    options={dropdownOptions}
                  />
                  <ControlBtn
                    prev
                    skinB
                    disabled={isFirst()}
                    onClick={moveToPrev}
                  >
                    <i className="fa fa-angle-left" />
                  </ControlBtn>
                  <ControlBtn
                    next
                    skinB
                    disabled={isLast()}
                    onClick={moveToNext}
                  >
                    <i className="fa fa-angle-right" />
                    <span>{t('pagination.next')}</span>
                  </ControlBtn>
                  <ControlBtn setting skinB>
                    <img src={SettingImage} alt="Setting" />
                  </ControlBtn>
                </FlexContainer>
              </MobileMainMenu>
            </HeaderMainMenu>
            <HeaderRightMenu skinB>
              <DesktopMainMenu />
            </HeaderRightMenu>
          </Header>
          <Main skinB>
            <Blank />
            <MainWrapper>
              <MainContent>
                <TestPreviewItem cols={itemRows} previewTab={previewTab} />
              </MainContent>
              <MainFooter>
                <CheckAnswerButton>
                  <QuitAssesment />
                  <ControlBtn next skinB onClick={this.checkAnswer}>
                    <span>{t('pagination.checkanswer')} </span>
                  </ControlBtn>
                </CheckAnswerButton>
                <NextPrevButton>
                  <ControlBtn
                    prev
                    skinB
                    disabled={isFirst()}
                    onClick={moveToPrev}
                  >
                    <i className="fa fa-angle-left" />
                  </ControlBtn>
                  <ControlBtn
                    next
                    skinB
                    disabled={isLast()}
                    onClick={moveToNext}
                  >
                    <i className="fa fa-angle-right" />
                    <span>{t('pagination.next')}</span>
                  </ControlBtn>
                </NextPrevButton>
              </MainFooter>
            </MainWrapper>
            <Sidebar>
              <SidebarQuestionList
                questions={dropdownOptions}
                selectedQuestion={currentItem}
                gotoQuestion={gotoQuestion}
              />
            </Sidebar>
            <Blank />
          </Main>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withNamespaces('common')(AssessmentPlayerSimple);

const Icon = styled(IconClockCircularOutline)`
  margin: 10px 15px;
  width: 20px !important;
  height: 20px !important;
`;

const Time = styled.div`
  color: ${props => props.theme.headerBarTextColor};
  font-weight: bold;
  font-size: 14px;
  margin: 0px 30px 0px 20px;
`;

const CheckAnswerButton = styled(FlexContainer)`
  .ant-btn {
    color: ${props => props.theme.CheckAnswerButtonText};
    background-color: ${props => props.theme.CheckAnswerButtonBg};
    border-color: ${props => props.theme.CheckAnswerButtonBg};
    padding: 0px;
  }
`;

const NextPrevButton = styled(FlexContainer)`
  .ant-btn {
    color: ${props => props.theme.NextPrevButtonTextColor};
    background-color: ${props => props.theme.NextPrevButtonBg};
    border-color: ${props => props.theme.NextPrevButtonBg};
  }
`;

const TimeDurationText = styled.div`
  p { 
    color: ${props => props.theme.timeDurationTextColor};
  }
`;

const Save = styled.div`
  color: #e2e2e2;
  background: ${props => props.theme.saveIconBgColor};
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
`;

const Timer = styled.div`
  display: flex;
`;
