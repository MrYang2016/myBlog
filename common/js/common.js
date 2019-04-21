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

const isObject = obj => obj !== null && obj instanceof Object;

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

  checkDataType(obj, option) {
    if (!(typeof obj === 'object')) throw '第一个参数必须为对象';
    if (!isObject(option)) throw '第二个参数必须为对象';

    for (const key in option) {
      const v = option[key];
      const { type, required = true } = isObject(v) ? v : { type: v };
      const val = obj[key];
      if (val === undefined) {
        if (!required) continue;
        return portResult.fail(`缺少参数${key}`);
      }
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
          val = Number(val);
          if (isNaN(val)) return false;
        }
        return typeof val === t;
      }
    }
  },

  portResult
};