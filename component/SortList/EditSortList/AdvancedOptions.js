import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withNamespaces } from '@edulastic/localization';
import { grey } from '@edulastic/colors';

import Options, { FontSizeSelect, OrientationSelect } from '../../common/Options';

import { Subtitle } from '../../common';

const AdvancedOptions = ({ t, onUiChange }) => {
  const [fontsize, setFontsize] = useState('normal');
  const [orientation, setOrientation] = useState('horizontal');

  return (
    <Options title="Advanced Options">
      <Hr />
      <Subtitle style={{ padding: 0, marginBottom: 21 }}>{t('component.options.layout')}</Subtitle>
      <FlexRow>
        <Flex flexDir="column">
          <FontSizeSelect
            data-cy="fontSize"
            value={fontsize}
            onChange={(val) => {
              onUiChange('fontsize', val);
              setFontsize(val);
            }}
          />
        </Flex>
        <Flex flexDir="column">
          <OrientationSelect
            data-cy="orientation"
            value={orientation}
            onChange={(val) => {
              onUiChange('orientation', val);
              setOrientation(val);
            }}
          />
        </Flex>
      </FlexRow>
    </Options>
  );
};

AdvancedOptions.propTypes = {
  t: PropTypes.func.isRequired,
  onUiChange: PropTypes.func.isRequired
};

export default withNamespaces('assessment')(AdvancedOptions);

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-height: 40px;
  margin-bottom: ${({ noMargins }) => (noMargins ? 0 : 16)}px;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid ${grey};
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Flex = styled.div`
  flex: 1;
  flex-direction: ${({ flexDir }) => flexDir || 'inherit'};
  display: ${({ flexDir }) => (flexDir ? 'flex' : 'initial')};
`;
