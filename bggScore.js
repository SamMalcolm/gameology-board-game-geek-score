function promiseGet(path) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET",path);
        xhr.onreadystatechange = function() {
            console.log("XHR STATUS: "+xhr.status);
            console.log("XHR READY STATE: "+xhr.readyState);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    resolve(xhr.status+": "+xhr.statusText);
                }
            }
        }
        xhr.send();
    });
}

function injectWidget() {
    let widgetMarkup = `
        <div class="bgg_widget">
            <div class="bgg_widget_loader"></div>
            <div class="bgg_widget_name_container">
                Name: <span class="bgg_widget_name"></span>
            </div> 
            <div class="bgg_widget_score_container">
                Score: <span class="bgg_widget_score"></span>
            </div>      
        </div>
    `;
    document.querySelector("body").innerHTML += widgetMarkup;
}

function setLoader(add) {
    if (add) {
        document.querySelector(".bgg_widget_loader").style.display = "block";
    } else {
        document.querySelector(".bgg_widget_loader").style.display = "none";
    }
}

function updateWidget(score, name) {
    document.querySelector(".bgg_widget_score").innerHTML = score;
    document.querySelector(".bgg_widget_name").innerHTML = name;
}

injectWidget();
setLoader(true);
let parser = new DOMParser();
let xmlSearchDoc = await promiseGet("https://api.geekdo.com/xmlapi2/search?query="+encodeURI(document.querySelector(".product-name").innerHTML));
let xmlSearchDoc = parser.parseFromString(xmlSearchDoc, 'text/xml');
if (xmlSearchDoc.getElementsByTagName("item")[0]) {
    let id = xmlSearchDoc.getElementsByTagName("item")[0].getAttribute("id");
    console.log("ID: "+id);
    let xmlScoreDoc = await promiseGet("https://api.geekdo.com/xmlapi2/thing?id="+id+"&stats=1");
    xmlScoreDoc = parser.parseFromString(xmlScoreDoc, 'text/xml');
    let name = xmlScoreDoc.getElementsByTagName("name")[0].getAttribute("value");
    let score = Math.round(parseInt(xmlScoreDoc.getElementsByTagName("average")[0].getAttribute("value")) * 10 ) / 10;
    updateWidget(score,name);
    setLoader(false);
} else {
    console.log("Item not found on board game geek");
}
    
