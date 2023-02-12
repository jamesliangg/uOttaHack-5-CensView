
var butt = document.getElementById("myButton");
if(butt){
    butt.addEventListener("click", function(){
        let data = getInfo();
    
        //get info about percentage of peeps that like it
    
        //change values
        updateValues(data)
    });
}else{
    console.log("it don't exist");
}


async function getInfo() {
     let queryOptions = { active: true, lastFocusedWindow: true };
     // `tab` will either be a `tabs.Tab` instance or `undefined`.
     let [tab] = await chrome.tabs.query(queryOptions);
     var data = fetchAsync(tab.url.toString());
     return data;
}
    

async function fetchAsync (url) {
    if(url.includes("bestbuy")){
        //http://127.0.0.1:5000?siteurl=https://www.bestbuy.ca/en-ca/product/sonos-arc-sound-bar-black/14597172&website=bestbuy
        url = "http://127.0.0.1:5000?siteurl="+url.toString() + "&website=bestbuy"
    }else if(url.includes("amazon")){
        //http://127.0.0.1:5000?siteurl=https://www.amazon.ca/dp/B09F1QQZM2&website=amazon
        url = "http://127.0.0.1:5000?siteurl="+url.toString() + "&website=amazon"
    }
    console.log("url:"+url);
    let response = await fetch(url);
    let data = await response.json();
    //gonna pass us [pos,neg,neu]
    return data;
}

async function updateValues (data) {
    var total = data[0]+data[1]+data[2];
    document.getElementById("prosText").innerText = data[0].toString+"%";
    document.getElementById("lovers").style.width = "50%";

    document.getElementById("consText").innerText = data[2].toString+"%";
    document.getElementById("neutrals").style.width = "50%";
}