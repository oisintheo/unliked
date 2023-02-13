import SearchIcon from '@icons/SearchIcon';
import styled from 'styled-components';

export const StyledSearchBar = styled.form`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;

  & > input {
    padding-left: 40px;
    padding-right: 10px;
    border: solid 2px #fff;
    width: 100%;
    height: 35px;
    border-radius: 8px;
    background-color: #131313;
    color: #fff;
    font-family: 'Outfit';
    font-weight: 400;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }
`;

export const StyledSearchButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  background: none;
  border: none;
  cursor: pointer;
`;
