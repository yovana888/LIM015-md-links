const chalk = require('chalk'); // libreria para colores
const { mdLinks } = require('./index.js');
const help = chalk.green(`
------------- Opciones Validas :D --------------
md-links <path-to-file>
md-links <path-to-file> --validate --stats
md-links <path-to-file> --v --s
md-links <path-to-file> --validate
md-links <path-to-file> --v
md-links <path-to-file> --stats
md-links <path-to-file> --s
------------------------------------------------
`);

const rptaTable = (ObjLinks, printStatus) => {
    console.log(chalk.green(`\n*********************************************   LINKS ENCONTRADOS  ****************************************\n`));
    ObjLinks.map((obj) => {
        console.log(chalk.magenta.bold('File: ') + obj.file);
        console.log(chalk.magenta.bold('Url: ') + obj.href);
        console.log(chalk.magenta.bold('Text: ') + obj.text);
        if (printStatus) {
            let status = (obj.status === 200) ? chalk.yellow.bold(200) : chalk.red.bold(obj.status);
            console.log(chalk.magenta.bold('CodeStatus: ') + status);
            console.log(chalk.magenta.bold('Status: ') + obj.message);
        }
        console.log(chalk.green(`----------------------------------------------------------------------------------------------------------\n`));
    });
}

const rptaError = (err) => {
    console.log(chalk.red.bold(err));
}

const errorOptions = (msj) => {
    rptaError(msj);
    console.log(help);
}

const stats = (ObjLinks) => {
    const totalLinks = ObjLinks.length;
    const arrayLinks = ObjLinks.map((link) => link.href);
    const newSet = new Set(arrayLinks);
    const uniqueLinks = [...newSet].length;
    return { Total: totalLinks, Unique: uniqueLinks };
};

const validateAndStats = (ObjLinks) => {
    const totalLinks = ObjLinks.length;
    const arrayLinks = ObjLinks.map((link) => link.href);
    const newSet = new Set(arrayLinks);
    const uniqueLinks = [...newSet].length;
    let brokenLinks = 0;
    let notFound = 0;

    ObjLinks.map((link) => {
        if (link.status === 500) brokenLinks++;
        if (link.status === 404) notFound++;
    });
    return { Total: totalLinks, Unique: uniqueLinks, Broken: brokenLinks, NotFound: notFound };
};



const argvL1 = (argument) => {
    if (argument === '--help') {
        console.log(help);
    } else {
        const path = argument;
        mdLinks(path, { validate: false })
            .then((links) => rptaTable(links, false))
            .catch(error => rptaError(error));
    }
}

const argvL2 = (pathInput, option) => {
    const path = pathInput;
    if (option === '--validate' || option === '--v') {
        mdLinks(path, { validate: true })
            .then((links) => rptaTable(links, true))
            .catch((error) => rptaError(error));
    } else if (option === '--stats' || option === '--s') {
        mdLinks(path, { validate: true })
            .then((response) => console.table(stats(response)))
            .catch((error) => rptaError(error));
    } else {
        rptaError('Opcion inválida');
        console.log(help);
    }
}

const argvL3 = (pathInput, options) => {
    if ((options.includes('--stats') && options.includes('--validate')) || (options.includes('--s') && options.includes('--v'))) {
        const path = pathInput;
        mdLinks(path, { validate: true })
            .then((response) => console.table(validateAndStats(response)))
            .catch((error) => rptaError(error));
    } else {
        rptaError('Opcion inválida');
        console.log(help);
    }
}


module.exports = {
    argvL1,
    argvL2,
    argvL3,
    errorOptions
}