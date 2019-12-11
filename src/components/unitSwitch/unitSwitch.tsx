import {IconButton, Menu, Tooltip} from '@material-ui/core'
import {FormatUnderlined} from '@material-ui/icons'
import React, {MouseEvent as ReactMouseEvent, ReactElement, useState, useCallback} from 'react'

import {CloseMenuProvider} from '../../stores/closeMenu'
import {UnitOfTemperature} from '../../stores/weather'
import {UnitMenuItem} from './unitMenuItem'


export function UnitSwitch(): ReactElement {
	const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null)
	const menuOpen = !!anchorEl

	const openMenu = useCallback((event: ReactMouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}, [])

	const closeMenu = useCallback(() => {
		setAnchorEl(null)
	}, [])

	return (
		<div>
			<Tooltip title={label}>
				<IconButton
					aria-haspopup
					aria-label={label}
					aria-controls='menu-appbar'
					color='inherit'
					onClick={openMenu}
				>
					<FormatUnderlined />
				</IconButton>
			</Tooltip>

			<CloseMenuProvider close={closeMenu}>
				<Menu
					keepMounted
					open={menuOpen}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					onClose={closeMenu}
					anchorEl={anchorEl}
				>
					{Object.values(UnitOfTemperature).map(u => (
						<UnitMenuItem key={u} unit={u} />
					))}
				</Menu>
			</CloseMenuProvider>
		</div>
	)
}

const label = 'Open menu to select your preferred temperature unit'
