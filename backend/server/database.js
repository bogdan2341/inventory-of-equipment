const mongoose = require('mongoose');

mongoose.connection.on('error', console.error.bind(console, 'db connection error'));
mongoose.connection.once('open', ()=>{
    console.log('Connenction is Ok.')
})


module.exports = async (dbUri)=>{
    try{
        await mongoose.connect(
            dbUri, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true
            }
        );
    }catch(error){
        console.log(error);
    }
    
    
};;