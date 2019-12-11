import React, {ReactElement, ReactNode} from 'react'
import {Grid} from '@material-ui/core'


export interface ContainerProps {
    children: ReactNode
    className?: string
}

export function Container(props: ContainerProps): ReactElement {
    const {children, className} = props

    return (
        <Grid container className={className} justify='center'>
            <Grid item xs={10} md={6} lg={5}>
                {children}
            </Grid>
        </Grid>
    )
}
