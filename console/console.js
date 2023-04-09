console.log("Script is running");

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

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

const themeStyles = '.themes-container{display:flex;align-items:center;justify-content:center;flex-direction:column;width:500px}.themes-container ul{border:2px solid #fff;padding:0;display:flex;flex-direction:column;width:100%}.themes-container ul li{list-style-type:none;display:flex;flex-direction:row}.themes-container ul li div{background-color:orange;height:50px;width:25%}.themes-container ul li:hover{cursor:pointer;filter:brightness(80%)}@media (max-width: 1000px){.themes-container{width:60vw}}';
const darkModeStyles = ':root{--orange:#f46815;}:root{--grey:#f8f8f7;}:root{--dark-grey:#e9e9e9;}[class~=answer-markup][class~=choice-wac-option][class~=choice][class~=choice-answer-markup]{background:var(--grey) !important;}:root{--darkest:#241e92;}.entry-area-bubble .text,[class~=answer] [class~=markdown][class~=text-container]{color:var(--darkest) !important;}:root{--dark:#5432d3;}:root{--light:#7b6cf6;}:root{--lightest:#e5a5ff;}[class~=um-login-container],[class~=main-view],.view-body,[class~=package-container]{background:var(--darkest) !important;}.rewards-progress-levels,.package-filter-list,[class~=rewards-section-content],[class~=rewards-section][class~=insights-lifetime-totals],[class~=rewards-faqs] [class~=accordion-element-header],[class~=revision-topic-page],.revision-homework-button-container,[class~=rewards-section-header]{background:var(--dark) !important;}[class~=rewards-section]{border-left-color:var(--dark) !important;}[class~=rewards-section]{border-bottom-color:var(--dark) !important;}[class~=rewards-section]{border-right-color:var(--dark) !important;}[class~=rewards-section]{border-top-color:var(--dark) !important;}[class~=status-bar],[class~=revision-strand-page],[class~=question-only],[class~=rewards-progress-level]:hover,[class~=status-bar-label-text],[class~=question-text],[class~=revision-tab],[class~=rewards-section-row],[class~=btn-menu-item],[class~=answer-only],[class~=um-header],.footer-cookie-banner-container,.revision-task,.revision-strand-button,[class~=revision-homework-button],[class~=activity-feed-day],[class~=package-heading],[class~=wac-text-container] [class~=bookwork-code],#pass-wac-box,#not-done-wac-box,[class~=footer-container],[class~=insights-lifetime-total],[class~=skill-delivery-view] [class~=view-body]{background:var(--light) !important;}[class~=revision-tabs]{border-bottom-width:medium !important;}[class~=revision-tabs]{border-bottom-style:none !important;}[class~=revision-tabs]{border-bottom-color:var(--light) !important;}[class~=revision-tabs]{border-image:none !important;}[class~=btn-menu-item]{border-left-width:.0625pc !important;}[class~=btn-menu-item]{border-bottom-width:.0625pc !important;}[class~=btn-menu-item]{border-right-width:.0625pc !important;}[class~=btn-menu-item]{border-top-width:.0625pc !important;}[class~=btn-menu-item]{border-left-style:solid !important;}[class~=btn-menu-item]{border-bottom-style:solid !important;}[class~=btn-menu-item]{border-right-style:solid !important;}[class~=btn-menu-item]{border-top-style:solid !important;}[class~=btn-menu-item]{border-left-color:var(--light) !important;}[class~=btn-menu-item]{border-bottom-color:var(--light) !important;}[class~=btn-menu-item]{border-right-color:var(--light) !important;}[class~=btn-menu-item]{border-top-color:var(--light) !important;}[class~=btn-menu-item]{border-image:none !important;}[class~=package-heading]{border-left-width:.0625pc !important;}[class~=package-heading]{border-bottom-width:.0625pc !important;}[class~=package-heading]{border-right-width:.0625pc !important;}[class~=package-heading]{border-top-width:.0625pc !important;}[class~=package-heading]{border-left-style:solid !important;}[class~=package-heading]{border-bottom-style:solid !important;}[class~=package-heading]{border-right-style:solid !important;}[class~=package-heading]{border-top-style:solid !important;}[class~=package-heading]{border-left-color:var(--light) !important;}[class~=package-heading]{border-bottom-color:var(--light) !important;}[class~=package-heading]{border-right-color:var(--light) !important;}[class~=package-heading]{border-top-color:var(--light) !important;}[class~=package-heading]{border-image:none !important;}[class~=revision-homework-button]{border-left-width:.0625pc !important;}[class~=revision-homework-button]{border-bottom-width:.0625pc !important;}[class~=revision-homework-button]{border-right-width:.0625pc !important;}[class~=revision-homework-button]{border-top-width:.0625pc !important;}[class~=revision-homework-button]{border-left-style:solid !important;}[class~=revision-homework-button]{border-bottom-style:solid !important;}[class~=revision-homework-button]{border-right-style:solid !important;}[class~=revision-homework-button]{border-top-style:solid !important;}[class~=revision-homework-button]{border-left-color:var(--light) !important;}[class~=result-inner] h1[class~=incorrect],[class~=activity-feed-day] > h2,[class~=answer-part] > div > [class~=text],[class~=question-text] > div > [class~=text]{color:var(--grey) !important;}[class~=revision-homework-button]{border-bottom-color:var(--light) !important;}[class~=revision-homework-button]{border-right-color:var(--light) !important;}[class~=revision-homework-button]{border-top-color:var(--light) !important;}[class~=revision-homework-button]{border-image:none !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=accordion-element-header]{border-left-width:medium !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-bottom-width:medium !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-right-width:medium !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=accordion-element-header]{border-top-width:medium !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=accordion-element-header]{border-left-style:none !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-bottom-style:none !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-right-style:none !important;}#answer-wac-box,[class~=um-login-box__content]{background:var(--lightest) !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-top-style:none !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=accordion-element-header]{border-left-color:currentColor !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=accordion-element-header]{border-bottom-color:currentColor !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-right-color:currentColor !important;}[class~=accordion-element-header],[class~=wac-text-container] [class~=bookwork-code]{border-top-color:currentColor !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=accordion-element-header]{border-image:none !important;}[class~=activity-feed-work]{border-left-width:medium !important;}[class~=activity-feed-work]{border-bottom-width:medium !important;}[class~=activity-feed-work]{border-right-width:medium !important;}[class~=activity-feed-work]{border-top-width:medium !important;}[class~=activity-feed-work]{border-left-style:none !important;}[class~=activity-feed-work]{border-bottom-style:none !important;}[class~=activity-feed-work]{border-right-style:none !important;}[class~=activity-feed-work]{border-top-style:none !important;}[class~=activity-feed-work]{border-left-color:currentColor !important;}[class~=activity-feed-work]{border-bottom-color:currentColor !important;}[class~=activity-feed-work]{border-right-color:currentColor !important;}[class~=activity-feed-work]{border-top-color:currentColor !important;}[class~=activity-feed-work]{border-image:none !important;}[class~=dummytaskitem]{border-left-width:medium !important;}[class~=dummytaskitem]{border-bottom-width:medium !important;}[class~=status-bar-menu-item]:not(:first-child):before{left:-2.25pt !important;}[class~=dummytaskitem]{border-right-width:medium !important;}[class~=dummytaskitem]{border-top-width:medium !important;}[class~=dummytaskitem]{border-left-style:none !important;}[class~=dummytaskitem]{border-bottom-style:none !important;}[class~=dummytaskitem]{border-right-style:none !important;}[class~=dummytaskitem]{border-top-style:none !important;}[class~=status-bar-menu-item]:not(:first-child):before{width:110% !important;}[class~=status-bar-menu-item]:not(:first-child):before{border-bottom-width:.75pt !important;}[class~=dummytaskitem]{border-left-color:currentColor !important;}[class~=dummytaskitem]{border-bottom-color:currentColor !important;}[class~=dummytaskitem]{border-right-color:currentColor !important;}[class~=dummytaskitem]{border-top-color:currentColor !important;}[class~=dummytaskitem]{border-image:none !important;}[class~=status-bar-menu-item],[class~=choice-wac-options],.revision-task-item,[class~=revision-tab][class~=revision-tab-active],[class~=activity-feed-work],[class~=status-bar-menu-button],[class~=accordion-element-header]{background:var(--lightest) !important;}.status-bar-menu-button,[class~=status-bar-menu-item]:not(:first-child):before{border-bottom-style:solid !important;}.status-bar-menu-button{border-left-width:medium !important;}.status-bar-menu-button{border-bottom-width:medium !important;}.status-bar-menu-button{border-right-width:medium !important;}.status-bar-menu-button{border-top-width:medium !important;}.status-bar-menu-button{border-left-style:solid !important;}.status-bar-menu-button{border-right-style:solid !important;}.status-bar-menu-button{border-top-style:solid !important;}[class~=status-bar-menu-item]:not(:first-child):before{border-bottom-color:var(--darkest) !important;}.status-bar-menu-button{border-left-color:var(--lightest) !important;}.status-bar-menu-button{border-bottom-color:var(--lightest) !important;}[class~=revision-topic-page],[class~=text-container],[class~=insights-lifetime-total],[class~=revision-strand-button],.btn-menu-item,[class~=revision-substrand-extra],.revision-location-stream,[class~=wac-header-container],[class~=minigame-description] > div,[class~=accordion-element-header],[class~=activity-feed-work],.result-inner h2,[class~=activity-feed-work-counts],[class~=revision-homework-button],[class~=rewards-progress-level-label-text],[class~=school-selector],[class~=wac-text],[class~=rewards-section-header-title],[class~=result-inner] [class~=result-subtitle-prominent],.package-heading,[class~=wac-message],.rewards-section-row{color:var(--grey) !important;}.status-bar-menu-button{border-right-color:var(--lightest) !important;}.status-bar-menu-button{border-top-color:var(--lightest) !important;}.status-bar-menu-button{border-image:none !important;}[class~=package-list] > div > span > ul > div{background:var(--dark) !important;}.status-bar-menu-item{border-left-color:var(--lightest) !important;}.status-bar-menu-item{border-bottom-color:var(--lightest) !important;}[class~=selected] [class~=text],[class~=choice-wac-option][class~=selected]{color:var(--orange) !important;}.status-bar-menu-item{border-right-color:var(--lightest) !important;}.status-bar-menu-item{border-top-color:var(--lightest) !important;}[class~=package-list] > div > span > ul > div > [class~=task-title]{color:var(--dark-grey) !important;}[class~=taskitem] > [class~=icon]{filter:brightness(5) !important;}.package-list > div > span > ul > div{border-left-color:var(--dark) !important;}[class~=choice-text]{background:var(--grey) !important;}.revision-location-stream,[class~=revision-strand-button],[class~=active]{border-left-color:var(--grey) !important;}[class~=active],.revision-location-stream,[class~=revision-strand-button]{border-bottom-color:var(--grey) !important;}.revision-location-stream,[class~=revision-strand-button],[class~=active]{border-right-color:var(--grey) !important;}[class~=revision-strand-button],[class~=active],.revision-location-stream{border-top-color:var(--grey) !important;}[class~=active]{border-left-width:.75pt !important;}[class~=active]{border-bottom-width:.75pt !important;}[class~=active]{border-right-width:.75pt !important;}[class~=active]{border-top-width:.75pt !important;}[class~=active]{border-left-style:solid !important;}[class~=active]{border-bottom-style:solid !important;}[class~=active]{border-right-style:solid !important;}[class~=active]{border-top-style:solid !important;}.package-list > div > span > ul > div{border-bottom-color:var(--dark) !important;}.package-list > div > span > ul > div{border-right-color:var(--dark) !important;}[class~=status-bar-menu-item]:not(:first-child):before,[class~=active]{border-image:none !important;}.package-filter-arrow{border-left-color:var(--grey) !important;}.rewards-section-header{border-radius:0 !important;}[class~=revision-strand-icon],.status-bar-menu-item-img{filter:grayscale(100%) brightness(5) !important;}.package-list > div > span > ul > div{border-top-color:var(--dark) !important;}[class~=rewards-progress-level]:hover [class~=rewards-progress-level-label-text]{color:var(--orange) !important;}[class~=status-bar-menu-item]:hover > [class~=status-bar-menu-item-img]{filter:none !important;}';

async function fetchDependencies() {
    let response = await fetch('https://raw.githubusercontent.com/alexlostorto/sparx/main/release.json');
    let json = await response.json();

    for (url of json.dependencies.js) {
        let js = document.createElement("script");
        js.src = url;
        js.async = false;
        js.defer = false;
        document.head.appendChild(js);
    }

    for (url of json.dependencies.css) {
        let link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet"
        document.head.appendChild(link);
    }
}

fetchDependencies();

// CSS 
document.head.insertAdjacentHTML('beforeend','<style>' + themeStyles + '</style>');
document.head.insertAdjacentHTML('beforeend','<style>' + darkModeStyles + '</style>');

// Colour palette 
colours = getLocalStorage('colour-theme');

if (colours == null) {
    document.documentElement.style.setProperty('--darkest', themes[3]['darkest']);
    document.documentElement.style.setProperty('--dark', themes[3]['dark']);
    document.documentElement.style.setProperty('--light', themes[3]['light']);
    document.documentElement.style.setProperty('--lightest', themes[3]['lightest']);
} else {
    document.documentElement.style.setProperty('--darkest', themes[colours.theme]['darkest']);
    document.documentElement.style.setProperty('--dark', themes[colours.theme]['dark']);
    document.documentElement.style.setProperty('--light', themes[colours.theme]['light']);
    document.documentElement.style.setProperty('--lightest', themes[colours.theme]['lightest']);
}

const grey = '#f8f8f7';
const orange = '#f46815';

console.log(JSON.parse(localStorage.getItem('sparx-data')));

const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function() {
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

// USE COUNTER
const counterURL = "https://api.countapi.xyz/hit/sparxnote/visits";
let visits;

// DATABASE
const appName = 'data-pddjp';
const apiKey = 'ZTxLUr2NMrbV12Bn5CGA5qGfmoG48pBhQAyEnPsClNqmVsPmAe4OM4R8C2I5T46z';
const mongoDatabaseURL = `https://data.mongodb-api.com/app/${appName}/endpoint/data/v1/action/`;
let authorisedToken = null;
let tokenLife = 0;
let userDocumentId = null;
let userName = null;
let userData = null;
let question = null;
let answer = null;

function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}

async function checkUser() {
    visits = await(await fetch(counterURL)).json();

    let response = await contactDatabase('find', 'users', 'user-data'); 

    // Initialise the 'users' collection if it doesn't exist
    if (response.documents.length == 0) {
        await contactDatabase('insertOne', 'users', 'user-data', {users: {}});
        response = await contactDatabase('find', 'users', 'user-data'); 
    }

    const documentId = response.documents[0]._id; 
    const users = response.documents[0].users;

    hash = md5(userName)

    if (!(hash in users)) {
        // Create a new document for the user's answers in the 'answers' database
        let newDocumentId = await (await contactDatabase('insertOne', 'answers', 'user-data', {answers: {}})).insertedId;

        let dateObject = new Date().toJSON();
        let date = dateObject.slice(0, 10);
        let time = dateObject.slice(11, 19);
        users[hash] = {};
        users[hash].id = newDocumentId;
        users[hash].user = userName;
        users[hash].created = `${date} ${time}`;
        users[hash]['last-login'] = `${date} ${time}`;
        contactDatabase('updateOne', 'users', 'user-data', [{"users": users}, documentId]);
    } 

    userDocumentId = users[hash].id;

    // Check if the ID points to an existing document in the 'answers' database
    response = await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": users[hash].id }}); 

    let dateObject = new Date().toJSON();
    let date = dateObject.slice(0, 10);
    let time = dateObject.slice(11, 19);
    users[hash]['last-login'] = `${date} ${time}`;
    contactDatabase('updateOne', 'users', 'user-data', [{"users": users}, documentId]);
    
    let userDocument = await( await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": userDocumentId }})).document
    
    if (userDocument === null) {
        // Create a new document for the user's answers in the 'answers' database
        let newDocumentId = await (await contactDatabase('insertOne', 'answers', 'user-data', {answers: {}})).insertedId;

        users[hash].id = newDocumentId;
        
        contactDatabase('updateOne', 'users', 'user-data', [{"users": users}, documentId]);
    } else {
        userData = userDocument.answers;
    }
}

async function authorise() {
    timeAlive = getTimestampInSeconds() - tokenLife;
    
    if (timeAlive >= 1740) {
        let jsondata = {
            'key': apiKey
        }

        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json'
            },
            'processData': false,
            body: JSON.stringify(jsondata)
        }

        let response = await (await fetch(`https://realm.mongodb.com/api/client/v2.0/app/${appName}/auth/providers/api-key/login`, settings)).json();
        authorisedToken = response.access_token;

        tokenLife = getTimestampInSeconds();
    }

    return authorisedToken;
}

async function contactDatabase(action, database, collection, content=false) {
    let token = await authorise();

    const jsonData = {
        'database': database,
        'collection': collection,
        'dataSource': 'Sparx',
    }

    if (content !== false && action == 'updateOne') {
        jsonData.filter = { "_id": { "$oid": content[1] } };
        jsonData.update = content[0];
    } else if (content !== false && action == 'findOne') {
        jsonData.filter = content;
    } else if (content !== false) {
        jsonData.document = content;
    }

    const settings = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'processData': false,
        body: JSON.stringify(jsonData)
    }

    response = await (await fetch(mongoDatabaseURL + action, settings)).json();
    
    return response
}

async function main() {    
    if (document.querySelector('.package-container') !== null) { showThemes(); }

    if (document.querySelector('.status-bar-label.status-bar-label-username') !== null && userName == null) { userName = document.querySelector('.status-bar-label.status-bar-label-username').textContent }

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
                document.querySelector('.result-inner').append(divNode);
            } else {
                let answers = answer.join(', ');

                const textNode = document.createElement('span');
                textNode.textContent = `Answer: ${answers}`;
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
            if (bookworkAnswer.every(hasSource)) {
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
                textNode.style['color'] = 'white';

                const divNode = document.createElement('div');
                divNode.style['display'] = 'flex';
                divNode.style['align-items'] = 'center';
                divNode.style['justify-content'] = 'center';
                textNode.setAttribute('id', 'custom-answer');

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

    let questionContainer = document.querySelector('.question');
    if (questionContainer !== null) {
        question = questionContainer.innerText;
        questionImages = document.querySelectorAll('[data-test-target="image-img"]');

        question = question.replace(/\r?\n|\r/g, '');

        if (questionImages.length == 0 || questionImages[0]) { return }
        else {
            questionImages.forEach(function(image) {
                question += `$$ ${image.currentSrc}`;
            })
        }
    }
}


// SUBMITS ANSWER 
async function sendAnswerToDatabase() {
    await sleep(500);

    let correctStatusElement = document.querySelector('.page.result .result-inner .correct');
    console.log(correctStatusElement);
    if (correctStatusElement !== null) {
        if (question in userData) {
            console.log("Question already in database");
            return;
        }
    
        // Update MongoDB database if answer is correct
        try {
            console.log("POSTing answer data to database")
            let dateObject = new Date().toJSON();
            let date = dateObject.slice(0, 10);
            let time = dateObject.slice(11, 19);
            let questionDict = {};
            questionDict.answer = answer;
            questionDict.time = `${date} ${time}`;
            userData[question] = questionDict;
            contactDatabase('updateOne', 'answers', 'user-data', [{"answers": userData}, userDocumentId]);
        } catch(err) {console.log(err)}
    }
}

document.addEventListener("click", function(e) {
    if(e.target) {
        try {
            if (
                (e.target.id == "skill-delivery-submit-button" && e.target.innerText == "Submit") ||
                (e.target.className == "button-text" && e.target.textContent == "Submit") || 
                (e.target.className == "button-all" && e.target.textContent == "Submit") || 
                (e.target.className == "button-icon button-icon-right" && e.target.parentElement.innerText == "Submit") ||
                (e.target.parentElement.className == "button-icon button-icon-right" && e.target.parentElement.parentElement.innerText == "Submit") ||
                (e.target.parentElement.parentElement.className == "button-icon button-icon-right" && e.target.parentElement.parentElement.parentElement.innerText == "Submit")) {

                console.log("---PROCESSING ANSWER---");
    
                const bookworkCodeElement = document.querySelector('.bookwork-code');
                let bookworkCode = bookworkCodeElement.textContent;
                bookworkCode = bookworkCode.replace("Bookwork code: ", '');
    
                answer = getInput(bookworkCode);
                updateLocalStorage('sparx-data', bookworkCode, answer);

                sendAnswerToDatabase();
            }
        } catch(err) {}
    }
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Submit answer
        const submitButton = document.querySelector('#skill-delivery-submit-button');
        if (submitButton !== null) {
            console.log("---PROCESSING ANSWER---");

            const bookworkCodeElement = document.querySelector('.bookwork-code');
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');

            answer = getInput(bookworkCode);
            updateLocalStorage('sparx-data', bookworkCode, answer);

            sendAnswerToDatabase();
        }

        // Select next task
        const taskItems = document.querySelectorAll('.taskitem-selectable');
        if (taskItems.length > 0) {
            taskItems.forEach(function(taskItem) {
                if (!(taskItem.classList.contains('done'))) {
                    taskItem.click();
                }
            });
        }

        const revisionItems = document.querySelectorAll('.revision-task-item.btn-menu-item');
        if (revisionItems.length > 0) {
            revisionItems.forEach(function(revisionItem) {
                if (revisionItem.querySelector('.pill.done') === null) {
                    revisionItem.click();
                }
            });
        }

        // Select auto higher or lower
        const minigames = document.querySelectorAll('.minigame-choice-card');
        if (minigames.length > 0) {
            minigames.forEach(function(minigame) {
                if (minigame.querySelector('.minigame-title').textContent == 'Auto Higher or Lower?') {
                    minigame.click();
                }
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

function getLocalStorage(itemName) {
    if (localStorage.getItem(itemName) === null) {
        return null
    } else {
        return JSON.parse(localStorage.getItem(itemName));
    }
}

function updateLocalStorage(itemName, key, newValue) {
    console.log("Updating database");

    if (localStorage.getItem(itemName) === null) {
        const defaultJSON = {"Placeholder": 0};
        localStorage.setItem(itemName, JSON.stringify(defaultJSON));
    }

    let item = JSON.parse(localStorage.getItem(itemName));
    item[key] = newValue;

    console.log("New value: ", item);

    console.log(key, newValue);

    localStorage.setItem(itemName, JSON.stringify(item));

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

    for (const [index, theme] of Object.entries(themes)) {
        let themeNode = document.createElement('li');
        for (const [_, colour] of Object.entries(theme)) {
            let colourNode = document.createElement('div');
            colourNode.style['background-color'] = colour;
            themeNode.appendChild(colourNode);
        };
        themeNode.addEventListener('click', function() {
            console.log(`You clicked theme ${index}`);
            updateLocalStorage('colour-theme', 'theme', index)
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
    function addText(nodeList) {
        if (nodeList === null || nodeList.length == 0) { return }
        for (let i = 0; i < nodeList.length; i++) {
            let answer = '';
            let text = nodeList[i].querySelector('span.text');
            if (text !== null) {
                for (let i = 0; i < text.childNodes.length; i++) {
                    if (text.childNodes[i].className == 'katex') {
                        let latex = text.childNodes[i].querySelector('annotation');
                        if (latex !== null) {
                            answer += latex.textContent;
                        } 
                    } else {
                        answer += text.childNodes[i].textContent;
                    }
                }
            } 
            let image = nodeList[i].querySelector('[data-test-target="image-img"]');
            if (image !== null) {
                const source = image.currentSrc;
                answer += source.toString();
            }
            answerData.push(answer);
        }
    }

    let answerData = [];

    // Get input value
    const keypadInputs = document.querySelectorAll('.number-input');
    if (keypadInputs.length > 0) {
        for (let i = 0; i < keypadInputs.length; i++) {
            inputValue = keypadInputs[i].attributes[10].value;
            answerData.push(inputValue);
        }
    }

    // Get cards selected 
    const slots = document.querySelectorAll('.slots .slot');
    addText(slots);

    // Get choice selected 
    const chosen = document.querySelectorAll('.answer-part .gap-card.selected, .choice.selected');
    addText(chosen);

    console.log(answerData);
    return answerData;
}

async function credits() {
    await sleep(200);
    console.clear();
    console.log.apply(console, ["%c Thanks for using my Sparx program! ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

main();

checkUser();

credits()
setInterval(credits, 5000);