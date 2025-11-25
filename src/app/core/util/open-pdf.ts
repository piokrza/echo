import type { LinkTarget } from '#core/model';

export function openPdf(blob: Blob, target?: LinkTarget): void {
  const myBlob = new Blob([blob], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(myBlob);
  link.target = target ?? '_blank';
  link.click();
  link.remove();
}
