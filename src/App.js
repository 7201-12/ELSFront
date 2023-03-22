import ChooseTest from "./screens/ChooseTest";
import {Route, Routes} from "react-router-dom";
import Layout from "./navigation/Layout";
import Test from "./screens/Test";
import Result from "./screens/Result";
import Section from "./screens/Section";
import IntMap from "./screens/IntMap";
import Presentation from "./screens/Presentation";
import Parts from "./screens/Parts";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="" element={<Parts/>}/>
                <Route path="section">
                    <Route path=":sectionId">
                        <Route path="" element={<Section/>}/>
                        <Route path="intmap" element={<IntMap/>}/>
                        <Route path="test">
                            <Route path=":themeId">
                                <Route path="" element={<ChooseTest/>}/>
                                <Route path=":testId" element={<Test/>}/>
                                <Route path="result" element={<Result/>}/>
                            </Route>
                        </Route>
                        <Route path="theory" element={<Presentation/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
