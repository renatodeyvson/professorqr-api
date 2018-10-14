'use strict';

const express = require('express');
const app = express();
const router = require('./router');

router(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('on %d', port);
});