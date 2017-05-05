const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS API'

app.get('/', (request, response) => {
  response.send('API endpoints go here')
});

app.get('/api/v1/foods', (request, response) => {
  var id = request.params;
  var name = app.locals.foods;
  var calories = app.locals.calories;

  if(!name || !calories){ return response.sendStatus(404) };

  response.json({
    id: id,
    name: name,
    calories: calories
  });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
