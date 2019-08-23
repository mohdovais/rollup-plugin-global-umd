(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('my-app-bundle', factory) :
  (0);(global = global || self, (global.ubs = global.ubs || {}, global.ubs['my-app-bundle'] = factory()))
}(this, function () { 'use strict';

  function externalModule(x) {
    console.log(x);
    debugger;
  }

  function mount(element) {
    externalModule(element);
  }

  function unmount(element) {
    externalModule(element);
  }

  var main = {
    mount,
    unmount
  };

  return main;

}));
