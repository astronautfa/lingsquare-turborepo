import { proxy, useSnapshot, subscribe } from "valtio";

const store = proxy<{ isCommandOpen: Boolean }>({
  isCommandOpen: false,
});

const setDisplayCommand = (open: Boolean) => {
  store.isCommandOpen = open;
};

export { setDisplayCommand, store, useSnapshot, subscribe };
