import {useEffect, useState} from "react";

const INTERVAL = 1000;

export const Timer = (initial) => {
    const persisted = parseInt(localStorage.getItem('target_date'));
    const [targetDate, setTargetDate] = useState(0);
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    useEffect(() => {
        if(persisted > 0){
            setTargetDate(persisted);
        } else {
            const date = Date.now() + initial;
            setTargetDate(date);
            localStorage.setItem('target_date', date.toString());
        }
    }, []);

    const countDownUntilZero = () => {
        if(targetDate > 0) {
            const currentDate = Date.now();
            let secondsLeft = (targetDate - currentDate) / 1000;
            console.log(secondsLeft);
            if (secondsLeft > 0) {
                secondsLeft = secondsLeft % 86400 % 3600;
                setMinutes(pad(secondsLeft / 60));
                setSeconds(pad(secondsLeft % 60));
            } else {
                setMinutes('00');
                setSeconds('00');
            }
        }
    }

    useEffect(() => {
        setTimeout(countDownUntilZero, INTERVAL);
    }, [targetDate]);

    useEffect(() => {
        setTimeout(countDownUntilZero, INTERVAL);
    }, [seconds]);

    function pad(n) {
        n = Math.floor(n);
        return (n < 10 ? '0' : '') + n;
    }

    return <>
        {minutes}:{seconds}
    </>;
}

export default Timer;