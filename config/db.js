const mongoose=require('mongoose')
const dbUrl=process.env.DB_URL

mongoose.connect(dbUrl)
    .then(()=>{
        console.log("Database connected succesfull ✅");
        
    }).catch((err)=>{
        console.log(err);
        
        console.log("database not connected ❌");
        
    })