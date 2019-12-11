import React, {useState, useEffect, ReactElement} from 'react'


interface LocalClockProps {
	now?(): Date
	timezone: string
}

export function LocalClock(props: LocalClockProps): ReactElement {
	const {timezone, now = () => new Date()} = props
	const [time, setTime] = useState(() => currentTime(timezone, now))

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(currentTime(timezone, now))
		}, 250)

		return () => { clearInterval(interval) }
	}, [timezone, now])

	return <>{time}</>
}

function currentTime(timezone: string, now: () => Date): string {
	try {
		return timezone ? now().toLocaleTimeString(undefined, {timeZone: timezone}) : 'current time unknown'
	} catch {
		return 'current time unknown'
	}
}
