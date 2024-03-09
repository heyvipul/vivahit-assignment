//date.getTime return no seconds

//function to convert from no seconds to sec
export const convertDatetoUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000);
};

export const converUnixTimestamptoDate = (unixTimestamp) =>{
    const milisec = unixTimestamp * 1000;
    return new Date(milisec).toLocaleDateString();
}

export const createDate = (date,days,weeks,months,years)=>{
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7*weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);

    return newDate;
}
