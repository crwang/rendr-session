var BaseApp = require('rendr/shared/app');
Session = require('./models/session');

/**
 * Extend the `BaseApp` class and add in methods for accessing the session data.
 */
module.exports = BaseApp.extend({

    getSessionModel: function() {
        var cachedSessionModel = this.fetcher.modelStore.get('Session', 1);
        if (cachedSessionModel) {
            return cachedSessionModel;
        } else {
            // Then, let's pull the bootstrapped version from the middleware
            var session = this.get('session');
            session = session || {};
            session.id = 1; // make the id 1 for now.
            // Then, we convert it to model before we set it.
            var sessionModel = new Session(session, {
                app: this
            });
            return sessionModel;
        }
    },

    getSessionValue: function(key) {
        var model = this.getSessionModel();
        return model.get(key);
    },

    saveSession: function(newSessionData, callback) {
        var _this = this;

        this.getSessionModel().save(newSessionData, {
            success: function(model, response) {
                model.store();
                if (callback) {
                    callback(model);
                }
            }
        });
    }
});
