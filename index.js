const express=require("express");
const { restart } = require("nodemon");
const fs=require("fs");
const path=require('path');
const sharp=require('sharp');

var app=express();

//set view
//functie numar random
function numar() {
    var nr= Math.floor(Math.random() * (12 - 7) ) + 7;
    while(nr==10)
    {
        nr=Math.floor(Math.random() * (12 - 7) ) + 7;
    }
    return nr;
  }

//functie anotimp
function getSeason() {
    var today=new Date();
    var month=String(today.getMonth()+1);
    switch(month) {
        case '12':
        case '1':
        case '2':
            season = "iarna";
        break;
        case '3':
        case '4':
        case '5':
            season = "primavara";
        break;
        case '6':
        case '7':
        case '8':
            season = "vara";
        break;
        case '9':
        case '10': 
        case '11':
            season = "toamna";
        break;
    }
    return season
}
app.set("view engine", "ejs");
app.set('trust proxy', true);

app.get('/resurse/json/galerie.json',function(req,res){
    res.status(403).render("pagini/403");
})
app.use("/resurse", express.static(__dirname+"/resurse"));

function verificaImagini(){
    var anotimp=getSeason();
    var textFisier=fs.readFileSync("resurse/json/galerie.json");
    var jsi=JSON.parse(textFisier);
    var caleGalerie=jsi.cale_galerie;
    let vectorCai=[];
    for(let im of jsi.imagini){
            if(anotimp==im.anotimp){
        var imVeche=path.join(caleGalerie,im.cale_fisier)
        var ext=path.extname(im.cale_fisier);
        var numeFisier=path.basename(im.cale_fisier,ext);
        var imNoua=path.join(caleGalerie+"/mic", numeFisier+"-mic"+".webp");
        sharp(imVeche)
            .resize({ width: 250 })
            .toFile(imNoua);
        vectorCai.push({mare:imVeche,mic:imNoua,titlu:im.titlu});
            }
}
return vectorCai;
};
function Imagini(){
    var textFisier=fs.readFileSync("resurse/json/galerie.json");
    var jsi=JSON.parse(textFisier);
    var caleGalerie=jsi.cale_galerie;
    let vectorCai=[];
    for(let im of jsi.imagini){
        var imVeche=path.join(caleGalerie,im.cale_fisier)
        var ext=path.extname(im.cale_fisier);
        var numeFisier=path.basename(im.cale_fisier,ext);
        var imNoua=path.join(caleGalerie+"/mic", numeFisier+"-mic"+".webp");
        sharp(imVeche)
            .resize({ width: 250 })
            .toFile(imNoua);
        vectorCai.push({mare:imVeche,mic:imNoua,titlu:im.titlu});
}
return vectorCai;
}
function ImaginiRand(){
    var textFisier=fs.readFileSync("resurse/json/galerie.json");
    var jsi=JSON.parse(textFisier);
    var caleGalerie=jsi.cale_galerie;
    let vectorCai=[];
    jsi.imagini.sort(() => Math.random() - 0.5);
    var nrdelete=jsi.imagini.length-numar();
    if(nrdelete>0){
        while(nrdelete>0){
            jsi.imagini.pop()
            nrdelete--;
        }
    }

    for(let im of jsi.imagini){
        var imVeche=path.join(caleGalerie,im.cale_fisier)
        vectorCai.push({imagine:imVeche,titlu:im.titlu});
    }
    return vectorCai;
}

v=ImaginiRand();
console.log(v.length);
console.log(v);

app.get("/",function(req,res){
    let nr=numar();
    console.log(nr);
    let vectorcai=verificaImagini();
    res.render('pagini/index',{ip:req.ip,imagini:vectorcai});
   
});
app.get("/index",function(req,res){
    let vectorcai=verificaImagini();
    res.render('pagini/index',{ip:req.ip,imagini:vectorcai});
   
});

app.get("/galerie",function(req,res){
    let vectorcai=Imagini();
    let imgrand=ImaginiRand();
    res.render('pagini/galerie',{imagini:vectorcai,rand:imgrand});
   
});


app.get('/*', (req,res)=>{
    res.render("pagini"+req.url, (err,rezultatRender)=>{
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404");
            }
            else
                throw err;
        }
        else
            res.send(rezultatRender);    
    });
})
console.log("Hello world!");
app.listen(8080, ()=> console.info("Listening on port 8080"));