var Base = require('rendr/shared/base/model');

module.exports = Base.extend({
    url: '/sessions/:id',
    api: 'session'
});
module.exports.id = 'Session';
