import { DestroyRef, Directive, ElementRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, tap } from 'rxjs';

@Directive({ selector: '[copyToClipboard]' })
export class CopyToClipboardDirective implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #elementRef = inject(ElementRef);

  readonly copyToClipboard = input.required<string>();

  ngOnInit(): void {
    fromEvent(this.#elementRef.nativeElement, 'click')
      .pipe(
        tap(async () => {
          await navigator.clipboard.writeText(this.copyToClipboard() ?? '');
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
