import { C as Component, a as setStyle, r as onDispose, u as useContext } from './vidstack-CBNXqr3M.js';
import { F as FocusVisibleController, t as tooltipContext } from './vidstack-Dv7HWUBr.js';
import { r as requestScopedAnimationFrame } from './vidstack-C5IKOUzO.js';

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
        this.xb();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this.Bd();
          button && tooltip._e(button);
        });
      })
    );
  }
  xb() {
    const button = this.Bd(), tooltip = useContext(tooltipContext);
    button && tooltip.Ze(button);
  }
  Bd() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
  }
}

export { ControlsGroup as C, TooltipTrigger as T };
