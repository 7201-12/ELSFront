import ChooseTest from "./screens/ChooseTest";
import {Route, Routes} from "react-router-dom";
import Layout from "./navigation/Layout";
import Test from "./screens/Test";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="" element={<ChooseTest/>}/>
                <Route path="test">
                    <Route path="" element={<ChooseTest/>}/>
                    <Route path="chlpol" element={<Test/>}/>
                    <Route path="umn" element={<Test/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
