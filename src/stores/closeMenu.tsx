import React, {createContext, useContext, ReactNode} from 'react'

import {invalidVoidAction} from '../helpers/invalidVoidAction'


export interface CloseMenu {
	(): void
}


export const CloseMenuContext = createContext(invalidVoidAction)

export interface CloseMenuProviderProps {
	close(): void
	children: ReactNode
}

export function CloseMenuProvider(props: CloseMenuProviderProps) {
	const {close, children} = props

	return (
		<CloseMenuContext.Provider value={close}>
			{children}
		</CloseMenuContext.Provider>
	)
}

export function useCloseMenu(): CloseMenu {
	return useContext(CloseMenuContext)
}
