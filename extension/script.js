
var butt = document.getElementById("myButton");
if(butt){
    butt.addEventListener("click", function(){
        console.log('clicked!')
        document.getElementById("waiting").innerHTML = "Please Wait...";
        document.getElementById("myButton").disabled = true;
        butt.disabled = true;
        butt.style.backgroundColor = "#eec824";
        
        getInfo();
    });
}else{
    console.log("it don't exist");
}


async function getInfo() {
     let queryOptions = { active: true, lastFocusedWindow: true };
     // `tab` will either be a `tabs.Tab` instance or `undefined`.
     let [tab] = await chrome.tabs.query(queryOptions);
     fetchAsync(tab.url.toString());
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
    //gonna pass us [neg,pos,neu]
    
    console.log("data: "+data)
    console.log("neg"+data[0]);
    console.log("pos"+data[1]);
    console.log("neu"+data[2]);
    var total = data[0]+data[1]+data[2];
    console.log("total"+total);
    document.getElementById("prosText").innerText = data[1];
    document.getElementById("lovers").style.width = (((data[1]/total)*(total/(total-data[0]))*100).toString()+"%");

    document.getElementById("consText").innerText = data[2];
    document.getElementById("neutrals").style.width = (((total-data[0])/total*100).toString()+"%");

    document.getElementById("negText").innerText = data[0];
    document.getElementById("myButton").disabled = false;
    document.getElementById("myButton").style.backgroundColor = "#f2dc99";
    document.getElementById("waiting").innerHTML = "&nbsp";
}