//P:/CDMX010-data-lovers-master/readmes     P:/SCL017-card-validation-master/README.md   ../README.md
const { mdLinks } = require('./index.js');
mdLinks("../README.md", { validate: true })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });