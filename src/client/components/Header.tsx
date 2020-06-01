import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import styles from '../../styles/App.module.css';

type Props = {
  txt: string;
};

const variants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

const HeaderDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 100vw;
  padding: 0 0 20px 0;
`;

const Header = ({ txt = 'Who Likes Trivia?' }: Props) => {
  return (
    <HeaderDiv
      className={styles.headerBg}
      variants={variants}
      initial="closed"
      animate="open"
    >
      <h1>{txt.toUpperCase()}</h1>
    </HeaderDiv>
  );
};

export default Header;
