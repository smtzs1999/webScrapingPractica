const request = require('request-promise');
const cheerio = require('cheerio');


let empresasArray = [];
let paginacionArray = [];
let resultadosArray = []; 

// REALIZAR 
/**
     * quote: El texto de la cita.
    author: El nombre del autor.
    tags: Los tags asociados a la cita.
 */
// div.row > div.quote > div.col-md-8 > span.text
(async () => {
    try {
        console.log('::::: iniciando proceso');
    // HACER UNA REQUEST PARA OBTENER LA PAGINA 
        let response = await request('https://quotes.toscrape.com/')
        console.log('response',response)
    
        let $ = cheerio.load(response) 
        const tituloPagina = $ ('title').text();
        console.log('titulopagina',tituloPagina);

        let numeroPaginaMaximo = parseInt($('ul.pagination > li').last().prev().find('a').text());
        console.log('numeroPaginaMaximo',numeroPaginaMaximo);

        console.log('numeroPaginaMaximo', typeof numeroPaginaMaximo);

        } catch (error) {
            console.log("error",error);
            console.log('error',error);
            console.log('::error mensaje ::',error.message);
            
        }
    });



