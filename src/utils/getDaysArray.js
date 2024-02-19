import moment from "moment";

export const getDaysArray = (function () {
    const namesSmall = Object.freeze(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
    const namesLarge = Object.freeze(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
    return (year, month) => {
        const monthIndex = month - 1
        const date = new Date(year, monthIndex, 1);
        const result = [];
        while (date.getMonth() == monthIndex) {
            result.push({
                date: moment(date).format(), day: {
                    small: namesSmall[date.getDay()],
                    lagre: namesLarge[date.getDay()],
                }
            });
            date.setDate(date.getDate() + 1);
        }
        [...Array(new Date(result[0].date).getDay()).keys()].map(day => result.unshift({
            date: null,
            day: {
                small: null,
                lagre: null,
            }
        }));

        return result;
    }
})();