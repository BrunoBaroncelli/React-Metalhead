import styled from 'styled-components';

export const Form = styled.form`
  min-height: 82vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxLogin = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px;
  border: 1px solid var(--main);
  border-radius: 8px;
`;

export const BoxInput = styled.div`
  display: flex;
  border: 2px solid var(--main);
  border-radius: 8px;
  margin: 5px 0;
  input {
    border: 0;
    width: 100%;
  }
  svg {
    margin: 5px;
    width: 30px;
    height: 30px;
  }
`;

export const BoxButton = styled.div`
  display: flex;
  button {
    width: 100%;
  }
`;