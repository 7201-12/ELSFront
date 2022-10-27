import {useEffect, useState} from "react";

const Result = () => {
    const [result, setResult] = useState('');

    useEffect(() => {
        setResult(localStorage.getItem('result'));
    },[]);

    return(
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Результат теста: {result}
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default Result;