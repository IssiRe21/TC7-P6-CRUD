const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
// Importar el archivo que está en /config/db.js
// Un objeto, que dentro tiene a "sequelize"
const { sequelize } = require("./config/db");
const { Pokemon } = require("./models/pokemon.model");
const { Notes } = require("./models/notes.model");
const app = express();
const port = 3000;

// Solamente utilizar force: true para aplicar cambios sobre modelos/tablas
// Borra toda la información para poder ajustar los modelos/tablas
// Nota: profesionalmente, se utiliza algo llamado "Migrations"
//sequelize.sync({force: true});

// Una vez que tenemos los modelos, omitimos el force para que la información se mantenga
sequelize.sync({});

app.set("view engine", "ejs");

// Variables

// Rutas
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

//Read
// Cuando alguien ingrese a la url "/" (localhost:3000), se hace esto
// 1) Consultar y mostrar todos los registros de la base de datos
app.get("/", (req, res) => {
    (async () => {
        // Consultar todos los "Pokemon" desde la base de datos
        let pokes = await Pokemon.findAll();
        // Muestra demasiada información
        // console.log(pokes);

        // Muestra demasiada información
        // console.log(pokes);

        // Mostrar como JSON
        // console.log(JSON.stringify(pokes, null, 4));

        // Mostrar con un for
        // Cada Game tiene la siguiente estructura:
        // {
        //     name: 'Eevee',
        //     type: 'normal',
        // }
        console.log('pokemon.length:', pokes.length);
        pokes.forEach((pokes) => {
            console.log('pokes.name:', pokes.name);
        });
        // Renderizar (mostrar) el archivo ejs: /views/pages/index.ejs
        res.render("pages/index", {
            // Pasar la información de los juegos al ejs (html) para mostrarlos
            // Permitir que el template utilice una variable games: cuyo valor será la variable games
            // Nombre variable en template: valor que tendrá
            pokemon: pokes,
        });
    })();
});




// Create, parte 1
// Cuando alguien ingrese a la url "/create" (localhost:3000/create), se hace esto
// Entregar el formulario para creación
app.get("/create", (req, res) => {
    res.render("pages/create")
});

// Create, parte 2
// Cuando alguien envíe información mediante POST a la url "/create" (localhost:3000/create), se hace esto
// Leer el "formulario" (los inputs del formulario) y realmente crear el registro en la base de datos
app.post("/create", (req, res) => {
    // req.body datos enviados desde un [formulario] POST
    // Nota: req.body requiere:
    // 1) Instalar dependencia/librería: body-parser
    // npm install body-parser
    // 2) Importar el body-parser
    // Al inicio del archivo, agregar un require
    // 3) Configurar body-parser (ver arriba su uso)
    console.log("Nombre: " + req.body.name)
    // Crear una variable para facilitar el acceso al valor introducido
    let name = req.body.name;
    let type = req.body.type;
    let level = req.body.level;
    (async () => {
        // Crear un nuevo pokemon (registro en la base de datos) usando la
        // información obtenida desde el formulario
        let pokemon = await Pokemon.create({
            name: name,
            type: type,
            level: level,
        });

        // No se debe renderizar directamente la vista
        // res.render("pages/index");

        // Redireccionar al usuario
        res.redirect('/');
    })();
});


//Update
// Mostrar formulario para editar registro (precargado con la información existente)
app.get('/update/:id', (req, res, next) => {
    // Variables de la url con :, están disponibles desde req.params
    let id = req.params.id;
    // Consultar de la base de datos, y mostrar un formulario para editar los datos
    // existentes
    (async () => {
        let pokemon = await Pokemon.findByPk(id);

        res.render('pages/update', {
            pokemon: pokemon,
        });
    })();
});

app.post('/update', (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let level = req.body.level;

    (async () => {
        // Reconsultamos el registro de la BD
        let pokemon = await Pokemon.findByPk(id);

        // Actualizamos sus valores
        pokemon.name = name;
        pokemon.type = type;
        pokemon.level = level;

        // Actualizamos la base de datos
        await pokemon.save();

        res.redirect('/');
    })();
});


// Delete
app.post('/delete', (req, res, next) => {
    (async () => {
        let id = req.body.id;

        await Pokemon.destroy({
            where: {
                id: id,
            }
        });

        res.redirect('/');
    })();
});

app.get('/notes/:id', (req, res, next) => {
    let id = req.params.id;

    (async () => {
        let pokemon = await Pokemon.findByPk(id);

        let notes = await Notes.findAll({
            where: {
                pokemonId : id,
            },
        });

        res.render('pages/notes', {
            poke: pokemon,
            notes: notes,
        });
    })();
});


app.post('/notes/create', (req, res, next) => {
    let pokemonId = req.body.pokemonId;
    let name = req.body.name;
    let content = req.body.content;

    (async () => {
        await Notes.create({
            name: name,
            content: content,
            // gameId es una columna que se agrega automáticamente debido a la relación
            // entre ambos modelos
            pokemonId: pokemonId,
        });

        res.redirect('/notes/' + pokemonId);
    })();
});


// Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});