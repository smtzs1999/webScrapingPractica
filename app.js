const request = require('request-promise');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');
const XLSX = require('xlsx');
const fs = require('fs');

let empresasArray = [];
// let paginacionArray = [];
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

        let objectoData = {
                    quote:quote,
                    author:author,
                    tags:tags, 
                    
                }
                resultadosArray.push(objectoData);
        });
        
        let data = JSON.stringify(resultadosArray, null, 2); 

        fs.writeFileSync('resultadosObject.json',data);
        console.log('archivo json terminado');

        const fields = ['quote','author','tags'];

            const json2csv = new Parser({
                fields: fields,
                defaultValue:'No ay INFO'
            })


        const csv = json2csv.parse(resultadosArray);
        fs.writeFileSync('quotes.csv', csv, 'utf-8');
        console.log('archivo CSV creado');

        const worksheet = XLSX.utils.json_to_sheet(resultadosArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
        workbook, worksheet,'Scrape');
        XLSX.writeFile(workbook,'resultados.xlsx');
        console.log('archivo exel creado ');
        

        } catch (error) {
            console.log("error",error);
            console.log('error',error);
            console.log('::error mensaje ::',error.message);
            
        }
        
    })();
