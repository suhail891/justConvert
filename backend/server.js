const app=require('./src/app');
require('dotenv').config();

const PORT=process.env.PORT;


app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`http://localhost:${PORT}`);
})