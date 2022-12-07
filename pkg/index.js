import { init_app, default as init } from './d0.js';

async function run() {
    await init('./pkg/d0_bg.wasm');
    init_app();
}

run();

const changeSelection = (color) => {
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const range = window.getSelection().getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    let newNode = document.createElement('span');
    newNode.style.color = color;
    let frag = preSelectionRange.extractContents()
    newNode.appendChild(frag.cloneNode(true))
    range.deleteContents()
    range.insertNode(newNode);
  }
};

let changeColor = (e) => {
    switch (e.target.id) {
        case 'black':
            changeSelection('#393732')
            break;
        case 'green':
            changeSelection('#669e71')
            break;
        case 'purple':
            changeSelection('#8176cc')
            break;
        case 'orange':
            changeSelection('#cc5f43')
            break;
        case 'pink':
            changeSelection('#c75a93')
            break;
        default:
            break;
    }
}

const download = () => {
    let image = document.querySelector('canvas')
    let caption = document.getElementById('text').innerHTML
    let imageSrc = image.toDataURL("image/png");
    let saved = document.createElement('figure')
    saved.innerHTML = `<center>
    <img src='${imageSrc}'>
    <figcaption>${caption}</figcaption>
    </center>`
    let newHTML = `<html><body>${saved.innerHTML}</body></html>`
    let newWindow = window.open('about:blank');
    newWindow.document.write(newHTML) 
}

document.getElementById('colorMenu').onclick = changeColor
document.getElementById('download').onclick = download