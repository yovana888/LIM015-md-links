const { validatePath, getMdlinksDetailed, getMdLinks } = require('./functions.js');

const mdLinks = (path, option = { validate: false }) => new Promise((resolve, reject) => {
    const pathValid = validatePath(path);
    if (pathValid != 'error') {
        switch (option.validate) {
            case true:
                { resolve(getMdlinksDetailed(pathValid)); break; }
            case false:
                { resolve(getMdLinks(pathValid)); break; }
            default:
                { reject('Error [X]: The second argument only allows a named parameter eg: `{validate: true}`, alternatively it can be false or not to place the argument') }
        }
    } else {
        reject('Error [X]: The path entered does not exist')
    }
});

//P:/CDMX010-data-lovers-master/readmes     P:/SCL017-card-validation-master/README.md   ../README.md
mdLinks("P:/CDMX010-data-lovers-master/readmes", { validate: false })
    .then(response => {
        response.map((response) => {
            console.log(response);
        })
    })
    .catch(error => {
        console.log(error);
    });