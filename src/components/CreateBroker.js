import React, {useState} from "react";
import axios from "axios";
import {API_URL} from "../hooks/urls";

const brokerData = {
    name: '',
    value: 0
}

export function CreateBroker({onCreate}) {
    const [name, setName] = useState('')
    const [balance, setBalance] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            brokerData.name = name
            brokerData.value = parseInt(balance)
            const response = await  axios.post(`${API_URL}/brokers`, brokerData);
            onCreate(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const changeNameHandler = (event) => {
        setName(event.target.value)
    }

    const changeBalanceHandler = (event) => {
        setBalance(event.target.value.replace(/\D/g, ''))
    }


    return (
        <>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Enter name of broker...' required value={name} onChange={changeNameHandler}/>
                <input className='popup__balance' type='number' placeholder='Enter balance of broker...' required value={balance} onChange={changeBalanceHandler}/>
                <button className="table__btn" type='submit'>Create</button>
            </form>
        </>
    )
}