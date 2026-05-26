const app=require('./src/app');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const PORT=process.env.PORT;

// Server start hone pe temp folder banao
const tempDir = path.join(__dirname, 'src/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`http://localhost:${PORT}`);
})