export const uvLevel = (uvLevel) => {
    if (uvLevel < 3) {
        return {level: 'Low', color: 'powderblue'}
    } else if (uvLevel < 6) {
        return {level: 'Med', color: 'gold'}
    } else if (uvLevel < 8) {
        return {level: 'High', color: 'darkorange'}
    } else {
        return {level: 'V High', color: 'red'}
    }
}