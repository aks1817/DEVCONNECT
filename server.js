const express=require('express');

const app=express();

app.get('/',(req,res)=>res.send('API Running'));



const PORT = process.env.PORT || 4050;  /* That process.env.PORT line is for the port that will be used when hosted on Heroku or 5000 port will be used in local */
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));