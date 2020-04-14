/*
 * @Description: In User Settings Edit
 * @Author: dcf
 * @Date: 2019-08-12 11:14:50
 * @LastEditTime: 2019-09-26 13:11:28
 * @LastEditors: Please set LastEditors
 */
export function downloadUrl(content, filename) {//兼容到ie10s
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

//防抖动
export const debounce = (fn,delay) => {
    //维护一个time
    let time = null;
    return function (...args) {
        clearTimeout(time);
        time = setTimeout(() => {
            fn.apply(this,args);
        },delay);
    }
}
//节流(相当于默认immediate)
export const throttle = (fn,delay) => {
    let time = Date.now();
    return function(...args) {
        let now = Date.now();
        if(now - time >= delay){
            fn.apply(this,args);
            time = now;
        }
    }
}
//节流升级版
export const throttle_update = (fn,delay,immediate) => {
    let time = Date.now(), time_id;
    return function (...args){
        let now = Date.now();
        if(now - delay >= time){
            time_id = setTimeout(() => {
                clearTimeout(time_id);
                !immediate&&fn.apply(this,args);
            },delay);
            immediate && fn.apply(this,args);
        }
    }
}

export const getObjType =(o) => {
    if(o === null) return 'Null';
    if(o === undefined) return 'Undefined';
    return Object.prototype.toString.call(o).slice(8,-1);
}
//深克隆
export const deepClone = (obj) => {
       let result;
       if(getObjType(obj) === 'Array') {
           result = [];
       }else if(getObjType(obj) === 'Object'){
           result = {};
       }else{
           return obj;
       }
       for(var keys in obj){
           (getObjType(obj[keys]) === 'Object' || getObjType(obj[keys]) === 'Array')
               ? result[keys] = deepClone(obj[keys])
               : result[keys] = obj[keys]; 
       }
       return result;
};
//根据dateobj或者当前时间戳，返回对应格式数据
export const getDateString = (dateObj,type="second") => {
    const LessTenForZero = (data) => data<10?'0'+data:data;
    let date = '';
    if(!dateObj) return ;
    else {
        dateObj instanceof Date
            ? date = dateObj
            : type === 'second'
                ? date = new Date(parseInt(dateObj) * 1000)
                : date = new Date(parseInt(dateObj));
    }
    return {
        year: date.getFullYear(),
        month: LessTenForZero(date.getMonth() + 1),
        day: LessTenForZero(date.getDate()),
        hour: LessTenForZero(date.getHours()),
        minute: LessTenForZero(date.getMinutes()),
        second: LessTenForZero(date.getSeconds()),
    };
};
export const setCookie = (c_name,value,expiredays) => {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = c_name + "="+ escape (value) + ";expires=" + exdate.toGMTString();
}
export const getCookie = (name) => {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
// 云客服聊天记录转换
export const UBBCode = (strContent) => {
    var http_pro = (document.location.protocol == 'https:')?'https://':'http://';//区分HTTP和HTTPS
    if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.appVersion.match(/MSIE \d\.\d/) == "MSIE 5.0")){
        //5.0
        if (strContent.indexOf("[IMG]")>=0){
            var con=strContent.substr(5,strContent.indexOf("[/IMG]")-5);
            strContent="<IMG SRC=\""+con+"\">";
        }
        if (strContent.indexOf("[URL=")>=0){
            var tlink=strContent.substr(5,strContent.indexOf("]")-5);
            var text=strContent.substr(strContent.indexOf("]")+1,strContent.length-6-strContent.indexOf("]")-1);
            strContent="<A HREF=\""+tlink+"\" TARGET=_blank>"+text+"</A>";
        }
        if (strContent.indexOf("[MOBILE]")>=0){
            var tlink=strContent.substr(8,strContent.indexOf("[/MOBILE]")-8);
            strContent=text;
        }
        if (strContent.indexOf("[PHONE]")>=0){
            var tlink=strContent.substr(7,strContent.indexOf("[/PHONE]")-7);
            strContent=text;
        }
        if (strContent.indexOf("[EMAIL]")>=0){
            var tlink=strContent.substr(7,strContent.indexOf("[/EMAIL]")-7);
            strContent=text;
        }
    }else{
        var r2=new RegExp("(\\[URL=(.+?)\])(.+?)(\\[\\/URL\\])","gim");
        var r3=new RegExp("(\\[IMG\])(\\S+?)(\\[\\/IMG\\])","gim");
        var r4=new RegExp("(\\[QQ\])(\\d+?)(\\[\\/QQ\\])","gim");
        var r5=new RegExp("&amp","gim");
        var r6=new RegExp("(\\[MOBILE\])(\\d+?)(\\[\\/MOBILE\\])","gim");
        var r7=new RegExp("(\\[PHONE\])([\\d\\-]+?)(\\[\\/PHONE\\])","gim");
        var r8=new RegExp("(\\[EMAIL\])(\\S+?)(\\[\\/EMAIL\\])","gim");
        var r9=new RegExp("(\\[voice\])(\\S+?)(\\[\\/voice\\])","gim");
        strContent=strContent.replace(r2,function($1,$2,$3,$4,$5){
            if ($3.indexOf('http://') == -1 && $3.indexOf('https://') == -1) {
                $3 = http_pro + $3;
            }
            return '<A HREF="'+$3+'" TARGET="_blank" style="text-decoration:underline; color:inherit;">'+$4+'</A>';
        });
        strContent=strContent.replace(r3,'<IMG border="0" SRC="$2">');/**/
        strContent=strContent.replace(r4,'<img border="0" title="点击跟我QQ[$2]聊" src='+http_pro+'"www.53kf.com/img/qq.gif" onclick="addQQ(\'$2\')" style="cursor:pointer"/>[$2]');
        // strContent=strContent.replace(r6,'$2');
        strContent=strContent.replace(r6,'<a href="tel:$2">$2</a>');
        // strContent=strContent.replace(r7,'$2');
        strContent=strContent.replace(r7,'<a href="tel:$2">$2</a>');
        strContent=strContent.replace(r8,'$2');
        // strContent=strContent.replace(r9,($1,$2,$3)=>{
        // try{
        //     mobile_client.params["audio_num"] ++ ;
        //     mobile_client.params["audio_vars"]['audio_'+mobile_client.params["audio_num"]] = new BenzAMRRecorder();
        //     mobile_client.params["audio_vars"]['audio_'+mobile_client.params["audio_num"]].initWithUrl($3);
        //     return '<div class="audiobtn" id="audio_'+mobile_client.params["audio_num"]+'"><span class="audio_log" alt=""><span></div>';
        // }catch(e){
        //     return '<div class="audiobtn unaudio_play"><span class="audio_log" alt=""><span></div>';
        // }
        // });
    }
    //手机，电话处理
    // strContent = this.mobileHandle(strContent,"tel");
    strContent=strContent.replace(/\{(.[^#.-\/]*)#(.[^#.-\/]*)#\}/gi,function($1,$2,$3){//$2包含_min时(即表情包文件名带min时)，替换为二倍图
        return "<img class='img_53kf_face' src=\"https://www5.53kf.com/img/face/"+$2+"/"+$2.replace('_min','')+"_"+$3+".gif?1\" border=\"0\">";
    });
    return strContent;
}
var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    var chnUnitSection = ["","万","亿","万亿","亿亿"];
    var chnUnitChar = ["","十","百","千"];

var numToChn = function(num){
      var index =  num.toString().indexOf(".");
      if(index != -1){
          var str = num.toString().slice(index);
          var a = "点";
              for(var i=1;i<str.length;i++){
                     a += chnNumChar[parseInt(str[i])];
               }
          return a ;
      }else{
          return ;
      }
}
function sectionToChinese(section){
    var str = '', chnstr = '',zero= false,count=0;   //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while(section>0){
         var v = section % 10;  //对数字取余10，得到的数即为个位数
         if(v ==0){                    //如果数字为零，则对字符串进行补零
             if(zero){
                 zero = false;        //如果遇到连续多次取余都是0，那么只需补一个零即可
                 chnstr = chnNumChar[v] + chnstr; 
             }      
         }else{
             zero = true;           //第一次取余之后，如果再次取余为零，则需要补零
             str = chnNumChar[v];
             str += chnUnitChar[count];
             chnstr = str + chnstr;
         }
         count++;
         section = Math.floor(section/10);
    }
    return chnstr;
}
export function TransformToChinese(num){
    var a = numToChn(num);
    num = Math.floor(num);
     var unitPos = 0;
     var strIns = '', chnStr = '';
     var needZero = false;
    
     if(num === 0){
           return chnNumChar[0];
     } 
     while(num > 0){
           var section = num % 10000;
           if(needZero){
             chnStr = chnNumChar[0] + chnStr;
           }
           strIns = sectionToChinese(section);
           strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
           chnStr = strIns + chnStr;
           needZero = (section < 1000) && (section > 0);
           num = Math.floor(num / 10000);
           unitPos++;
     }
    
    return chnStr+(a||'');
}
export const getIn = (obj,arr,deepKeyName) => {
    let result=obj;
    Array.from(arr).forEach((ele,idx) => {
        if(!deepKeyName)
            result = result[ele];
        else
            result = idx === 0 
                    ? result[ele]
                    : result[deepKeyName][ele];
    });
    return result;
}
export const updateIn = (obj,arr,updateObj,deepKeyName) => {
    let item = getIn(obj,arr,deepKeyName);
    item[updateObj.key] = updateObj.value;
}

export const GetLength = (str) => {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 2;
    }
    return realLength;
}
/* 
const thunk = (({getState,dispatch}) => next => (action) => {
    if(typeof action === 'function') {
        return action(dispatch,getState)
    }else {
        return next(action)
    }
})

const applyMiddles = (...middlewares) => createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {}

    const MiddleApi = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
    }
    const chain = middlewares.map(ele => ele(MiddleApi));
    dispatch = compose(...chain)(store.dispatch);
    return {
        ...store,
        dispatch
    }
} */
/* export const clearEmpty = (data)  => {
    if(['Null','Undefined'].includes(getObjType(data))) return null;
    if(!['Object','Array','Function'].includes(getObjType(data))) return data;
    if(!Object.entries(data).length) return null;

    for(let key in data){
        let isEmpty = clearEmpty(data[key]);
        if(isEmpty === null || isEmpty === undefined)
            delete data[key];
    }
} */