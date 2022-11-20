
const db = require("./app/models");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(() => {
        console.log("Connected to the database!");

    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const express = require('express');
const dotenv = require('dotenv');
const auth = require('./app/middleware/auth')


const app = express();

app.use(express.json())

dotenv.config();

require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);


app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

// app.use("*", (req, res) => {
//     res.status(404).json({
//         success: "false",
//         message: "Page not found",
//         error: {
//             statusCode: 404,
//             message: "You reached a route that is not defined on this server",
//         },
//     });
// });



const port = process.env.Port || 5000

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Upgrad Ecommerce  application development." });
});

app.listen(port, () => {
    console.log(`Server is listening on port :${port}`)
})







// const routeResponseMap = {
//     "/movies": "<h1>All Movies Data in JSON format from Mongo DB</h1>",
//     "/genres": "<h1>All Genres Data in JSON format from Mongo DB</h1>",
//     "/artists": "<h1>All Artists Data in JSON format from Mongo DB</h1>"
// }

// const port = 9000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     app = http.createServer((req, res) => {
//         res.writeHead(200, {
//             "Content-Type": "text/html"
//         });
//         if (routeResponseMap[req.url]) {
//             res.end(routeResponseMap[req.url]);
//         }
//         else {
//             res.end("<h1>Sorry, not found.</h1>");
//         }
//     })

// app.listen(port, () => {
//     console.log(`Server is listening on port:${port}`)
// });



