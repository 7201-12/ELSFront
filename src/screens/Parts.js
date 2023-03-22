import Section from "./Section";

const Parts = () => {
    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Выберите раздел
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/section/1"
                        >
                            Раздел 1
                        </a>
                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/section/2"
                        >
                            Раздел 2
                        </a>
                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/section/3"
                        >
                            Раздел 3
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Parts