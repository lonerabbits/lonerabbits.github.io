function decide(){
    var quotesshow = document.getElementById("quotesshowinput").value;  
    document.querySelector("#quotesshow").textContent = quotesshow;

    var quotesfrom = document.getElementById("quotesfrominput").value;  
    document.querySelector("#quotesfrom").textContent = quotesfrom;
}

function convert(){
    html2canvas(document.querySelector("#pic"),{
        scale: 2.5
    }).then(function(canvas) {
//        document.body.appendChild(canvas);
        var imgURL = canvas.toDataURL();
        var dlink = document.createElement('a');
        dlink.href = imgURL;
        document.body.appendChild(dlink);
        dlink.click();
        document.body.removeChild(dlink);
    });
}
