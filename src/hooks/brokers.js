import {useEffect, useState} from "react";
import axios from 'axios'
import {API_URL} from "./urls";


export function useBrokers() {
    const [brokers, setBrokers] = useState([])

    function addBroker(broker) {
        setBrokers(prev => [...prev, broker])
    }

    function deleteBroker(id) {
        setBrokers(brokers.filter(x => x.id !== id))
    }

    async function fetchBrokers() {
        try {
            const response = await axios.get(`${API_URL}/brokers`)
            setBrokers(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchBrokers().then(r => {});
    }, []);

    return {brokers, addBroker, deleteBroker}
}