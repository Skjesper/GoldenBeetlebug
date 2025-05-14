import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';

const GameContainer = styled.div`

position: relative;
width: 100%;
height: 100%;

`;

const GameCanvas = styled.canvas`
  cursor: crosshair;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

interface Rune {



}
