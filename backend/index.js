const express = require('express')
const cors = require('cors')
const path = require('path')
const { engine } = require('express-handlebars')

const app = express()

// Config JSON response
app.use(express.json())

app.engine(
	'handlebars',
	engine({
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, 'views', 'layouts'),
		partialsDir: path.join(__dirname, 'views', 'partials'),
	})
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

app.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login',
		heading: 'Login',
		action: '/users/login',
		submitLabel: 'Entrar',
		registerLink: 'http://localhost:3000/register',
		inputs: [
			{
				name: 'email',
				label: 'E-mail',
				type: 'email',
				placeholder: 'Digite o e-mail',
				autocomplete: 'email',
			},
			{
				name: 'password',
				label: 'Senha',
				type: 'password',
				placeholder: 'Digite a senha',
				autocomplete: 'current-password',
			},
		],
	})
})

// Routes
const PetRoutes = require('./routes/PetRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use('/pets', PetRoutes)
app.use('/users', UserRoutes)

app.listen(5000)
