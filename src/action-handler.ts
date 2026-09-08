import { directive, Directive, type ElementPart, type PartInfo, PartType } from 'lit/directive.js';
import { noChange } from 'lit';

interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
}

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
    handleEnter?: (ev: KeyboardEvent) => void;
  };
}

class ActionHandler extends HTMLElement {
  public holdTime = 500;

  private held = false;
  private timer?: number;
  private dblClickTimeout?: number;
  private isCancelled = false;

  public boundStart?: (ev: Event) => void;
  public boundEnd?: (ev: Event) => void;
  public boundHandleEnter?: (ev: KeyboardEvent) => void;

  public connectedCallback(): void {
    Object.assign(this.style, {
      position: 'absolute',
      width: '0',
      height: '0',
      pointerEvents: 'none',
    });
  }

  public bind(element: ActionHandlerElement, options: ActionHandlerOptions): void {
    if (element.actionHandler) {
      return;
    }
    element.actionHandler = { options };

    element.addEventListener('contextmenu', (ev: Event) => {
      const e = ev || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    });

    const start = (ev: Event) => {
      this.isCancelled = false;
      this.held = false;
      this.timer = window.setTimeout(() => {
        this.startAnimation(ev);
        this.held = true;
      }, this.holdTime);
    };

    const end = (ev: Event) => {
      ev.preventDefault();
      if (this.isCancelled) {
        return;
      }
      if (
        ['touchend', 'touchcancel'].includes(ev.type) &&
        this.timer === undefined
      ) {
        return;
      }
      this.stopAnimation();
      clearTimeout(this.timer);
      this.timer = undefined;
      if (this.held) {
        fireAction(element, 'hold');
      } else if (options.hasDoubleClick) {
        if (
          (ev.type === 'click' && (ev as MouseEvent).detail < 2) ||
          !this.dblClickTimeout
        ) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            fireAction(element, 'tap');
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireAction(element, 'double_tap');
        }
      } else {
        fireAction(element, 'tap');
      }
    };

    const handleEnter = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        end(ev);
      }
    };

    const cancel = () => {
      this.isCancelled = true;
      clearTimeout(this.timer);
      this.stopAnimation();
      this.timer = undefined;
    };

    element.addEventListener('touchstart', start, { passive: true });
    element.addEventListener('touchend', end);
    element.addEventListener('touchcancel', end);
    element.addEventListener('mousedown', start, { passive: true });
    element.addEventListener('click', end);
    element.addEventListener('keyup', handleEnter);
    element.addEventListener('mouseout', cancel);
    element.addEventListener('touchmove', cancel, { passive: true });

    element.actionHandler.start = start;
    element.actionHandler.end = end;
    element.actionHandler.handleEnter = handleEnter;
  }

  private startAnimation(_ev: Event): void {
    // no ripple for card-level actions
  }

  private stopAnimation(): void {
    // no-op
  }
}

customElements.define('ek-digital-clock-action-handler', ActionHandler);

const getActionHandler = (): ActionHandler => {
  const body = document.body;
  if (body.querySelector('ek-digital-clock-action-handler')) {
    return body.querySelector('ek-digital-clock-action-handler') as ActionHandler;
  }
  const handler = document.createElement('ek-digital-clock-action-handler') as ActionHandler;
  body.appendChild(handler);
  return handler;
};

const fireAction = (element: HTMLElement, action: string): void => {
  element.dispatchEvent(
    new CustomEvent('action', {
      detail: { action },
      bubbles: true,
      composed: true,
    }),
  );
};

class ActionHandlerDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('actionHandler can only be used as element directive');
    }
  }

  update(part: ElementPart, [options]: unknown[]) {
    const element = part.element as ActionHandlerElement;
    getActionHandler().bind(element, (options as ActionHandlerOptions) ?? {});
    return noChange;
  }

  render(_options?: ActionHandlerOptions) {
    return noChange;
  }
}

export const actionHandler = directive(ActionHandlerDirective);
