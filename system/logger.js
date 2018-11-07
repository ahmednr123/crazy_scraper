const fs = require('fs');
const t_color = require('./t_color')
const sys_log_file = fs.createWriteStream(__dirname + '/logs/system.log', {
    flags: 'a+',
    AutoClose: true
});

Array.prototype.isArray = true;

const logger = {}

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

logger.web_log = (log_data, url, Color) => {
    log_data = "(URL: " + url + ") " + log_data
    logger.log(log_data, Color);
}

logger.log_arr = (helper, log_data) => {
    if (!log_data.isArray) {
        logger.log('[DEBUG] log_arr() : Expected Array, but found ' + typeof(log_data), {Font: 'Red',Background: 'White'});
        return;
    }

    for (let i = 0; i < log_data.length; i++){
        logger.log(helper + " " + log_data[i]);
    }
}

logger.log = (log_data, Color) => {
    if (typeof(log_data) != 'string') {
        logger.log('[DEBUG] log() : Expected String, but found ' + typeof(log_data), {Font: 'Red',Background: 'White'});
        return;
    }

    log_data = timeStamp() + log_data;

    console.log(t_color.make(Color), log_data);

    logger.log_raw(log_data, false);
}

logger.log_raw = (log_data, time_stamp) => {
    if (time_stamp)
        log_data = timeStamp() + log_data;
    sys_log_file.write(log_data + '\n');
}

module.exports = logger;