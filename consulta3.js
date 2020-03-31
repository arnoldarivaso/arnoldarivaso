

const mongoose = require('mongoose');
const fs = require('fs');

  
    mongoose.connect('mongodb://localhost/atsmosferica', {useNewUrlParser: true}, ((err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Se conecto correctamente')
        }
    }))

    var post_schema = mongoose.Schema({data : JSON});
    var post_model = mongoose.model('datos_atsmosfericos', post_schema);

 
    
    
    post_model.find( { }).sort('Ozono(�g/m�)').exec((err, res) => {
        if(err) {
           // console.log(err)
            return;
        } else {

         
            
            let media = 0;
            let suma = 0;
            let arrayString = JSON.stringify(res);
            let arrayCurado = JSON.parse(arrayString);

    

            
            
           
            for (let index = 0; index < arrayCurado.length; index++) {
                   
                suma = suma + Number(arrayCurado[index]["Ozono(�g/m�)"]);


                
            }

            console.log(suma);

            media = suma / Number(arrayCurado.length);

            resultado = 'La media del Ozono en Valencia es ' + String(media)

            fs.writeFile('resultConsulta3.txt', resultado, (err) => {
                if (err) throw err;
                console.log('File is created successfully.');
            })
        }
    })



 