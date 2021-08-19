//P:/CDMX010-data-lovers-master/readmes     ../README.md  ./readmes/extra  ./readmes
const { mdLinks } = require('./md-links.js');
mdLinks("./readmes/README2.md", { validate: false })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });