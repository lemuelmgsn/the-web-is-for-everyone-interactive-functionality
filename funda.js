// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal alle squads uit de WHOIS API op
// const squadData = await fetchJson('https://fdnd.directus.app/items/squad')
// Ik ga dit misschien later nog gebruiken

const apiUrl = 'https:fdnd-agency.directus.app/items/f_houses'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// ROUTES

app.get('/', function(request, response) {
        fetchJson('https://fdnd-agency.directus.app/items/f_list').then((apiData) => {
            response.render('homepage', {data: apiData.data})
        });
})

app.get('/fav-lijst', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/f_houses').then((apiData) => {
        response.render('fav-lijst', {data: apiData.data})
	});
})

app.get('/detail/:id', function(request, response) {
  fetchJson('https://fdnd-agency.directus.app/items/f_houses/' + request.params.id).then((apiData) => {
      console.log(apiData)
      response.render('detail', {data: apiData.data})
  });
})

// 

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})