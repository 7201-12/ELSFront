import {useEffect, useState} from "react";
import Timer from "../components/Timer";
import getArray from "../components/getArray";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

const Test = () => {
    const [time, setTime] = useState(9*60*1000);
    const [t, setT] = useState('');

    const returnType = () => {
        const path = window.location.pathname;
        switch (path) {
            case "/test/chlpol":
                return "на целостность и полноту знаний"
            case "/test/umn":
                setTime(15*60*1000);
                return "на умения"
        }
        return ""
    }

    useEffect( () => {
        setT(returnType());
    }, []);

    function refreshTimer() {
        const targetDate = Date.now() + time;
        localStorage.setItem('target_date', targetDate.toString());
    }

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        getArray("/questions", setQuestions);
    }, []);

    const QuestionsPanel = () => {
        const handleItemClick = (index) => {
            setQuestion(questions[index]);
        }

        const Item = (index, key) => {
            return (
            <div key={key} className={itemStyle}
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
                <FormControlLabel value={val} control={<Radio />} label={val} />
            );
        }

        return (
            <div className="bg-white  sm:p-6 shadow">
                <h1 className="text-xl font-bold">Вопрос №{question+1}</h1>
                <div className="flex flex-row mt-5">
                    <div className="px-4 py-5 bg-gray-200 text-left basis-4/6">Содержание:</div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Варианты ответа:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={vars[0]}
                            name="variants"
                        >
                            {vars.map((index)=>{Item(index)})}
                        </RadioGroup>
                    </FormControl>
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

    return(
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Тест {t}
                    </h1>
                    <h2 className="text-xl font-bold">Осталось: {Timer(time)}</h2>
                    {QuestionsPanel()}
                    {QuestionPanel()}
                    <div className="flex flex-row rounded-md bg-gray-150">
                        <ArrowLeftIcon className="max-h-8" onClick={choosePrev}/>
                        <ArrowRightIcon className="max-h-8" onClick={chooseNext}/>
                    </div>
                    <button onClick={refreshTimer}>refresh</button>
                </div>
            </div>
        </section>
    );
}

const listStyle = "flex flex-row flex-wrap gap-2"
const itemStyle = "bg-slate-500 rounded-md cursor-pointer hover:bg-slate-700 place-content-center max-h-12";

export default Test;