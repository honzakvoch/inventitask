import {MenuItem} from '@material-ui/core'
import React, {ReactElement, forwardRef, Ref, useCallback} from 'react'

import {UnitOfTemperature} from '../../stores/weather'
import {userFriendlyUnitOfTemperatureName} from '../../helpers/userFriendlyNames'
import {usePreferences, usePreferencesDispatch} from '../../stores/preferences'
import {useCloseMenu} from '../../stores/closeMenu'


export interface UnitMenuItemProps {
	unit: UnitOfTemperature
}

function _UnitMenuItem(props: UnitMenuItemProps, ref: Ref<any>): ReactElement {
	const {unit} = props
	const name = userFriendlyUnitOfTemperatureName(unit)
	const {temperatureUnit} = usePreferences()
	const dispatchPreferencesAction = usePreferencesDispatch()
	const closeMenu = useCloseMenu()

	const selectUnit = useCallback(() => {
		dispatchPreferencesAction({type: 'setTemperatureUnit', unit})
		closeMenu()
	}, [closeMenu, dispatchPreferencesAction, unit])

	const isSelected = temperatureUnit === unit

	return <MenuItem ref={ref} onClick={selectUnit} selected={isSelected}>{name} ({unit})</MenuItem>
}

const UnitMenuItem = forwardRef(_UnitMenuItem)
export {UnitMenuItem}
