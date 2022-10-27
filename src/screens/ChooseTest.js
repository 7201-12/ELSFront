import {useNavigate} from "react-router-dom";

const ChooseTest = () => {
    const navigate = useNavigate();

    function select(time, url) {
        const target = Date.now() + time;
        localStorage.setItem('target_date', target.toString());
        navigate(url);
    }

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Выберите тип теста
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            onClick={() => select(9*60*1000, "/test/chlpol")}
                        >
                            Целостность и полнота знаний
                        </button>

                        <button
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            onClick={() => select(15*60*1000, "/test/umn")}
                        >
                            Умения
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChooseTest;