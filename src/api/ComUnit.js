
import $ from "jquery";

/*
* 功能：对JSON对象字符串数组进行多字段（多列）排序
* 参数：
*   objArr: 目标数组
*   keyArr: 排序字段，以数组形式传递
*   type：排序方式，undefined以及asc都是按照升序排序，desc按照降序排序
* sortObjectArray(_RIVERJIEBIE.data, ['ORDERS'], 'asc');
* */
function sortObjectArray(objArr, keyArr, type) {
    if (type != undefined && type != 'asc' && type != 'desc') {
        return 'error';
    }
    var order = 1;
    if (type != undefined && type == 'desc') {
        order = -1;
    }
    var key = keyArr[0];
    objArr.sort(function (objA, objB) {
        if (objA[key] > objB[key]) {
            return order;
        } else if (objA[key] < objB[key]) {
            return 0 - order;
        } else {
            return 0;
        }
    })
    for (var i = 1; i < keyArr.length; i++) {
        var key = keyArr[i];
        objArr.sort(function (objA, objB) {
            for (var j = 0; j < i; j++) {
                if (objA[keyArr[j]] != objB[keyArr[j]]) {
                    return 0;
                }
            }
            if (objA[key] > objB[key]) {
                return order;
            } else if (objA[key] < objB[key]) {
                return 0 - order;
            } else {
                return 0;
            }
        })
    }
    return objArr;
}
function SetNull(strVal) {
    if (strVal == undefined || strVal == null || strVal == "" || strVal == "null") {
        strVal = "";
    }
    return strVal;
}
const validateAndClean = (val,valF=2) => {
    // 1. 先处理空值/未定义情况
    if (!val) return ""; 
    
    // 2. 转换为数字
    const num = Number(val);
    
    // 3. 检查是否为有效数字 且 大于 0
    // 注意：这里使用 !isNaN 防止非数字字符串被误删
    if (!isNaN(num)) {
        return num.toFixed(valF); 
    }
    
    return "";
};
/////////
///groupBy(dataResult, 'FENBU')
////////
function groupBy(array, name) {
    const groups = {}
    array.forEach(function (o) {
        const group = JSON.stringify(o[name])
        groups[group] = groups[group] || []
        groups[group].push(o)
    })
    return Object.keys(groups).map(function (group) {
        return groups[group]
    })
}
function listToTree(dataList, id, pId) {
    const data = JSON.parse(JSON.stringify(dataList));
    const result = [];

    // 检查数据是否为数组
    if (!Array.isArray(data)) {
        return result;
    }

    // 移除每个数据项中的 children 属性
    data.forEach((item) => {
        delete item.children;
    });

    // 创建一个映射对象，用于快速查找节点
    const map = {};
    data.forEach(item => {
        map[item[id]] = item;
    });

    // 构建树形结构
    data.forEach(item => {
        const parent = map[item[pId]];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });

    return result;
};

function GetSZStateBy(TP, O2, AN, COD, CODMN, PH) {
    var PHSTATE = DaT("ph", PH);

    var TPSTATE = DaT("tp", TP);

    var O2STATE = DaT("dox", O2);

    var ANSTATE = DaT("nh3n", AN);

    var CODSTATE = DaT("codcr", COD);

    var CODMNSTATE = DaT("codmn", CODMN);

    var MAXSTATE = 0;
    var numbers = [TPSTATE, O2STATE, ANSTATE, CODSTATE, CODMNSTATE, PHSTATE];//定长 
    for (var i = 0; i < numbers.length; i++) {
        var state = parseInt(numbers[i]);
        if (state > MAXSTATE) {
            MAXSTATE = state;
        }
    }
    return MAXSTATE;
}
//水质
function DaT(TYPE, val) {
    var result = 0;
    if (val == null || val == "") {
        return result;
    }
    if (parseFloat(val) == 0 || parseFloat(val) == 10000) {
        return result;
    }
    if (TYPE == "ph" || TYPE == "PH") {
        if (parseFloat(val) >= 6 && parseFloat(val) <= 9) {
            result = 1;
        }
        else {
            result = 6;
        }
    }
    else if (TYPE == "tp" || TYPE == "TP") {
        if (parseFloat(val) <= 0.02) {
            result = 1;
        }
        if (parseFloat(val) > 0.02 && parseFloat(val) <= 0.1) {
            result = 2;
        }
        if (parseFloat(val) > 0.1 && parseFloat(val) <= 0.2) {
            result = 3;
        }
        if (parseFloat(val) > 0.2 && parseFloat(val) <= 0.3) {
            result = 4;
        }
        if (parseFloat(val) > 0.3 && parseFloat(val) <= 0.4) {
            result = 5;
        }
        if (parseFloat(val) > 0.4) {
            result = 6;
        }
    }
    else if (TYPE == "dox" || TYPE == "DOX" || TYPE == "o2") {
        if (parseFloat(val) >= 7.5) {
            result = 1;
        }
        if (parseFloat(val) >= 6 && parseFloat(val) < 7.5) {
            result = 2;
        }
        if (parseFloat(val) >= 5 && parseFloat(val) < 6) {
            result = 3;
        }
        if (parseFloat(val) >= 3 && parseFloat(val) < 5) {
            result = 4;
        }
        if (parseFloat(val) >= 2 && parseFloat(val) < 3) {
            result = 5;
        }
        if (parseFloat(val) < 2) {
            result = 6;
        }
    }
    else if (TYPE == "codcr") {
        if (parseFloat(val) < 15) {
            result = 1;
        }
        if (parseFloat(val) == 15) {
            result = 2;
        }
        if (parseFloat(val) > 15 && parseFloat(val) <= 20) {
            result = 3;
        }
        if (parseFloat(val) > 20 && parseFloat(val) <= 30) {
            result = 4;
        }
        if (parseFloat(val) > 30 && parseFloat(val) <= 40) {
            result = 5;
        }
        if (parseFloat(val) > 40) {
            result = 6;
        }
    }
    else if (TYPE == "codmn" || TYPE == "comn" || TYPE == "condv" || TYPE == "CODMN") {
        if (parseFloat(val) <= 2) {
            result = 1;
        }
        if (parseFloat(val) > 2 && parseFloat(val) <= 4) {
            result = 2;
        }
        if (parseFloat(val) > 4 && parseFloat(val) <= 6) {
            result = 3;
        }
        if (parseFloat(val) > 6 && parseFloat(val) <= 10) {
            result = 4;
        }
        if (parseFloat(val) > 10 && parseFloat(val) <= 15) {
            result = 5;
        }
        if (parseFloat(val) > 15) {
            result = 6;
        }
    }
    else if (TYPE == "nh3n" || TYPE == "NH3N" || TYPE == "an" || TYPE == "nh") {
        if (parseFloat(val) <= 0.15) {
            result = 1;
        }
        if (parseFloat(val) > 0.15 && parseFloat(val) <= 0.5) {
            result = 2;
        }
        if (parseFloat(val) > 0.5 && parseFloat(val) <= 1.0) {
            result = 3;
        }
        if (parseFloat(val) > 1.0 && parseFloat(val) <= 1.5) {
            result = 4;
        }
        if (parseFloat(val) > 1.5 && parseFloat(val) <= 2) {
            result = 5;
        }
        if (parseFloat(val) > 2) {
            result = 6;
        }

    }
    else if (TYPE == "tn" || TYPE == "TN") {
        if (parseFloat(val) <= 0.3) {
            result = 1;
        }
        if (parseFloat(val) > 0.3 && parseFloat(val) <= 0.5) {
            result = 2;
        }
        if (parseFloat(val) > 0.5 && parseFloat(val) <= 1) {
            result = 3;
        }
        if (parseFloat(val) > 1 && parseFloat(val) <= 1.5) {
            result = 4;
        }
        if (parseFloat(val) > 1.5 && parseFloat(val) <= 2) {
            result = 5;
        }
        if (parseFloat(val) > 2) {
            result = 6;
        }
    }
    return result;
}

function GetSZState(state) {
    if (state == "1") {
        state = "I类";
    } else if (state == "2") {
        state = "II类";
    } else if (state == "3") {
        state = "III类";
    } else if (state == "4") {
        state = "IV类";
    } else if (state == "5") {
        state = "V类";
    } else if (state == "6") {
        state = "劣V类";
    } else {
        state = "缺测";
    }
    return state;
}

function GetSZStateNumber(state) {
    if (state == "I") {
        state = 1;
    } else if (state == "II") {
        state = 2;
    } else if (state == "III") {
        state = 3;
    } else if (state == "IV") {
        state = 4;
    } else if (state == "V") {
        state = 5;
    } else if (state == "劣V") {
        state = 6;
    } else {
        state = 0;
    }
    return state;
}


function getSZColor(sztype) {
    var LineColor = ["#ABABA9", "#8BEAC3", '#27E022', '#229FE0', '#E0CF22', '#FD5B30', '#F70727'];
    if (sztype == "1" || sztype == "I") {
        return LineColor[1];
    } else if (sztype == "2" || sztype == "II") {
        return LineColor[2];
    } else if (sztype == "3" || sztype == "III") {
        return LineColor[3];
    } else if (sztype == "4" || sztype == "IV") {
        return LineColor[4];
    } else if (sztype == "5" || sztype == "V") {
        return LineColor[5];
    } else if (sztype == "6" || sztype == "劣V") {
        return LineColor[6];
    } else {
        return LineColor[0];
    }
}
function getPieces(id) {
    var LineColor = ['#8BEAC3', '#27E022', '#229FE0', '#E0CF22', '#FD5B30', '#E10724', '#D3CFCF'];
    var _ydataAN = [
        { lte: 0.15, color: LineColor[0], label: 'I类(0-0.15)' },
        { gt: 0.15, lte: 0.5, color: LineColor[1], label: 'II类(0.15-0.5)' },
        { gt: 0.5, lte: 1, color: LineColor[2], label: 'III类(0.5-1.0)' },
        { gt: 1, lte: 1.5, color: LineColor[3], label: 'IV类(1.0-1.5)' },
        { gt: 1.5, lte: 2, color: LineColor[4], label: 'V类(>1.5)' },
        { gt: 2, color: LineColor[5], label: '劣V类(>2)' }
    ];
    var _ydataTURBIDITE = [
        { gt: 0, lte: 10, color: LineColor[4], label: '重度黑臭(0-10)' },
        { gt: 10, lte: 25, color: LineColor[3], label: '轻度黑臭(10-25)' },
        { gt: 25, color: LineColor[2], label: 'III类(>25)' }
    ];
    var _ydataO2 = [
        { gte: 7.5, color: LineColor[0], label: 'I类(>=7.5)' },
        { gte: 6, lt: 7.5, color: LineColor[1], label: 'II类(6-7.5)' },
        { gte: 5, lt: 6, color: LineColor[2], label: 'III类(5-6)' },
        { gte: 3, lt: 5, color: LineColor[3], label: 'IV类(3-5)' },
        { gte: 2, lt: 3, color: LineColor[4], label: 'V类(0-3)' },
        { lt: 2, color: LineColor[5], label: '劣V类(>7.5)' }
    ];
    var _ydataCODMN = [
        { lte: 2, color: LineColor[0], label: 'I类(0-2)' },
        { gt: 2, lte: 4, color: LineColor[1], label: 'II类(2-4)' },
        { gt: 4, lte: 6, color: LineColor[2], label: 'III类(4-6)' },
        { gte: 6, lte: 10, color: LineColor[3], label: 'IV类(6-10)' },
        { gt: 10, lte: 15, color: LineColor[4], label: 'V类(>10)' },
        { gt: 15, color: LineColor[4], label: '劣V类(>15)' }
    ];
    var _ydataCOD = [
        { lt: -200, color: LineColor[4], label: 'V类(<-200)' },
        { lte: 50, gte: -200, color: LineColor[3], label: 'IV类(-200-50)' },
        { gt: 50, color: LineColor[2], label: 'III类(>50)' }
    ];
    var _ydataPH = [
        { lte: 6, color: LineColor[5], label: '劣V类(0-6)' },
        { gt: 6, lte: 9, color: LineColor[2], label: 'V类(6-9)' },
        { gt: 9, color: LineColor[5], label: '劣V类(>9)' },
    ];
    var _ydataTP = [
        { lte: 0.02, color: LineColor[0], label: 'I类(<=0.02)' },
        { gt: 0.02, lte: 0.1, color: LineColor[1], label: 'II类(0.02-0.1)' },
        { gt: 0.1, lte: 0.2, color: LineColor[2], label: 'III类(0.1-0.2)' },
        { gt: 0.2, lte: 0.3, color: LineColor[3], label: 'IV类(0.2-0.3)' },
        { gt: 0.3, lte: 0.4, color: LineColor[4], label: 'V类(0.3-0.4)' },
        { gt: 0.4, color: LineColor[5], label: '劣V类(>0.4)' },
    ];
    var _ydataTN = [
        { lte: 0.2, color: LineColor[0], label: 'I类(<=0.2)' },
        { gt: 0.2, lte: 0.5, color: LineColor[1], label: 'II类(0.2-0.5)' },
        { gt: 0.5, lte: 1, color: LineColor[2], label: 'III类(0.5-1)' },
        { gt: 1, lte: 1.5, color: LineColor[3], label: 'IV类(1-1.5)' },
        { gt: 1.5, lte: 2, color: LineColor[4], label: 'V类(1.5-2)' },
        { gt: 2, color: LineColor[5], label: '劣V类(2<)' }
    ];
    var _ydataSTATE = [{
        lte: 1,
        color: LineColor[0],
        label: 'I类(<=1)'
    }, {
        gt: 1.0001,
        lte: 2.0001,
        color: LineColor[1],
        label: 'II类(1-2)'
    }, {
        gt: 2.0002,
        lte: 3.0001,
        color: LineColor[2],
        label: 'III类(2-3)'
    }, {
        gt: 3.0001,
        lte: 4.0001,
        color: LineColor[3],
        label: 'IV类(3-4)'
    }, {
        gt: 4.0001,
        lte: 5.0001,
        color: LineColor[4],
        label: 'V类(4-5)'
    }, {
        gt: 5.0001,
        color: LineColor[5],
        label: '劣V类(5<)'
    }];

    var _YDATA = [];
    if (id == "AN" || id == "an" || id == "nh") {
        _YDATA = _ydataAN;
    } else if (id == "TP" || id == "tp") {
        _YDATA = _ydataTP;
    } else if (id == "TURBIDITE") {
        _YDATA = _ydataTURBIDITE;
    } else if (id == "O2" || id == "o2" || id == "do") {
        _YDATA = _ydataO2;
    } else if (id == "CODMN" || id == "condv") {
        _YDATA = _ydataCODMN;
    } else if (id == "COD") {
        _YDATA = _ydataCOD;
    } else if (id == "PH" || id == "ph") {
        _YDATA = _ydataPH;
    } else if (id == "TN" || id == "tn") {
        _YDATA = _ydataTN;
    }
    else if (id == "STATE" || id == "state") {
        _YDATA = _ydataSTATE;
    }

    return _YDATA;
}
//将数据转化为数字类型，保留小数
function changeTwoDecimal(x, format) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return "-";
    }
    return f_x.toFixed(format);
}
function getshuizhiChart(field, value, typeid = 1) {
    if (value == "-" || value == "") {
        value = "0";
    }
    var listColor = ['#D3CFCF', '#3588DD', '#47C711', '#FAD405', '#F5210D', '#EB08C5', '#FFFFFF']
    value = Number(value);
    var str = "";
    if (field == "ph") {
        if (typeid == 1) {
            if (value >= 6 && value <= 9) {
                str = "<span style='color:#1EEF7C;'>" + field + ": " + value.toFixed(2) + "(Ⅰ)</span>";
            }
            else {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "(劣Ⅴ)</span>";
            }
        } else {
            if (value >= 6 && value <= 9) {
                str = field + ": " + value.toFixed(2) + "<span style='color:#1EEF7C;'>" + "(Ⅰ)</span>";
            }
            else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }
        }

    }
    if (field == "溶解氧") {
        if (typeid == 1) {
            if (value >= 7.5) {
                str = "<span style='color:" + listColor[1] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅰ)</span>";
            }
            else if (value >= 6) {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅱ)</span>";
            }
            else if (value >= 5) {
                str = "<span style='color:" + listColor[3] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅲ)</span>";
            }
            else if (value >= 3) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅳ)</span>";
            }
            else if (value >= 2) {
                str = "<span style='color:" + listColor[5] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅴ)</span>";
            }
            else {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "(劣Ⅴ)</span>";
            }
        } else {
            if (value >= 7.5) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[1] + ";'>" + "(Ⅰ)</span>";
            }
            else if (value >= 6) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[2] + ";'>" + "(Ⅱ)</span>";
            }
            else if (value >= 5) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[3] + ";'>" + "(Ⅲ)</span>";
            }
            else if (value >= 3) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[4] + ";'>" + "(Ⅳ)</span>";
            }
            else if (value >= 2) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[5] + ";'>" + "(Ⅴ)</span>";
            }
            else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }
        }

    }
    if (field == "化学需氧量") {
        if (typeid == 1) {
            if (value <= 15) {
                str = "<span style='color:" + listColor[1] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅰ)</span>";
            }
            else if (value <= 15) {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅱ)</span>";
            }
            else if (value <= 20) {
                str = "<span style='color:" + listColor[3] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅲ)</span>";
            }
            else if (value <= 30) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅳ)</span>";
            }
            else if (value <= 40) {
                str = "<span style='color:" + listColor[5] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅴ)</span>";
            }
            else {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "(劣Ⅴ)</span>";
            }
        } else {
            if (value <= 15) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[1] + ";'>" + "(Ⅰ)</span>";
            }
            else if (value <= 15) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[2] + ";'>" + "(Ⅱ)</span>";
            }
            else if (value <= 20) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[3] + ";'>" + "(Ⅲ)</span>";
            }
            else if (value <= 30) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[4] + ";'>" + "(Ⅳ)</span>";
            }
            else if (value <= 40) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[5] + ";'>" + "(Ⅴ)</span>";
            }
            else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }
        }

    }
    if (field == "氨氮") {
        if (value <= 0.15) {
            if (typeid == 1) {
                str = "<span style='color:" + listColor[1] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅰ)</span>";
            } else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[1] + ";'>" + "(Ⅰ)</span>";
            }
        }
        else if (value <= 0.5) {
            if (typeid == 1) {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅱ)</span>";
            } else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[2] + ";'>" + "(Ⅱ)</span>";
            }
        }
        else if (value <= 1.0) {
            if (typeid == 1) {
                str = "<span style='color:" + listColor[3] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅲ)</span>";
            } else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[3] + ";'>" + "(Ⅲ)</span>";
            }
        }
        else if (value <= 1.5) {
            if (typeid == 1) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅳ)</span>";
            } else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[4] + ";'>" + "(Ⅳ)</span>";
            }
        }
        else if (value <= 2.0) {
            if (typeid == 1) {
                str = "<span style='color:" + listColor[5] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅴ)</span>";
            } else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[5] + ";'>" + "(Ⅴ)</span>";
            }
        }
        else {
            if (typeid == 1) {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "(劣Ⅴ)</span>";
            } else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }
        }
    }
    if (field == "总磷") {
        if (typeid == 1) {
            if (value <= 0.02) {
                str = "<span style='color:" + listColor[1] + ";'>" + field + ": " + value.toFixed(3) + "(Ⅰ)</span>";
            }
            else if (value <= 0.1) {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(3) + "(Ⅱ)</span>";
            }
            else if (value <= 0.2) {
                str = "<span style='color:" + listColor[3] + ";'>" + field + ": " + value.toFixed(3) + "(Ⅲ)</span>";
            }
            else if (value <= 0.3) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(3) + "(Ⅳ)</span>";
            }
            else if (value <= 0.4) {
                str = "<span style='color:" + listColor[5] + ";'>" + field + ": " + value.toFixed(3) + "(Ⅴ)</span>";
            }
            else {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(3) + "(劣Ⅴ)</span>";
            }

        } else {

            if (value <= 0.02) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[1] + ";'>" + "(Ⅰ)</span>";
            }
            else if (value <= 0.1) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[2] + ";'>" + "(Ⅱ)</span>";
            }
            else if (value <= 0.2) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[3] + ";'>" + "(Ⅲ)</span>";
            }
            else if (value <= 0.3) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[4] + ";'>" + "(Ⅳ)</span>";
            }
            else if (value <= 0.4) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[5] + ";'>" + "(Ⅴ)</span>";
            }
            else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }
        }

    }
    if (field == "总氮") {
        if (typeid == 1) {
            if (value <= 0.2) {
                str = "<span style='color:" + listColor[1] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅰ)</span>";
            }
            else if (value <= 0.5) {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅱ)</span>";
            }
            else if (value <= 1.0) {
                str = "<span style='color:" + listColor[3] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅲ)</span>";
            }
            else if (value <= 1.5) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅳ)</span>";
            }
            else if (value <= 2.0) {
                str = "<span style='color:" + listColor[5] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅴ)</span>";
            }
            else {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "(劣Ⅴ)</span>";
            }
        } else {


            if (value <= 0.2) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[1] + ";'>" + "(Ⅰ)</span>";
            }
            else if (value <= 0.5) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[2] + ";'>" + "(Ⅱ)</span>";
            }
            else if (value <= 1.0) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[3] + ";'>" + "(Ⅲ)</span>";
            }
            else if (value <= 1.5) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[4] + ";'>" + "(Ⅳ)</span>";
            }
            else if (value <= 2.0) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[5] + ";'>" + "(Ⅴ)</span>";
            }
            else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }
        }

    }
    if (field == "高锰酸盐") {
        if (typeid == 1) {
            if (value <= 2) {
                str = "<span style='color:" + listColor[1] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅰ)</span>";
            }
            else if (value <= 4) {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅱ)</span>";
            }
            else if (value <= 6) {
                str = "<span style='color:" + listColor[3] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅲ)</span>";
            }
            else if (value <= 10) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅳ)</span>";
            }
            else if (value <= 15) {
                str = "<span style='color:" + listColor[5] + ";'>" + field + ": " + value.toFixed(2) + "(Ⅴ)</span>";
            }
            else {
                str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "(劣Ⅴ)</span>";
            }
        } else {

            if (value <= 2) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[1] + ";'>" + "(Ⅰ)</span>";
            }
            else if (value <= 4) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[2] + ";'>" + "(Ⅱ)</span>";
            }
            else if (value <= 6) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[3] + ";'>" + "(Ⅲ)</span>";
            }
            else if (value <= 10) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[4] + ";'>" + "(Ⅳ)</span>";
            }
            else if (value <= 15) {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[5] + ";'>" + "(Ⅴ)</span>";
            }
            else {
                str = field + ": " + value.toFixed(2) + "<span style='color:" + listColor[6] + ";'>" + "(劣Ⅴ)</span>";
            }

        }

    }
    if (field == "锑") {
        if (typeid == 1) {
            if (value > 4) {
                str = "<span style='color:" + listColor[4] + ";'>" + field + ": " + value.toFixed(3) + "(超标)</span>";
            }
            else {
                str = "<span style='color:" + listColor[2] + ";'>" + field + ": " + value.toFixed(3) + "</span>";
            }
        } else {

            if (value > 4) {
                str = field + ": " + value.toFixed(3) + "<span style='color:" + listColor[4] + ";'>" + "(超标)</span>";
            }
            else {
                str = field + ": " + value.toFixed(3) + "<span style='color:" + listColor[2] + ";'>" + "</span>";
            }

        }

    }
    if (field == "流量") {
        str = "<span style='color:" + listColor[6] + ";'>" + field + ": " + value.toFixed(2) + "</span>m3/s";
    }
    return str;
}
function getColor(sztype) {
    var LineColor = ['#D3CFCF', '#8BEAC3', '#27E022', '#229FE0', '#E0CF22', '#FD5B30', '#E10724'];
    if (sztype == "1") {
        return LineColor[sztype];
    } else if (sztype == "2") {
        return LineColor[sztype];
    } else if (sztype == "3") {
        return LineColor[sztype];
    } else if (sztype == "4") {
        return LineColor[sztype];
    } else if (sztype == "5") {
        return LineColor[sztype];
    } else if (sztype == "6") {
        return LineColor[sztype];
    } else {
        return LineColor["0"];
    }
}

function DatType(field, value) {
    if (value == "-" || value == "" || value == undefined) {
        value = "0";
    }
    value = Number(value);
    var str = 0;
    if (isNaN(value) == true) {
        str = 0;
    } else {
        if (field == "PH" || field == "PH值") {
            if (value >= 6 && value <= 9) {
                str = 3;
            }
            else {
                str = 6;
            }
        } else if (field == "溶解氧") {
            if (value >= 7.5) {
                str = 1;
            }
            else if (value >= 6) {
                str = 2;
            }
            else if (value >= 5) {
                str = 3;
            }
            else if (value >= 3) {
                str = 4;
            }
            else if (value >= 2) {
                str = 5;
            }
            else {
                str = 6;
            }
        } else if (field == "高锰酸盐") {
            if (value <= 2) {
                str = 1;
            }
            else if (value <= 4) {
                str = 2;
            }
            else if (value <= 6) {
                str = 3;
            }
            else if (value <= 10) {
                str = 4;
            }
            else if (value <= 15) {
                str = 5;
            }
            else {
                str = 6;
            }
        } else if (field == "化学需氧量") {
            if (value < 15) {
                str = 1;
            }
            else if (value <= 15) {
                str = 2;
            }
            else if (value <= 20) {
                str = 3;
            }
            else if (value <= 30) {
                str = 4;
            }
            else if (value <= 40) {
                str = 5;
            }
            else {
                str = 6;
            }
        } else if (field == "氨氮") {
            if (value <= 0.15) {
                str = 1;
            }
            else if (value <= 0.5) {
                str = 2;
            }
            else if (value <= 1.0) {
                str = 3;
            }
            else if (value <= 1.5) {
                str = 4;
            }
            else if (value <= 2.0) {
                str = 5;
            }
            else {
                str = 6;
            }
        } else if (field == "总磷") {
            if (value <= 0.02) {
                str = 1;
            }
            else if (value <= 0.1) {
                str = 2;
            }
            else if (value <= 0.2) {
                str = 3;
            }
            else if (value <= 0.3) {
                str = 4;
            }
            else if (value <= 0.4) {
                str = 5;
            }
            else {
                str = 6;
            }
        } else if (field == "总氮") {
            if (value <= 0.2) {
                str = 1;
            }
            else if (value <= 0.5) {
                str = 2;
            }
            else if (value <= 1.0) {
                str = 3;
            }
            else if (value <= 1.5) {
                str = 4;
            }
            else if (value <= 2.0) {
                str = 5;
            }
            else {
                str = 6;
            }
        } else if (field == "透明度") {
            if (value < 10) {
                str = 5;
            }
            else if (value <= 25) {
                str = 4;
            }
            else {
                str = 3;
            }
        } else if (field == "氧化还原电位") {
            if (value < -200) {
                str = 5;
            }
            else if (value <= 50) {
                str = 4;
            }
            else {
                str = 3;
            }
        }
    }
    return str;
}

function jsonToList(jsonArray, field) {
    var listStr = [];
    if (jsonArray.length > 0) {
        for (var num = 0; num < jsonArray.length; num++) {
            var item = jsonArray[num];
            listStr.push(item[field]);
        }
    }
    return listStr;
}

function getWarningDuoColor(name) {
    //gcolor圆圈颜色
    //fontColor文本字体颜色
    //color 水波颜色
    var item = {};
    // var color = [
    //     {
    //         offset: 0,
    //         color: 'rgba(21,149,234, 1)',
    //     },
    //     {
    //         offset: 0.75,
    //         color: 'rgba(21,149,234, 1)',
    //     },
    //     {
    //         offset: 1,
    //         color: 'rgba(21,149,234, 1)',
    //     },
    // ];
    var color = [
        {
            offset: 0,
            color: 'rgba(80,243,13, 1)',
        },
        {
            offset: 0.75,
            color: 'rgba(80,243,13, 1)',
        },
        {
            offset: 1,
            color: 'rgba(80,243,13, 1)',
        },
    ];
    var bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
        {
            offset: 1,
            color: "rgba(255,255,255,0)",
        },
        {
            offset: 0.95,
            color: "rgba(255,255,255, 0.0)",
        },
        {
            offset: 0.8,
            color: "rgba(255,255,255, 0.0)",
        },
        {
            offset: 0.4,
            color: "rgba(255,255,255, 0.0)",
        },
    ]);
    var fontColor = "#00ffff";// "#46F604";
    var gcolor = [
        {
            offset: 0,
            color: 'rgba(80,243,13, 1)',
        },
        {
            offset: 0.5,
            color: 'rgba(80,243,13, 1)',
        },
        {
            offset: 1,
            color: 'rgba(80,243,13, 1)',
        },
    ];
    if (name == "超警戒") {
        gcolor = [
            {
                offset: 1,
                color: "rgba(248,189,1, 1)",
            },
            {
                offset: 0,
                color: "rgba(248,189,1, 1)",
            },
        ];
        color = [
            {
                offset: 0,
                color: 'rgba(248,189,1, 1)',
            },
            {
                offset: 0.75,
                color: 'rgba(248,189,1, 1)',
            },
            {
                offset: 1,
                color: 'rgba(248,189,1, 1)',
            },
        ];
        // fontColor = "#F8BD01";
    }
    if (name == "超保证" || name == "超设计") {
        gcolor = [
            {
                offset: 1,
                color: "rgba(205,40,24,1)",
            },
            {
                offset: 0,
                color: "rgba(205,40,24,1)",
            },
        ];
        // fontColor = "#CD2818";
        color = [
            {
                offset: 0,
                color: 'rgba(205,40,24, 1)',
            },
            {
                offset: 0.75,
                color: 'rgba(205,40,24, 1)',
            },
            {
                offset: 1,
                color: 'rgba(205,40,24,1)',
            },
        ];
    }
    item.color = color;
    item.bgcolor = bgcolor;
    item.gcolor = gcolor;
    item.fontColor = fontColor;
    return item;
}

function Getmtype(type) {
    if (type == "YC") {
        return "遥测"
    } else if (type == "BX") {
        return "报汛"
    } else if (type == "QX") {
        return "气象"
    }
}
//语音
function speakText(context) {
    var speakerText = new window.SpeechSynthesisUtterance();
    // clearTimeout(speakTimer);
    window.speechSynthesis.cancel();
    setTimeout(function () {
        speakerText.lang = "zh-CN"
        speakerText.volume = 0.9
        // speakerText.voice = 1
        speakerText.text = context;
        window.speechSynthesis.speak(speakerText);
    }, 200);
}
//////
///数组求和
///SumJson(data.data,'drp')
//////
function SumJson(array, item) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i][item] != null && array[i][item] != "" && array[i][item] != undefined) {
            sum += parseFloat(array[i][item]);
        }
    }
    return sum;
}
function GetJosns(url, postParam, typeID, _async = false, callback) {
    if (SetNull(postParam) == "") {
        postParam = {};
    }
    const accessToken = localStorage.getItem("token");
    if (SetNull(accessToken) == "") {
        accessToken = "";
    }
    // jQuery.support.cors = true;
    var reqPath = url;
    $.ajax({
        url: reqPath,
        data: JSON.stringify(postParam),
        type: "post",
        async: _async,
        cache: false,
        dataType: "json",
        // contentType: "application/json;charset=UTF-8",
        contentType: "application/json",
        headers: {
            "Authorization": accessToken
        },
        success: function (text) {
            var result = [];
            if (text.total == -401) {
                // $.ajax({
                // 	url: ServerIP+"json/reply/GetToken",
                // 	data: {"USERNAME":GetCookie("LOGINNAME"),"PWD":GetCookie("USERID")},
                // 	type: "post",
                // 	async: false,
                // 	dataType: "json",
                // 	success: function (evt) {
                // 		if(evt.data!="获取Token失败；请检查用户名和密码。"){
                // 			localStorage.setItem("TOKEN",evt.data)

                // 			GetJosns(url, postParam, typeID,_async,callback);
                // 		}

                // 	}
                // })
            }
            else {
                if (callback != null) {
                    callback(text);
                } else {
                    JosnSel(text, typeID);
                }

            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // localStorage.removeItem("TOKEN")
            // alert('请求失败！');
            console.error("请求失败！", XMLHttpRequest, textStatus, errorThrown)
        }
    });
}

function UUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}
function SetCookie(name, value, Days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    } else {
        return "";
    }
}
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    const midRatio = (startRatio + endRatio) / 2;
    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }
    k = typeof k !== "undefined" ? k : 1 / 3;
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 鼠标滑过时外环放大大小
    const hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },

        x(u, v) {
            if (u < startRadian) { return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate; }
            if (u > endRadian) { return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate; }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y(u, v) {
            if (u < startRadian) { return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate; }
            if (u > endRadian) { return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate; }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z(u, v) {
            if (u < -Math.PI * 0.5) { return Math.sin(u); }
            if (u > Math.PI * 2.5) { return Math.sin(u) * h * 0.1; }
            // 当前图形的高度是Z根据h（每个value的值决定的）
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
    };
}
// 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环
function getPie3D(pieData, internalDiameterRatio) {
    const series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k = typeof internalDiameterRatio !== "undefined" ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;
    for (let i = 0; i < pieData.length; i += 1) {
        sumValue += pieData[i].value;
        const seriesItem = {
            name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
            type: "surface",
            parametric: true,
            wireframe: { show: false },
            pieData: pieData[i],
            pieStatus: { selected: false, hovered: false, k }
        };
        if (typeof pieData[i].itemStyle !== "undefined") {
            const { itemStyle } = pieData[i];
            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.color !== "undefined" ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.opacity !== "undefined" ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;
            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }
    for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            10 // 在此处传入饼图初始高度h
        );
        startValue = endValue;
        legendData.push(series[i].name);
    }
    return series;
}

/**
 * 根据英文缩写获取中文风向
 * @param {string} code - 英文缩写，如 'NNW', 'SE'
 * @returns {string} - 中文名称，如 '北西北'
 */
function getWindDirectionName(code) {
    // 1. 定义映射字典
    var directionMap = {
        'N': '北',
        'NNE': '北东北',
        'NE': '东北',
        'ENE': '东东北',
        'E': '东',
        'ESE': '东东南',
        'SE': '东南',
        'SSE': '南东南',
        'S': '南',
        'SSW': '南西南',
        'SW': '西南',
        'WSW': '西西南',
        'W': '西',
        'WNW': '西西北',
        'NW': '西北',
        'NNW': '北西北'
    };

    // 2. 处理大小写（防止传入 'nnw' 或 'Nnw'）
    var key = code.toUpperCase();

    // 3. 返回结果，如果找不到则返回 '未知'
    return directionMap[key] || '未知';
}
/**
 * 格式化流量数值
 * 规则：保留3位有效数字，且禁止使用科学计数法（针对大数值）
 */
function formatFlow(value) {
    // 1. 边界检查
    if (value === null || value === undefined || isNaN(value)) return '-';

    // 2. 核心逻辑：先取3位有效数字
    let result = Number(value).toPrecision(3);

    // 3. 关键步骤：处理科学计数法 (例如 "4.44e+4")
    // 如果结果中包含 'e'，说明变成了科学计数法，我们需要把它转回普通数字
    if (result.includes('e')) {
        // parseFloat 会自动把 "4.44e+4" 变成 44400
        // toFixed(0) 确保不显示小数点（因为大数值通常不需要小数）
        result = parseFloat(result).toFixed(0);
    }

    return result;
}
export {
    groupBy,
    sortObjectArray,
    SetNull,
    listToTree,
    GetSZStateBy,
    GetSZState,
    GetSZStateNumber,
    getSZColor,
    getPieces,
    changeTwoDecimal,
    getshuizhiChart,
    getColor,
    DatType,
    jsonToList,
    getWarningDuoColor,
    Getmtype,
    speakText,
    SumJson,
    GetJosns,
    UUID,
    SetCookie,
    GetCookie,
    getParametricEquation,
    getPie3D,
    validateAndClean,
    getWindDirectionName,
    formatFlow
}