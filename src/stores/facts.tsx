import React, {createContext, useContext, useReducer, useMemo, Dispatch, ReactNode} from 'react'

import {FactAPI} from '../apis/facts'
import {invalidVoidAction} from '../helpers/invalidVoidAction'


export interface FactsStore {
    fact: string
}

export type FactsAction =
    | {type: 'setFact', fact: string}

export interface FactsController {
    loadFactByCityName(cityName: string): void
}


export const FactsDispatcher = createContext<FactsController>({loadFactByCityName: invalidVoidAction})

export const FactsContext = createContext<FactsStore>({fact: ''})

export interface FactsProviderProps {
    api: FactAPI
    children: ReactNode
}

export function FactsProvider(props: FactsProviderProps) {
    const {api, children} = props
    const [facts, dispatchFactsAction] = useFactsReducer()
    const controller = useNewFactsController(api, dispatchFactsAction)

    return (
        <FactsContext.Provider value={facts}>
            <FactsDispatcher.Provider value={controller}>
                {children}
            </FactsDispatcher.Provider>
        </FactsContext.Provider>
    )
}

export function useFacts() {
    return useContext(FactsContext)
}

export function useFactsController() {
    return useContext(FactsDispatcher)
}

function useNewFactsController(api: FactAPI, dispatch: Dispatch<FactsAction>): FactsController {
    return useMemo<FactsController>(() => ({
        loadFactByCityName(cityName: string) {
            dispatch({type: 'setFact', fact: ''})
            if (!cityName) {
                return
            }

            api.fetchByCityName(cityName)
                .then(({fact}) => {
                    dispatch({type: 'setFact', fact})
                })
                .catch(err => {
                    console.error(err)
                })
        },
    }), [api, dispatch])
}

function useFactsReducer() {
    return useReducer(
        (state: FactsStore, action: FactsAction) => {
            switch (action.type) {
                case 'setFact': return {...state, fact: action.fact}
                default: return state
            }
        },
        {fact: ''}
    )
}
