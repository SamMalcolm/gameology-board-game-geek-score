document.addEventListener("DOMContentLoaded", function (e) {
    let xhr = new XMLHttpRequest();
    let parser = new DOMParser();
    xhr.open("GET","https://api.geekdo.com/xmlapi2/search?query="+encodeURI(document.querySelector(".product-name").innerHTML));
    xhr.onreadystatechange = function() {
        console.log("XHR STATUS: "+xhr.status);
        console.log("XHR READY STATE: "+xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                let xmlSearchDoc = parser(xhr.responseText,"text/xml");

            }
            catch(err) {
                console.log(err);
            }
        }

    }
}, false);