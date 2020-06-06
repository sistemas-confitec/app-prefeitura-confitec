export function pad(n) {
    return (n < 10) ? ("0" + n) : n;
};

export function splitDate(date) {
    const jsDate = new Date(date);
    return {
        day: jsDate.getDate(),
        month: jsDate.getMonth()+1,
        year: jsDate.getFullYear(),
        hour: jsDate.getHours(),
        minute: jsDate.getMinutes(),
        second: jsDate.getSeconds(),
    };
};

