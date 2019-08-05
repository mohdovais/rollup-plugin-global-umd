import externalModule from './module-1';

function mount(element) {
  externalModule(element);
}

function unmount(element) {
  externalModule(element);
}

export default {
  mount,
  unmount
};
