export const years = (function () {
    return () => {
        const years = []
        for (var i = 0; i < 200; i++) {
            years.push(1900 + i)
        }
        return years || []
    }
})()

// const previousDays = [...Array(4).keys()].map(day => {
// return <div key={-day}>{day + 1}</div>;
// });

/* const previousDays = [...Array(4).keys()].map(day =>
({
    date: moment(date).format(), day: {
        small: namesSmall[date.getDay()],
        lagre: namesLarge[date.getDay()],
    }
})    ); */