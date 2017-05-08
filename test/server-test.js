const assert = require('chai').assert;
const app = require('../server');
const request = require('request');

const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)

describe('Server', function(){
  before(function(done){
    this.port = 9876;
    this.server = app.listen(this.port, function(error, result){
      if(error){return done(error);}
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
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
  describe('GET /api/v1/foods', function(){
    beforeEach((done) => {
          database.raw('INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)', ['Banana', 100, new Date, new Date])
          .then(() => done())
    })

    afterEach((done) => {
      database.raw('TRUNCATE food RESTART IDENTITY')
      .then(() => done())
    })

    it('should return all food items', (done) => {
      this.request.get('/api/v1/foods', (error, response) => {
        if (error) { done(error) }

        const id       = 1
        const name     = 'Banana'
        const calories = 100

        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, name)
        assert.equal(parsedFood.calories, calories)
        assert.ok(parsedFood.created_at)

        done();
      })
    })

    it('should return a 404 if resposne is not found', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if(error){ done(error) };
        assert.equal(response.statusCode, 404);
        done();
      });
    });
  });
});
