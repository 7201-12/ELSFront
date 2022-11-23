import ReactLoading from "react-loading";
import GoBackButton from "./GoBackButton";

const LoadingScreen = () => {
    return (
        <section className="bg-gray-50">
            <GoBackButton/>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <ReactLoading
                        type="spinningBubbles"
                        color="#374151"
                        height={100}
                        width={50}
                    />
                </div>
            </div>
        </section>
    )
}

export default LoadingScreen;