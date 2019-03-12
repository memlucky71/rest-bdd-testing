/**
 * Created by mohammad on 3/12/2019 AD.
 */

const http = require('http');
const mockserver = require('mockserver');


before(function() {
    http.createServer(mockserver(`${__dirname}/mocks`)).listen(9001);
});
