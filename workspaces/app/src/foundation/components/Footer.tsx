import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';
import { useId } from 'react';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const handleRequestToDialogOpen = async (type: string) => {
    let content;
    switch (type) {
      case 'TERM':
        const termModule = await import('../constants/Term');
        content = termModule.TERM;
        break;
      case 'CONTACT':
        const contactModule = await import('../constants/Contact');
        content = contactModule.CONTACT;
        break;
      case 'QUESTION':
        const questionModule = await import('../constants/Question');
        content = questionModule.QUESTION;
        break;
      case 'COMPANY':
        const companyModule = await import('../constants/Company');
        content = companyModule.COMPANY;
        break;
      case 'OVERVIEW':
        const overviewModule = await import('../constants/Overview');
        content = overviewModule.OVERVIEW;
        break;
      default:
        content = '不明な内容です。';
    }

    updateDialogContent(
      <_Content aria-labelledby={`${type.toLowerCase()}DialogA11yId`} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={`${type.toLowerCase()}DialogA11yId`} typography={Typography.NORMAL16}>
          {type}
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {content}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('TERM')}>利用規約</_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('CONTACT')}>お問い合わせ</_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('QUESTION')}>Q&A</_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('COMPANY')}>運営会社</_Button>
          <_Button disabled={!isClient} onClick={() => handleRequestToDialogOpen('OVERVIEW')}>Cyber TOONとは</_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
