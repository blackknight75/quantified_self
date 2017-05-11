const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const md5            = require('md5')
const FoodController = require('./lib/controllers/food-controller')
const DiaryController = require('./lib/controllers/diary-controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS API'

app.get('/', (request, response) => {
  response.send(`Food endpoints:<br><br>
    GET /api/v1/foods<br>
    GET /api/v1/foods/:id<br>
    POST /api/v1/foods<br>
    PATCH /api/v1/foods/:id<br>
    DELETE /api/v1/foods/:id<br><br>

    Diary endpoints:<br><br>
    POST /api/v1/diaries<br>
    GET /api/v1/diares/meals
    `)
})

app.get('/api/v1/foods', (request, response) => {
  FoodController.index(request, response)
})

app.get('/api/v1/foods/:id', (request, response) => {
  FoodController.show(request, response)
})

app.post('/api/v1/foods', (request, response) => {
  FoodController.create(request, response)
})

app.patch('/api/v1/foods/:id', (request, response) => {
  FoodController.update(request, response)
})

app.delete('/api/v1/foods/:id', (request, response) => {
  FoodController.destroy(request, response)
})

app.post('/api/v1/diaries', (request, response) => {
  DiaryController.create(request, response)
})

app.get('/api/v1/diaries/:id/meals', (request, response) => {
  DiaryController.getMeals(request, response)
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
