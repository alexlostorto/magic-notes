console.clear();
credits();

const splashScreen = document.querySelector('.slide.splash');
const mainPage = document.querySelector('.page.main');
const copyButton = document.querySelector('#copy-button');

async function startPage() {
    fadeIn(splashScreen.querySelector('.header-text'), 200);
    await sleep(1200);

    splashScreen.style.top = '-100vh';
    bodyElement.style.overflowY = 'auto';

    await sleep(300);

    navbar.style.display = 'flex';
    mainPage.style.display = 'block';
    cursorInner.style.backgroundColor = 'black';
    cursorOuter.style.borderColor = 'black';
    
    fadeIn(mainPage.querySelector('.header-text'), 200);
    fadeIn(mainPage.querySelector('.header-description'), 500);
    fadeIn(mainPage.querySelector('.arrow'), 1000);
}

startPage();

const script = `s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/alexlostorto/magic-notes@v3.0.0/console/inject.js';document.head.appendChild(s);`;

copyButton.addEventListener('click', () => {
    copy(script, copyButton, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000);
});