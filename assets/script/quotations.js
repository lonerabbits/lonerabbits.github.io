function decide(){
    var quotesshow = document.getElementById("quotesshowinput").value;  
    document.querySelector("#quotesshow").textContent = quotesshow;

    var quotesfrom = document.getElementById("quotesfrominput").value;  
    document.querySelector("#quotesfrom").textContent = quotesfrom;
}

function convert(){
    html2canvas(document.querySelector("#pic"),{
        scale: 2.5, backgroundColor: null
    }).then(function(canvas) {
        var imgUrl = canvas.toDataURL("image/png");
        var holderImage = document.getElementById('holder');
        var picHeight = document.getElementById('pic').clientHeight;
        holderImage.src = imgUrl;
        holderImage.height = picHeight;
    });
}

function decideBackground1(){
    document.querySelector("#pic").style.background = '#cc2831';
}
function decideBackground2(){
    document.querySelector("#pic").style.background = '#007d1b';
}
function decideBackground3(){
    document.querySelector("#pic").style.background = '#3d489a';
}
