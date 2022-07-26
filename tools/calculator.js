//In vivo Formulation Calculator start
var mantissa = 4;
function ingredientCalRest(){
    $("#ingredient input").val("");
    $("#inResult").css("display", "none");
}
function ingredientCheck(){
    // var _isNull = false;
    var ingList = $("#ingredient input[name='ingredient']:visible");
    var i;
    for(i in ingList) {
        if (ingList[i].value == "") {
            $("#alert_message").text("请填写完整的计算数据");
            $("#alert").modal("show");
            // _isNull = true;
            return false;
        }
    }
    ingredientCalExc();
    $("#inResult").css("display", "block");
    if($("#peg300Td").css("display")!="none") {
        $("#inResult1").css("display", "block");
    }else{
        $("#inResult2").css("display", "block");
    };
    // if (_isNull) {
    //     return false;
    // };
}
function showOption(e){
    switch(e.value){
        case "0" :
            showPEG300();
            e.value="1";
            break;
        case "1":
            showCornOil();
            e.value="0";
            break;
    }
    $("#inResult").css("display", "none");
}
function showPEG300(){
    $("#cornOilTd").hide();
    $("#peg300Td").show();
    $("#peg300Td select").val("0");
    $("#inResult2").css("display", "none");
    $("#inResult1").css("display", "block");
}
function showCornOil(){
    $("#peg300Td").hide();
    $("#cornOilTd").show();
    $("#cornOilTd select").val("1");
    $("#inResult1").css("display", "none");
    $("#inResult2").css("display", "block");
}
//执行计算
function ingredientCalExc() {
    var iDosage = $("#iDosage").val();
    var iWeight = $("#iWeight").val();
    var iDosingVol = $("#iDosingVol").val();
    var iQty = $("#iQty").val();
    var dmso = parseFloat((Number($("#DMSO").val()/100)));
    if($("#cornOilTd").css("display")!="none") {
        dmso =parseFloat((Number($("#cornOilDMSO").val()/100)));
    }
    var peg300 = parseFloat((Number($("#PEG300").val()/100)));
    var tween80 = parseFloat((Number($("#Tween80").val()/100)));
    var ddh20 = parseFloat((Number((1 - dmso  - peg300  - tween80 ))));
    // 工作液浓度	6	mg/ml (请查询下该药物DMSO溶解度能否达到该值）(给药剂量x动物平均体重/每只动物给药体积）
    var  outputConcentration =  Number(iDosage * iWeight / iDosingVol);
    $("#outputConcentration").val(parseFloat(outputConcentration.toFixed(mantissa)));
    // DMSO母液配制方法：	24	mg药物溶于(工作液浓度/5%DMSO*母液体积/1000 )	200	ul DMSO溶液（动物数量x每只动物给药体积x5%DMSO)	（母液浓度：	120	mg/ml ）（mg药物/ul DMSO溶液*1000）
    var outputDMSOVol = Number(iQty * iDosingVol * dmso );
    var outputDMSOML = Number(outputConcentration / dmso );
    var outputDosage = Number(outputDMSOVol * outputDMSOML / 1000) ;
    $("#outputDosage").val(parseFloat(outputDosage.toFixed(mantissa)));
    $("#outputDMSOVol").val(parseFloat(outputDMSOVol.toFixed(mantissa)));
    $("#outputDMSOML").val(parseFloat(outputDMSOML.toFixed(mantissa)));
    if($("#cornOilTd").css("display")!="none"){
        var cornOilDmso = Number($("#cornOilDMSO").val()/100);
        var cornOil = Number($("#cornOil").val()/100);
        var outputDMSOVol =Number(iQty * iDosingVol * cornOilDmso );
        var invivoCornOil = Number(iQty * iDosingVol * cornOil );
        $("#invivoCornOil").val(parseFloat(invivoCornOil.toFixed(mantissa)));
        $("#invivoDMSO2").val(parseFloat(outputDMSOVol.toFixed(mantissa)));
    }
    if($("#peg300Td").css("display")!="none"){
        // 体内配方配制方法：	取	200	ul(动物数量x每只给药体积x5%DMSO)	DMSO母液，加入	1200	ul PEG300 (动物数量x每只给药体积x30% PEG300)，	混匀澄清后加入	400	ul Tween 80 (动物数量x每只给药体积xTween 80)，混匀澄清后加入	2200	ul ddH20 (动物数量x每只给药体积x60% ddH20)	，混匀澄清
        var invivoDMSO = outputDMSOVol;
        var invivoPEG300 = iQty * iDosingVol * peg300 ;
        var invivoTween80 = iQty * iDosingVol * tween80 ;
        var invivoddH2O = iDosingVol * iQty * ddh20  ;
        $("#invivoDMSO").val(parseFloat((Number(invivoDMSO).toFixed(mantissa))));
        $("#invivoPEG300").val(parseFloat((Number(invivoPEG300).toFixed(mantissa))));
        $("#invivoTween80").val(parseFloat((Number(invivoTween80).toFixed(mantissa))));
        $("#invivoddH2O").val(parseFloat((Number(invivoddH2O).toFixed(mantissa))));
    }

}
//第一行文本框保存2位小数
function isFigures(e){
    var value =e.value;
    if(!isNaN(Number(value))){
        if(value.indexOf(".") != -1){
            $(e).val(parseFloat(Number(value).toFixed(mantissa)));
        }
    }else{
        return $(e).val("");
    }
    checkAllInput();
}
function solventVol(e){
    var value =$(e).val();
    if(!isNaN(Number(value))){
        if(  value > 100 || value <= 0) {
            if (e.id == "Tween80"&& value != "") {
            }else{
                return errorAlert(e);
            }
        }
    }
    if($("#peg300Td").css("display")!="none")
        return trueAlert(e);
    else
        return cornOilTrueAlert(e);
}


function checkAllInput(){
    //数值改变是判断时候所有文本框都有值
    if ($("#ingredient input[value]").length == 0) {
        ingredientCalExc();
    }else{
        $("#inResult").css("display", "none");
    }
}
function cornOilTrueAlert(e){
    var inputs= $(e).parent().find("input");
    var bool =true;
    var ddh2o = 0;
    for(var i = 0 ; i < inputs.length ; i++ ){
        if(e.id != inputs[i].id){
            inputs[i].value = parseFloat((Number(100-e.value)).toFixed(1));
        }
    }
    checkAllInput();
}
//判断Dmso peg300  有空ddh2o不显示 都不为空 ddh2o显示 并将当前文本框值转为百分数； tween80
function trueAlert(e){
    var inputs= $(e).parent().find("input");
    var bool =true;
    var ddh2o = 0;
    for(var i = 0 ; i < 3 ; i++ ){
        if(Number(inputs[i].value)>0||(i==2 && inputs[i].value != "")){
            ddh2o +=  Number(toPoint(inputs[i].value));
        }else{
            bool = false;
        }
    }
    if(bool){
        $("#ddH20").val(parseFloat((100-ddh2o).toFixed(1)));
    }
    if(ddh2o <= 100){
        $(e).val(parseFloat((Number(e.value)).toFixed(1)));
    }else{
        errorAlert(e);
    }
    checkAllInput();
}
function errorAlert(e){
    $("#alert_message").text("请填写完整的计算数据");
    $("#alert").modal("show");
    $(e).val("");
    $("#ddH20").val("");
    $("#inResult").css("display", "none");
}


function toPoint(percent){
    if(percent.indexOf("%") == -1) return percent;
    var str=percent.replace("%","");
    str= str/100;
    return str;
}
function toPercent(point){
    if(percent.indexOf(".") == -1) return percent;
    var str=Number(point*100).toFixed(1);
    str+="%";
    return str;
}
////In vivo Formulation Calculator end
function calReset() {
    $("form[id$='Calc'] input").val("");
}

function GetUnit(value, ndec) {
    var factor = Math.pow(10, ndec)
    if(value < 1e-9) {
        return "-12";
    } else if(value < 1e-6) {
        return "-9";
    } else if(value < 1e-3) {
        return "-6";
    } else if(value < 1) {
        return "-3";
    } else {
        return "0";
    }
}

function FormatAmount(value, ndec) {
    var factor = Math.pow(10, ndec)
    if(value < 1e-9) {
        return(Math.round((value / 1e-12) * factor) / factor);
    } else if(value < 1e-6) {
        return(Math.round((value / 1e-9) * factor) / factor);
    } else if(value < 1e-3) {
        return(Math.round((value / 1e-6) * factor) / factor);
    } else if(value < 1) {
        return(Math.round((value / 1e-3) * factor) / factor);
    } else {
        return(Math.round((value) * factor) / factor);
    }
}

function CalcMolarity(form) {
    if(form.MolWt.value == "") {
        $("#alert_message").text("请输入分子量");
        $("#alert").modal("show");
    } else if(form.MassUnits.value < -6) {
        $("#alert_message").text("抱歉，本计算中不能使用此质量单位");
        $("#alert").modal("show");
    } else {
        var MassUnits = parseInt(form.MassUnits.value);
        var ConcUnits = parseInt(form.ConcUnits.value);
        var VolUnits = parseInt(form.VolUnits.value);
        var MolWt = parseFloat(form.MolWt.value);
        if(form.mass.value != '') {
            var mass = parseFloat(form.mass.value) * Math.pow(10, MassUnits);
        }
        if(form.concentration.value != '') {
            var conc = parseFloat(form.concentration.value) * Math.pow(10, ConcUnits);
        }
        if(form.volume.value != '') {
            var vol = parseFloat(form.volume.value) * Math.pow(10, VolUnits);
        }
        if(form.concentration.value == '') {
            if((form.volume.value != '') && (form.mass.value != '')) {
                var moles = mass / MolWt;
                var conc = moles / vol;
                form.concentration.value = FormatAmount(conc, 4);
                form.ConcUnits.value = GetUnit(conc, 4);
            } else {
                $("#alert_message").text("请填写完整的计算数据");
                $("#alert").modal("show");
            }
        } else if(form.volume.value == '') {
            if((form.concentration.value != '') && (form.mass.value != '')) {
                var moles = mass / MolWt;
                var vol = moles / conc;
                form.volume.value = FormatAmount(vol, 4);
                form.VolUnits.value = GetUnit(vol, 4);
            } else {
                $("#alert_message").text("请填写完整的计算数据");
                $("#alert").modal("show");
            }
        } else {
            if((form.concentration.value != '') && (form.volume.value != '')) {
                var moles = vol * conc;
                var mass = moles * MolWt;
                form.mass.value = FormatAmount(mass, 4);
                form.MassUnits.value = GetUnit(mass, 4);
            } else {
                $("#alert_message").text("请填写完整的计算数据");
                $("#alert").modal("show");
            }
        }
    }
}

function CalcDilute(form) {
    var ConcUnitsStart = parseInt(form.ConcUnitsStart.value);
    var VolUnitsStart = parseInt(form.VolUnitsStart.value);
    var ConcUnitsFinal = parseInt(form.ConcUnitsFinal.value);
    var VolUnitsFinal = parseInt(form.VolUnitsFinal.value);
    var checkNull=0;
    var startconc = parseFloat(form.concentrationStart.value) * Math.pow(10, ConcUnitsStart);
    if(!startconc) checkNull++;
    var volumeStart = parseFloat(form.volumeStart.value) * Math.pow(10, VolUnitsStart);
    if(!volumeStart) checkNull++;
    var finalconc = parseFloat(form.concentrationFinal.value) * Math.pow(10, ConcUnitsFinal);
    if(!finalconc) checkNull++;
    var volumeFinal = parseFloat(form.volumeFinal.value) * Math.pow(10, VolUnitsFinal);
    if(!volumeFinal) checkNull++;
    if(checkNull>1){
        $("#alert_message").text("请填写完整的计算数据");
        $("#alert").modal("show");
        return;
    }else if(checkNull==0){
        $("#alert_message").text("请留空一项");
        $("#alert").modal("show");
        return;
    }
    if(!startconc){
        //startconc*volumeStart=finalconc*volumeFinal;
        var VolNeeded = finalconc*volumeFinal/volumeStart;
        fromartResult(VolNeeded,form.ConcUnitsStart.options[0].value,form.concentrationStart,form.ConcUnitsStart)
        return ;
    }
    if(!volumeStart){
        var VolNeeded = finalconc*volumeFinal/startconc;
        fromartResult(VolNeeded,form.VolUnitsStart.options[0].value,form.volumeStart,form.VolUnitsStart)
        return ;
    }
    if(!finalconc){
        var VolNeeded = startconc*volumeStart/volumeFinal;
        fromartResult(VolNeeded,form.ConcUnitsFinal.options[0].value,form.concentrationFinal,form.ConcUnitsFinal)
        return ;
    }
    if(!volumeFinal){
        var VolNeeded = startconc*volumeStart/finalconc;
        fromartResult(VolNeeded,form.VolUnitsFinal.options[0].value,form.volumeFinal,form.VolUnitsFinal)
        return ;
    }
    $("#alert_message").text("请留空一项");
    $("#alert").modal("show");
}
function fromartResult(value,selectFristCompany,resultValue,resultCompany){
    var companyNumber=GetUnit(value, 4);
    if(selectFristCompany-companyNumber>0){
        resultValue.value= FormatAmount(value, 4)*Math.pow(0.1,selectFristCompany-companyNumber).toPrecision(6);
        resultCompany.value=selectFristCompany;
    }else{
        resultValue.value=FormatAmount(value, 4).toPrecision(6);
        resultCompany.value= companyNumber;
    }
}


function CalcSerialDilute(form) {
    var ConcentrationInit = parseFloat(form.concentrationInit.value);
    var DilutionFold = parseFloat(form.dilutionfold.value);
    var ConcentrationTemp = ConcentrationInit;
    for(i = 1; i < 9; i++) {
        ConcentrationTemp = ConcentrationTemp / DilutionFold;
        document.getElementById("concentration" + i).innerHTML = ConcentrationTemp;
        document.getElementById("logcon" + i).innerHTML = Math.log(ConcentrationTemp) / Math.log(10);
    }
}

function NoInput() {
    $("#alert_message").text("This is the volume that you are calculating.");
    $("#alert").modal("show");
}

function ffCompat(form) {
    if(form.submit === undefined) {
        var form;
        if($(".d-outer").find(form[0]).length != 0) {
            form = form[0];
        } else if($(".d-outer").find(form[1]).length != 0) {
            form = form[1];
        }
    }
    return form;
}

//MW
var atomString = ""
var badData=false
numAtoms=new Array(0,0,0,0,0,0,0,0,0,0)
ANofAtom=new Array(0,0,0,0,0,0,0,0,0,0)
var MolarMass="0"
var printS=""
var formula=""
var numElems=""
var capsLockOn=-1


function cmpd(numAtoms,ANofAtom,MM,printString) {
    this.numAtoms=numAtoms
    this.ANofAtom=ANofAtom
    this.MM=MM
    this.printString=printString
}

compound = new cmpd(numAtoms,ANofAtom,MolarMass,printS)
//document.onkeydown = checkKeycode

function parseFormula(formula) {
    var c=0; x=0; y=0; c1=0; marker1=0; marker2=-1; loopCount=0
    multiplier=1
    a1 = new Array(0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0)
    a2 = new Array(0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0)
    while (c <= formula.length - 1 && !badData) {
        AN = findAN(formula.substring(c,c+2))
        if (AN == -1) {
            AN = findAN(formula.substring(c,c+1))
            y=1
        }
        else y=2
        if (AN > -1) {
            marker2=-1
            for (var c2=0; c2<=9; c2++)  {
                if (a2[c2] == AN) {
                    marker2 = c2; break
                }
            }
            if (marker2>=0) {marker1=marker2; loopCount-=1}
            else marker1=loopCount
            c += y
            a2[marker1] = AN
            var OK = true
            var c3 = 0
            while (OK && c+c3 <= formula.length-1)  {
                AN = findNum(formula.substring(c+c3, c+c3+1))
                if (AN >= 0) c3++; else OK = false
            }
            if (c3>0) {
                if (marker2>=0) {
                    a1[marker1] += parseInt(formula.substring(c, c+c3))*multiplier
                }
                else {
                    a1[marker1] = parseInt(formula.substring(c, c+c3))*multiplier
                }
            }
            else {
                if (marker2>=0) a1[marker1] += 1*multiplier
                else a1[marker1] = 1*multiplier
            }
            c += c3;
            loopCount++
        }
        else {
            AN="[]().".indexOf(formula.substring(c,c+1));
            if (AN==-1) {badData=true;break}
            if (AN==0 || AN==2) {
                if (AN==2) {
                    var zz=0
                    for (x=c;x<=formula.length-1;x++) {
                        if (formula.substring(x,x+1)==")"){zz=x; break}
                    }
                }
                else {
                    for (x=c;x<=formula.length-1;x++) {
                        if (formula.substring(x,x+1)=="]"){zz=x; break}
                    }
                }
                var c4=1;OK=true
                while (OK && zz+c4 <= formula.length-1)  {
                    var AN1 = findNum(formula.substring(zz+c4, zz+c4+1))
                    if (AN1 >= 0) c4++; else OK = false
                }
                if (c4>1) {
                    var z=parseInt(formula.substring(1+zz, c4+zz));
                    multiplier=multiplier*z
                }
                c++
            }
            if (AN==1 || AN==3)  {
                var c5=1;OK=true
                while (OK && c+c5 <= formula.length-1)  {
                    var AN1 = findNum(formula.substring(c+c5, c+c5+1))
                    if (AN1 >= 0) c5++; else OK = false
                }
                if (c5>1) {
                    multiplier=
                        Math.round(multiplier /
                            parseInt(formula.substring(c+1,c+c5)))
                }
                c+=c5
            }
            if (AN==4)  {
                var c6=1; OK=true
                while (OK && c+c6 <= formula.length-1)  {
                    var AN1 = findNum(formula.substring(c+c6, c+c6+1))
                    if (AN1 >= 0) c6++; else OK = false
                }
                if (c6>1) {
                    multiplier *= parseInt(formula.substring(c+1, c+c6))
                }
                c+=c6
            }
        }
    }
    numElems = loopCount-1
    for (var i=0; i<=numElems; i++)  {
        numAtoms[i] = a1[i]
        ANofAtom[i] = a2[i]
    }
    if (badData==true) {
        $("#alert_message").text("请输入正确的化学式");
        $("#alert").modal("show");
    }
}

function findAN(aSym) {
    var AN = 0
    if (aSym.length == 1) aSym +="*"
    var x = atomString.indexOf(aSym)
    AN = (x == -1) ?  x : (x/2) + 1
    return AN
}

function findNum(ch) {
    var numstring = "0123456789"
    var x = numstring.indexOf(ch)
    return x
}

function calcMolarMass()  {
    MM = 0
    for (var c=0; c<=numElems; c++)  {
        var x =ANofAtom[c]
        MM += a[x]["mass"]*numAtoms[c]
    }
    MM=Math.round(MM*100)/100
}

function printFormula()  {
    printS=""
    for (var c=0; c<=numElems; c++)  {
        printS += a[ANofAtom[c]["symbol"]]
        if (numAtoms[c]>1) printS += "<sub>"+numAtoms[c]+"</sub>"
    }
}

function atomArray(symbol, mass) {
    this.symbol = symbol
    this.mass = mass
}

function makeArray(arraySize) {
    this.length = arraySize
    for (var c=1; c <= arraySize; c++) {
        this[c] = 0
    }
    return this
}

a = new makeArray(109)
a[1] = new atomArray("H",1.0079)
a[2] = new atomArray("He",4.0026)
a[3] = new atomArray("Li",6.941)
a[4] = new atomArray("Be",9.0122)
a[5] = new atomArray("B",10.811)
a[6] = new atomArray("C",12.0107)
a[7] = new atomArray("N",14.0067)
a[8] = new atomArray("O",15.9994)
a[9] = new atomArray("F",18.9984)
a[10] = new atomArray("Ne",20.1797)
a[11] = new atomArray("Na",22.9897)
a[12] = new atomArray("Mg",24.305)
a[13] = new atomArray("Al",26.9815)
a[14] = new atomArray("Si",28.0855)
a[15] = new atomArray("P",30.9738)
a[16] = new atomArray("S",32.065)
a[17] = new atomArray("Cl",35.453)
a[18] = new atomArray("Ar",39.948)
a[19] = new atomArray("K",39.0983)
a[20] = new atomArray("Ca",40.078)
a[21] = new atomArray("Sc",44.9559)
a[22] = new atomArray("Ti",47.867)
a[23] = new atomArray("V",50.9415)
a[24] = new atomArray("Cr",51.9961)
a[25] = new atomArray("Mn",54.938)
a[26] = new atomArray("Fe",55.845)
a[27] = new atomArray("Co",58.9332)
a[28] = new atomArray("Ni",58.6934)
a[29] = new atomArray("Cu",63.546)
a[30] = new atomArray("Zn",65.39)
a[31] = new atomArray("Ga",69.723)
a[32] = new atomArray("Ge",72.64)
a[33] = new atomArray("As",74.9216)
a[34] = new atomArray("Se",78.96)
a[35] = new atomArray("Br",79.904)
a[36] = new atomArray("Kr",83.8)
a[37] = new atomArray("Rb",85.4678)
a[38] = new atomArray("Sr",87.62)
a[39] = new atomArray("Y",88.9059)
a[40] = new atomArray("Zr",91.224)
a[41] = new atomArray("Nb",92.9064)
a[42] = new atomArray("Mo",95.94)
a[43] = new atomArray("Tc",98)
a[44] = new atomArray("Ru",101.07)
a[45] = new atomArray("Rh",102.9055)
a[46] = new atomArray("Pd",106.42)
a[47] = new atomArray("Ag",107.8682)
a[48] = new atomArray("Cd",112.411)
a[49] = new atomArray("In",114.818)
a[50] = new atomArray("Sn",118.71)
a[51] = new atomArray("Sb",121.76)
a[52] = new atomArray("Te",127.6)
a[53] = new atomArray("I",126.9045)
a[54] = new atomArray("Xe",131.293)
a[55] = new atomArray("Cs",132.9055)
a[56] = new atomArray("Ba",137.327)
a[57] = new atomArray("La",138.9055)
a[58] = new atomArray("Ce",140.116)
a[59] = new atomArray("Pr",140.9077)
a[60] = new atomArray("Nd",144.24)
a[61] = new atomArray("Pm",145)
a[62] = new atomArray("Sm",150.36)
a[63] = new atomArray("Eu",151.964)
a[64] = new atomArray("Gd",157.25)
a[65] = new atomArray("Tb",158.9253)
a[66] = new atomArray("Dy",162.5)
a[67] = new atomArray("Ho",164.9303)
a[68] = new atomArray("Er",167.259)
a[69] = new atomArray("Tm",168.9342)
a[70] = new atomArray("Yb",173.04)
a[71] = new atomArray("Lu",174.967)
a[72] = new atomArray("Hf",178.49)
a[73] = new atomArray("Ta",180.9479)
a[74] = new atomArray("W",183.84)
a[75] = new atomArray("Re",186.207)
a[76] = new atomArray("Os",190.23)
a[77] = new atomArray("Ir",192.217)
a[78] = new atomArray("Pt",195.078)
a[79] = new atomArray("Au",196.9665)
a[80] = new atomArray("Hg",200.59)
a[81] = new atomArray("Tl",204.3833)
a[82] = new atomArray("Pb",207.2)
a[83] = new atomArray("Bi",208.9804)
a[84] = new atomArray("Po",209)
a[85] = new atomArray("At",210)
a[86] = new atomArray("Rn",222)
a[87] = new atomArray("Fr",223)
a[88] = new atomArray("Ra",226)
a[89] = new atomArray("Ac",227)
a[90] = new atomArray("Th",232.0381)
a[91] = new atomArray("Pa",231.0359)
a[92] = new atomArray("U",238.0289)
a[93] = new atomArray("Np",237)
a[94] = new atomArray("Pu",244)
a[95] = new atomArray("Am",243)
a[96] = new atomArray("Cm",247)
a[97] = new atomArray("Bk",247)
a[98] = new atomArray("Cf",251)
a[99] = new atomArray("Es",252)
a[100] = new atomArray("Fm",257)
a[101] = new atomArray("Md",258)
a[102] = new atomArray("No",259)
a[103] = new atomArray("Lr",262)
a[104] = new atomArray("Rf",261)
a[105] = new atomArray("Db",262)
a[106] = new atomArray("Sg",266)
a[107] = new atomArray("Bh",264)
a[108] = new atomArray("Hs",277)
a[109] = new atomArray("Mt",268)

function makeAtomString()  {
    for (var c=1; c <= a.length; c++)  {
        atomString += a[c]["symbol"]
        if (a[c]["symbol"].length == 1) atomString += "*"
    }
    return atomString
}

function prepare(form) {
    form.inputFormula.value = "CH3COOH"
    findChemicalFormula(form)
    writeOut()
}

function findChemicalFormula(form) {
    numPulldownMenus = document.entryForm.elements.length -2
    for (i=0; i<numPulldownMenus; i++) {
        arrayOptions = form.elements[i].options
        numOptions = arrayOptions.length
        for (j=0; j<numOptions; j++) {
            if(arrayOptions[j].value == form.inputFormula.value) {
                arrayOptions.selectedIndex = j
                return null
            }
            else {
                arrayOptions.selectedIndex = 0
            }
        }
    }
}


function setChemicalFormula(pulldownMenu) {
    if (pulldownMenu.selectedIndex !== 0) {
        document.entryForm.inputFormula.value = pulldownMenu.value
        numPulldownMenus = document.entryForm.elements.length -2
        for (i=0; i<numPulldownMenus; i++) {
            if (document.entryForm.elements[i].id !== pulldownMenu.id) {
                document.entryForm.elements[i].selectedIndex = 0
            }
        }
        writeOut()
    }
    else {
        document.entryForm.inputFormula.focus()
    }
}



function writeOut(inDilog){var numCols=5
    var numHeadRows=2
    var numFootRows=1
    var numSignificance=2
    var formula=null,output=null,entryForm=null,iform = null,oform = null;
    if(inDilog===true){
        iform = ffCompat(document.entryForm);
        oform = ffCompat(document.outputForm);
    }
    else{
        iform = document.entryForm;
        oform = document.outputForm;
    }
    formula=iform.inputFormula.value;
    output=oform.outputMM;
    entryForm=iform.inputFormula;
    makeAtomString();
    parseFormula(formula)
    if(badData==false){calcMolarMass()
        output.value=MM.toFixed(numSignificance);}
    else{;}
    badData=false;
}

//控制input内容输入为数字
function toNum(v) {
    return v.replace(/[^\d.]/g, '').replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace("NaN", "");
}