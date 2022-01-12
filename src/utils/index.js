import { ethers } from "ethers";

// 截取地址
export function getShowAddress (address, sign = 3) {
  const firstAddress = address.substring(0, sign);
  const AddressLength = address.length
  const lastAddress = address.substring(AddressLength - sign, AddressLength)
  return `${firstAddress}***${lastAddress}`
}
// 截取币种精度
export function getDecimalsCoin (number, decimals) {
  if (typeof number === 'number') {
    number = String(number);
  }
  if (number.indexOf('.') === -1) {
    return number;
  }
  return number.substring(0, number.indexOf('.') + decimals);
}
// 时间转化
export function formatTime (dateTime, sign = '/') {
  const date = new Date(dateTime * 1000),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  function s (t) {
    return t < 10 ? `0${t}` : t;
  }
  return `${year}${sign}${s(month)}${sign}${s(day)}`;
}

/**
 * 根据币的地址获取图标
 */
export function getCoinImg (tokenAddress) {
  return `https://youswap.oss-cn-shanghai.aliyuncs.com/YouSwap/${tokenAddress}.png`
}

// 限制两位小数的输入
export function setNumberDecimal (self, number) {
  var n = parseFloat(self.value);

  self.value = n.toFixed(number);
  return self;
}
// 时间转化 时分秒
export function formatDate (data) {
  var date = new Date(data),
    YY = date.getFullYear() + '-',
    MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
    mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
    ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return YY + MM + DD + ' ' + hh + mm + ss;
}

/**
 * @description 科学计数法转为string
 * @param {string, number} param
 */
/* eslint-disable*/
export function scientificNotationToString (param) {
  let strParam = String(param)
  let flag = /e/.test(strParam)
  if (!flag) return param

  // 指数符号 true: 正，false: 负
  let sysbol = true
  if (/e-/.test(strParam)) {
    sysbol = false
  }
  // 指数
  let index = Number(strParam.match(/\d+$/)[0])
  // 基数
  let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')

  if (sysbol) {
    return basis.padEnd(index + 1, 0)
  } else {
    return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
  }
}

/**
 * 截取浮点数位数
 * @param {any} value 要转换的浮点数
 * @param {number} num 截取的浮点数位数
 * @returns 截取后的浮点数
 */
export function formatnumber (value, num) {
  var a, b, c, i;
  if (typeof value === 'number') {
    value = value.toString()
  }
  a = value;
  b = a.indexOf(".");
  c = a.length;
  if (num == 0) {
    if (b != -1) {
      a = a.substring(0, b);
    }
  } else {//如果没有小数点
    if (b == -1) {
      a = a + ".";
      for (i = 1; i <= num; i++) {
        a = a + "0";
      }
    } else {//有小数点，超出位数自动截取，否则补0
      a = a.substring(0, b + num + 1);
      for (i = c; i <= b + num; i++) {
        a = a + "0";
      }
    }
  }
  return a;
}
/**
 * K.M.B 单位转换
 */
export function formatSizeKmb (val) {
  let nVal = ['', '', ''];
  let fr = 1000;
  let num = 3;
  while (val / fr >= 1) {
    fr *= 10;
    num += 1;
  }
  if (num <= 6) { // 千
    nVal[1] = 'K';
    nVal[0] = Number(val / 1000).toString().match(/^\d+(?:\.\d{0,2})?/) + '';
  } else if (num >= 7 && num < 10) { // 百万
    const str = 'M';
    const fm = 1000000;
    nVal[1] = str;
    nVal[0] = Number(val / fm).toString().match(/^\d+(?:\.\d{0,2})?/) + '';
  } else {// 亿
    let str = 'G';
    let fm = 1000000000;
    nVal[1] = str;
    nVal[0] = Number(val / fm).toString().match(/^\d+(?:\.\d{0,2})?/) + '';
  }
  return nVal.join('');
}

// 判断是否是PC端
export function checkIsMobile () {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  let flag = false;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}

/**
   * 封装请求
   */
export function sendRequest (param, cb) {
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.provider.sendAsync(param, function (err, res) {
    if (!err && res.error) err = new Error('RPC Error - ' + res.error.message)
    if (err) return cb(err)
    cb(null, res)
  })
}