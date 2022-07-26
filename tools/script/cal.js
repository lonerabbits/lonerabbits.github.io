function run() {
    // var mass = document.getElementById('mass').value;
    var concentration = document.getElementById('concentration').value;
    var volume = document.getElementById('volume').value;
    var molecular_weight = document.getElementById('molecular-weight').value;
    x = concentration * volume * molecular_weight / 1000000;
    document.getElementById('output').innerHTML = x;
}
