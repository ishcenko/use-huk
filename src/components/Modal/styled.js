import styled from 'styled-components';

export const StyledOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .buttonType {
    margin-top: 35px;
    width: 300px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .buttonType.active {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
  .button-type {
    border: 2px solid black;
    border-radius: 4px;
    background-color: aquamarine;
    color: #000;
    width: 120px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const StyledModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  border-radius: 12px;
  padding: 25px;
  width: 450px;
  height: 350px;
`;
