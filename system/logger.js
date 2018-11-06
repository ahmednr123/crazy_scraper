const fs = require('fs');
const t_color = require('./t_color')
const sys_log_file = fs.createWriteStream('./logs/system.log', {
    flags: 'a',
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

logger.log_arr = (log_data) => {
    if (!log_data.isArray) {
        logger.log('[DEBUG] log_arr() : Expected Array, but found ' + typeof(log_data), {Font: 'Red',Background: 'White'});
        return;
    }

    for (let line of log_data) {
        line = timeStamp() + line;
        logger.log(line);
    }
}

logger.log = (log_data, Color) => {
    if (typeof(log_data) != 'string') {
        logger.log('[DEBUG] log() : Expected String, but found ' + typeof(log_data), {Font: 'Red',Background: 'White'});
        return;
    }

    log_data = timeStamp() + log_data;
    t_color.make(Color.Font);

    if (Color.Font && Color.Background)
        console.log(t_color.make(Color.Font, Color.Background), log_data);
    else if (Color.Font)
        console.log(t_color.makeFont(Color.Font), log_data);
    else if (Color.Background)
        console.log(t_color.makeBackground(Color.Background), log_data);
    else
        console.log(timeStamp() + log_data);

    logger.log_raw(log_data, false);
}

logger.log_raw = (log_data, time_stamp) => {
    if (time_stamp)
        log_data = timeStamp() + log_data;
    sys_log_file.write(log_data + '\n');
}

module.exports = logger;