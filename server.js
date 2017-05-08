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

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
