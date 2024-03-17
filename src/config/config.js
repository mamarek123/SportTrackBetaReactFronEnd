let config = {};

if (process.env.NODE_ENV === 'production') {
    config = require('./production.json');
} else {
    config = require('./development.json');
}

export default config;
