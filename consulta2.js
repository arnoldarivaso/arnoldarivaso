

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

           // console.log(JSON.stringify(res))
            let top = [];
            top.push(res[res.length - 1]);
            top.push(res[res.length - 2 ]);
            top.push(res[res.length - 3 ]);
            fs.writeFile('resultConsulta2.txt', top, (err) => {
                if (err) throw err;
                console.log('File is created successfully.');
            })
        }
    })



 