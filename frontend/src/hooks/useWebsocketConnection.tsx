/* 
    1. Create context
    2. Context Provider
    3. initial Value to the provider
    4. hook , which will consume this context and return me the state, dispatch action
    5. might need a reducer function to update the state
*/

import { createContext, Dispatch, ReactNode, useContext, useReducer, useState } from "react";


export enum ACTION  {
    "INCREMENT" = "INCREMENT",
    "DECREMENT" = "DECREMENT"
}

type WebsocketConnectionValue = {
    count : number;
}
type ActionType = {type : ACTION.INCREMENT}  | {type : ACTION.DECREMENT};
type DispatchType = (action : ActionType) => void;

const INITIAL_VALUE : WebsocketConnectionValue = {
    count : 1,
}

const WebsocketReducer = (state: WebsocketConnectionValue, action: ActionType) => {
    if(!state) return state;
    switch(action.type){
        case ACTION.INCREMENT : {
            return {
                ...state,
                count : state.count+1
            }
        }
        default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
    }
}

const WebsocketContext = createContext<{state:WebsocketConnectionValue, dispatch: DispatchType} | null>(null);

export const WebsocketContextProvider = ({children} : {children : ReactNode}) => {
    const [state, dispatch] = useReducer(WebsocketReducer, INITIAL_VALUE);
    const value = {state, dispatch};
    return <WebsocketContext.Provider value={value}>{children} </WebsocketContext.Provider>
}



const useWebSocketConnection = () => {
    const context = useContext(WebsocketContext);
    if(!context){
        throw new Error("Context not used inside the Provider")
    }
    return context;
}   

export default useWebSocketConnection;