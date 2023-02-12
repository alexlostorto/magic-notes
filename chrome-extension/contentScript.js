console.log("Script is running");

// Colour palette 
let darkest = '#000000';
let dark = '#150050';
let light = '#3F0071';
let lightest = '#610094';

const grey = '#f8f8f7';
const darkGrey = '#e9e9e9';
const orange = '#f46815';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.theme == 1) {
        darkest = '#241E92'
        dark =  '#5432D3';
        light =  '#7B6CF6';
        lightest = '#E5A5FF';
        main();
    } else if (request.theme == 2) {
        darkest = '#000000';
        dark =  '#150050';
        light =  '#3F0071';
        lightest = '#610094';
        main();
    } else if (request.theme == 3) {
        darkest = '#000000';
        dark =  '#3D0000';
        light =  '#950101';
        lightest = '#FF0000';
        main();
    }
});

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
    darkMode();

    // Display stored answer
    let correctStatusElement = document.querySelector('.page.result .result-inner .correct');
    if (correctStatusElement !== null && document.querySelector('#shown-answer') === null) {
        try {
            const bookworkCodeElement = document.querySelector('.bookwork-code');
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');

            chrome.storage.sync.get(['sparxCodes'], function(database) {
                let answer = database.sparxCodes[bookworkCode];
                answer = answer.map(element => element.replace('\n', ''));
                answer = answer.map(element => element.replace(/\\\\/g, '\\'));
                console.log(answer);

                // Show saved answer 
                if (document.querySelector('#shown-answer') === null) {
                    if (!answer.every(hasCurly)) {
                        const textNode = document.createElement('b');
                        const divNode = document.createElement('div');
                        textNode.innerText = `Stored answer: ${answer.join(', ')}`;
                        textNode.setAttribute('id', 'shown-answer');
                        textNode.style['font-size'] = '2.5rem';

                        divNode.appendChild(textNode);
                        divNode.style['margin-bottom'] = '20px';
                        divNode.style['margin-top'] = '20px';
                        divNode.style.color = grey;
                        document.querySelector('.result-inner').append(divNode);
                    } else if (answer.every(hasSource)) {
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
                        let imageNodes = [];
                        for (let a = 0; a < answer.length; a++) {
                            let imageNode = displayMath(answer[a])
                            imageNodes.push(imageNode)
                        }

                        const textNode = document.createElement('b');
                        textNode.innerText = 'Stored answer: ';
                        textNode.style['margin'] = '0.3rem 1rem 0 0';
                        textNode.style['font-size'] = '2.5rem';
                        textNode.style['color'] = 'white';

                        const divNode = document.createElement('div');
                        divNode.style['display'] = 'flex';
                        divNode.style['align-items'] = 'center';
                        divNode.style['justify-content'] = 'center';

                        divNode.appendChild(textNode);
                        for (let a = 0; a < imageNodes.length; a++) {
                            imageNodes[a].setAttribute('id', 'shown-answer');
                            imageNodes[a].style['height'] = '3rem';
                            imageNodes[a].style['padding'] = '0.5rem';
                            divNode.appendChild(imageNodes[a]);
                        }
                        divNode.style['margin-bottom'] = '20px';
                        divNode.style['margin-top'] = '20px';
                        document.querySelector('.result-inner').append(divNode);
                    }
                }
            });
        } catch(err) {console.log(err)}
    }

    // Display correct bookwork code 
    let bookworkCodeElement = document.querySelector('.wac-text-container .bookwork-code');
    if (bookworkCodeElement !== null && document.querySelector('#custom-answer') === null) {
        try {
        let bookworkCode = bookworkCodeElement.textContent;
        bookworkCode = bookworkCode.replace("Bookwork code: ", '');
        console.log(bookworkCode);

        chrome.storage.sync.get(['sparxCodes'], function(database) {
            let answer = database.sparxCodes[bookworkCode];
            answer = answer.map(element => element.replace('\n', ''));
            answer = answer.map(element => element.replace(/\\\\/g, '\\'));
            console.log(answer);

            // Show saved answer 
            if (document.querySelector('#custom-answer') === null) {
                console.log("Trying to show answer...")
                if (!answer.every(hasCurly)) {
                    const textNode = document.createElement('b');
                    const divNode = document.createElement('div');
                    textNode.innerText = `Answer: ${answer.join(', ')}`;
                    textNode.setAttribute('id', 'custom-answer');
    
                    divNode.appendChild(textNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style.color = grey;
                    document.querySelector('.wac-text-container').append(divNode);
                } else if (answer.every(hasSource)) {
                    const divNode = document.createElement('div');
                    const imageNode = document.createElement('img');
                    imageNode.src = answer.toString();
                    imageNode.setAttribute('id', 'custom-answer');
                    imageNode.style['width'] = "50%";

                    divNode.appendChild(imageNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style.color = grey;
                    document.querySelector('.wac-text-container').append(divNode);
                } else {
                    let answers = answer.join('');
                    const textNode = document.createElement('b');
                    textNode.innerText = 'Answer: ';
                    textNode.style['margin'] = '0.3rem 1rem 0 0';
                    textNode.style['color'] = 'white';
    
                    const imageNode = displayMath(answers);
                    const divNode = document.createElement('div');
                    divNode.style['display'] = 'flex';
                    divNode.style['align-items'] = 'center';
                    divNode.style['justify-content'] = 'center';
                    imageNode.setAttribute('id', 'custom-answer');
                    imageNode.style['height'] = '3rem';
    
                    divNode.appendChild(textNode);
                    divNode.appendChild(imageNode);
                    divNode.style['margin-bottom'] = '20px';
                    document.querySelector('.wac-text-container').append(divNode);
                }
            }

            // Get choices 
            answerOptions = document.querySelectorAll('.choice-wac-options .item')
            if (answerOptions !== null) {
                for (let i = 0; i < answerOptions.length; i++) {
                    answerOption = answerOptions[i].textContent;
                    let similarityCount = 0
                    for (let a = 0; a < answer.length; a++) {
                        if (answerOption.includes(answer[a])) {similarityCount++;}
                    }
                    if (similarityCount == answer.length){
                        answerOptions[i].style.border = `5px solid ${light}`;
                    }
                    let answerArray = answer.join('');
                    answerArray = answerArray.split('');
                    uniques = answerArray.unique();
                    answerOptions[i].querySelector('.answer-markup.choice-wac-option').style.border = `5px solid ${orange}`;
                    for (let u = 0; u < uniques.length; u++) {
                        if (!(answerOption.includes(uniques[u]))) {
                            answerOptions[i].querySelector('.answer-markup.choice-wac-option').style.border = 'none';
                        }
                    }
                }
            }
        if (document.querySelector('#custom-answer') === null) {
            const textNode = document.createElement('b');
            const divNode = document.createElement('div');
            textNode.innerText = `If this is shown, then WHY IS THIS NOT WORKING?!`;
            textNode.setAttribute('id', 'custom-answer');
    
            divNode.appendChild(textNode);
            divNode.style['margin-bottom'] = '20px';
            divNode.style.color = grey;
            document.querySelector('.wac-text-container').append(divNode);
        }
        });
    } catch (err) {console.log(err)}
    }
}

function displayMath(answer) {
    const imageNode = document.createElement('img');
    const source = `https://math.vercel.app/?color=white&from=${answer}`
    imageNode.setAttribute('src', source);
   
    return imageNode;
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


// DARK MODE 
function darkMode() {
    // Login screen 
    if (document.querySelector('.um-login-container') !== null) {
        changeProperty('.um-login-container', 'background', darkest); //Login background
        changeProperty('.um-header', 'background', light); //Top header
        changeProperty('.footer-cookie-banner-container', 'background', light); //Bottom banner
        changeProperty('.footer-container', 'background', light); //Bottom banner
        changeProperty('.um-login-box__content', 'background', lightest); //Login box background
        changeProperty('.school-selector', 'color', grey); //School text
    }

    // Main screen 
    if (document.querySelector('.package-container') !== null) {
        changeProperty('.package-container', 'background', darkest); //Main background
        changeProperty('.package-filter-list', 'background', dark); //Left menu bar
        changeProperty('.revision-homework-button-container', 'background', dark); //Left menu bar (Independent Learning)
        changeProperty('.view-body', 'background', darkest); //Tasks background
        changeProperty('.package-filter-arrow', 'border-left-color', grey); //Arrow next to left menu buttons
    }

    // Independent learning screen 
    if (document.querySelector('.revision-container') !== null) {
        changeProperty('.revision-homework-button-container', 'background', dark); ////Left menu bar (Independent Learning)
        changeProperty('.revision-tabs', 'border-bottom', light); //Revision tab border
        changeProperties('.revision-tab', 'background', light); //Revision tab background
        changeProperties('.revision-tab.revision-tab-active', 'background', lightest); //Active revision tab background
        changeProperties('.revision-strand-button', 'background', light); //Strand buttons
        changeProperties('.revision-strand-button', 'color', grey); //Strand buttons
        changeProperties('.revision-strand-button', 'border', 'none'); //Strand buttons
    }

    // Inner independent learning screen 
    if (document.querySelector('.revision-container.revision-scroll-container') !== null) {
        changeProperty('.revision-homework-button-container', 'background', dark); ////Left menu bar (Independent Learning)
        changeProperty('.revision-strand-page', 'background', light); //Inner independent learning screen background
        changeProperties('.accordion-element-header', 'background', lightest); //Substrand background
        changeProperties('.accordion-element-header', 'color', grey); //Substrand color
        changeProperties('.accordion-element-header', 'border', 'none'); //Substrand border
        changeProperties('.revision-substrand-extra', 'color', grey); //Substrand extra color
    }

    // Inner activity learning screen 
    if (document.querySelector('.activity-feed') !== null) {
        changeProperty('.activity-feed-day', 'background', light); //Inner activity learning screen background
        changeProperty('.activity-feed-day > h2', 'color', grey); //Inner activity learning screen color
        changeProperties('.activity-feed-work', 'background', lightest); //Activity background
        changeProperties('.activity-feed-work', 'color', grey); //Activity color
        changeProperties('.activity-feed-work-counts', 'color', grey); //Activity count color
        changeProperties('.revision-location-stream', 'color', grey); //Difficulty color
        changeProperties('.revision-location-stream', 'border-color', grey); //Difficulty border color
    }

    // Top header
    if (document.querySelector('.status-bar') !== null) {
        changeProperty('.status-bar', 'background', light); //Top header
        xpElement = document.querySelector('.status-bar-label-text') //XP header
        if (xpElement !== null) {
            xpElement.textContent = "It doesn't matter :)";
        } 
        changeProperty('.status-bar-label-text', 'background', light); //XP header
        changeProperties('.status-bar-menu-item', 'background', lightest); //Menu item background
        changeProperties('.status-bar-menu-item', 'border', `none`); //Menu item border
        changeProperty('.status-bar-menu-button', 'background', lightest); //Upper right menu button
        changeProperty('.status-bar-menu-button', 'border', `solid ${lightest}`); //Upper right menu button
    }

    // Left navigation buttons
    if (document.querySelector('.btn-menu-item') !== null) {
        changeProperties('.btn-menu-item', 'background', light);
        changeProperties('.btn-menu-item', 'color', grey);
        changeProperties('.btn-menu-item', 'border', `1px solid ${light}`);
        changeProperty('.active', 'border', `1px solid ${grey}`);
    }

    // Topic page
    if (document.querySelector('.revision-topic-page') !== null) {
        changeProperty('.revision-topic-page', 'background', dark); //Topic page background
        changeProperty('.revision-topic-page', 'color', grey); //Topic page color
        changeProperties('.revision-task', 'background', light); //Activity background
        changeProperties('.revision-task-item', 'background', lightest); //Activity item background
    }

    // Left navigation button (Independent Learning)
    if (document.querySelector('.revision-homework-button') !== null) {
        changeProperty('.revision-homework-button', 'background', light);
        changeProperty('.revision-homework-button', 'color', grey);
        changeProperty('.revision-homework-button', 'border', `1px solid ${light}`);
    }

    // Outer tasks
    if (document.querySelector('.package-heading') !== null) {
        changeProperties('.package-heading', 'background', light);
        changeProperties('.package-heading', 'border', `1px solid ${light}`);
        changeProperties('.package-heading', 'color', grey);
    }

    // Inner tasks
    if (document.querySelector('.package-list > div > span > ul > div') !== null) {
        changeProperties('.package-list > div > span > ul > div', 'background-color', dark);
        changeProperties('.package-list > div > span > ul > div', 'border-color', dark);
        changeProperties('.package-list > div > span > ul > div > .task-title', 'color', darkGrey);
    }

    // Question screen
    if (document.querySelector('.main-view') !== null) {
        changeProperties('.dummytaskitem', 'border', 'none'); //Dummy tasks in task selection
        changeProperty('.main-view', 'background', darkest); //Question view background
        changeProperty('.question-only', 'background', light); //Question page background
        changeProperty('.answer-only', 'background', light); //Answer page background
        changeProperty('.question-text', 'background', light); //Question text background
        changeProperty('.question-text > div > .text', 'color', grey); //Question text colour
        changeProperty('.result-inner h2', 'color', grey); //Correct answer color
        changeProperty('.skill-delivery-view .view-body', 'background', light); //Correct answer background
        changeProperties('.text-container', 'color', grey); //Answer choice text
        changeProperties('.choice-text', 'background', grey); //Answer choice background
        changeProperties('.choice-text .text', 'color', '#0b3470'); //Answer choice text
        changeProperties('.entry-area-bubble .text', 'color', darkest); //Answer choice text
        changeProperties('.selected .text', 'color', orange); //Selected choice text
        changeProperties('.answer-part > div > .text', 'color', grey); //Answer text
        changeProperties('.gap-container', 'border', 'none'); //Answer text
    }

    // Bookwork check pop-up 
    if (document.querySelector('#answer-wac-box') !== null) {
        changeProperty('#answer-wac-box', 'background', lightest); //Bookwork check background
        changeProperty('.wac-text-container .bookwork-code', 'background', light); //Bookwork code background
        changeProperty('.wac-text-container .bookwork-code', 'border', 'none'); //Bookwork code background
        changeProperty('.wac-header-container', 'color', grey); //Bookwork check title
        changeProperty('.choice-wac-options', 'background', lightest); //Options background
        changeProperty('.wac-text', 'color', grey); //Bookwork check text
        changeProperties('.zoom-btn', 'color', grey); //Options zoom text
        changeProperties('.answer-markup.choice-wac-option.choice.choice-answer-markup', 'background', grey); //Individual option background
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
    
                answerData = getInput(bookworkCode);
                chrome.storage.sync.get(['sparxCodes'], function(database) {
                    database.sparxCodes[bookworkCode] = answerData[bookworkCode];
                    chrome.storage.sync.set(database);
                    console.log('Value currently is ' + JSON.stringify(database));
                });
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

            answerData = getInput(bookworkCode);
            chrome.storage.sync.get(['sparxCodes'], function(database) {
                database.sparxCodes[bookworkCode] = answerData[bookworkCode];
                chrome.storage.sync.set(database);
                console.log('Value currently is ' + JSON.stringify(database));
            });
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

function getInput(bookworkCode) {
    answerData = {};
    answerData[bookworkCode] = [];

    // Get input value
    const keypadInputs = document.querySelectorAll('.number-input');
    if (keypadInputs !== null) {
        for (let i = 0; i < keypadInputs.length; i++) {
            inputValue = keypadInputs[i].attributes[10].value;
            answerData[bookworkCode].push(inputValue);
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
                answerData[bookworkCode].push(innerChoice);
            } else if (choice.includes('image')) {
                const imageElement = chosen[i].querySelector('[data-test-target="image-img"]');
                const source = imageElement.currentSrc;
                answerData[bookworkCode].push(source.toString());
            } else {
                answerData[bookworkCode].push(choice);
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
                answerData[bookworkCode].push(innerCard);
            } else {
                answerData[bookworkCode].push(card);
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
        answerData[bookworkCode].push(fraction);
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
                answerData[bookworkCode].push(innerCard);
            } else {
                answerData[bookworkCode].push(card);
            }
        }
    }

    console.log(answerData);

    return answerData
}

async function changeProperty(selector, property, colour) {
    let element = await waitForElm(selector);
    if (element !== null) {
        element.style[property] = colour
    } else {
        console.log("Can't find element")
    }
}

async function changeProperties(selector, property, colour) {
    let elements = await waitForElms(selector);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] !== null) {
            elements[i].style[property] = colour
        } else {
            console.log("Can't find element")
        }
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function waitForElms(selector) {
    return new Promise(resolve => {
        if (document.querySelectorAll(selector)) {
            return resolve(document.querySelectorAll(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelectorAll(selector)) {
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
