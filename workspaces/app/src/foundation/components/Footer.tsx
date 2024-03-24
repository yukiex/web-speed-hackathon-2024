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

  const dialogA11yIds = {
    TERM: useId(),
    CONTACT: useId(),
    QUESTION: useId(),
    COMPANY: useId(),
    OVERVIEW: useId(),
  };

  const dialogTitles = {
    TERM: "利用規約",
    CONTACT: "お問い合わせ",
    QUESTION: "Q&A",
    COMPANY: "運営会社",
    OVERVIEW: "Cyber TOONとは",
  };

  const handleRequestToDialogOpen = async (type: keyof typeof dialogA11yIds) => {
    try {
        let content;
        switch (type) {
            case 'TERM':
                const { TERM } = await import('../constants/Term');
                content = TERM;
                break;
            case 'CONTACT':
                const { CONTACT } = await import('../constants/Contact');
                content = CONTACT;
                break;
            case 'QUESTION':
                const { QUESTION } = await import('../constants/Question');
                content = QUESTION;
                break;
            case 'COMPANY':
                const { COMPANY } = await import('../constants/Company');
                content = COMPANY;
                break;
            case 'OVERVIEW':
                const { OVERVIEW } = await import('../constants/Overview');
                content = OVERVIEW;
                break;
            default:
                throw new Error('Invalid type for dialog content.');
        }

        updateDialogContent(
            <_Content aria-labelledby={dialogA11yIds[type]} role="dialog">
                <Text as="h2" color={Color.MONO_100} id={dialogA11yIds[type]} typography={Typography.NORMAL16}>
                    {dialogTitles[type]}
                </Text>
                <Spacer height={Space * 1} />
                <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
                    {content}
                </Text>
            </_Content>,
        );
    } catch (error) {
        console.error('Error loading dialog content:', error);
        // ここでエラーハンドリングを行う
    }
};

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          {Object.keys(dialogTitles).map((type) => (
            <_Button key={type} disabled={!isClient} onClick={() => handleRequestToDialogOpen(type as keyof typeof dialogA11yIds)}>
              {dialogTitles[type as keyof typeof dialogA11yIds]}
            </_Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
