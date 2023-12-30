
import React, { useState, useEffect, useCallback } from 'react';
import Controls from './Controls';
import SessionLength from './SessionLength';
import BreakLength from './BreakLength';
import SessionTimer from './SessionTimer';
import './Timer.css';
import Beep from '../beep.mp4';

function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [timerLabel, setTimerLabel] = useState('Session');
    const [resetKey, setResetKey] = useState(0);
    const [playBeep, setPlayBeep] = useState(false);


    const getNextTimerLength = useCallback(label => (label === 'Break' ? breakLength : sessionLength), [breakLength, sessionLength]);

    const playBeepSound = useCallback(() => {
        const audio = new Audio(Beep);
        audio.play();
    }, []);


    useEffect(() => {
        // Check if the timeLeft becomes 0 to play the beep sound
        if (timeLeft === 0) {
            setPlayBeep(true);
        } else {
            setPlayBeep(false);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (playBeep) {
            playBeepSound();
        }
    }, [playBeep, playBeepSound]);


    useEffect(() => {
        let intervalId;

        if (isRunning && !isPaused) {
            intervalId = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime === 0) {
                        const nextTimerLabel = timerLabel === 'Session' ? 'Break' : 'Session';
                        setIsPaused(true);
                        setIsRunning(false);
                        setTimerLabel(nextTimerLabel);
                        setResetKey(prevKey => prevKey + 1);
                        return getNextTimerLength(nextTimerLabel) * 60;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, isPaused, timeLeft, sessionLength, breakLength, timerLabel, getNextTimerLength, resetKey]);

    const toggleTimer = () => {
        setIsRunning(prevIsRunning => {
            const newIsRunning = !prevIsRunning;
            setIsPaused(!newIsRunning);
            return newIsRunning;
        });
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimerLabel('Session');
        setResetKey(prevKey => prevKey + 1);
        setTimeLeft(sessionLength * 60);
    };

    const incrementSession = () => {
        setSessionLength(prevSessionLength => {
            const newSessionLength = Math.min(prevSessionLength + 1, 60);
            if (!isRunning && !isPaused && timerLabel === 'Session') {
                setTimeLeft(newSessionLength * 60);
            }
            return newSessionLength;
        });
    };

    const decrementSession = () => {
        setSessionLength(prevSessionLength => {
            const newSessionLength = Math.max(prevSessionLength - 1, 1);
            if (!isRunning && !isPaused && timerLabel === 'Session') {
                setTimeLeft(newSessionLength * 60);
            }
            return newSessionLength;
        });
    };

    const incrementBreak = () => {
        setBreakLength(prevBreakLength => {
            const newBreakLength = Math.min(prevBreakLength + 1, 60);
            if (!isRunning && !isPaused && timerLabel === 'Break') {
                setTimeLeft(newBreakLength * 60);
            }
            return newBreakLength;
        });
    };

    const decrementBreak = () => {
        setBreakLength(prevBreakLength => {
            const newBreakLength = Math.max(prevBreakLength - 1, 1);
            if (!isRunning && !isPaused && timerLabel === 'Break') {
                setTimeLeft(newBreakLength * 60);
            }
            return newBreakLength;
        });
    };

    return (
        <div>
            <div>
                <p className='Title'> Pomodoro Timer</p> </div>

            <div className="container mt-5">

                <div className="TimerLabel">

                    <div className="col-md-6 mt-5">
                        <SessionLength
                            sessionLength={sessionLength}
                            incrementSession={incrementSession}
                            decrementSession={decrementSession}
                        />
                        <BreakLength
                            breakLength={breakLength}
                            incrementBreak={incrementBreak}
                            decrementBreak={decrementBreak}
                        />
                    </div>
                    <div className="row justify-content-center ">
                        <SessionTimer
                            key={resetKey}
                            timeLeft={timeLeft}
                            totalTime={getNextTimerLength(timerLabel) * 60}
                            isRunning={isRunning}
                            reset={resetKey}
                        />
                        <div className="text-center mt-4">
                            <p id="timer-label" className="h4">
                                {timerLabel}
                            </p>
                            <p id="time-left" className="h1">
                                {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60)
                                    .toString()
                                    .padStart(2, '0')}`}
                            </p>
                        </div>
                        <Controls toggleTimer={toggleTimer} resetTimer={resetTimer} isRunning={isRunning} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timer;
