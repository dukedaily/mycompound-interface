//去尾法
Number.prototype.toFloor = function (num) {
  return Math.floor(this * Math.pow(10, num)) / Math.pow(10, num);
};

//进一法
Number.prototype.toCeil = function (num) {
  return Math.ceil(this * Math.pow(10, num)) / Math.pow(10, num);
};

//四舍五入法
Number.prototype.toRound = function (num) {
  return Math.round(this * Math.pow(10, num)) / Math.pow(10, num);
};

// 强制截取两位小数
Number.prototype.toFloat = function (num) {
  return Math.floor(this.toFixed(num + 1) * Math.pow(10, num)) / Math.pow(10, num);
}

