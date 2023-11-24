import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Graph} from "../Chart";


export function Stock({stock}) {
    const {id, label, name, data} = stock;
    const dispatch = useDispatch()
    const listTrading = useSelector(state => state.tradingList)
    const [isOpen, setOpenChart] = useState(false)

    function changeChartVisibility() {
        setOpenChart(!isOpen)
    }

    const [chartData, setChartData] = useState({
        labels: data.map((data) => data.date).reverse(),
        datasets: [
            {
                label: 'Users gained',
                data: data.map((data) => data.open).reverse(),
                borderColor: '#809059',
                borderWidth: 1,
                pointRadius: 0.1
            }
        ]
    })

    const changeListTrading = (event) => {
        if (event.target.checked) {
            listTrading.push(event.target.value)
        } else {
            let index = listTrading.indexOf(event.target.value)
            listTrading.splice(index, 1)
        }
        console.log(listTrading)
        dispatch({type: 'SAVE', tradingList: listTrading})
    }

    return (
        <>
            <div className="table__row_stocks">
                <input className="checkbox" type='checkbox' value={stock.label} onChange={changeListTrading}></input>
                <div className="p_stocks">{label}</div>
                <div className="p_stocks">{name}</div>
                <button className="stocks_btn" type={'button'} onClick={changeChartVisibility}>Show chart</button>
            </div>
            {isOpen ? <div className={'modal_chart'}>
                <div className={'popup_chart'}>
                    <button type='button' className={'close chart_btn'} onClick={changeChartVisibility} style={{backgroundColor: "#fbe1b6"}}>X</button>
                    <Graph key={id} value={chartData}/>
                </div>
            </div> : null}
        </>
    )
}