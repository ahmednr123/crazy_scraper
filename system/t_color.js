const t_color = {};

t_color.Reset = "\x1b[0m"
t_color.Bright = "\x1b[1m"
t_color.Dim = "\x1b[2m"
t_color.Underscore = "\x1b[4m"
t_color.Blink = "\x1b[5m"
t_color.Reverse = "\x1b[7m"
t_color.Hidden = "\x1b[8m"

t_color.FgBlack = "\x1b[30m"
t_color.FgRed = "\x1b[31m"
t_color.FgGreen = "\x1b[32m"
t_color.FgYellow = "\x1b[33m"
t_color.FgBlue = "\x1b[34m"
t_color.FgMagenta = "\x1b[35m"
t_color.FgCyan = "\x1b[36m"
t_color.FgWhite = "\x1b[37m"

t_color.BgBlack = "\x1b[40m"
t_color.BgRed = "\x1b[41m"
t_color.BgGreen = "\x1b[42m"
t_color.BgYellow = "\x1b[43m"
t_color.BgBlue = "\x1b[44m"
t_color.BgMagenta = "\x1b[45m"
t_color.BgCyan = "\x1b[46m"
t_color.BgWhite = "\x1b[47m"

t_color.makeFont = (color) => {
    return t_color['Fg' + color] + '%s' + t_color.Reset;
}

t_color.makeBackground = (color) => {
    return t_color['Bg' + color] + '%s' + t_color.Reset;
}

t_color.make = (Color) => {
    if (!Color) return t_color['FgWhite'] + '%s' + t_color.Reset;

    return (Color.Font ? t_color['Fg' + Color.Font] : '') + (Color.Background ? t_color['Bg' + Color.Background] : '') + '%s' + t_color.Reset;
}

module.exports = t_color;