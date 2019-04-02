import React from 'react';
import { Select, TextField, Checkbox } from '@edulastic/common';
import PropTypes from 'prop-types';
import { withNamespaces } from '@edulastic/localization';
import styled from 'styled-components';

import O, { Heading, Block, Label, Row, Col, Extras } from '../../common/Options';
import AddNewBtn from './AddNewChoiceBtn';

const Options = ({ onChange, uiStyle, t, outerStyle }) => {
  const changeUiStyle = (prop, value) => {
    onChange('ui_style', {
      ...uiStyle,
      [prop]: value
    });
  };

  const changeIndividualUiStyle = (prop, value, index) => {
    const { responsecontainerindividuals } = uiStyle;
    const item = {};
    Object.defineProperties(item, {
      widthpx: {
        value: responsecontainerindividuals[index].widthpx,
        writable: true
      },
      heightpx: {
        value: responsecontainerindividuals[index].heightpx,
        writable: true
      },
      wordwrap: {
        value: responsecontainerindividuals[index].wordwrap,
        writable: true
      }
    });
    item[prop] = value;
    responsecontainerindividuals[index] = item;
    onChange('ui_style', {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

  const addIndividual = () => {
    const { responsecontainerindividuals } = uiStyle;
    responsecontainerindividuals.push({
      widthpx: 0,
      heightpx: 0,
      wordwrap: false
    });
    onChange('ui_style', {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

  const removeIndividual = (index) => {
    const { responsecontainerindividuals } = uiStyle;
    responsecontainerindividuals.splice(index, 1);
    onChange('ui_style', {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

  return (
    <O outerStyle={outerStyle}>
      <Block>
        <Heading>{t('component.options.layout')}</Heading>
        <Row>
          <Col md={6}>
            <Label>{t('component.options.responsecontainerposition')}</Label>
            <Select
              style={{ width: '80%' }}
              onChange={val => changeUiStyle('responsecontainerposition', val)}
              options={[
                { value: 'top', label: t('component.options.top') },
                { value: 'bottom', label: t('component.options.bottom') },
                { value: 'right', label: t('component.options.right') },
                { value: 'left', label: t('component.options.left') }
              ]}
              value={uiStyle.responsecontainerposition}
            />
          </Col>
          <Col md={6}>
            <Label>{t('component.options.stemnumeration')}</Label>
            <Select
              style={{ width: '80%' }}
              onChange={val => changeUiStyle('stemnumeration', val)}
              options={[
                { value: 'numerical', label: t('component.options.numerical') },
                { value: 'uppercase', label: t('component.options.uppercasealphabet') },
                { value: 'lowercase', label: t('component.options.lowercasealphabet') }
              ]}
              value={uiStyle.stemnumeration}
            />
          </Col>
          <Col md={6}>
            <Label>{t('component.options.fontSize')}</Label>
            <Select
              style={{ width: '80%' }}
              onChange={fontsize => changeUiStyle('fontsize', fontsize)}
              options={[
                { value: 'small', label: t('component.options.small') },
                { value: 'normal', label: t('component.options.normal') },
                { value: 'large', label: t('component.options.large') },
                { value: 'xlarge', label: t('component.options.extraLarge') },
                { value: 'xxlarge', label: t('component.options.huge') }
              ]}
              value={uiStyle.fontsize}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label>{t('component.options.responsecontainerglobal')}</Label>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Label>{t('component.options.widthpx')}</Label>
            <TextField
              type="number"
              disabled={false}
              containerStyle={{ width: 350 }}
              onChange={e => changeUiStyle('widthpx', +e.target.value)}
              value={uiStyle.widthpx}
            />
          </Col>
          <Col md={6}>
            <Label>{t('component.options.heightpx')}</Label>
            <TextField
              type="number"
              disabled={false}
              containerStyle={{ width: 350 }}
              onChange={e => changeUiStyle('heightpx', +e.target.value)}
              value={uiStyle.heightpx}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Checkbox
              onChange={() => changeUiStyle('wordwrap', !uiStyle.wordwrap)}
              label={t('component.options.wordwrap')}
              checked={uiStyle.wordwrap}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label>{t('component.options.responsecontainerindividuals')}</Label>
          </Col>
        </Row>
        {uiStyle.responsecontainerindividuals.map((responsecontainerindividual, index) => (
          <Container key={index}>
            <Delete onClick={() => removeIndividual(index)}>X</Delete>
            <div>
              <Col md={12}>
                <Label>
                  {`${t('component.options.responsecontainerindividual')} ${index + 1}`}
                </Label>
              </Col>
            </div>
            <Row>
              <Col md={6}>
                <Label>{t('component.options.widthpx')}</Label>
                <TextField
                  type="number"
                  disabled={false}
                  containerStyle={{ width: 350 }}
                  onChange={e => changeIndividualUiStyle('widthpx', +e.target.value, index)}
                  value={responsecontainerindividual.widthpx}
                />
              </Col>
              <Col md={6}>
                <Label>{t('component.options.heightpx')}</Label>
                <TextField
                  type="number"
                  disabled={false}
                  containerStyle={{ width: 350 }}
                  onChange={e => changeIndividualUiStyle('heightpx', +e.target.value, index)}
                  value={responsecontainerindividual.heightpx}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Checkbox
                  onChange={() =>
                    changeIndividualUiStyle(
                      'wordwrap',
                      !responsecontainerindividual.wordwrap,
                      index
                    )
                  }
                  label={t('component.options.wordwrap')}
                  checked={responsecontainerindividual.wordwrap}
                />
              </Col>
            </Row>
          </Container>
        ))}
        <Row>
          <Col md={12}>
            <AddNewBtn onClick={() => addIndividual()}>{t('component.options.add')}</AddNewBtn>
          </Col>
        </Row>
      </Block>
      <Extras>
        <Extras.Distractors />
      </Extras>
    </O>
  );
};

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired,
  outerStyle: PropTypes.object
};

Options.defaultProps = {
  outerStyle: {},
  uiStyle: {
    responsecontainerposition: 'bottom',
    fontsize: 'normal',
    stemnumeration: '',
    widthpx: 0,
    heightpx: 0,
    wordwrap: false,
    responsecontainerindividuals: []
  }
};

export default React.memo(withNamespaces('assessment')(Options));

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

const Delete = styled.div`
  padding: 3px 10px;
  border-radius: 3px;
  background: lightgray;
  position: absolute;
  right: 10px;
  top: 0;
`;
