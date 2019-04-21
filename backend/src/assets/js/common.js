export function timeForm(t) {
  const d = new Date(Number(t));
  const addZero = s => String(s).length === 1 ? `0${s}` : s;
  return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`;
}

let commonFun = (fun, time, callback) => {
  if (!fun || typeof fun !== 'function') return () => console.log('必须输入函数参数');
  if (isNaN(parseInt(time))) return () => console.log('时间必须为整数');
  time = parseInt(time);
  return callback(fun, time);
};
export function shakeFn(fun, time) {
  return commonFun(fun, time, (f, t) => {
    let setTime = null;
    return function(...vals) {
      if (setTime) clearTimeout(setTime);
      setTime = setTimeout(() => f.apply(this, vals), t);
    };
  })
}

export function isObject(v) {
  return v !== null && v instanceof Object;
}

export function checkDataType(obj, option) {
  if (!(typeof obj === 'object')) throw '第一个参数必须为对象';
  if (!isObject(option)) throw '第二个参数必须为对象';

  for (const key in option) {
    const v = option[key];
    const { type, required = true } = isObject(v) ? v : { type: v };
    const val = obj[key];
    if (val === undefined) {
      if (!required) continue;
      return { status: false, msg: `缺少参数${key}` };
    }
    if (!isType(val, type)) return { status: false, msg: `参数${key}类型必须为${type}` };
  }
  return { status: true };

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
}