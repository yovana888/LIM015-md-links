const chalk = require('chalk'); // libreria para colores
const help = chalk.green(`
---------------Valid Arguments -----------------
md-links <path-to-file>
md-links <path-to-file> --validate --stats
md-links <path-to-file> --v --s
md-links <path-to-file> --validate
md-links <path-to-file> --stats
------------------------------------------------
`);

const rptaTable = (links) => {
    console.table(links);
}

const rptaError = (err) => {
    console.log(chalk.red.bold(err));
}

module.exports = {
    help,
    chalk,
    rptaTable,
    rptaError
}