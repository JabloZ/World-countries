 //https://restcountries.com/v3.1/name/turkey?fullText=true
 const container= document.getElementById("all-countries").children;
 for (const element in document.getElementById("all-countries").children){  

     document.getElementById("all-countries").children[element].addEventListener("click", function(){
         var country_name=""
         if (container[element].getAttribute("name")==null){
             
             country_name=container[element].getAttribute("class")

         }
         else{
             
             country_name=container[element].getAttribute("name")
         }
         country_clicked(country_name);
     })

     document.getElementById("all-countries").children[element].addEventListener("mouseover", function(){
         var country_name_new=""
         document.getElementById("name").style.opacity=0
         window.onmousemove=function(j){
             x=j.clientX
             y=j.clientY
             
             document.getElementById("name").style.top=y-100+"px"
             document.getElementById("name").style.left=x-50+"px"
             
         }  



         
         if (container[element].getAttribute("name")==null){
                 country_name_new=container[element].getAttribute("class")             
         }
         else{
                 country_name_new=container[element].getAttribute("name")   
             }

         document.getElementById("name").innerText=country_name_new 
         document.getElementById("name").style.opacity=1 
         }
         
         )
     
     document.getElementById("all-countries").children[element].addEventListener("mouseleave", function(){
         document.getElementById("name").style.opacity=0  
     })
     }


 function country_clicked(c){
     
     var api_url = `https://restcountries.com/v3.1/name/?fullText=true`;

     var name=c
         switch (name) {
             case 'Swaziland':
                 c="Estawini";
                 break;
             case 'Reunion':
                 c="Réunion";
                 break;
             case 'Republic of Congo':
                 c="Republic of the Congo";
                 break;
             case 'The Gambia':
                 c="Gambia";
                 break;
             case 'The Gambia':
                 c="Gambia";
                 break;
             case 'Dem. Rep. Korea':
                 c="North korea";
                 break;
             case 'Canary Islands (Spain)':
                 c="Spain";
                 break;
             
         }
     
     var api_url = `https://restcountries.com/v3.1/name/${c}?fullText=true`;
     
     
     
     getapi_readmore(api_url);
     async function getapi_readmore(url) {
         
         const response = await fetch(url)

         /**
          * Detect 4xx - 5xx errors,
          * response.ok will be false on failure.
          * */
         if (!response.ok) {

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
         
         
         data=data[0]
         console.log(data);
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
         document.getElementById('c-all').style="visibility:visible;"
     var api_url = ``;
     }
     
 }
 
     //https://restcountries.com/v3.1/name/Democratic%20Republic%20of%20the%20Congo?fullText=true
function close_win_show(){
document.getElementById('c-all').style="visibility:hidden;"

}

