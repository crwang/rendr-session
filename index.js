var sessionController = require('./server/middleware/sessionsController'),
    initSession = require('./server/middleware/initSession');

module.exports = rendrSession;

function rendrSession(rendrExpressApp) {

    rendrExpressApp.get('/sessions/:id', sessionController.get);
    rendrExpressApp.put('/sessions/:id', sessionController.put);
    // for now we just use put as the same since that's what backbone is sending back for the patch.
    rendrExpressApp.patch('/sessions/:id', sessionController.put);
    rendrExpressApp.use(initSession());
}
