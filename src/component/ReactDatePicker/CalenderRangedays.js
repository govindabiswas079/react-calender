import React, { Fragment, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import moment from 'moment';
import { getDaysArray } from '../utils/getDaysArray'
import { getDaysBetween } from '../utils/getDaysBetween';

const CalenderRangedays = ({ currentDate, disablePast, disableFuture, weekOff, holidays, currentMonth, setCurrentYear, currentYear, setCurrentMonth, onChangeDate, }) => {
    const { palette: { text, primary, } } = useTheme();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [selectedDate, setSelectedDate] = useState([])

    const disabledDateText = (date) => {
        let style = {}
        if (moment(date).format("DD/MM/yyyy") === moment(currentDate).format("DD/MM/yyyy")) {
            style = { color: text?.white, cursor: "pointer" }
        } else if (disablePast && moment(date).format("yyyy") < moment().format("yyyy")) {
            style = { color: text?.grey, cursor: "auto" }
        } else if (disablePast && moment(date).format("MM/yyyy") < moment().format("MM/yyyy") && moment(date).format("yyyy") === moment().format("yyyy")) {
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
        } else if (moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[0]).format("DD/MM/yyyy") === moment(date).format("DD/MM/yyyy")) {
            style = { color: text?.white, cursor: "pointer" }
        } else if (moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])?.length - 1]).format("DD/MM/yyyy") === moment(date).format("DD/MM/yyyy")) {
            style = { color: text?.white, cursor: "pointer" }
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
                sx={{ pt: 1, display: "grid", gridTemplateColumns: "repeat(7, 0fr)", alignItems: "center", gap: "0px", rowGap: '5px', flexWrap: "wrap", transition: "ease-in-out 1s", left: 0 }}>
                {getDaysArray(currentYear, currentMonth)?.map((value, index) => {
                    return (
                        <Box key={index} onClick={() => {
                            if (value?.date) {
                                if (disabledDateText(value?.date)?.cursor === "auto") return
                                onChangeDate(value?.date)

                                if (selectedDate?.length === 2) {
                                    setSelectedDate([value?.date])
                                } else {
                                    setSelectedDate([...selectedDate, value?.date])
                                }
                            }
                        }} sx={{
                            width: "40px",
                            height: "40px",
                            backgroundColor:
                                getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])?.map((value, _) => moment(value).format("DD/MM/yyyy"))?.includes(moment(value?.date).format("DD/MM/yyyy")) ?
                                    primary?.lighter
                                    :
                                    "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius:
                                moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[0]).format("DD/MM/yyyy") === moment(value?.date).format("DD/MM/yyyy") ?
                                    "100% 0px 0px 100%"
                                    :
                                    moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])?.length - 1]).format("DD/MM/yyyy") === moment(value?.date).format("DD/MM/yyyy") ?
                                        "0px 100% 100% 0px"
                                        :
                                        "0px 0px 0px 0px"
                            ,
                            cursor: value?.date ? disabledDateText(value?.date)?.cursor : "auto",
                            transition: 'ease-in-out 0.3s'
                        }}>
                            <Typography variant='subtitle1' sx={{
                                /* color:
                                    moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[0]).format("DD/MM/yyyy") === moment(value?.date).format("DD/MM/yyyy") ?
                                        text?.white
                                        :
                                        moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])?.length - 1]).format("DD/MM/yyyy") === moment(value?.date).format("DD/MM/yyyy") ?
                                            text?.white
                                            :
                                            text?.black, */
                                color: disabledDateText(value?.date),
                                border: `1px solid ${moment(value?.date).format("DD/MM/yyyy") === moment().format("DD/MM/yyyy") ? primary?.main : "transparent"}`,
                                width: "35px",
                                height: "35px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "100%",
                                backgroundColor:
                                    moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[0]).format("DD/MM/yyyy") === moment(value?.date).format("DD/MM/yyyy") ?
                                        primary?.main
                                        :
                                        moment(getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])[getDaysBetween(selectedDate[0], selectedDate[selectedDate?.length - 1])?.length - 1]).format("DD/MM/yyyy") === moment(value?.date).format("DD/MM/yyyy") ?
                                            primary?.main
                                            :
                                            "transparent",
                                userSelect: "none",
                                transition: 'ease-in-out 0.3s'
                            }}>
                                {value?.date && moment(value?.date).format("DD")}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        </Fragment >
    )
}

CalenderRangedays.defaultProps = {
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
export default CalenderRangedays;


const rangeSelected = [
    /* "2024-02-13T00:00:00+05:30",
    "2024-02-14T00:00:00+05:30",
    "2024-02-15T00:00:00+05:30",
    "2024-02-16T00:00:00+05:30",
    "2024-02-17T00:00:00+05:30",
    "2024-02-18T00:00:00+05:30",
    "2024-02-19T00:00:00+05:30",
    "2024-02-20T00:00:00+05:30",
    "2024-02-21T00:00:00+05:30",
    "2024-02-22T00:00:00+05:30",
    "2024-02-23T00:00:00+05:30",
    "2024-02-24T00:00:00+05:30",
    "2024-02-25T00:00:00+05:30",
    "2024-02-26T00:00:00+05:30",
    "2024-02-27T00:00:00+05:30",
    "2024-02-28T00:00:00+05:30",
    "2024-02-29T00:00:00+05:30",
    "2024-03-01T00:00:00+05:30",
    "2024-03-02T00:00:00+05:30",
    "2024-03-03T00:00:00+05:30",
    "2024-03-04T00:00:00+05:30",
    "2024-03-05T00:00:00+05:30" */
]