const assert = require('chai').assert;
const request = require('request');
const app = require('../server');

describe('Server', function(){
  before(function(done){
    this.port = 9876;
    this.server = app.listen(this.port, function(error, result){
      if(error){return done(error);}
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    });
  });

  after(function(){
    this.server.close();
  });

  it('should exist', function(){
    assert(app);
  });

  describe('GET /', function(){
    it('should return 200 status', function(done){
      this.request.get('/', function(error, response){
        if(error){done(error);}
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
  describe('GET /api/foods', function(){
    beforeEach(function(){
      app.locals.foods = {
        name: 'Banana',
        calories: '100'
      }
    });

    it('should return a 404 if resposne is not found', function(done){
      this.request.get('/api/foods', function(error, response){
        if(error){ done(error) };
        assert.equal(response.statusCode, 404);
        done();
      });
    });
  });
});
