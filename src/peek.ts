interface PeekOptions {
  duration?: number;
  maxToasts?: number;
}

interface ToastOptions {
  title?: string;
  message: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface Toast {
  id: number;
  element: HTMLElement;
  wrapper: HTMLElement;
}

export class Peek {
  private container!: HTMLElement;
  private toasts: Toast[] = [];
  private counter: number = 0;
  private options: Required<PeekOptions>;

  constructor(options: PeekOptions = {}) {
    this.options = {
      duration: 5000,
      maxToasts: 3,
      ...options
    };

    this.setupContainer();
    this.injectStyles();
  }

  private setupContainer() {
    this.container = document.createElement('div');
    this.container.className = 'peek-container';
    document.body.appendChild(this.container);
  }

  private injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .peek-container {
        position: fixed;
        bottom: 32px;
        right: 32px;
        z-index: 9999;
        width: 100%;
        max-width: 360px;
        pointer-events: none;
        perspective: 800px;
      }

      .peek-wrapper {
        position: relative;
        width: 100%;
        height: 0;
      }

      .peek-toast {
        position: absolute;
        width: calc(100% - 32px);
        margin: 0 16px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1);
        padding: 16px;
        transition: all 0.65s cubic-bezier(0.19, 1, 0.22, 1);
        pointer-events: auto;
        transform-origin: center bottom;
      }

      @media (max-width: 576px) {
        .peek-container {
          bottom: 16px;
          right: 0;
          left: 0;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .peek-wrapper {
          width: calc(100% - 32px);
          max-width: 448px;
        }

        .peek-toast {
          width: 100%;
          margin: 0;
          padding: 12px;
        }
      }

      .peek-title {
        font-weight: 600;
        font-size: 1rem;
        color: #111;
        margin-bottom: 3px;
      }

      .peek-message {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.4;
      }

      @media (max-width: 576px) {
        .peek-title {
          font-size: 0.95rem;
        }
        .peek-message {
          font-size: 0.85rem;
        }
      }

      .peek-toast.success .peek-title {
        color: #059669;
      }

      .peek-toast.error .peek-title {
        color: #DC2626;
      }

      .peek-toast.warning .peek-title {
        color: #D97706;
      }

      .peek-toast.info .peek-title {
        color: #2563EB;
      }

      .peek-toast.default .peek-title {
        color: #1F2937;
      }
    `;
    document.head.appendChild(style);
  }

  show(options: ToastOptions): void {
    const toastId = this.counter++;
    const { title, message, type = 'default', duration = this.options.duration } = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'peek-wrapper';
    wrapper.id = `peek-wrapper-${toastId}`;

    const toast = document.createElement('div');
    toast.className = `peek-toast ${type}`;
    toast.id = `peek-${toastId}`;

    // Initially position off-screen and invisible
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(30px)';

    if (title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'peek-title';
      titleElement.textContent = title;
      toast.appendChild(titleElement);
    }

    const messageElement = document.createElement('div');
    messageElement.className = 'peek-message';
    messageElement.textContent = message;
    toast.appendChild(messageElement);

    wrapper.appendChild(toast);
    this.container.appendChild(wrapper);

    this.toasts.push({
      id: toastId,
      element: toast,
      wrapper: wrapper
    });

    if (this.toasts.length > this.options.maxToasts) {
      const oldestToast = this.toasts.shift();
      if (oldestToast) {
        const oldToast = document.getElementById(`peek-${oldestToast.id}`);
        const oldWrapper = document.getElementById(`peek-wrapper-${oldestToast.id}`);
        if (oldToast) {
          oldToast.style.opacity = '0';
          oldToast.style.transform = 'translateY(30px)';
        }
        setTimeout(() => {
          if (oldWrapper && oldWrapper.parentNode) {
            oldWrapper.parentNode.removeChild(oldWrapper);
          }
        }, 650);
      }
    }

    this.updateToastPositions();

    // Trigger animation after a brief delay
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    if (duration > 0) {
      setTimeout(() => {
        this.hideToast(toastId);
      }, duration);
    }
  }

  private hideToast(id: number): void {
    const toastIndex = this.toasts.findIndex(t => t.id === id);
    if (toastIndex === -1) return;

    const toast = document.getElementById(`peek-${id}`);
    const wrapper = document.getElementById(`peek-wrapper-${id}`);

    if (!toast || !wrapper) return;

    // Animate out - fade out and slide down
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(30px)';

    // Remove from array
    this.toasts.splice(toastIndex, 1);

    // Remove from DOM after animation completes
    setTimeout(() => {
      if (wrapper && wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
      this.updateToastPositions();
    }, 650);
  }

  private updateToastPositions(): void {
    for (let i = this.toasts.length - 1; i >= 0; i--) {
      const toast = this.toasts[i];
      const wrapper = document.getElementById(`peek-wrapper-${toast.id}`);
      const toastElement = document.getElementById(`peek-${toast.id}`);

      if (wrapper && toastElement) {
        wrapper.style.zIndex = `${9990 + i}`;
        const stackIndex = this.toasts.length - 1 - i;

        if (i < this.toasts.length - 1) {
          const scale = 1 - (stackIndex * 0.01);
          const shrinkWidth = stackIndex * 6;
          toastElement.style.width = `calc(100% - 32px - ${shrinkWidth}px)`;
          toastElement.style.marginLeft = `${16 + (shrinkWidth/2)}px`;
          toastElement.style.transform = `translateY(0) scale(${scale})`;
          toastElement.style.opacity = `${1 - (stackIndex * 0.08)}`;
        }

        toastElement.style.bottom = `${stackIndex * 10}px`;
      }
    }
  }

  success(message: string, title?: string): void {
    this.show({ message, title, type: 'success' });
  }

  error(message: string, title?: string): void {
    this.show({ message, title, type: 'error' });
  }

  warning(message: string, title?: string): void {
    this.show({ message, title, type: 'warning' });
  }

  info(message: string, title?: string): void {
    this.show({ message, title, type: 'info' });
  }
}