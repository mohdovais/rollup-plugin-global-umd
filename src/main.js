const externalModule = console.log;

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
