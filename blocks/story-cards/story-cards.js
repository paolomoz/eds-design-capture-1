/**
 * Story Cards Block
 * Profile/testimonial cards with category labels and read times
 *
 * Document structure:
 * | story-cards |
 * | ----------- |
 * | ![Photo](img.jpg) | Chill | Weekend Vibes | Relaxed fits for lazy days | 3 min read |
 * | ![Photo](img.jpg) | Active | On the Move | Sporty looks that perform | 5 min read |
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('article');
    card.className = 'story-card';

    let image = null;
    let category = '';
    let title = '';
    let description = '';
    let readTime = '';

    cells.forEach((cell, index) => {
      const picture = cell.querySelector('picture');
      const text = cell.textContent.trim();

      if (picture) {
        image = picture.cloneNode(true);
      } else if (text.includes('min read') || text.includes('min')) {
        readTime = text;
      } else if (index === 1 || (!category && text.length < 20)) {
        category = text;
      } else if (!title) {
        title = text;
      } else {
        description = text;
      }
    });

    // Build card structure
    if (image) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'story-card-image';
      imageWrapper.appendChild(image);
      card.appendChild(imageWrapper);
    }

    const content = document.createElement('div');
    content.className = 'story-card-content';

    if (category) {
      const categoryEl = document.createElement('span');
      categoryEl.className = 'story-card-category';
      categoryEl.textContent = category;
      content.appendChild(categoryEl);
    }

    if (title) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'story-card-title';
      titleEl.textContent = title;
      content.appendChild(titleEl);
    }

    if (description) {
      const descEl = document.createElement('p');
      descEl.className = 'story-card-description';
      descEl.textContent = description;
      content.appendChild(descEl);
    }

    if (readTime) {
      const metaEl = document.createElement('span');
      metaEl.className = 'story-card-meta';
      metaEl.textContent = readTime;
      content.appendChild(metaEl);
    }

    card.appendChild(content);
    cards.push(card);
  });

  block.textContent = '';
  cards.forEach((card) => block.appendChild(card));
}
