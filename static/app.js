    var region_searched=""
    var searched=""
function world_con_clicked(){
let region_passed="";
region_clicked(region_passed);
}
function close_win_show(){
document.getElementById('c-all').style="visibility:hidden;"
}

function region_clicked(region_passed){
region_searched=region_passed
document.getElementById('c-all').style="visibility:hidden;"
if (region_passed!=""){
    
    document.getElementById("reg-drop").innerHTML=region_passed
    var api_u=`https://restcountries.com/v3.1/region/${region_searched}?fields=name,flags,population,region,capital`
}
else if (region_passed==""){
   
    document.getElementById("reg-drop").innerHTML="Sort by region"
    var api_u=`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital`;
}

document.getElementById("all-countries").innerHTML=""
document.getElementById("how-many").innerHTML=""

getapi(api_u);
}
function search_clicked(){
document.getElementById('c-all').style="visibility:hidden;"
searched=document.getElementById('country-id').value

document.getElementById("all-countries").innerHTML=""
document.getElementById("how-many").innerHTML=""
var api_url2 = `https://restcountries.com/v3.1/name/${searched}?fields=name,flags,population,region,capital`;

getapi(api_url2);

}
const api_url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";


function readmore_c(c_key){
//currencies (symbol and name), cars (side and signs), independent, maps, unMember, for languages, capitalInfo, tld[0](domena), cca3(skrot 3 litery), for timezones,  area, continents
document.getElementById('c-all').style="visibility:visible;"

getapi_readmore(api_url, c_key);

}

async function getapi_readmore(url, key) {

var api_url2 = `https://restcountries.com/v3.1/name/${key}?fullText=true`;

const response = await fetch(api_url2);
var data = await response.json();
data=data[0]

document.getElementById("cname").innerHTML=`Country: ${data["name"]["common"]} <img src="${data["flags"]["png"]}">`
var a = data["population"]
    if (a>1000 && a<1000000){
        var num = Number(a/1000)
        var to_add = "K"
    }
    else if(a>=1000000 && a<1000000000){
        var num = Number(a/1000000)
        var to_add = "M"
    }
    else if(a>=1000000000){
        var num = Number(a/1000000000)
        var to_add = "B"
    }
    else{
        var num = Number(a)
        var to_add = " "
    }
    
    var roundedString = num.toFixed(2);
    var rounded_pop = Number(roundedString) ;
    
document.getElementById("cpopulation").innerHTML='<p1>Population:</p1> '+rounded_pop+ " " + to_add
document.getElementById("cregion").innerHTML="<p1>Region:</p1> "+ data["region"]
try {
    var capital=data['capital']  
    document.getElementById("ccapital").innerHTML="<p1>Capital: </p1>" + capital
}
catch(err) {
    var capital="No capital"
    document.getElementById("ccapital").innerHTML=capital
}
try {
    var langs=""
    for (const lang in data['languages']){
        
        langs=langs+data['languages'][lang]+", "
    }  
    langs=langs.slice(0, -2);
    document.getElementById("clanguages").innerHTML="<p1>Official languages: </p1>" + langs
}
catch(err) {
    var langs="No official languages"
    document.getElementById("clanguages").innerHTML=langs
}

document.getElementById("ccontinents").innerHTML="<p1>Continent: </p1>"+data['continents'][0]
document.getElementById("cmaps").innerHTML=`<a href="${data["maps"]["googleMaps"]}" target="_blank" rel="noopener noreferrer"><p1>Localization: </p1>On google maps >></a>`

var timezones=""
for (const timezone in data['timezones']){
    timezones=timezones+data['timezones'][timezone]+", "
}  
timezones=timezones.slice(0, -2);
document.getElementById("ctimezones").innerHTML="<p1>Timezones: </p1>"+timezones
document.getElementById("carea").innerHTML="<p1>Land area: </p1>"+data["area"] + " km^2"

try{
    document.getElementById("ccapitalinfo").innerHTML="<p1>Capital coordinates: </p1>"+data['capitalInfo']["latlng"]
}
catch(err){
    document.getElementById("ccapitalinfo").innerHTML="No capital"
}
var unmem=data['unMember']
if (unmem===false){
    document.getElementById("cunmember").innerHTML="<p1>UN member: </p1> Not a member of UN"
}
else{
    document.getElementById("cunmember").innerHTML="<p1>UN member: </p1> A member of UN"
}

try{
    var i=0
    var borders=""
    for (const bordering in data['borders']){
        borders=borders+data['borders'][bordering]+", "
        i=i+1
    } 
    borders=borders.slice(0, -2);
    document.getElementById("cborders").innerHTML=`<p1>Bordering(${i}): </p1>`+borders+ ""
}
catch(err){
    document.getElementById("cborders").innerHTML="<p1>Bordering: </p1> none"
}

var independent=data['independent']
try{
    if (independent===false){
        document.getElementById("cindependent").innerHTML="<p1>Independent: </p1> No"
    }
    else{
        document.getElementById("cindependent").innerHTML="<p1>Independent: </p1> Yes"
    }
}
catch(err){
    document.getElementById("cindependent").innerHTML="<p1>Independent: </p1> It's complicated"
}

try{
    document.getElementById("ctld").innerHTML="<p1>Internet domain: </p1>"+data['tld'][0]
}
catch(err){
    document.getElementById("ctld").innerHTML="<p1>Internet domain: Not specified</p1>"
}

try{
    document.getElementById("ccca3").innerHTML="<p1>Country name shortcut: </p1>"+data['cca3']
}
catch(err){
    document.getElementById("ccca3").innerHTML="<p1>Shortcut: Not specified</p1>"
}

document.getElementById("ccarssigns").innerHTML="<p1>Cars signs: </p1>"+data["car"]['signs'][0]
document.getElementById("ccarsside").innerHTML="<p1>Cars side: </p1>"+data["car"]['side']


try{
    var currencies=""
    for (const currency in data['currencies']){
        currencies=currencies+`| ${data['currencies'][currency]["name"]}, ${data['currencies'][currency]["symbol"]}`+" | "
    } 
    
    document.getElementById("ccurrencies").innerHTML="<p1>Currencies: </p1>"+currencies
}
catch(err){
    document.getElementById("ccurrencies").innerHTML="<p1>Currencies: </p1> no currency"
}

}



async function getapi(url, ) {
document.getElementById("reg-drop").style="visibility:hidden;"


const response = await fetch(url);

if (!response.ok) {

    
    var element = document.getElementById("all-countries");
    var numberOfChildren = element.children.length;
    document.getElementById("how-many").innerHTML="Number of results: "+numberOfChildren 

    searched=document.getElementById('country-id').value="" 
    searched=""  
    document.getElementById("reg-drop").style="visibility:visible;"
    
    throw new Error(response.status);
    return;
}
var data = await response.json();
/**
* Handle special cases where the data recieved
* is empty, undefined and invalid
*/
if (!data || !data.length) {

throw new Error("Invalid data received.");

}

try{
    data["name"]
}
catch(err){
    return 0;
}
for (var key in data)
    
    {
    try {
        var capital=data[key]['capital']  
    }
    catch(err) {
        var capital="No capital"
    }

    var a = data[key]["population"]
    if (a>1000 && a<1000000){
        var num = Number(a/1000)
        var to_add = "K"
    }
    else if(a>=1000000 && a<1000000000){
        var num = Number(a/1000000)
        var to_add = "M"
    }
    else if(a>=1000000000){
        var num = Number(a/1000000000)
        var to_add = "B"
    }
    else{
        var num = Number(a)
        var to_add = " "
    }
    
    var roundedString = num.toFixed(2);
    var rounded_pop = Number(roundedString);
    document.getElementById("all-countries").innerHTML += 
    `<div class="grid-item">
        <div class="flag-con" style="min-height: 50%; background-color: white;"><img src="${data[key]["flags"]["png"]}"></div>
        <div class="short-desc" style="min-height: 50%;" id="${key}"><p>${"Name: "+ data[key]["name"]["common"]}</p><p>Capital: ${capital}</p><p>${"Population: "+ rounded_pop+to_add}</p><p>${"Region: " + data[key]["region"]}</p><p style="padding-top: 20px;"><a onclick="readmore_c('${data[key]["name"]["common"]}')" href="javascript:void(0)">Read more </a></p> </div>
    </div>";`

    
    }
var element = document.getElementById("all-countries");
var numberOfChildren = element.children.length;
document.getElementById("how-many").innerHTML="Number of results: "+numberOfChildren 

searched=document.getElementById('country-id').value="" 
searched=""  
document.getElementById("reg-drop").style="visibility:visible;"
}

getapi(api_url);