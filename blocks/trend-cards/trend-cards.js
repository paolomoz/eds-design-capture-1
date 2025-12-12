/**
 * Trend Cards Block
 * 3-column grid of trend/category cards with images and titles
 *
 * Document structure:
 * | trend-cards |
 * | ----------- |
 * | ![Image](img.jpg) | Fresh fits, bold moves | Street style essentials |
 * | ![Image](img.jpg) | Game on, style up | Athletic wear trends |
 * | ![Image](img.jpg) | Party looks, all night | Evening fashion |
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.className = 'trend-card';

    // Find image, title, and description from cells
    let image = null;
    let title = '';
    let description = '';

    cells.forEach((cell, index) => {
      const picture = cell.querySelector('picture');
      if (picture) {
        image = picture.cloneNode(true);
      } else {
        const text = cell.textContent.trim();
        if (index === 1 || (!title && text)) {
          title = text;
        } else if (text) {
          description = text;
        }
      }
    });

    // Build card structure
    if (image) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'trend-card-image';
      imageWrapper.appendChild(image);
      card.appendChild(imageWrapper);
    }

    const content = document.createElement('div');
    content.className = 'trend-card-content';

    if (title) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'trend-card-title';
      titleEl.textContent = title;
      content.appendChild(titleEl);
    }

    if (description) {
      const descEl = document.createElement('p');
      descEl.className = 'trend-card-description';
      descEl.textContent = description;
      content.appendChild(descEl);
    }

    card.appendChild(content);
    cards.push(card);
  });

  block.textContent = '';
  cards.forEach((card) => block.appendChild(card));
}
