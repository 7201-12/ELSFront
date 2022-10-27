import {useEffect, useState} from "react";
import getArray from "../components/getArray";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";
import LoadingScreen from "../components/LoadingScreen";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";

const Test = () => {
    const [t, setT] = useState('');
    const [targetDate, setTargetDate] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [it, setIt] = useState(0);
    const [url, setUrl] = useState('');
    const [result, setResult] = useState('');
    const [timeup, setTimeup] = useState(false);
    const navigate = useNavigate();

    const refreshTimer = () => {
        let target = parseInt(localStorage.getItem('target_date'));
        if(target > 0) {
            setTargetDate(target);
        }
    }

    const countDownUntilZero = () => {
        if(targetDate > 0) {
            const currentDate = Date.now();
            let secondsLeft = (targetDate - currentDate) / 1000;
            if (secondsLeft > 0) {
                secondsLeft = secondsLeft % 86400 % 3600;
                setMinutes(pad(secondsLeft / 60));
                setSeconds(pad(secondsLeft % 60));
            } else {
                setMinutes('00');
                setSeconds('00');
                setTimeup(true);
            }
        }
    }

    function pad(n) {
        n = Math.floor(n);
        return (n < 10 ? '0' : '') + n;
    }

    const returnType = () => {
        const path = window.location.pathname;
        switch (path) {
            case "/test/chlpol":
                setUrl('/fulltegrity');
                setResult('result_chl_pol');
                return "на целостность и полноту знаний"
            case "/test/umn":
                setUrl('/problems');
                setResult('result_umn');
                return "на умения"
        }
        return ""
    }
    useEffect(() => {
        setT(returnType());
    }, [])

    useEffect( () => {
        if (t !== '') {
            refreshTimer();
            getArray(url, setQuestions);
        }
    }, [t]);

    useEffect(() => {
        if(questions.length > 0) {
            if(it < questions.length) {
                console.log("questions[it]=",questions[it]);
                setAnswers([
                    ...answers,
                    questions[it].variants[0].id,
                ]);
                setIt(it + 1);
            }
        }
    }, [questions]);

    useEffect(() => {
        if(questions.length > 0) {
            if(it < questions.length) {
                console.log("questions[it]=",questions[it]);
                setAnswers([
                    ...answers,
                    questions[it].variants[0].id,
                ]);
                setIt(it + 1);
            }
        }
    }, [it]);

    useEffect(() => {
        if(questions.length > 0 && targetDate > 0 && questions.length === answers.length) {
            setTimeout(countDownUntilZero, 1000);
            setIsLoading(false);
        }
    }, [it]);

    useEffect(() => {
        setTimeout(countDownUntilZero, 1000);
    }, [seconds]);

    const QuestionsPanel = () => {
        const handleItemClick = (index) => {
            setQuestion(index);
        }

        const Item = (index, key) => {
            return (
            <div key={key} className={question === index ? choosedItemStyle : itemStyle}
                        onClick={() => handleItemClick(index)}>
                {index+1}
            </div>
            );
        }

        const List = (arr) => {
            return (
                <div className={listStyle}>
                    {arr.map((item, index) => Item(index, index))}
                </div>
            );
        }

        return (List(questions));
    }

    const QuestionPanel = () => {
        const vars = questions[question].variants;

        const Item = (index) => {
            const val = vars[index].value;
            return (
                <FormControlLabel className="text-left" key={index} value={vars[index].id} control={<Radio />} label={val} />
            );
        }

        const handleChoose = (e) => {
            const nextAnswers = answers.map((a, i) => {
                if (i === question) {
                    return e.target.value;
                } else {
                    return a;
                }
            });
            setAnswers(nextAnswers);
        };

        return (
            <div className="bg-white  sm:p-6 shadow">
                <h1 className="text-xl font-bold">Вопрос №{question+1}</h1>
                <div className="flex flex-row mt-5">
                    <div className="px-4 py-5 bg-gray-200 text-left basis-3/6">Содержание: {questions[question].value}</div>
                    <div className="pl-4">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Варианты ответа:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={answers[question]}
                                onChange={(e) => handleChoose(e)}
                                name="variants"
                            >
                                {vars.map((val, index)=>Item(index))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
        );
    }

    function choosePrev() {
        if(question > 0) {
            setQuestion(question-1);
        }
    }

    function chooseNext() {
        if(question < questions.length - 1) {
            setQuestion(question+1);
        }
    }

    async function submitTest() {
        let request = [];
        for(let i = 0; i < answers.length; i++) {
            const ans = {
                questionId: questions[i].id,
                answerId: answers[i]
            }
            console.log("answer["+i+"]=", ans);
            request.push(ans);
        }
        console.log("lastAnswers=",answers);
        console.log(request);

        await axios.post("/calculate", request, {})
            .then(response => {
                console.log(response);
                localStorage.setItem(result, response.data);
                navigate("/test/result");
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    useEffect(() => {
        if(timeup) {
            submitTest();
        }
    }, [timeup]);

    const getBack = () => {
        navigate("/");
    }

    return(
        <>
        {isLoading ? (<LoadingScreen/>) : (
            <>
            <div className="bg-gray-50">
                <ArrowLeftIcon className="max-h-8 max-w-8 cursor-pointer hover:bg-gray-200" onClick={getBack}/>
            </div>
            <section className="bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-6xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Тест {t}
                        </h1>
                        <h2 className="text-xl font-bold">Осталось: {minutes}:{seconds}</h2>
                        {QuestionsPanel()}
                        {QuestionPanel()}
                        <div className="flex flex-row rounded-md bg-gray-100">
                            <ArrowLeftIcon className="max-h-8 cursor-pointer hover:bg-gray-200" onClick={choosePrev}/>
                            <ArrowRightIcon className="max-h-8 cursor-pointer hover:bg-gray-200" onClick={chooseNext}/>
                            <button onClick={submitTest} className="bg-slate-400 hover:bg-slate-500">Завершить тест</button>
                        </div>
                    </div>
                </div>
            </section>
            </>)}
        </>
    );
}

const listStyle = "flex flex-row flex-wrap gap-2"
const itemStyle = "bg-slate-400 rounded-md p-2 cursor-pointer hover:bg-slate-500 place-content-center max-h-12";
const choosedItemStyle = "bg-slate-500 rounded-md p-2 cursor-pointer hover:bg-slate-600 place-content-center max-h-12"

export default Test;