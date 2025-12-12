/**
 * Newsletter Block
 * Email signup form with heading
 *
 * Document structure:
 * | newsletter |
 * | ---------- |
 * | Stay in the loop |
 * | Get the latest trends delivered to your inbox |
 * | Subscribe |
 */
export default function decorate(block) {
  const rows = [...block.children];
  const container = document.createElement('div');
  container.className = 'newsletter-container';

  const content = document.createElement('div');
  content.className = 'newsletter-content';

  let heading = '';
  let description = '';
  let buttonText = 'Subscribe';

  rows.forEach((row) => {
    const text = row.textContent.trim();
    const hasHeading = row.querySelector('h1, h2, h3, h4');

    if (hasHeading) {
      heading = hasHeading.textContent.trim();
    } else if (!heading && text.length < 50) {
      heading = text;
    } else if (text.toLowerCase().includes('subscribe') || text.length < 20) {
      buttonText = text;
    } else {
      description = text;
    }
  });

  if (heading) {
    const headingEl = document.createElement('h2');
    headingEl.className = 'newsletter-heading';
    headingEl.textContent = heading;
    content.appendChild(headingEl);
  }

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'newsletter-description';
    descEl.textContent = description;
    content.appendChild(descEl);
  }

  container.appendChild(content);

  // Create form
  const form = document.createElement('form');
  form.className = 'newsletter-form';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input.value) {
      // eslint-disable-next-line no-alert
      alert(`Thanks for subscribing with: ${input.value}`);
      input.value = '';
    }
  });

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'newsletter-input-wrapper';

  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = 'Enter your email';
  input.required = true;
  input.className = 'newsletter-input';

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'newsletter-button';
  button.textContent = buttonText;

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(button);
  form.appendChild(inputWrapper);
  container.appendChild(form);

  block.textContent = '';
  block.appendChild(container);
}
