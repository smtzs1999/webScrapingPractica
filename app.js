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
/**
 * GENERAR AECHIVOS 
 *  -Genere tres archivos de salida con los datos:
    -Un archivo CSV llamado quotes.csv
    -Un archivo Excel (XLSX) llamado quotes.xlsx
    -Un archivo JSON llamado quotes.json
 */
// div.row > div.quote > div.col-md-8 > span.text
(async () => {
    try {
        console.log('::::: iniciando proceso');
        let response = await request('https://quotes.toscrape.com/')
        console.log('response',response)
    
        let $ = cheerio.load(response) 
        for (let urlVisitante of empresasArray.slice(0,5)){
                response = await request(urlVisitante);
                $ = await cheerio.load(response);
                
        }
            // SHEY
        $('div.col-md-8 > div.quote').each((i, elem) => {
         let quote = $(elem).find('span.text').text().trim();
                console.log('El texto es:', quote);
        
        // SHEY 
        // -------------------------------  
        // VALDO
        let author = $(elem).find('small.author').text().trim();
                console.log('El autor es:', author);
        
        // VALDO
        // ------------------------------
        // YO
        // div.row > div.quote > div.col-md-8 > span.text
        let tags = $(elem).find('div.tags > a.tag').map((i, el) => $(el).text().trim()).get();
        console.log('Tags obtenidos:', tags.join(', '));
        });
        
        } catch (error) {
            console.log("error",error);
            console.log('error',error);
            console.log('::error mensaje ::',error.message);
            
        }
        
    })();
