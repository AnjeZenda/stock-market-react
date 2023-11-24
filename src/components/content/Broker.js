import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../hooks/urls";


export function Broker({broker, onDelete}) {
    const {id, name: nameBroker, value} = broker
    const [name, setName] = useState(nameBroker)
    const [balance, setBalance] = useState(value)

    async function deleteHandler(event) {
        try {
            const id = event.target.value
            const response = await axios.delete(`${API_URL}/brokers/${id}`)
            onDelete(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    async function saveHandler(event) {
        try {
            const id = event.target.value
            const brokerUpdate = {
                name: name,
                balance: balance
            }

            await axios.put(`${API_URL}/brokers/${id}`, brokerUpdate)
        } catch (e) {
            console.error(e)
        }
    }

    function changeNameHandler(event) {
        setName(event.target.value)
    }

    function changeBalanceHandler(event) {
        setBalance(event.target.value)
    }
    return (
        <>
            <div className={'table__row_broker'}>
                <div className={'table__elem'}>
                    <input className={'table__input'} type="text" value={name} onChange={changeNameHandler}/>
                </div>
                <div className={'table__elem'}>
                    <input className={'table__input'} type="number" value={balance} onChange={changeBalanceHandler}/>
                </div>
                <div className={'table__elem btns'}>
                    <button className={'table__btn'} type="button" onClick={saveHandler} value={id}>Save</button>
                    <button type="button" onClick={deleteHandler} value={id}>Delete</button>
                </div>
            </div>
        </>
    )
}