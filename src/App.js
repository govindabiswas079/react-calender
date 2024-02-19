import React, { Fragment, useState } from 'react'
import { Box, useTheme } from '@mui/material';
import { GlobalStyles } from "./themes/globalStyles";
import { ReactDatePicker, } from './component/ReactDatePicker';
import { ReactDateRangePicker, } from './component/ReactDateRangePicker';
import moment from 'moment';

const App = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState();

  return (
    <Fragment>
      <GlobalStyles theme={theme} />
      <Box sx={{ height: "100vh", alignItems: "center", justifyContent: "center", gap: "10px", display: "flex", flexDirection: "row", width: "100%" }}>
        <ReactDatePicker
          // weekOff={true}
          // holidays={['2024-02-20T21:38:27+05:30', '2024-02-23T18:38:27+05:30', '2024-02-28T18:38:27+05:30']}
          disablePast={true}
          disableFuture={false}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date)
            // alert(moment(date).format("DD/MM/yyyy"))
          }}
        />
        <ReactDateRangePicker
          // weekOff={true}
          // holidays={['2024-02-20T21:38:27+05:30', '2024-02-23T18:38:27+05:30', '2024-02-28T18:38:27+05:30']}
          disablePast={false}
          disableFuture={true}
          selectedDate={selectedDate}
          onSelectDate={([fromDate, toDate]) => {
            console.log(moment(fromDate).format("DD/MM/yyyy"), moment(toDate).format("DD/MM/yyyy"))
            // setSelectedDate(date)
          }}
        />
      </Box>
    </Fragment>
  )
}

export default App