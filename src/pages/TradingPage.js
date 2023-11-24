import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {SocketService, useConnectionSocket} from "../socket.service";
import axios from "axios";
import {API_URL} from "../hooks/urls";


export function TradingPage() {
    const listTradings = useSelector(state => state.tradingList)
    const [stocks, setStocks] = useState([])
    const [trading, setTrading] = useState([])
    const [speed, setSpeed] = useState(0)
    const [date, setDate] = useState('')
    const [change, setChange] = useState('')

    const setSpeedChange = (event) => {
        setSpeed(event.target.value)
    }

    const setDateChange = (event) => {
        setDate(event.target.value)
    }

    useConnectionSocket()

    useEffect(() => {
        SocketService.socket.on('trading', (data) => {
            setChange(JSON.parse(data))
        })
    });

    useEffect(() => {
        // clickStop();
        (async () => {
            const data = (await axios.get(`${API_URL}/stocks`)).data
            setStocks(data);

            let tradings = []
            listTradings.forEach((el) => {
                const index = data.map((g) => {
                    return g.label;
                }).indexOf(el);
                if (index > -1) {
                    tradings.push({
                        id: data[index].id,
                        label: data[index].label,
                        name: data[index].name,
                        prices: data[index].data.reverse()
                    })
                }
            })
            setTrading(tradings);
        })()
    })

    const clickStart = () => {
        if (speed > 0 && date && trading) {
            SocketService.socket.emit('tradingListDone', {listTradings})
            let index = -1
            for (let i = 0; i < trading[0].prices.length; i++) {
                if (new Date(trading[0].prices[i].date).getTime() >= new Date(date).getTime()) {
                    console.log(new Date(trading[0].prices[i].date).toDateString(), new Date(date).toDateString())
                    index = i;
                    break;
                }
            }
            console.log(index)
            SocketService.socket.emit("start", {index, speed})
        }
        console.log('start')
        console.log(trading)
    }

    const clickStop = () => {
        console.log('stop')
        SocketService.socket.emit("stop")
    }




    if (stocks?.length !== 0) {
        if (trading.length === 0) {
            return <div>No stocks added</div>
        }
        return (
            <>
                <div className='container'>
                    <div className='inner__container'>
                        <div className='input__field'>
                            <label className='label'>Start date</label>
                            <input type='date' onChange={setDateChange}/>
                        </div>
                        <div className='input__field'>
                            <label className='label'>Speed</label>
                            <input type='number' onChange={setSpeedChange}/>
                        </div>
                        <div className='trading__btns'>
                            <button type='button' onClick={clickStart}>Start</button>
                            <button type='button' onClick={clickStop}>Stop</button>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    {
                        (change > 0 && date && speed) ?
                            (trading.map(trade => (
                                <div key={trade.id}>
                                    <div className='table__row_trading'>
                                        <div className='trading__elem'>{trade.name}</div>
                                        <div className='trading__elem'>{trade.label}</div>
                                        <div className='trading__elem'>{trade.prices[change]?.open}</div>
                                        <div className='trading__elem'>{trade.prices[change]?.date}</div>
                                    </div>
                                </div>
                            ))) : <div></div>
                    }
                </div>
            </>
        )
    }
    return <h1>Wait</h1>
}