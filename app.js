// DOM ELEMENTS
const headerText = document.querySelector('.header-text');
const headerDescription = document.querySelector('.header-description');
const headerArrow = document.querySelector('.arrow');

const copyButton = document.querySelector('#copy-button');
const toggleButton = document.querySelector('.toggle-button');
const resourcesButton = document.querySelector('.resources-button');
const recourcesLinks = document.querySelector('.nav-resources');
const subcategoryButton = document.querySelector('.subcategory-button');
const navbarItems = document.querySelector('.navbar-items');
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.querySelector('.custom-cursor.inner');
const cursorOuter = document.querySelector('.custom-cursor.outer');

// FUNCTIONS
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// COPY BUTTON
const SCRIPT =  `s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/alexlostorto/magic-notes@v3.0.0/console/inject.js';document.head.appendChild(s);`;

copyButton.addEventListener('click', async () => {
    navigator.clipboard.writeText(SCRIPT).then(async function() {
        console.log('Copying to clipboard was successful!');
        copyButton.textContent = 'Copied!';
        await sleep(1000);
        copyButton.textContent = 'Copy';
    }, async function(err) {
        copyButton.textContent = 'Failed to copy';
        await sleep(1000);
        copyButton.textContent = 'Copy';
        console.error('Could not copy text: ', err);
    });
})


// WEBSITE VIEWS
async function liveViews() {
    let response = await(await (fetch("https://api.countapi.xyz/hit/alexlostorto.github.io/magic-note"))).json();
    visitsCounter = document.getElementById('visits');

    if (visitsCounter !== null) {
        visitsCounter.innerText = response.value + " 👀";
    } else { return }
}

liveViews()


// FADE IN ON SCROLL
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -100px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

async function fadeIn(element, delay) {
    await sleep(delay);
    element.classList.toggle('appear');
}

fadeIn(headerText, 1000);
fadeIn(headerDescription, 1500);
fadeIn(headerArrow, 2000);

// Check if mobile or desktop 
let isDesktop = false;
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
    isDesktop = false;
}
let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
if (!isMobile && isDesktop) {
    console.log("Desktop");
    cursor.style.display = 'block';
    cursorInner.style.display = 'block';
    cursorOuter.style.display = 'block';
} else {
    console.log("Mobile");
}

function detectMouse() {
    isDesktop = true;
    isMobile = false
    console.log("Desktop");
    cursor.style.display = 'block';
    cursorInner.style.display = 'block';
    cursorOuter.style.display = 'block';
}


// CUSTOM CURSOR AND HOVER
function customMouse(e) {  // Whenever a mouse movement is detected, update the custom cursor position
    const target = e.target;
    
    const isLinkTag = target.tagName.toLowerCase() === 'a'  || target.classList.contains('cursor-hover');
    const isHovered = cursorInner.classList.contains('hoveredCursor');
    
    // Toggle the cursor class if necessary 
    if(isLinkTag && !isHovered) {
        cursorInner.classList.add('hoveredCursor');
    } else if(!isLinkTag && isHovered) {
        cursorInner.classList.remove('hoveredCursor');
    }

    cursorInner.style.left = e.pageX + 'px';
    cursorInner.style.top = e.pageY - window.scrollY + 'px';

    cursorOuter.style.left = e.pageX + 'px';
    cursorOuter.style.top = e.pageY - window.scrollY + 'px';
}

window.addEventListener('mousemove', (e) => { 
    if (isMobile) {return}
    if (!isDesktop) { detectMouse(); }

    customMouse(e);
})

function detectTouch() {  // If a touch is detected, make sure the custom cursor is disabled 
    isMobile = true;
    console.log("isMobile");
    window.removeEventListener("touchstart", detectTouch);
}

window.addEventListener("touchstart", detectTouch);


// LOG CREDITS IN CONSOLE
function credits() {
    console.log.apply(console, ["%c Thanks for stopping by! I\u2019m currently looking to expand my programming knowledge and work with other like-minded devs. ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}


// HAMBURGER FUNCTIONALITY
toggleButton.addEventListener('click', () => {
    navbarItems.classList.toggle('active');
})

resourcesButton.addEventListener('click', () => {
    recourcesLinks.classList.toggle('active');
})

subcategoryButton.addEventListener('click', (event) => {
    event.stopPropagation();
    subcategoryButton.classList.toggle('active');
})