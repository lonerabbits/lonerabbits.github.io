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
        var imgUrl = canvas.toDataURL("image/png");
        var holderImage = document.getElementById('holder');
        holderImage.src = imgUrl;
    });
}
