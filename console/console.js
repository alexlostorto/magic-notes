console.log("Script is running");


// THEMES 
const themes = {
    1: {
        'darkest': '#212529',
        'dark':  '#343a40',
        'light':  '#495057',
        'lightest': '#6c757d',
    },

    2: {
        'darkest': '#7f5539',
        'dark':  '#9c6644',
        'light':  '#b08968',
        'lightest': '#ddb892',
    },

    3: {
        'darkest': '#241E92',
        'dark':  '#5432D3',
        'light':  '#7B6CF6',
        'lightest': '#E5A5FF',
    },

    4: {
        'darkest': '#10002b',
        'dark':  '#3c096c',
        'light':  '#5a189a',
        'lightest': '#9d4edd',
    },

    5: {
        'darkest': '#001233',
        'dark':  '#001845',
        'light':  '#023e7d',
        'lightest': '#0466c8',
    },

    6: {
        'darkest': '#590d22',
        'dark':  '#800f2f',
        'light':  '#a4133c',
        'lightest': '#ff4d6d',
    },

    7: {
        'darkest': '#000000',
        'dark':  '#3D0000',
        'light':  '#950101',
        'lightest': '#EC0000',
    },

    8: {
        'darkest': '#132a13',
        'dark':  '#31572c',
        'light':  '#4f772d',
        'lightest': '#90a955',
    },

    9: {
        'darkest': '#1a001c',
        'dark':  '#250327',
        'light':  '#2f0631',
        'lightest': '#3a093c',
    }
}


// Colour palette 
document.documentElement.style.setProperty('--darkest', themes[3]['darkest']);
document.documentElement.style.setProperty('--dark', themes[3]['dark']);
document.documentElement.style.setProperty('--light', themes[3]['light']);
document.documentElement.style.setProperty('--lightest', themes[3]['lightest']);

const grey = '#f8f8f7';
const orange = '#f46815';

console.log(JSON.parse(localStorage.getItem('sparx-data')));

const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        main();
    });
});

mutationObserver.observe(document.documentElement, {
    attributeFilter: [ "class" ],
    characterData: true,
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

async function main() {    
    if (document.querySelector('.package-container') !== null) { showThemes(); }

    const xpElement = document.querySelector('.status-bar-label-text') //XP header
    if (xpElement !== null) {
        xpElement.textContent = "It doesn't matter :)";
    } 

    // Display stored answer
    let correctStatusElement = document.querySelector('.page.result .result-inner .correct');
    if (correctStatusElement !== null && document.querySelector('#shown-answer') === null) {
        try {
            const bookworkCodeElement = document.querySelector('.bookwork-code');
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');
            
            const sparxData = JSON.parse(localStorage.getItem('sparx-data'));
            let answer = sparxData[bookworkCode];
            answer = answer.map(element => element.replace('\n', ''));
            answer = answer.map(element => element.replace(/\\\\/g, '\\'));

            // Show saved answer 
            if (answer.every(hasSource)) {
                const divNode = document.createElement('div');
                const imageNode = document.createElement('img');
                imageNode.src = answer.toString();
                imageNode.setAttribute('id', 'shown-answer');
                imageNode.style['height'] = "4rem";

                divNode.appendChild(imageNode);
                divNode.style['margin-bottom'] = '20px';
                divNode.style['margin-top'] = '20px';
                divNode.style.color = grey;
                document.querySelector('.location-title').append(divNode);
            } else {
                let answers = answer.join(', ');

                const textNode = document.createElement('span');
                textNode.textContent = `Answer: ${answers}`;
                textNode.style['margin'] = '0.3rem 1rem 0 0';
                textNode.style['font-size'] = '2.5rem';
                textNode.style['color'] = 'white';
                textNode.setAttribute('id', 'shown-answer');

                const divNode = document.createElement('div');
                divNode.style['display'] = 'flex';
                divNode.style['align-items'] = 'center';
                divNode.style['justify-content'] = 'center';

                divNode.appendChild(textNode);
                divNode.style['margin-bottom'] = '20px';
                divNode.style['margin-top'] = '20px';
                document.querySelector('.result-inner').append(divNode);

                katex.render(answers, document.getElementById('shown-answer'), {
                    throwOnError: false
                });
            }
        } catch(err) {console.log(err)}
    }

    // Display correct bookwork code 
    const bookworkCodeElement = document.querySelector('.wac-text-container .bookwork-code');
    if (bookworkCodeElement !== null && document.querySelector('#custom-answer') === null) {
        try {
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');
            console.log(bookworkCode);

            const sparxData = JSON.parse(localStorage.getItem('sparx-data'));
            let bookworkAnswer = sparxData[bookworkCode];
            bookworkAnswer = bookworkAnswer.map(element => element.replace('\n', ''));
            bookworkAnswer = bookworkAnswer.map(element => element.replace(/\\\\/g, '\\'));
            console.log(bookworkAnswer);

            // Show saved answer 
            if (!bookworkAnswer.every(hasCurly)) {
                const textNode = document.createElement('b');
                const divNode = document.createElement('div');
                textNode.innerText = `Answer: ${bookworkAnswer.join(', ')}`;
                textNode.setAttribute('id', 'custom-answer');

                divNode.appendChild(textNode);
                divNode.style['margin-bottom'] = '20px';
                divNode.style.color = grey;
                document.querySelector('.wac-text-container').append(divNode);
            } else if (bookworkAnswer.every(hasSource)) {
                const divNode = document.createElement('div');
                const imageNode = document.createElement('img');
                imageNode.src = bookworkAnswer.toString();
                imageNode.setAttribute('id', 'custom-answer');
                imageNode.style['width'] = "50%";

                divNode.appendChild(imageNode);
                divNode.style['margin-bottom'] = '20px';
                divNode.style.color = grey;
                document.querySelector('.wac-text-container').append(divNode);
            } else {
                let answers = bookworkAnswer.join(', ');
                const textNode = document.createElement('span');
                textNode.textContent = `Answer: ${answers}`;
                textNode.style['margin'] = '0.3rem 1rem 0 0';
                textNode.style['color'] = 'white';

                const divNode = document.createElement('div');
                divNode.style['display'] = 'flex';
                divNode.style['align-items'] = 'center';
                divNode.style['justify-content'] = 'center';
                textNode.setAttribute('id', 'custom-answer');
                textNode.style['height'] = '3rem';

                divNode.appendChild(textNode);
                divNode.style['margin-bottom'] = '20px';
                document.querySelector('.wac-text-container').append(divNode);

                katex.render(answers, document.getElementById('custom-answer'), {
                    throwOnError: false
                });
            }

            // Get choices
            answerOptions = document.querySelectorAll('.choice-wac-options .item');
            if (answerOptions !== null) {
                for (let i = 0; i < answerOptions.length; i++) {
                    answerOption = answerOptions[i].textContent;
                    let similarityCount = 0
                    for (let a = 0; a < bookworkAnswer.length; a++) {
                        if (answerOption.includes(bookworkAnswer[a])) {similarityCount++;}
                    }
                    if (similarityCount == bookworkAnswer.length){
                        answerOptions[i].style.border = '5px solid var(--light)';
                    }
                    let answerArray = bookworkAnswer.join('');
                    answerArray = answerArray.split('');
                    uniques = answerArray.unique();
                    answerOptions[i].querySelector('.answer-markup.choice-wac-option').style.border = '5px solid var(--orange)';
                    for (let u = 0; u < uniques.length; u++) {
                        if (!(answerOption.includes(uniques[u]))) {
                            answerOptions[i].querySelector('.answer-markup.choice-wac-option').style.border = 'none';
                        }
                    }
                }
            }
        } catch (err) {console.log(err)}
    }
}


// SUBMITS ANSWER 
document.addEventListener("click", function(e) {
    if(e.target) {
        try {
            if (
                (e.target.id == "skill-delivery-submit-button" && e.target.innerText == "Submit") ||
                (e.target.className == "button-text" && e.target.textContent == "Submit") || 
                (e.target.className == "button-icon button-icon-right" && e.target.parentElement.innerText == "Submit") ||
                (e.target.parentElement.className == "button-icon button-icon-right" && e.target.parentElement.parentElement.innerText == "Submit") ||
                (e.target.parentElement.parentElement.className == "button-icon button-icon-right" && e.target.parentElement.parentElement.parentElement.innerText == "Submit")) {
    
                const bookworkCodeElement = document.querySelector('.bookwork-code');
                let bookworkCode = bookworkCodeElement.textContent;
                bookworkCode = bookworkCode.replace("Bookwork code: ", '');
    
                const answer = getInput(bookworkCode);
                updateDatabase(bookworkCode, answer);
            }
        } catch(err) {}
    }
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const submitButton = document.querySelector('#skill-delivery-submit-button');
        if (submitButton !== null) {
            const bookworkCodeElement = document.querySelector('.bookwork-code');
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');

            const answer = getInput(bookworkCode);
            updateDatabase(bookworkCode, answer);
        }
    }
});


// FUNCTIONS

Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.includes(this[i]) && isDigit(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function updateDatabase(bookworkCode, answer) {
    console.log("Updating database");

    if (localStorage.getItem('sparx-data') === null) {
        const defaultJSON = {"Placeholder": 0};
        localStorage.setItem('sparx-data', JSON.stringify(defaultJSON));
    }

    let sparxData = JSON.parse(localStorage.getItem('sparx-data'));
    sparxData[bookworkCode] = answer;

    console.log("New value: ", sparxData);

    localStorage.setItem('sparx-data', JSON.stringify(sparxData));

    console.log("Database updated");
}

function hasCurly(answer) {
    if (answer.toString().includes('{')  && answer.toString().includes('}')) {
        return true
    } else { return false}
}

function hasSource(answer) {
    if (answer.toString().includes('https') || answer.toString().includes('http')) {
        return true
    } else { return false}
}

function showThemes() {
    if (!(document.querySelector('.themes-container') === null)) { return }

    const container = document.querySelector('.package-container');

    let textNode = document.createElement('b');
    let themesContainer = document.createElement('section');
    let themesList = document.createElement('ul');
    textNode.innerText = 'Themes';
    themesContainer.setAttribute('class', 'themes-container');

    for (const [_, theme] of Object.entries(themes)) {
        let themeNode = document.createElement('li');
        for (const [_, colour] of Object.entries(theme)) {
            let colourNode = document.createElement('div');
            colourNode.style['background-color'] = colour;
            themeNode.appendChild(colourNode);
        };
        themeNode.addEventListener('click', function() {
            console.log("You clicked a theme");
            document.documentElement.style.setProperty('--darkest', theme['darkest']);
            document.documentElement.style.setProperty('--dark', theme['dark']);
            document.documentElement.style.setProperty('--light', theme['light']);
            document.documentElement.style.setProperty('--lightest', theme['lightest']);
        });
        themesList.appendChild(themeNode);
    };

    themesContainer.appendChild(textNode);
    themesContainer.appendChild(themesList);
    container.append(themesContainer);
}

function getInput() {
    let answerData = [];

    // Get input value
    const keypadInputs = document.querySelectorAll('.number-input');
    if (keypadInputs !== null) {
        for (let i = 0; i < keypadInputs.length; i++) {
            inputValue = keypadInputs[i].attributes[10].value;
            answerData.push(inputValue);
        }
    }
    
    // Get choice selected 
    const chosen = document.querySelectorAll('.choice.selected, .gap-card.selected');
    if (chosen !== null) {
        for (let i = 0; i < chosen.length; i++) {
            choice = chosen[i].textContent;
            if (choice.includes('{') && choice.includes('}')) {
                let innerChoice = choice.substring(
                    choice.indexOf("{"), 
                    choice.lastIndexOf("}") + 1
                );
                answerData.push(innerChoice);
            } else if (choice.includes('image')) {
                const imageElement = chosen[i].querySelector('[data-test-target="image-img"]');
                const source = imageElement.currentSrc;
                answerData.push(source.toString());
            } else {
                answerData.push(choice);
            }
        }
    }

    // Get cards selected 
    const cards = document.querySelectorAll('.slots.horizontal .katex');
    if (cards !== null) {
        for (let i = 0; i < cards.length; i++) {
            card = cards[i].textContent;
            if (card.includes('{') && card.includes('}')) {
                let innerCard = card.substring(
                    card.indexOf("{"), 
                    card.lastIndexOf("}") + 1
                );
                answerData.push(innerCard);
            } else {
                answerData.push(card);
            }
        }
    }

    // Get fraction cards selected 
    const slotsFraction = document.querySelector('.slots.fraction');
    if (slotsFraction !== null) {
        const slotsFractions = document.querySelectorAll('.slots.fraction .slot');
        let innerFraction = [];
        for (let i = 0; i < slotsFractions.length; i++) {
            fractionText = slotsFractions[i].textContent;
            let fractionSubstring = fractionText.substring(
                fractionText.indexOf("{"), 
                fractionText.lastIndexOf("}") + 1
            );
            console.log(fractionSubstring);
            innerFraction.push(fractionSubstring);
        }
        fraction = `\\frac${innerFraction[0]}${innerFraction[1]}`;
        answerData.push(fraction);
    }

    // Get cards selected 
    const slotsElement = document.querySelectorAll('.slots .slot .katex');
    if (slotsElement !== null) {
        for (let i = 0; i < slotsElement.length; i++) {
            slotCard = slotsElement[i].textContent;
            if (slotCard.includes('{') && slotCard.includes('}')) {
                let innerCard = slotCard.substring(
                    slotCard.indexOf("{"), 
                    slotCard.lastIndexOf("}") + 1
                );
                answerData.push(innerCard);
            } else {
                answerData.push(card);
            }
        }
    }

    return answerData
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function credits() {
    await sleep(200);
    console.clear();
    console.log.apply(console, ["%c Thanks for using my Sparx program! ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

const themeStyles = '.themes-container{display:flex;align-items:center;justify-content:center;flex-direction:column;width:500px}.themes-container ul{border:2px solid #fff;padding:0;display:flex;flex-direction:column;width:100%}.themes-container ul li{list-style-type:none;display:flex;flex-direction:row}.themes-container ul li div{background-color:orange;height:50px;width:25%}.themes-container ul li:hover{cursor:pointer;filter:brightness(80%)}@media (max-width: 1000px){.themes-container{width:60vw}}';
const darkModeStyles = ':root{--orange:#F46815;--grey:#F8F8F7;--dark-grey:#E9E9E9;--darkest:#241E92;--dark:#5432D3;--light:#7B6CF6;--lightest:#E5A5FF}.um-login-container,.package-container,.view-body,.main-view{background:var(--darkest)!important}.entry-area-bubble .text,.answer .markdown.text-container{color:var(--darkest)!important}.package-filter-list,.revision-homework-button-container,.revision-topic-page,.package-list > div > span > ul > div,.rewards-section.insights-lifetime-totals,.rewards-section-header,.rewards-section-content,.rewards-progress-levels,.rewards-faqs .accordion-element-header{background:var(--dark)!important}.package-list > div > span > ul > div,.rewards-section{border-color:var(--dark)!important}.um-header,.package-heading,.footer-cookie-banner-container,.footer-container,.revision-tab,.revision-task,.revision-strand-button,.revision-strand-page,.revision-homework-button,.activity-feed-day,.status-bar,.status-bar-label-text,.btn-menu-item,.question-only,.answer-only,.question-text,.skill-delivery-view .view-body,.wac-text-container .bookwork-code,.insights-lifetime-total,.rewards-section-row,.rewards-progress-level:hover{background:var(--light)!important}.revision-tabs{border-bottom:var(--light)!important}.btn-menu-item,.package-heading,.revision-homework-button{border:1px solid var(--light)!important}.wac-text-container .bookwork-code,.accordion-element-header,.activity-feed-work,.dummytaskitem{border:none!important}.um-login-box__content,.revision-tab.revision-tab-active,.accordion-element-header,.activity-feed-work,.status-bar-menu-item,.status-bar-menu-button,.revision-task-item,#answer-wac-box,.choice-wac-options{background:var(--lightest)!important}.status-bar-menu-button{border:solid var(--lightest)!important}.status-bar-menu-item{border-color:var(--lightest)!important}.school-selector,.revision-strand-button,.accordion-element-header,.revision-substrand-extra,.activity-feed-day > h2,.activity-feed-work,.activity-feed-work-counts,.revision-location-stream,.btn-menu-item,.revision-topic-page,.revision-homework-button,.package-heading,.question-text > div > .text,.result-inner h2,.result-inner .result-subtitle-prominent,.result-inner h1.incorrect,.text-container,.answer-part > div > .text,.wac-header-container,.wac-text,.minigame-description > div,.rewards-section-header-title,.insights-lifetime-total,.rewards-section-row,.rewards-progress-level-label-text{color:var(--grey)!important}.answer-markup.choice-wac-option.choice.choice-answer-markup,.choice-text{background:var(--grey)!important}.revision-location-stream,.revision-strand-button{border-color:var(--grey)!important}.active{border:1px solid var(--grey)!important}.package-filter-arrow{border-left-color:var(--grey)!important}.package-list > div > span > ul > div > .task-title{color:var(--dark-grey)!important}.selected .text,.choice-wac-option.selected,.rewards-progress-level:hover .rewards-progress-level-label-text{color:var(--orange)!important}.rewards-section-header{border-radius:0!important}.revision-strand-icon{filter:grayscale(100%) brightness(5)!important}.status-bar-menu-item:not(:first-child):before{left:-3px!important;width:110%!important;border-bottom:1px solid var(--darkest)!important}.status-bar-menu-item-img{filter:grayscale(100%) brightness(5)!important}.taskitem > .icon{filter:brightness(5)!important}.status-bar-menu-item:hover > .status-bar-menu-item-img{filter:none!important}';

// Katex 
katexCSS = document.createElement('link');
katexCSS.href = "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css";
katexCSS.rel = "stylesheet"
document.head.appendChild(katexCSS);

katexJS = document.createElement('script');
katexJS.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js';
document.head.appendChild(katexJS);

// CSS 
document.head.insertAdjacentHTML('beforeend','<style>' + themeStyles + '</style>');
document.head.insertAdjacentHTML('beforeend','<style>' + darkModeStyles + '</style>');

main();

credits();