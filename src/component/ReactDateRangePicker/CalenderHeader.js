import React, { Fragment, } from 'react'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { ArrowBackRounded, ArrowForwardRounded, ArrowDropDownRounded } from '@mui/icons-material';
import moment from 'moment';
import { monthLarge } from '../../utils/monthList'

const CalenderHeader = ({ disablePast, disableFuture, currentYear, setIsYears, isYears, currentMonth, setCurrentYear, setCurrentMonth }) => {
    const { palette: { text, divider, }, } = useTheme();

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", borderBottom: `1px solid ${divider}` }}>
                <IconButton
                    disabled={disablePast && moment(/* currentDate */).format("M/yyyy") === `${currentMonth}/${currentYear}`}
                    onClick={() => {
                        if (currentMonth === 1) {
                            setCurrentYear(currentYear - 1)
                            setCurrentMonth(12)
                            return
                        } else {
                            return setCurrentMonth(currentMonth - 1)
                        }
                    }}
                    sx={{ visibility: isYears ? "hidden" : "visible", transition: "ease-in-out 0.3s" }}>
                    <ArrowBackRounded fontSize="small" sx={{
                        color:
                            disablePast && moment(/* currentDate */).format("M/yyyy") === `${currentMonth}/${currentYear}` ?
                                text?.grey
                                :
                                text?.black
                    }} />
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}>
                    <Typography onClick={() => { }} variant='h6' sx={{ userSelect: "none", cursor: "pointer" }}>{monthLarge.find((item) => item?.month === currentMonth)?.name},{" "}</Typography>
                    <Typography onClick={() => { setIsYears(!isYears) }} variant='h6' sx={{ userSelect: "none", cursor: "pointer" }}>{currentYear}</Typography>
                    <Typography onClick={() => { setIsYears(!isYears) }} variant='h6' sx={{ userSelect: "none", cursor: "pointer", }}>
                        <ArrowDropDownRounded sx={{ transform: `rotate(${isYears ? -180 : 0}deg)`, transition: "ease-in-out 0.3s" }} />
                    </Typography>
                </Box>
                <IconButton
                    disabled={disableFuture && moment(/* currentDate */).format("M/yyyy") === `${currentMonth}/${currentYear}`}
                    onClick={() => {
                        if (currentMonth === 12) {
                            setCurrentYear(currentYear + 1)
                            setCurrentMonth(1)
                            return
                        } else {
                            return setCurrentMonth(currentMonth + 1)
                        }
                    }}
                    sx={{ visibility: isYears ? "hidden" : "visible", transition: "ease-in-out 0.3s" }}>
                    <ArrowForwardRounded fontSize="small" sx={{
                        color:
                            disableFuture && moment(/* currentDate */).format("M/yyyy") === `${currentMonth}/${currentYear}` ?
                                text?.grey
                                :
                                text?.black
                    }} />
                </IconButton>
            </Box>
        </Fragment>
    )
}

CalenderHeader.defaultProps = {
    disablePast: false,
    disableFuture: false,
    currentMonth: Number(moment().format("MM")),
    currentYear: Number(moment().format("yyyy")),
    setCurrentYear: () => { },
    setIsYears: () => { },
    setCurrentMonth: () => { },
    isYears: false,

}
export default CalenderHeader