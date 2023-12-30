import React from 'react';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function Controls({ toggleTimer, resetTimer, isRunning }) {
    return (
        <div>
            <button id="start_stop" onClick={toggleTimer}>
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
            </button>
            <button id="reset" onClick={resetTimer}>
                <FontAwesomeIcon icon={faRedo} />
            </button>
        </div>
    );
}

export default Controls;