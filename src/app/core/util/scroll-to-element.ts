export function scrollToElement(nativeElement?: HTMLElement): void {
  nativeElement?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}
