/**
 * 时间戳
 * @param {*} timestamp  时间戳
 */
const timestampToTime = (timestamp) => {
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':'
    let s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
};
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 设置cookie
 **/
function setCookie(name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

/**
 * 获取cookie
 **/
function getCookie(name) {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
};

/**
 * 删除cookie
 **/
function delCookie(name) {
    setCookie(name, null, -1);
};

const sendState = (val) => {
    if (!val) return;
    if(val == 0){
        return '成功'
    }else{
        return '失败'
    }
}
const sendTypeFilter = (val) => {
    if (!val) return;
    if(val == '1'){
        return 'FTP'
    }else if(val == '2'){
        return '邮件'
    }else if(val == '3'){
        return '仅备份'
    }
}
const taskTypeFilter = (val) => {
    if (!val) return;
    if(val == '1'){
        return 'FTP传输'
    }else if(val == '2'){
        return '邮件发送'
    }else if(val == '3'){
        return '仅备份'
    }else if(val == '4'){
        return '长期备份'
    }else if(val == '5'){
        return '数据清理'
    }else if(val == '6'){
        return '文件监控'
    }
}
const storagePath = (val) => {
    let str = '';
    console.log(val)
    if(!val){return ''}
    console.log(val)
    val.map((item)=>{
        if(val.length>1){
            str = item.storagePath + ' , ';
        }else{
            str = item.storagePath;
        }
    });
    return str;
}

/**
 * 导出 
 **/
export {
    timestampToTime,
    setStore,
    getStore,
    removeStore,
    setCookie,
    getCookie,
    delCookie,
    sendState,
    sendTypeFilter,
    storagePath,
    taskTypeFilter,
}