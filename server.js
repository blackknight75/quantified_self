const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const md5            = require('md5')
const FoodController = require('./lib/controllers/food-controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS API'

app.get('/', (request, response) => {
  response.send('API endpoints go here')
});

app.get('/api/v1/foods', (request, response) => {
  FoodController.index(request, response)
});

app.get('/api/v1/foods/:id', (request, response) => {
  FoodController.show(request, response)
});

app.post('/api/v1/foods', (request, resposne) => {
  FoodController.create(request, response)
});

app.patch('/api/v1/foods/:id', (request, response) => {
  FoodController.update(request, response)
})

app.delete('/api/v1/foods/:id', (request, response) => {
  FoodController.destroy(request, response)
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
