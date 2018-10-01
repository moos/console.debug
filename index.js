;(function(){

  let nsRex = (ns) => new RegExp(`\\b${ns}([^\\w:]|$)`, 'g');

  let has = (ns) => {
    if (!ns) return false;
    let re = nsRex(ns);
    return re.test(localStorage.debug);
  }

  let enable = (ns) => {
    let val = disable(ns);
    val += (val ? ',' : '') + ns;
    return localStorage.debug = val;
  }

  let disable = (ns) => {
    let val = localStorage.debug.replace(nsRex(ns), '');
    val = val.replace(/,,/g, ',').replace(/(^,|,$)/g, '');
    return localStorage.debug = val;
  }

  console.debug = (ns) => {
    let arr = [];
    if (localStorage.debug) {
      arr = localStorage.debug.split(',');
    }
    if (ns === void 0) {
      return arr;
    }
    if (typeof ns === 'number') {
      ns = arr[ns] || '';
    }
    return {
      enabled: has(ns),
      enable: enable.bind(this, ns),
      disable: disable.bind(this, ns)
    }
  };

  console.debug.enable = function() {
    if (this._val) localStorage.debug = this._val;
    return localStorage.debug;
  };

  console.debug.disable = function() {
    if (localStorage.debug) this._val = localStorage.debug;
    localStorage.debug = '';
  };


})();
