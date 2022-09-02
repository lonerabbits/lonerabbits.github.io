function calculate(){
    var mass = document.getElementById('mass').value;
    var concentration = document.getElementById('concentration').value;
    var volume = document.getElementById('volume').value;
    var molecular_weight = document.getElementById('molecular-weight').value;
    var molarity_result;
    var check_array = new Array(mass, concentration, volume, molecular_weight);
    if (check(check_array) == 1){
        //根据进率对各项数据标准化
        var mass_unit = document.getElementById('mass_unit').value;
        mass = standardize(mass, mass_unit);
        var concentration_unit = document.getElementById('concentration_unit').value;
        concentration = standardize(concentration, concentration_unit);
        var volume_unit = document.getElementById('volume_unit').value;
        volume = standardize(volume, volume_unit);
        //决定计算方式
        if (mass == '') {
            molarity_result = concentration * volume * molecular_weight * mass_unit;
            document.getElementById('mass').value = molarity_result;
        } else if (concentration == '') {
            molarity_result = mass / volume / molecular_weight * concentration_unit;
            document.getElementById('concentration').value = molarity_result;
        } else if (volume == '') {
            molarity_result = mass / concentration / molecular_weight * volume_unit;
            document.getElementById('volume').value = molarity_result;
        }
    } else {
        alert('请正确输入数据');
    }
}

//将为0的数据提取为一个新的数组，通过判断数组长度判断为0值的个数
function check(check_array){
    var temp_array = check_array.filter(function(item){return item == 0});
    return temp_array.length;
}

function reset(){
    document.getElementById('mass').value = null;
    document.getElementById('concentration').value = null;
    document.getElementById('volume').value = null;
    document.getElementById('molecular-weight').value = null;
}

function standardize(item, rate){
    var standard_item = item / rate;
    return standard_item;
}
