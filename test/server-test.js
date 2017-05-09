const assert = require('chai').assert;
const app = require('../server');
const request = require('request');
const pry = require('pryjs')

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

  describe('GET /api/v1/foods', () => {
    beforeEach(function(done) {
      database.raw('INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)', ['Banana', 100, new Date, new Date])
      .then(() => {
        done();
      });
    });

    afterEach(function(done) {
      database.raw('TRUNCATE food RESTART IDENTITY')
      .then(() => {
        done();
      });
    });

    it('should return all food items', function(done){
      this.request.get('/api/v1/foods', function(error, response) {
        if (error) { done(error) }

        let parsedFood = JSON.parse(response.body)[0]

        assert.equal(parsedFood.id, 1);
        assert.equal(parsedFood.name, 'Banana');
        assert.equal(parsedFood.calories, 100);
        assert.ok(parsedFood.created_at);

        done();
      });
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should return an empty array if response body is empty', function(done){
      this.request.get('/api/v1/foods', function(error, response){

        if(error){ done(error) };
        assert.equal(response.body, '[]');
        done();
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    beforeEach((done) => {
      database.raw('INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)', ['Banana', 100, new Date, new Date])
      .then(() => {
        done();
      });
    });

    afterEach((done) => {
      database.raw('TRUNCATE food RESTART IDENTITY')
      .then(() => {
        done();
      });
    });

    it('should create a new food', function(done){
      this.request.post('/api/v1/foods', function(error, response){
        var food_params = { name: 'Banana', calories: 100, created_at: new Date, updated_at: new Date }
        this.request.post('api/v1/foods', { form: food_params }, function(error, resposne){
          let parsedFood = JSON.parse(response.body);

          assert.equal(response.statusCode, 200);
          assert.equal(response.parsedFood.id, food_params.id)
          assert.equal(response.parsedFood.calories, food_params.calories)
          assert.equal(response.parsedFood.id, food_params.created_at)
          assert.equal(response.parsedFood.id, food_params.updated_at)
        });
      });
      done();
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    beforeEach(function(done) {
      database.raw('INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)', ['Banana', 100, new Date, new Date])
      .then(() => done())
    });

    afterEach(function(done) {
      database.raw('TRUNCATE food RESTART IDENTITY')
      .then(() => done())
    });

    it('should return single food item', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error){ done(error) };

        let parsedFood = JSON.parse(response.body)

        assert.equal(response.statusCode, 200);
        assert.equal(parsedFood.name, 'Banana')
        done();
      });
    });
  });
});
