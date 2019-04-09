const portResult = {
  fail(msg = '', data = '') {
    return { status: 'fail', message: msg, code: 400, data };
  },
  success(msg, data = '') {
    return { status: 'success', message: msg, code: 200, data };
  },
  error(msg, data = '') {
    return { status: 'error', message: msg, code: 500, data };
  }
};

module.exports = {
  getDate: time => {
    let addZero = d => {
      if ((d + '').length === 1) {
        d = '0' + d;
      }
      return d;
    };
    let d = new Date(parseInt(time));
    return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`;
  },

  checkDataType(obj, arr) {
    if (!(typeof obj === 'object')) throw '第一个参数必须为对象';
    if (!(arr instanceof Array)) throw '第二个参数必须为数组';
    for (let i = 0, len = arr.length; i < len; i++) {
      if (!(arr[i] instanceof Array)) throw '第二个参数必须为二维数组';
      const [key, type] = arr[i];
      const val = obj[key];
      if (val === undefined) return portResult.fail(`缺少参数${key}`);
      if (!isType(val, type)) return portResult.fail(`参数${key}类型必须为${type}`);
    }
    return { status: 'success' };

    function isType(val, type) {
      const t = type.toLocaleLowerCase();
      if (t === 'object' || t === 'array') {
        return t === 'object'
          ? (val instanceof Object)
          : (val instanceof Array);
      } else if (t === 'boolean' && typeof val === 'string') {
        return val === 'true' || val === 'false';
      } else {
        if (t === 'number') {
          val = parseFloat(val);
          if (isNaN(val)) return false;
        }
        return typeof val === t;
      }
    }
  },

  portResult
};