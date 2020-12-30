export const errorInfo = function (fun = function () {}) {
  window.onerror = function (message, source, lineno, colno, error) {
    console.log('onerror捕获到异常：', {
      message,
      source,
      lineno,
      colno,
      error,
    });
    infoError({
      message,
      source,
      lineno,
      colno,
      error,
    });
    return true;
  };
  window.addEventListener('error', (e) => {
    console.log('addEventListener error 捕获到异常：', e);
    if (isElement(e.target)) {
      const error = {};
      error.messageFrom = 'addEventListener error 捕获到异常：';
      error.target = { nodeName: e.target.nodeName, outerHTML: e.target.outerHTML };
      error.message = e.target.message;
      infoError(error);
    }
  }, true);
  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault();
    console.log('addEventListener unhandledrejection捕获到异常：', e);
    const error = {};
    error.messageFrom = 'addEventListener unhandledrejection 捕获到异常：';
    error.reason = e.reason;
    infoError(error);
    return true;
  });

  const originAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    // 捕获添加事件时的堆栈
    const addStack = new Error(`Event (${type})`).stack;
    const wrappedListener = function (...args) {
      try {
        return listener.apply(this, args);
      } catch (err) {
        // 异常发生时，扩展堆栈
        err.stack += `\n${addStack}`;
        infoError(err);
        throw err;
      }
    };
    return originAddEventListener.call(this, type, wrappedListener, options);
  };

  function infoError(err) {
    const url = location.href;
    const json = JSON.stringify({
      url,
      err,
    });
    console.log('上报数据', json);
    fun(json);
  }
  function isElement(obj) {
    const isDOM = (typeof HTMLElement === 'object')
      ? obj instanceof HTMLElement
      :      obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string';
    return isDOM;
  }
};
