// import PropTypes from 'prop-types';
import { useEffect } from 'react';

import s from './Modal.module.css';

export default function Modal({ largeImageURL, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') closeModal();
  };

  return (
    <div className={s.overlay} onClick={closeModal}>
      <div className={s.modal}>
        <img src={largeImageURL} alt="Big card" />
      </div>
    </div>
  );
}
