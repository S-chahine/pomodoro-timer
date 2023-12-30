import React from 'react';
import './SessionLength.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';



function SessionLength({ sessionLength, incrementSession, decrementSession }) {
    return (
        <div>
            <p id="session-label">Session Length</p>
            <div>
                <button id="session-decrement" onClick={decrementSession}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment" onClick={incrementSession}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
        </div>
    );
}

export default SessionLength;