import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {API_URL} from "../hooks/urls";
import {Stock} from "../components/content/Stock";


export function StocksPage() {
    const [stocks, setStocks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()


    
    useEffect(() => {
        if (!isLoaded) {
            (async () => {
                const response = await axios.get(`${API_URL}/stocks`)
                setStocks(response.data)
                setIsLoaded(true)
                dispatch({type: 'SAVE', tradingList: []})
            })()
        }
    });

    if (stocks?.length) {
        return (
            <div className="container">
                <div className="table">
                    {stocks.map(stock => {
                        return (
                            <Stock key={stock.id} stock={stock}></Stock>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (<h1>No stocks</h1>)
}