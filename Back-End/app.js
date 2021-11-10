const express= require('express');
const cors=require('cors');
const app =express();
const port=4000;
const multer=require('multer');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send("Welcome to express now!");

}); 


const storage =multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
})
const upload=multer({storage});

// Single file upload 
app.post("/file",upload.single("file"),(req,res)=>{
    const file=req.file;
    if(file){
        res.json(file);
    }
    else{
        throw new error("Uploading the file did not success ! ");
    }
})

// multi files upload
app.post("/multifiles",upload.array("files"),(req,res)=>{
    const files=req.files;
    if(Array.isArray(files)&&files.length>0){
        res.json(files);
    }
    else{
        throw new error("Uploading the files did not success ! ");
    }
})

app.listen(port,()=>{
    console.log('Express App is running on port: '+port);
});