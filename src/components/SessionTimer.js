
import React, { useEffect, useRef, useState } from 'react';
import './SessionTimer.css';

const SessionTimer = ({ timeLeft, totalTime, isRunning, reset }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = useRef(circumference);
    const startTimeRef = useRef(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                const elapsedSeconds = elapsedTime + 1;
                dashOffset.current = Math.max(circumference - (circumference / totalTime) * elapsedSeconds, 0);

                if (elapsedSeconds <= totalTime) {
                    setElapsedTime(elapsedSeconds);
                }
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, elapsedTime, totalTime, circumference, reset]);

    useEffect(() => {
        if (!isRunning) {
            startTimeRef.current = null;
            dashOffset.current = Math.max(circumference - (circumference / totalTime) * elapsedTime, 0);
        }
    }, [isRunning, elapsedTime, totalTime, circumference, reset]);

    useEffect(() => {
        if (reset) {
            setElapsedTime(0);
            dashOffset.current = circumference;
        }
    }, [reset]);

    return (
        <svg width="150" height="150" viewBox="0 0 150 150" className="session-timer">
            <circle cx="75" cy="75" r={radius} fill="transparent" stroke="#007bff" strokeWidth="10" />
            <circle
                cx="75"
                cy="75"
                r={radius}
                fill="transparent"
                stroke="#28a745"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset.current}
                className="session-timer-progress"
                style={{
                    animationPlayState: isRunning ? 'running' : 'paused',
                    animationDuration: `${totalTime - elapsedTime}s`,
                }}
            />
            <text x="75" y="85" dominantBaseline="middle" textAnchor="middle" fontSize="25" fill="yellow">
                {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
            </text>
        </svg>
    );
};

export default SessionTimer;
