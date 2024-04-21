const cors = require('cors');

const corsMiddleware = cors({
    credentials: true,
    origin: 'http://localhost:4000'
});

module.exports = corsMiddleware;
