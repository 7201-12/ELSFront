import axios from "../api/axios";
import {useEffect, useState} from "react";

const Section = () => {
    const [name, setName] = useState('');

    async function getName() {
        await axios.get('/start', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.data !== null) {
                    setName(response.data);
                }
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    useEffect(() => {
        getName()
    })

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        <p>Привет, {name}</p>
                        Выберите тест
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/test/1"
                        >
                            Тест 1
                        </a>

                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/test/2"
                        >
                            Тест 2
                        </a>

                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/test/3"
                        >
                            Тест 3
                        </a>

                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/intmap"
                        >
                            Интеллектуальная карта
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section;