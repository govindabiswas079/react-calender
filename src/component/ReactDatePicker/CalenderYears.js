import React, { Fragment, } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import moment from 'moment';
import { years } from '../../utils/yearsList'

const CalenderYears = ({ disablePast, disableFuture, setCurrentYear, setIsYears, isYears, currentYear, }) => {
    const { palette: { text, primary, common }, shape: { borderRadius } } = useTheme();

    return (
        <Fragment>
            <Box sx={{ height: "300px", p: 1, overflow: "auto", display: "grid", gridTemplateColumns: "repeat(4, 5fr)", justifyContent: "space-between", alignItems: "center", gap: "0px", width: "100%" }}>
                {years()?.map((value, index) => {

                    return (
                        <Box key={index} onClick={() => {
                            if (disablePast && Number(value) < Number(moment()?.format("YYYY"))) return
                            if (disableFuture && Number(value) > Number(moment()?.format("YYYY"))) return
                            // onChangeDate(moment(`${value}${moment(currentDate).format("MM")}${moment(currentDate).format("DD")}`, "YYYYMMDD").format());
                            setCurrentYear(value)
                            setIsYears(!isYears)
                        }}
                            sx={{
                                backgroundColor: currentYear === value ?
                                    primary?.main
                                    :
                                    "transparent",
                                p: 1,
                                width: '100%',
                                borderRadius: `${borderRadius / 2}px`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "ease-in-out 0.3s",
                                cursor:
                                    disablePast && Number(value) < Number(moment()?.format("YYYY")) ?
                                        "auto"
                                        :
                                        disableFuture && Number(value) > Number(moment()?.format("YYYY")) ?
                                            "auto"
                                            :
                                            "pointer",
                            }}>
                            <Typography variant='h6'
                                sx={{
                                    color: currentYear === value ?
                                        common?.white
                                        :
                                        disablePast && Number(value) < Number(moment()?.format("YYYY")) ?
                                            text?.grey
                                            :
                                            disableFuture && Number(value) > Number(moment()?.format("YYYY")) ?
                                                text?.grey
                                                :
                                                common?.black,
                                    transition: "ease-in-out 0.3s"
                                }}>{value}</Typography>
                        </Box>
                    )
                })}
            </Box>
        </Fragment>
    )
}

CalenderYears.props = {
    disablePast: false,
    disableFuture: false,
    setCurrentYear: () => { },
    setIsYears: () => { },
    isYears: false,
    currentYear: Number(moment().format("yyyy")),
}
export default CalenderYears