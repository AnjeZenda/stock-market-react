import './App.css';
import {Navigation} from "./components/Navigation";
import {Route, Routes} from "react-router-dom";
import {BrokersPage} from "./pages/BrokersPage";
import {StocksPage} from "./pages/StocksPage";
import {TradingPage} from "./pages/TradingPage";

function App() {
    return (
        <div className="App">
            <Navigation></Navigation>
            <Routes>
                <Route path='/' element={<BrokersPage />}></Route>
                <Route path='/stocks' element={<StocksPage />}></Route>
                <Route path='/trading' element={<TradingPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
