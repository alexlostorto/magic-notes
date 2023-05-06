console.clear();
credits();

const headerText = document.querySelector('.header-text');
const headerDescription = document.querySelector('.header-description');
const instructions = document.querySelector('.slide article');
const downloadButton = document.querySelector('#download-button');

fadeIn(headerText, 500);
fadeIn(headerDescription, 800);
fadeIn(instructions, 1000);

function download(uri, name) {
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click(); 
    link.remove();
}

downloadButton.addEventListener('click', async () => {
    download('documents/magic-notes.zip', 'Magic Notes');
    downloadButton.textContent = 'Downloaded!';
    await sleep(1000);
    downloadButton.textContent = 'Download ZIP';
})