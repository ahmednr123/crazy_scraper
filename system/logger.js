const fs = require('fs');

// https://stackoverflow.com/a/16426519
function timeStamp() {

    let date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return "[" + day + "-" + month + "-" + year + " " + hour + ":" + min + ":" + sec + "] ";

}

function log(log_data) {
    log_data = timeStamp() + log_data;

}

function log_raw() {

}