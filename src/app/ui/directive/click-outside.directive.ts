import { Directive, ElementRef, inject, OnDestroy, output, Renderer2, signal } from '@angular/core';

@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnDestroy {
  constructor() {
    this.#listener = this.#renderer.listen('document', 'click', (e: Event) => {
      if (!this.#isFirstClick()) {
        this.#isFirstClick.set(false);
        return;
      }

      if (!this.#elementRef.nativeElement.contains(e.target)) {
        this.clickOutside.emit();
      }
    });
  }

  readonly #renderer = inject(Renderer2);
  readonly #elementRef = inject(ElementRef);

  readonly clickOutside = output<void>();

  readonly #listener: () => void;
  readonly #isFirstClick = signal(true);

  ngOnDestroy(): void {
    this.#listener?.();
  }
}
