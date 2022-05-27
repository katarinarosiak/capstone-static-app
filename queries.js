const Pool = require('pg').Pool
const pool = new Pool({
  user: 'katarina',
  host: 'localhost',
  database: 'capstone_app',
  password: 'password',
  port: 5432,
})

const getAnecdotes = (request, response) => {
  pool.query('SELECT * FROM anecdotes', (error, results) => {
    if (error) {
      throw error
    }
		response.render('index');
    // response.status(200).json(results.rows)
  })
};

const addAnecdotes = (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO anecdotes (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}



module.export = {
	getAnecdotes, 
	addAnecdotes
};