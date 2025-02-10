import styled from 'styled-components';

import { Button, TextField } from '@mui/material';


export const FieldStyled = styled(TextField)`
 width: 80%;
 margin: 20px;
`;

export const TimePickerContainer = styled.div`
 width: 80%;

`;

export const FormStyled = styled.form`
height: 90vh;
padding: 40px;
 display: flex;
 flex-direction: column;
 gap: 40px;
 position: relative;
`;

export const ButtonStyled = styled(Button)`

 
width: 40%;
left: 50%;
transform: translate(-50%, 0%);
`;
export const ButtonContainer = styled.div`
position: absolute; 
bottom: 10%; 
width: 80%;
`;
