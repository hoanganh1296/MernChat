import {io} from 'socket.io-client'
import React from 'react'
const SOCKET_URL = '"https://react-chat-app-hoanganh1296.vercel.app"'
export const socket = io(SOCKET_URL)

export const AppContext = React.createContext()
