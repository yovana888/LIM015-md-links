//P:/CDMX010-data-lovers-master/readmes     ../README.md  ./readmes/extra  ./readmes
const { mdLinks } = require('./md-links.js');
mdLinks("./readmes/extra2", { validate: true })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });