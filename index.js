const express = require('express');
const bodyParser = require('body-parser');
// const { Pool } = require('pg/lib');
const Pool = require('pg').Pool

const app = express();

const pool = new Pool({
  user: 'katarina',
  host: 'localhost',
  database: 'capstone_app',
  password: 'katarina',
  port: 5432,
})


app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const anecdotes = [
	{name:'something'}
]; 

const getAnecdotes = (request, response) => {
  pool.query('SELECT * FROM anecdotes', (error, results) => {
    if (error) {
      throw error
    }
		console.log(results.rows)
		response.render('index', {
			anecdotes: results.rows
		});
    // response.status(200).json(results.rows)
  })
};

const addAnecdotes = (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO anecdotes (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
		response.redirect('/');
  })
}


app.get('/', getAnecdotes);


app.post('/', addAnecdotes);

app.listen(3000);
