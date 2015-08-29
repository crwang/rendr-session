var should = require('should'),
    Sessions = require('../../../server/middleware/sessionsController');
var httpMocks = require('node-mocks-http');

describe('Sessions Controller', function() {
    var request,
        response;

    context('POST', function() {
        var defaultModelAttrs;

        beforeEach(function() {
            request = httpMocks.createRequest({
                method: 'POST',
                url: '/sessions/2',
                params: {
                    id: 2,
                    foo: 'bar'
                }
            });
            request.session = {};
            response = httpMocks.createResponse();
        });

        it('should have an unauthorized response if id is not 1', function() {
            Sessions.put(request, response);
            response.statusCode.should.be.equal(401);
        });

        it('should have a valid post request', function() {
            request = httpMocks.createRequest({
                method: 'POST',
                url: '/sessions/1',
                params: {
                    id: 1,
                    foo: 'bar'
                }
            });
            request.session = {};

            Sessions.put(request, response);
            var data = JSON.parse(response._getData());

            response.statusCode.should.be.equal(200);
        });
    });

    context('GET', function() {

        it('should have a valid response', function() {
            request = httpMocks.createRequest({
                method: 'GET',
                url: '/sessions/1',
                params: {
                    id: 1,
                    foo: 'bar'
                }
            });
            request.session = {
                data: {
                    foo: 'bar'
                }
            };
            response = httpMocks.createResponse();
            Sessions.get(request, response);
            response.statusCode.should.be.equal(200);
            var data = JSON.parse(response._getData());

            data.should.eql(request.session.data);
        });
    });
});
