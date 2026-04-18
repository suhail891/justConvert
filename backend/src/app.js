const express=require('express');
const cors=require('cors')
const path=require('path')
const router=require('./routes/pdfRouter')

const app=express();

app.use(cors())
app.use(express.json())
app.use('/api/pdf',router)
app.use('/api/pdf/merge',router)


app.get('/',(req,res)=>{
    res.send("hello   from server");
})


module.exports=app;