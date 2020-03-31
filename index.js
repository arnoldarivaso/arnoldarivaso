const request = require('request')
const fs = require('fs')
const csvFilePath='./atsmosferica.csv'
const csv2json = require('csv2json');

const mongoose = require('mongoose');


    request.get('http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/7A.csv').pipe(fs.createWriteStream('atsmosferica.csv'))




setTimeout(() => {

    fs.createReadStream(csvFilePath)
    .pipe(csv2json({
      // Defaults to comma.
      separator: ';'
    }))

    .pipe(fs.createWriteStream('atsmosferica.json'));

    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function() {
    // // we're connected!
    // });


    mongoose.connect('mongodb://localhost/atsmosferica', {useNewUrlParser: true}, ((err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Se conecto correctamente')
        }
    }))

    var post_schema = mongoose.Schema({
        Fecha : String,
        SO2: String,
        NO: String,
        NO2: String,
        PM10: String,
        NI: String,
        NOX: String,
        OZONO: String,
        AS: String,
        PB: String,
        PBAP: String,
        CD: String
    });
    var post_model = mongoose.model('datos_atsmosfericos', post_schema);

    setTimeout(() => {
      
    
        let rawdata = fs.readFileSync('atsmosferica.json');
        let data_atsmosferica = JSON.parse(rawdata);
       // console.log(data_atsmosferica)

       // var newData = new post_model({data_atsmosferica});

        // saving json schema to mongodb         
    
        // newData.save(function(err){
        //     if (err) {
        //             throw err;
        //     }
        //     console.log('INSERTED!');
        // });


        post_model.collection.insertMany(data_atsmosferica, (err, result) => {
            console.log('SE HAN INSERTADO LOS DATOS');
        })
     
    }, 3000);


}, 3000);




 

