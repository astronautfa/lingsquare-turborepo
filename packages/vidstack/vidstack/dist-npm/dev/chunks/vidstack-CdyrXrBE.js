import { C as Component, a as setStyle, r as onDispose, u as useContext } from './vidstack-ND4uzLKO.js';
import { F as FocusVisibleController, t as tooltipContext } from './vidstack-Ga5LXVQf.js';
import { r as requestScopedAnimationFrame } from './vidstack-BNJih9gD.js';

class ControlsGroup extends Component {
  onAttach(el) {
    if (!el.style.pointerEvents)
      setStyle(el, "pointer-events", "auto");
  }
}

class TooltipTrigger extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        this._attach();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this._getButton();
          button && tooltip._detachTrigger(button);
        });
      })
    );
  }
  _attach() {
    const button = this._getButton(), tooltip = useContext(tooltipContext);
    button && tooltip._attachTrigger(button);
  }
  _getButton() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
  }
}

export { ControlsGroup as C, TooltipTrigger as T };
