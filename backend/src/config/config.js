require('dotenv').config({ path: '.env' })

//Configuración del puerto y la base de datos
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

//Si estamos en desarrollo o producción, seteamos la url de la base de datos
//Si estamos en desarrollo, usamos la base de datos local
if (process.env.NODE_ENV === 'dev') {

    console.log('Conectando a local..');

    urlDB = process.env.URLDBDev;
}

//Si estamos en producción, usamos la base de datos de producción
else if (process.env.NODE_ENV === 'prod') {

    console.log('Conectando a prod..');

    urlDB = process.env.URLDBProd;

}

console.log('url seteada:', urlDB);

process.env.URLDB = process.env.URLDB || urlDB;