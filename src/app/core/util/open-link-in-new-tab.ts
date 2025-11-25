export function openLinkInNewTab(link?: string, target = '_blank') {
  if (!link) return;
  window.open(link, target);
}
