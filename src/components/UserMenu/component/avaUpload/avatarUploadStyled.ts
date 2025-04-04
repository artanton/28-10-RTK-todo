import styled from 'styled-components';

export const Avatar = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  position: relative;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
  display: flex;

  margin: 0 auto;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: middle;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  color: rgb(255, 255, 255);
  background-color: rgb(25, 118, 210);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  outline: 0px;
  border-width: 0px;
  padding: 6px 16px;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgb(21, 101, 192);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px -3px,
      rgba(0, 0, 0, 0.22) 0px 8px 10px 1px, rgba(0, 0, 0, 0.2) 0px 3px 14px 2px;
  }
`;

export const HiddenFileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

export const FormContainer = styled.div`
  padding: ${p => p.theme.padding.huge};
  display: flex;

  flex-direction: column;
`;
