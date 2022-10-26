import axios from "../api/axios";

async function getArray(url, setArray) {
    await axios.get(url, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.data !== null) {
                setArray(response.data);
            }
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}

export default getArray