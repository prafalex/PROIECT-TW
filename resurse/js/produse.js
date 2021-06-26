window.onload = function () {

    // valoare input pret in paranteza
    var rng = document.getElementById("inp-pret");
    rng.parentNode.insertBefore(document.createTextNode(rng.min), rng);
    rng.parentNode.appendChild(document.createTextNode(rng.max));
    let spval = document.createElement("span");
    rng.parentNode.appendChild(spval)
    rng.value = 0;
    spval.innerHTML = " (" + rng.value + ")";
    rng.onchange = function () {
        rng.nextSibling.nextSibling.innerHTML = " (" + this.value + ")";
    }


    let btn = document.getElementById("filtreaza");
    btn.onclick = function () {
        var hasNumber = /\d/;
        let numeInp = document.getElementById("filtru_text");
        let nume_inp = numeInp.value;
        let minPret = document.getElementById("inp-pret").value;
        let categ = document.getElementById("inp-categorie").value;
        let produse = document.getElementsByClassName("produs");


        var comp = [];
        for (var option of document.getElementById("i_sel_multiplu").options) {
            if (option.selected) {
                comp.push(option.value);
            }
        }


        var mod = [];
        let checkboxes = document.getElementsByName("gr_chck");
        for (let ch of checkboxes) {
            if (ch.checked)
                mod.push(ch.value);
        }

        let textarea = document.getElementById("i_textarea").value;
        var radio = [];
        let radiobuttons = document.getElementsByName("gr_rad");
        for (let rad of radiobuttons) {
            if (rad.checked) {
                radio.push(rad.value);
                break;
            }
        }


        var conditie1_input = hasNumber.test(nume_inp);
        var conditie2_input = hasNumber.test(textarea);


        var conditie_input = conditie1_input || conditie2_input;
        if (conditie_input) {
            if (conditie1_input)
                alert("Nume invalid");
            if (conditie2_input)
                alert("Descriere invalida");
        }
        else {

            for (let prod of produse) {
                prod.style.display = "none";
                let nume_produs = prod.getElementsByClassName("val-nume")[0].innerHTML;
                var conditie1 = (nume_inp == nume_produs || nume_inp == "Toate");

                let pret = parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML)
                let conditie2 = pret >= minPret;

                let categ_produse = prod.getElementsByClassName("val-categorie")[0].innerHTML;
                let conditie3 = (categ_produse == categ || categ == "toate");

                let val_v = prod.getElementsByClassName("val-voucher")[0].innerHTML

                let compatibil = prod.getElementsByClassName("val-compatibil")[0].innerHTML;
                compatibil = compatibil.split(";");
                compatibil = compatibil.map(el => el.trim());

                let mod_exp = prod.getElementsByClassName("val-exp")[0].innerHTML;

                let descriere = prod.getElementsByClassName("val-descriere")[0].innerHTML;
                let conditie4 = (descriere.includes(textarea) || textarea == "Descriere default")
                console.log(conditie4); 

                let culoare = prod.getElementsByClassName("val-culoare")[0].innerHTML;
                let conditie5 = (radio[0].toUpperCase() == culoare.toUpperCase() || radio[0] == "toate");


                conditieTotala = conditie1 && conditie2 && conditie3 && conditie4 && conditie5;
                if (conditieTotala) {
                    let cont = 0;
                    for (let c of comp) {
                        for (let cmp of compatibil) {
                            if (c == cmp) {
                                cont++;
                            }
                        }
                    }

                    if (cont == 0) {
                        for (let m of mod)
                            if (m.includes(mod_exp)) {
                                prod.style.display = "block";
                            }

                    }

                }
            }
        }


    }


    //sortare 
    function sortProduse(factor) {
        var produse = document.getElementsByClassName("produs");
        let arrayProduse = Array.from(produse);
        arrayProduse.sort(function (art1, art2) {
            let exp1 = art1.getElementsByClassName("val-exp")[0].innerHTML;
            let exp2 = art2.getElementsByClassName("val-exp")[0].innerHTML;
            let pret1 = art1.getElementsByClassName("val-pret")[0].innerHTML;
            let pret2 = art2.getElementsByClassName("val-pret")[0].innerHTML;


            if (exp1 == exp2) {
                return factor * pret1.localeCompare(pret2);
            }
            else
                return factor * exp1.localeCompare(exp2);
        });
        for (let prod of arrayProduse) {
            prod.parentNode.appendChild(prod);
        }
    }
    

    //sortare cresc
    btn = document.getElementById("sortCresc");
    btn.onclick = function () {
        sortProduse(1);
    }

    //sortare descresc
    btn = document.getElementById("sortDescresc");
    btn.onclick = function () {
        sortProduse(-1);
    }

    //reset
    btn = document.getElementById("resetare");
    btn.onclick = function () {
        let produse = document.getElementsByClassName("produs");
        for (let prod of produse) {
            prod.style.display = "block";
        }
    }


    // calculare 
    btn = document.getElementById("calcul");
    btn.onclick = function () {
        let suma = 0;
        let i = 0;
        let produse = document.getElementsByClassName("produs");
        for (let prod of produse) {
            if (prod.style.display == "block" || prod.style.display == "") {
                suma = suma + parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
                i++;
            }

        }
        const newDiv = document.createElement("div");
        const div = document.getElementById("filtru");
        newDiv.innerHTML = "Pretul mediu pentru produsele afisate este: " + suma / i + ".";
        div.appendChild(newDiv);
        newDiv.setAttribute("class", "div-pret");
        newDiv.style.position = "fixed";
        setTimeout(function () {
            newDiv.remove();
        }, 2000)
    }

}