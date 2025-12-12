/**
 * Trendsetter Hero Block
 * Inspired by WKND Trendsetters design
 *
 * Document structure:
 * | trendsetter-hero |
 * | ---------------- |
 * | # Heading text   |
 * | Description text |
 * | [CTA 1](link) [CTA 2](link) |
 * | ![Image 1](img1.jpg) | ![Image 2](img2.jpg) |
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create container structure
  const container = document.createElement('div');
  container.className = 'trendsetter-hero-container';

  // Content section (heading, description, CTAs)
  const content = document.createElement('div');
  content.className = 'trendsetter-hero-content';

  // Images section
  const images = document.createElement('div');
  images.className = 'trendsetter-hero-images';

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      // Check if this cell contains images
      const pictures = cell.querySelectorAll('picture');
      const hasOnlyImages = pictures.length > 0
        && cell.textContent.trim() === cell.querySelector('picture')?.closest('p')?.textContent.trim();

      if (pictures.length >= 2 || (pictures.length === 1 && cells.length > 1)) {
        // This is an image row - could be multiple images in cells
        pictures.forEach((picture) => {
          const imageWrapper = document.createElement('div');
          imageWrapper.className = 'trendsetter-hero-image';
          imageWrapper.appendChild(picture.cloneNode(true));
          images.appendChild(imageWrapper);
        });
      } else if (pictures.length === 1 && cells.length === 1) {
        // Single image cell
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'trendsetter-hero-image';
        imageWrapper.appendChild(pictures[0].cloneNode(true));
        images.appendChild(imageWrapper);
      } else {
        // Text content
        const heading = cell.querySelector('h1, h2, h3');
        const paragraphs = cell.querySelectorAll('p');
        const links = cell.querySelectorAll('a');

        if (heading) {
          const headingWrapper = document.createElement('div');
          headingWrapper.className = 'trendsetter-hero-heading';
          headingWrapper.appendChild(heading.cloneNode(true));
          content.appendChild(headingWrapper);
        }

        paragraphs.forEach((p) => {
          // Check if paragraph contains only links (CTA row)
          const pLinks = p.querySelectorAll('a');
          if (pLinks.length > 0 && p.textContent.trim() === [...pLinks].map((l) => l.textContent).join(' ').trim()) {
            // This is a CTA paragraph
            const ctaWrapper = document.createElement('div');
            ctaWrapper.className = 'trendsetter-hero-ctas';
            pLinks.forEach((link, index) => {
              const btn = link.cloneNode(true);
              btn.className = index === 0 ? 'button primary' : 'button secondary';
              ctaWrapper.appendChild(btn);
            });
            content.appendChild(ctaWrapper);
          } else if (!p.querySelector('picture')) {
            // Regular paragraph (description)
            const desc = document.createElement('p');
            desc.className = 'trendsetter-hero-description';
            desc.textContent = p.textContent;
            content.appendChild(desc);
          }
        });
      }
    });
  });

  // Handle case where images are in separate cells of same row
  if (images.children.length === 0) {
    rows.forEach((row) => {
      const cells = [...row.children];
      if (cells.length > 1) {
        cells.forEach((cell) => {
          const picture = cell.querySelector('picture');
          if (picture) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'trendsetter-hero-image';
            imageWrapper.appendChild(picture.cloneNode(true));
            images.appendChild(imageWrapper);
          }
        });
      }
    });
  }

  // Assemble the block
  container.appendChild(content);
  if (images.children.length > 0) {
    container.appendChild(images);
  }

  block.textContent = '';
  block.appendChild(container);
}
