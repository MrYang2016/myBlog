window.onload = function () {
  var textEdit = document.querySelector('#textEdit');
  var showDiv = document.querySelector('#showDiv');
  var converter = new showdown.Converter({ extensions: ['table'] });
  addHandler(textEdit, 'input', function (e) {
    var text = e.target.value;
    var html = converter.makeHtml(text);
    showDiv.innerHTML = html;

  });
  var submitBtn = document.querySelector('#submitBtn');
  addHandler(submitBtn, 'click', function () {
    var fileName = document.querySelector('#fileName');
    var fileIntro = document.querySelector('#fileIntro');
    var fileContent = textEdit.value;
    ajax(
      {
        url: '/api/uploaddoc',
        type: 'post',
        data: {
          html: converter.makeHtml(fileContent),
          fileName: fileName.value,
          fileIntro: fileIntro.value
        }
      },
      {
        success: function (result) {
          if (result && result.state) alert(result.msg);
        }
      }
    );
  });
};

function addHandler(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
}

function ajax(option, callback) {
  var url = location.origin + option.url;
  var data = option.data || null;
  var type = option.type || 'get';
  var xhr = new XMLHttpRequest();
  callback = typeof callback === 'object' ? callback : {};
  if (!(callback.success instanceof Function)) {
    callback.success = function () { };
  }
  if (!(callback.error instanceof Function)) {
    callback.error = function () { };
  }
  type = type.toLocaleLowerCase();
  if (type === 'get') {
    url = getUrl(url, data);
    data = null;
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        callback.success(JSON.parse(xhr.responseText));
      } else {
        callback.error({ status: false, code: xhr.status, url: url });
      }
    }
  };
  xhr.onerror = function (err) {
    if (typeof err === 'object') {
      var msg = `请求接口${url}时出错，出错信息为：${JSON.stringify(err)}`;
      console.error(msg);
      callback.error({ status: false, code: xhr.status, url: url, msg: msg });
    }
  };
  xhr.open(type, url, true);
  if (type === 'post') xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(typeof data === 'object' ? JSON.stringify(data) : data);

  function getUrl(url, data) {
    if (!data) return url;
    for (let key in data) {
      var f = url.indexOf('?') === -1 ? '?' : '&';
      var val = data[key];
      if (val instanceof Object) val = JSON.stringify(val);
      url += `${f}${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }
    return url;
  }
}