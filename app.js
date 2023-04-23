console.clear();
credits();

const headerText = document.querySelector('.header-text');
const headerDescription = document.querySelector('.header-description');
const headerArrow = document.querySelector('.arrow');
const copyButton = document.querySelector('#copy-button');

fadeIn(headerText, 1000);
fadeIn(headerDescription, 1500);
fadeIn(headerArrow, 2000);

const script = `s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/alexlostorto/magic-notes@v3.0.0/console/inject.js';document.head.appendChild(s);`;

copyButton.addEventListener('click', () => {
    copy(script, copyButton, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000);
});