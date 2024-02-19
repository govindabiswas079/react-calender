import React, { Fragment, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import moment from 'moment';
import { getDaysArray } from '../../utils/getDaysArray'

const CalenderDays = ({ currentDate, disablePast, disableFuture, weekOff, holidays, currentMonth, setCurrentYear, currentYear, setCurrentMonth, onChangeDate, }) => {
    const { palette: { text, primary, } } = useTheme();
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const disabledDateText = (date) => {
        let style = {}
        if (moment(date).format("DD/MM/yyyy") === moment(currentDate).format("DD/MM/yyyy")) {
            style = { color: text?.white, cursor: "pointer" }
        } else if (disablePast && moment(date).format("MM/yyyy") < moment().format("MM/yyyy") && moment(date).format("yyyy") === moment().format("yyyy")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (disablePast && moment(date).format("yyyy") < moment().format("yyyy")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (disablePast && moment(date).format("MM/yyyy") === moment().format("MM/yyyy") && moment(date).format("DD") < moment().format("DD")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (disableFuture && moment(date).format("MM/yyyy") > moment().format("MM/yyyy") && moment(date).format("yyyy") === moment().format("yyyy")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (disableFuture && moment(date).format("yyyy") > moment().format("yyyy")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (disableFuture && moment(date).format("MM/yyyy") === moment().format("MM/yyyy") && moment(date).format("DD") > moment().format("DD")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (weekOff && moment(date).day() === 0) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (holidays?.map((item, i) => moment(item)?.format("DD/MM/yyyy"))?.includes(moment(date).format("DD/MM/yyyy"))) {
            style = { color: text?.grey, cursor: "auto" }
        }

        else {
            style = { color: text?.black, cursor: "pointer" }
        }
        return style;
    };
    const minSwipeDistance = 50
    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            if (currentMonth === 12) {
                setCurrentYear(currentYear + 1)
                setCurrentMonth(1)
                return
            } else {
                return setCurrentMonth(currentMonth + 1)
            }
        } else if (isRightSwipe) {
            if (currentMonth === 1) {
                setCurrentYear(currentYear - 1)
                setCurrentMonth(12)
                return
            } else {
                return setCurrentMonth(currentMonth - 1)
            }
        }

    }

    return (
        <Fragment>
            <Box
                onTouchStart={(event) => { onTouchStart(event) }}
                onTouchMove={(event) => { onTouchMove(event) }}
                onTouchEnd={(event) => { onTouchEnd(event) }}
                sx={{
                    pt: 1,
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 0.1fr)",
                    alignItems: "center",
                    gap: "5px",
                    flexWrap: "wrap",
                    transition: "ease-in-out 1s",
                    left: 0
                }}>
                {getDaysArray(currentYear, currentMonth)?.map((value, index) => {
                    return (
                        <Box key={index} onClick={() => {
                            if (value?.date) {
                                if (disabledDateText(value?.date)?.cursor === "auto") return
                                onChangeDate(value?.date)
                            }
                        }} sx={{
                            width: "35px", height: "35px",
                            backgroundColor:
                                moment(value?.date).format("DD/MM/yyyy") === moment(currentDate).format("DD/MM/yyyy") ?
                                    primary?.main
                                    :
                                    "transparent",
                            border: `1px solid ${moment(value?.date).format("DD/MM/yyyy") === moment().format("DD/MM/yyyy") ? primary?.main : "transparent"}`,
                            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "100%",
                            cursor: value?.date ? disabledDateText(value?.date)?.cursor : "auto",
                            transition: 'ease-in-out 0.3s'
                        }}>
                            <Typography variant='subtitle1' sx={{
                                color: disabledDateText(value?.date)?.color,
                                userSelect: "none",
                                transition: 'ease-in-out 0.3s'
                            }}>
                                {value?.date && moment(value?.date).format("DD")}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        </Fragment>
    )
}

CalenderDays.defaultProps = {
    currentDate: moment().format(),
    disablePast: false,
    disableFuture: false,
    weekOff: false,
    holidays: [],
    currentMonth: Number(moment().format("MM")),
    currentYear: Number(moment().format("yyyy")),
    setCurrentYear: () => { },
    setCurrentMonth: () => { },
    onChangeDate: () => { },
}
export default CalenderDays