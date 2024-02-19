import React, { Fragment, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import moment from 'moment';
import CalenderHeader from './CalenderHeader';
import CalenderYears from './CalenderYears';
import CalenderWeek from './CalenderWeek';
import CalenderDays from './CalenderDays';

const ReactDatePicker = ({ weekOff, holidays, disablePast, disableFuture, selectedDate, onSelectDate }) => {
    const { palette: { divider, common }, shape: { borderRadius } } = useTheme();
    const [currentDate, setCurrentDate] = useState(selectedDate ? moment(selectedDate).format() : moment().format());
    const [currentMonth, setCurrentMonth] = useState(Number(moment(currentDate).format("MM")));
    const [currentYear, setCurrentYear] = useState(Number(moment(currentDate).format("yyyy")))
    const [isYears, setIsYears] = useState(false);

    const onChangeDate = (date) => {
        onSelectDate(moment(date).format())
        setCurrentDate(moment(date).format())
    }

    return (
        <Fragment>
            <Box sx={{ backgroundColor: common?.white, p: 1, width: 300, height: "350px", border: `1px solid ${divider}`, borderRadius: `${borderRadius / 2}px` }}>
                <CalenderHeader
                    disablePast={disablePast}
                    disableFuture={disableFuture}
                    currentYear={currentYear}
                    isYears={isYears}
                    currentMonth={currentMonth}
                    setCurrentYear={setCurrentYear}
                    setCurrentMonth={setCurrentMonth}
                    setIsYears={setIsYears}
                />
                {isYears ?
                    <CalenderYears
                        disablePast={disablePast}
                        disableFuture={disableFuture}
                        setCurrentYear={setCurrentYear}
                        setIsYears={setIsYears}
                        isYears={isYears}
                        currentYear={currentYear}
                    />
                    :
                    <Fragment>
                        <CalenderWeek />
                        <CalenderDays
                            currentDate={currentDate}
                            disablePast={disablePast}
                            disableFuture={disableFuture}
                            weekOff={weekOff}
                            holidays={holidays}
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                            setCurrentYear={setCurrentYear}
                            setCurrentMonth={setCurrentMonth}
                            onChangeDate={onChangeDate}
                        />
                    </Fragment>
                }
            </Box >
        </Fragment >
    )
}

ReactDatePicker.defaultProps = {
    disablePast: false,
    disableFuture: false,
    selectedDate: null,
    onSelectDate: () => { },
    weekOff: false,
    holidays: []
}
export default ReactDatePicker;
