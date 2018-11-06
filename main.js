const cli = require('./cli');

let app = {}

app.init = () => {

    setTimeout(() => {
        cli.init();
    }, 50)

}

app.init();

module.exports = app;