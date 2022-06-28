//Step 1 Variablen (Arrays) definieren
let foodname = [`Crispy Chicken`, `Blue Cheese`, `Chefs`, `Chili Cheesy`, `Black Angus`, `Surf N Turf`, `Veggi Burger`, `Grüner Salat`, `Gemischter Salat`, `Cesar`, `Coca-Cola 0.45l `, `Fuse Tea Peach 0.5l`, `Rivella Rot 0.5l`];
let foodinfo = [`Hauspaniertes Pouletschnitzel im Cornflakesmantel Salat, Cheddar, Bacon, Essiggurken, rote Zwiebeln, Tomaten mit Tartar & Cocktailsauce`, `Hausgemachtes Beef Patty, Rucola, Roquefort, Feigen-Senf Chutney, Tomaten, Röstzwiebel mit Mascarpone & Mayo und Gorgonzola-Sauce`, `Hausgemachte Beef Patty, Rucola, Grana Padano, Bacon, Getrocknete Tomaten, rote Zwiebeln mit Mascarpone-Mayo & Pesto-Basilikum`, `Hausgemachtes Beef Patty, Cheddar Chili Cheddar, Black Pepper Cheddar, Bacon, Tomaten, rote Zwiebeln mit Spicy Cocktailsauce`, `Black Angus Beef Patty, Cole Slaw, Cheddar Bacon, Tomaten, rote Zwiebeln mit Steakbarbecue`, `Hausgemachtes Beef Patty, Rucola, Cheddar, Gambas Tomaten, rote Zwiebeln mit Pesto & Cocktailsauce`, `Zubereitet mit Patty, Bun, Zutaten und Saucen Deiner Wahl`, `Serviert mit Parmesansplitter an French Dressing`, `Serviert mit Parmesansplitter an French Dressing`, `Serviert mit Eisbergsalat und Parmesansplitter an Ceasar Dressing`, `Enthält Koffein (10,00 mg/100 ml), 8,89 CHF/l, 450ml`, `8,00 CHF/l, 500ml`, `8,00 CHF/l, 500ml`];
let foodprice = [17.90, 21.80, 20, 22, 27.90, 21, 18.50, 9.50, 11, 19, 4, 4, 3.5, ];
// Variablen Name (Arrays) definieren infos leer lasen (info von oben)
let basket_food = [];
let basket_prices = [];
let basket_amounts = [];
// Variablen fix mindest bestellwert
let minimumOrder = 30;

//Render funktion s
function render() {
    //Speisekarte Infos von oben (Array 1-3)
    let contentMenu1 = document.getElementById(`input-menu1`);
    contentMenu1.innerHTML = ``;
    for (let i = 0; i < foodname.length; i++) {
        contentMenu1.innerHTML += /*html*/ `
<div class="card" >
 <div class="cardX"><button onclick="addOrder(${i})"> <span id="stand${i}">+</span></button></div><!--i (index)-->
<h4>${foodname[i]}</h4>
<p>${foodinfo[i]}</p>
<h5>${foodprice[i].toFixed(2).replace('.', ',')} CHF </h5>
</div>
    `;
    }
    //Footer hier einbinden
    footer();
    loadBasket();
    renderOrderEmpty();
    checkOrder();
    //Speisekarte Infos fertig)
}



function footer() {
    //footer HTML Code
    let footer = document.getElementById(`footer-id`);
    footer.innerHTML = ``;
    footer.innerHTML = `
    <div class="footer-container">
        <div class="footer-links">
            <a href="impessum.html">Impressum</a>
            <a href="#">Datenschutzerklärung</a>
        </div>
        <div class="icons-a" >
        <a href="https://www.flaticon.com/">Icon from Flaticon</a>
        <a href="https://de.freepik.com/">Picture from Freepik</a>
</div>
        <div class="pfeil" >
             <a href="#main-icon"><img src="img/pfeil-nach-oben.png"></a>
             <p> © 2022 Eat-Just</p>
        </div>
    </div>
    `;
}


window.onscroll = function() {
    scrollBasket();
    scrollNav();
    scrollBasketEnd();
}

function scrollBasket() {
    // Funktion Menu beim Scrollen ganz nach oben schieben (position fixed / beginn top 100px )
    if (window.scrollY > 50) {
        document.getElementById(`warenkorb-position`).style.top = `0px`;
    } else {
        document.getElementById(`warenkorb-position`).style.top = `100px`;
    }
}

function scrollBasketEnd() {
    // Funktion Menu beim Scrollen ganz nach oben schieben (position fixed / beginn top 100px )
    if (window.scrollY > 2050) {
        document.getElementById(`warenkorb-position`).classList.add(`warenkorb1`);
    } else {
        document.getElementById(`warenkorb-position`).classList.remove(`warenkorb1`);
    }
}

function scrollNav() {
    // Funktion Nav beim Scrollen ganz nach oben schieben (psotion Relativ zu Postion Fixed )
    if (window.scrollY > 528) {
        document.getElementById(`nav`).classList.add(`nav1`);
    } else {
        document.getElementById(`nav`).classList.remove(`nav1`);
    }
}


function checkOrder() {
    //überprüfe Warenkorb 
    //wenn nix drin ist, lass das Bild und den text anzeigen
    if (basket_food.length > 0) {
        addBasket();
    } else {
        renderOrderEmpty();
    }
}


function renderOrderEmpty() {
    document.getElementById('basket-container').innerHTML = `
    <div id="basket" class="basket-full">
    <img src="img/einkaufswagen.png">
        <h4>Fülle deinen Warenkorb</h4>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    </div>`;
}


function addOrder(i) {
    //Array Foodname in basket_food zu setzen
    // basket_food und basket_price können nur einmal in das Array gefügt werden
    // basket_amounts kann sich vermehren / sprich beggint bei 1 und geht dann hoch (ist die bestell menge)
    let include = foodname[i];
    let editPlus = document.getElementById(`stand${i}`);
    if (basket_food.includes(include)) {
        let position = basket_food.indexOf(include);
        basket_amounts[position]++;
        editPlus.innerHTML = basket_amounts[position];
    } else {
        basket_food.push(foodname[i]);
        basket_prices.push(foodprice[i]);
        basket_amounts.push(1);
        editPlus.innerHTML = 1;
    }
    checkOrder();
    saveBasket();
}



function addBasket() {
    //Zum warenkorb hinzufügen 
    //Button Plus / Minus 
    let sum = 0
    let conten_basket = document.getElementById(`basket`);
    conten_basket.innerHTML = ``;
    for (let j = 0; j < basket_food.length; j++) {
        sum = basket_prices[j] * basket_amounts[j];
        conten_basket.innerHTML += /*html*/ `
        <div class="test" >
<div class="basket-info" >
<h5>${basket_amounts[j]}</h5>
<h5>${basket_food[j]}</h5>
<p>${sum.toFixed(2).replace('.', ',')}CHF</p>
</div>
<div class=basket-btn >
<img id="mm" onclick="minus(${j})" src="img/minus-sign.png">
<img id="nn"  onclick="plus(${j})" src="img/plus.png">
</div>
<hr>
    </div>
`;
    }
    additing();
    warenkorbEinblenden();

}


function plus(i) {
    //Ware im bestehen Korb erhöhen plus taste 
    basket_amounts[i]++;
    checkOrder();
    render();
    additing();
    warenkorbEinblenden();
    saveBasket();
}


function minus(i) {
    let editPlus = document.getElementById(`stand${i}`);
    //Ware reduzieren im Warenkorb Minus Taste
    if (basket_amounts[i] <= 1) {
        basket_food.splice(i, 1)
        basket_prices.splice(i, 1)
        basket_amounts.splice(i, 1)
        checkOrder();
        additing();
    } else {
        basket_amounts[i]--;
        editPlus.innerHTML = basket_amounts[i];

    }
    warenkorbAusblenden();
    checkOrder();
    saveBasket();
}

function additing() {
    let sum = 0
    let sum1 = 0
    let versand = 0
    for (let i = 0; i < basket_prices.length; i++) {
        sum1 += basket_prices[i] * basket_amounts[i];
        sum += basket_prices[i] * basket_amounts[i];
    }
    if (sum > 40) {
        versand = 0

    } else {
        versand = 5
    }
    let sum2 = sum + versand;
    document.getElementById(`payment`).innerHTML = /*html*/ `
    <div id=summe class="d-none">
    <div class="subtotal ">
    <div>Zwischensumme</div>
    <div>${sum1.toFixed(2).replace('.', ',')} CHF inkl. MwSt.</div>
</div>   
<br>
<div class="deliver">
    <div>Lieferkosten</div>
    <div>${versand} CHF </div>
</div> 
<br>
<div class="total">
    <div><b>Gesamtsumme</b></div> 
    <div>${sum2.toFixed(2).replace('.', ',')} CHF inkl. MwSt.</div>
</div>
<!--Button Bestellen-->
<div><button onclick="bestellenAuf()"  disabled  type="button" id="bestellen" ></button> </div>
</div>`;
    let bestellen = document.getElementById(`bestellen`);
    let sum3 = 30 - sum2
    warenkorbEinblenden();
    if (sum < 30) {

        bestellen.disabled = true;
        bestellen.innerHTML = `Noch offen ` + `<br>` + sum3.toFixed(2).replace('.', ',') + ` CHF`;
    } else if (sum > 30) {
        bestellen.disabled = false;
        bestellen.innerHTML = `Bestellung aufgeben`
    }
}

function bestellenAuf() {
    document.getElementById('basket-container').innerHTML = /*html*/ ` <div id = "basket-input"class = "basket-send">
        <h4 > Ihre Daten </h4> 
       <div class="form-input" > 
        <form  action="https://f014dacb@dominik-graf.developerakademie.net/lieferando/send_mail/success.html" method="Post" > 
        <div class="inputBox">
        <input type="text" required>
        <span>Vorname</span>
        </div>
        <div class="inputBox">
        <input type="text"  required>
        <span>Name</span>
        </div>
        <div class="inputBox">
        <input type="number" minlength="4"  required>
        <span>PLZ</span>
        </div>
        <div class="inputBox">
        <input type="text" required>
        <span>Adresse</span>
        </div>
        <div class="inputBox">
        <input type="email" required>
        <span>E-mail</span>
        </div>
        <div class="inputBox">
        <input type="time" required>
        <span>Gewünschte Uhrzeit</span>
        </div>
        <button id="bestellen-auf" onclick="sendung()" type="submit" > Bestellen</button>
        </form>
        </div>
        </div>`;
    warenkorbAusblenden();
    clearAll();
}

function clearAll() {
    basket_food.splice(-1)
    basket_prices.splice(-1)
    basket_amounts.splice(-1)
    stand.splice(-1)
}

function sendung() {
    warenkorbAusblenden();
    clearAll();
    renderOrderEmpty();
}


function warenkorbEinblenden() {
    document.getElementById(`summe`).classList.remove(`d-none`);
}

function warenkorbAusblenden() {
    document.getElementById(`summe`).classList.add(`d-none`);
}


function saveBasket() {
    let basket_amountAsText = JSON.stringify(basket_amounts);
    let basket_foodAsText = JSON.stringify(basket_food);
    let basket_pricesAsText = JSON.stringify(basket_prices);

    localStorage.setItem('basket_amounts', basket_amountAsText);
    localStorage.setItem('basket_food', basket_foodAsText);
    localStorage.setItem('basket_prices', basket_pricesAsText);
}

function loadBasket() {

    let basket_amountAsText = localStorage.getItem('basket_amounts');
    if (basket_amountAsText) { basket_amounts = JSON.parse(basket_amountAsText); }

    let basket_foodAsText = localStorage.getItem('basket_food');
    if (basket_foodAsText) { basket_food = JSON.parse(basket_foodAsText); }

    let basket_pricesAsText = localStorage.getItem('basket_prices');
    if (basket_pricesAsText) { basket_prices = JSON.parse(basket_pricesAsText); }

}