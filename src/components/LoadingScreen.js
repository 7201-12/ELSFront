import ReactLoading from "react-loading";

const LoadingScreen = () => {
    return (
        <ReactLoading
            type="spinningBubbles"
            color="#374151"
            height={100}
            width={50}
        />
    )
}

export default LoadingScreen;