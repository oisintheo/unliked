import styled, { css } from 'styled-components';

export const StyledModal = styled.div<{ isVisible: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  opacity: 0;
  z-index: -100;
  transition: ease-in-out visibility 0.1s, ease-in-out opacity 0.1s,
    ease-in-out transform 0.2s, ease z-index 1s;
  transform: scale(0.8);

  ${({ isVisible }) =>
    isVisible &&
    css`
      visibility: visible !important;
      opacity: 1;
      z-index: 50;
      transform: scale(1);
      transition: ease-in-out visibility 0.2s, ease-in-out opacity 0.2s,
        ease-in-out transform 0.2s, ease z-index 0.2s;
    `}
`;

export const StyledContainer = styled.div`
  width: 32rem;
  position: relative;
`;

export const StyledModalBackdrop = styled.div`
  content: '';
  height: 100%;
  width: 100%;
  background-color: #ffda03;
  //   background: radial-gradient(#fff, #ffda03);
  //   background: radial-gradient(at bottom right, #ffda03, #fff);
  border-radius: 8px;
  position: absolute;
  top: 10px;
  right: -10px;
  bottom: -10px;
  left: 10px;
  box-shadow: 0 0 30px 5px rgba(255, 218, 3, 0.4);
  transition: ease all 0.2s;

  //   &: hover {
  //     background: radial-gradient(at bottom right, #ffda03, #fff);
  //     box-shadow: 0 0 30px 5px rgba(255, 218, 3, 0.4),
  //       0 0 50px 10px rgba(255, 218, 3, 0.3);
  //   }
`;

export const StyledModalContent = styled.div`
  position: relative;
  background-color: #131313;
  padding: 2rem;
  border-radius: 8px;
  z-index: 55;
  //   box-shadow: 0 0 30px 5px rgba(255, 218, 3, 0.4);
  //   box-shadow: 7px 5px 5px rgba(0, 0, 0, 0.4);
  transition-duration: 0.5s;

  //   &:hover {
  // box-shadow: 0 0 30px 5px rgba(255, 218, 3, 0.4);
  //     // box-shadow: 0 0 30px 5px rgba(255, 218, 3, 0.4),
  //     //   0 0 50px 10px rgba(255, 218, 3, 0.3);
  //   }
`;
