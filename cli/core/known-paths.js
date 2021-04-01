const Path = require('path');

/** The root folder of the project */
const root = Path.join(__dirname, '../..');

/** The src folder of the project */
const src = Path.join(root, 'src');

/** The transpilation output folder */
const dist = Path.join(root, 'dist');

module.exports = {
    src,
    root,
    dist,
    client: mapClientPaths()
};

/** Creates the client paths mapping */
function mapClientPaths() {
    const root = Path.join(src, 'client');
    return { root }
}