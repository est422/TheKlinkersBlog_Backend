const app = require('./app');
const { port } = require('./config/default.json');
const db = require('./config/connectDB');

async function main() {

    //CONNECT DATABASE
    db;

    //PORT
    const PORT = process.env.PORT || port;
    // const PORT = process.env.PORT
//     const PORT = 8000;

    //CONNECT EXPRESS
    app.listen(PORT, () => console.log('Server Running on:', PORT));
}

main();
