const cli = require('./system/cli');

let app = {}

app.init = () => {

    setTimeout(() => {
        cli.init();
    }, 50)

}

app.init();

module.exports = app;