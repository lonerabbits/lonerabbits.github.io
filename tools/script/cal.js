function run() {
    var mass = document.getElementById('mass').value;
    var concentration = document.getElementById('concentration').value;
    var volume = document.getElementById('volume').value;
    var molecular_weight = document.getElementById('molecular-weight').value;
    var molarity_result;
    if (mass == '') {
        molarity_result = concentration * volume * molecular_weight / 1000000;
        document.getElementById('mass').value = molarity_result;
    } else if (concentration == '') {
        molarity_result = mass * 1000000 / volume / molecular_weight;
        document.getElementById('concentration').value = molarity_result;
    } else if (volume == '') {
        molarity_result = mass * 1000000 / concentration / molecular_weight;
        document.getElementById('volume').value = molarity_result;
    } else {
        alert('请正确输入数据');
    }
}
