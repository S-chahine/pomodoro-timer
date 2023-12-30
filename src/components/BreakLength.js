import React from 'react';
import './BreakLength.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


function BreakLength({ breakLength, incrementBreak, decrementBreak }) {
    return (
        <div>
            <p id="break-label">Break Length</p>
            <div>
                <button id="break-decrement" onClick={decrementBreak}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment" onClick={incrementBreak}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
        </div>
    );
}

export default BreakLength;