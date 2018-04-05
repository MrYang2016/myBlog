module.exports = time => {
    let addZero = d => {
        if ((d + '').length === 1) {
            d = '0' + d
        }
        return d;
    };
    let d = new Date(parseInt(time));
    return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`;
};