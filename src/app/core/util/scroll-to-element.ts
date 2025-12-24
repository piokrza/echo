export function scrollToElement(nativeElement?: HTMLElement): void {
  if (!nativeElement) return;

  nativeElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}
