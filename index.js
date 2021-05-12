const express=require("express");
const { restart } = require("nodemon");
const fs=require("fs");
const path=require('path');
const sharp=require('sharp');
const sassMiddleware= require('node-sass-middleware');
const { json } = require("express");
const { exec } = require("child_process");
var app=express();
const ejs=require('ejs');

//set view
app.set("view engine", "ejs");
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

function getAnotimp(luna){
    switch(luna){
        case 'decembrie':
        case 'ianuarie':
        case 'februarie':
            season = "iarna";
        break;
        case 'martie':
        case 'aprilie':
        case 'mai':
            season = "primavara";
        break;
        case 'iunie':
        case 'iulie':
        case 'august':
            season = "vara";
        break;
        case 'septembrie':
        case 'octombrie': 
        case 'noiembrie':
            season = "toamna";
        break;
    }
    return season
}


app.set('trust proxy', true);

app.get("*/gal-animata.css", function(req,res){
    console.log('functie');
    res.setHeader("Content-type","text-css");
    let sCSS=fs.readFileSync("./resurse/scss/gal-animata.scss").toString("utf-8"); // citire scss
    let rezsCSS=ejs.render(sCSS,{nr:numar});// transmit numarul catre scss
    //console.log(rezsCSS);
    fs.writeFileSync("./temp/gal-animata.scss",rezsCSS); // scriu scss in fisier temporar
    exec("sass ./temp/gal-animata.scss ./temp/gal-animata.css", (error,stdout,stderr)=>{
        if(error)
        {
            console.log(`error: ${error.message}`);
            res.end();
            return;
        }
        if(stderr)
        {
            console.log(`stderr: ${stderr}`);
            res.end();
            return;

        }
        
        res.sendFile(path.join(__dirname,"temp/gal-animata.css"));
        
    })
    });

app.get("*/galerie-animata.css",function(req, res){
    console.log("functie");
    res.setHeader("Content-Type","text/css");//pregatesc raspunsul de tip css
    let sirScss=fs.readFileSync("./resurse/scss/galerie-animata.scss").toString("utf-8");//citesc scss-ul cs string
    let numar=imgrand.length;
    console.log(numar);
    let rezScss=ejs.render(sirScss,{nr:numar});// transmit culoarea catre scss si obtin sirul cu scss-ul compilat
    fs.writeFileSync("./temp/galerie-animata.scss",rezScss);//scriu scss-ul intr-un fisier temporar
    exec("sass ./temp/galerie-animata.scss ./temp/galerie-animata.css", (error, stdout, stderr) => {//execut comanda sass (asa cum am executa in cmd sau PowerShell)
        if (error) {
            console.log(`error: ${error.message}`);
            res.end();
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.end();
            return;
        }
        res.sendFile(path.join(__dirname,"temp/galerie-animata.css"));
    });

});

app.get('/resurse/json/galerie.json',function(req,res){
    res.status(403).render("pagini/403");
})
app.use("/resurse", express.static(__dirname+"/resurse"));

function verificaImagini(){
    var i=0;
    var season=getSeason();
    var textFisier=fs.readFileSync("resurse/json/galerie.json");
    var jsi=JSON.parse(textFisier);
    var caleGalerie=jsi.cale_galerie;
    let vectorCai=[];
    for(let im of jsi.imagini){
        if(i<12){
            for(let anotimp of im.luni){
            if(season==getAnotimp(anotimp)){
        var imVeche=path.join(caleGalerie,im.cale_fisier)
        var ext=path.extname(im.cale_fisier);
        var numeFisier=path.basename(im.cale_fisier,ext);
        var imNoua=path.join(caleGalerie+"/mic", numeFisier+"-mic"+".webp");
        sharp(imVeche)
            .resize({ width: 250 })
            .toFile(imNoua);
        vectorCai.push({mare:imVeche,mic:imNoua,titlu:im.titlu});
        i++;
            }
            }
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
function ImaginiEchipa(){
    var textFisier=fs.readFileSync("resurse/json/echipa.json");
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
var imgrand=ImaginiRand();


app.get(["/","/index"],function(req,res){
    let vectorcai=verificaImagini();
    res.render('pagini/index',{ip:req.ip,imagini:vectorcai});
   
});



app.get("/galerie",function(req,res){
    let vectorcai=Imagini();
    imgrand=ImaginiRand();
    //console.log(imgrand.length);
    res.render('pagini/galerie',{imagini:vectorcai,rand:imgrand});
   
});


    
app.get("/about",function(req,res)
{
    let echipa=ImaginiEchipa();
    res.render('pagini/about',{echipa:echipa});
    
})

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

app.listen(8080, ()=> console.info("Hello! Listening on port 8080"));
