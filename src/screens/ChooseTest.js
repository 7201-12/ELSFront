import {useNavigate, useParams} from "react-router-dom";
import GoBackButton from "../components/GoBackButton";

const ChooseTest = () => {
    const navigate = useNavigate();
    const params = useParams();
    const number = params.themeId;

    function select(time, url) {
        const target = Date.now() + time;
        localStorage.setItem('target_date', target.toString());
        navigate(url);
    }

    return (
        <section className="bg-gray-50">
            <GoBackButton/>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Выберите тип теста №{number}
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            onClick={() => select(9*60*1000, "/test/"+number+"/1")}
                        >
                            Полнота знаний
                        </button>

                        <button
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            onClick={() => select(9*60*1000, "/test/"+number+"/2")}
                        >
                            Целостность знаний
                        </button>

                        <button
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            onClick={() => select(15*60*1000, "/test/"+number+"/3")}
                        >
                            Умения
                        </button>

                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href={"/test/"+number+"/result"}
                        >
                            Последний результат
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChooseTest;