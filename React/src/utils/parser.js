//convert ascii text to hex
export function a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return "0x" + arr.join('');
}

//convert ascii text to 32byte
export function aTo32bytehex(str, length=32) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    if(length != 0){
    for (var i = arr.length; i < length; i ++) {
        var hex = "00";
        arr.push(hex);
        }
    }
    return "0x" + arr.join('');
}

//convert ascii text to 32byte
export function intToUint(str) {
    var hex = Number(str).toString(16);
    let hexData = hex

    while(hexData.length < 64){
        hexData = "0" + hexData
    }

    return "0x" + hexData;
}

//convert hex to ascii
export function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

export function Time2a(timestamp){
    var s = new Date(timestamp*1000).toLocaleDateString("en-GB");
    return s;
}


