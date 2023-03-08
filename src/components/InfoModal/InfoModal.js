// This component renders the info box popup

import { useRef } from 'react';
import './infomodal.css';

export default function InfoModal() {

  const modalRef = useRef(null);

  const handleOnClickOpen = () => {
    modalRef.current.style.display = "block";
  }
  const handleOnClickClose = () => {
    modalRef.current.style.display = "none";
  }

  return (
    <>
      <button className="info-btn" onClick={handleOnClickOpen} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="cornflowerblue">{/* <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
      </button>
      <div ref={modalRef} className="modal" onClick={handleOnClickClose}>
        <div className="modal-content">
          <p>
            Guess the word before the hearts run out. &#128578;
          </p>
          <div className="close" onClick={handleOnClickClose}>&times;</div>
        </div>
      </div>
    </>
  );
}