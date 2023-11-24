import * as socketIo from 'socket.io-client'
import {useEffect} from "react";
import {API_URL} from "./hooks/urls";

export class SocketService {
    static socket = null
    static connection() {
        this.socket = socketIo.connect(`${API_URL}`)
        this.socket.on('connect', () => {
            console.log('connected')
        })
        this.socket.on('disconnected', () => {
            console.log('disconnected')
        })
    }
}

export const useConnectionSocket = () => {
    const socketConnection = () => {
        SocketService.connection()
    }

    useEffect(() => {
        socketConnection()
    }, []);
}