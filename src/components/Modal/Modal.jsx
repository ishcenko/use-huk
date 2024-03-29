import React, { useState } from 'react';
import { StyledModal, StyledOverlay } from './styled';
import PropTypes from 'prop-types';

const Modal = ({ visibleData, onCloseModal }) => {
  const [dataType, setDataType] = useState('emails');
  console.log('visibleData: ', visibleData);
  // const handleKeyDown = event => {
  //   if (event.code === 'Escape') {
  //     onCloseModal(event);
  //   }
  // };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal(event);
    }
  };

  const onSetDataType = newDataType => {
    setDataType(newDataType);
  };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <button className="modal-close" onClick={onCloseModal}>
          &times;
        </button>
        <br />
        <div className="buttonType">
          <button
            className={`button-type ${dataType === 'emails' ? 'active' : ' '}`}
            onClick={() => onSetDataType('emails')}
            type="button"
          >
            Emails
          </button>
          <button
            className={`button-type ${dataType === 'users' ? 'active' : ' '}`}
            onClick={() => onSetDataType('users')}
            type="button"
          >
            Users
          </button>
        </div>
        <h2>Active dataType: {dataType} </h2>
        {dataType === 'emails' && (
          <ul>
            {Array.isArray(visibleData) &&
              visibleData.map(comment => (
                <li key={comment.id}>{comment.email}</li>
              ))}{' '}
          </ul>
        )}
        {dataType === 'users' && (
          <ul>
            {Array.isArray(visibleData) &&
              visibleData.map(comment => (
                <li key={comment.id}>{comment.name}</li>
              ))}{' '}
          </ul>
        )}
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  visibleData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
