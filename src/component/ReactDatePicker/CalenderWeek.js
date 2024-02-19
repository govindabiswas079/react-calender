import React, { Fragment } from 'react'
import { Box, Typography, useTheme } from '@mui/material'

const CalenderWeek = () => {
    const { palette: { divider, }, } = useTheme();

    return (
        <Fragment>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 0.1fr)", alignItems: "center", gap: "5px", borderBottom: `1px solid ${divider}` }}>
                {weeks?.map((value, index) => {
                    return (
                        <Box key={index} sx={{ width: "35px", height: "35px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "100%", cursor: "pointer" }}>
                            <Typography variant='subtitle1' sx={{ userSelect: "none" }}>
                                {value}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        </Fragment>
    )
}

export default CalenderWeek;
const weeks = ["S", "M", "T", "W", "T", "F", "S"]