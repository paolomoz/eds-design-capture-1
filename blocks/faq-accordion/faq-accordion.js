/**
 * FAQ Accordion Block
 * Expandable FAQ items using native details/summary
 *
 * Document structure:
 * | faq-accordion |
 * | ------------- |
 * | What styles are trending? | This season features bold colors... |
 * | How do I find my size? | Use our size guide to measure... |
 */
export default function decorate(block) {
  const rows = [...block.children];
  const items = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const details = document.createElement('details');
    details.className = 'faq-item';

    const summary = document.createElement('summary');
    summary.className = 'faq-question';

    const questionText = document.createElement('span');
    questionText.textContent = cells[0].textContent.trim();
    summary.appendChild(questionText);

    const icon = document.createElement('span');
    icon.className = 'faq-icon';
    icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6"/>
    </svg>`;
    summary.appendChild(icon);

    const content = document.createElement('div');
    content.className = 'faq-answer';
    content.innerHTML = cells[1].innerHTML;

    details.appendChild(summary);
    details.appendChild(content);
    items.push(details);
  });

  block.textContent = '';
  items.forEach((item) => block.appendChild(item));
}
