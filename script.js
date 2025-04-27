const upload = document.getElementById('upload');
const canvasInput = document.getElementById('canvasInput');
const canvasOutput = document.getElementById('canvasOutput');
const ctxInput = canvasInput.getContext('2d');
const ctxOutput = canvasOutput.getContext('2d');
const controls = document.getElementById('controls');

// Περιμένουμε να φορτωθεί η OpenCV.js
cv['onRuntimeInitialized'] = () => {
    console.log('OpenCV.js is ready');
};

let img = new Image();

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        img.onload = function() {
            canvasInput.width = img.width;
            canvasInput.height = img.height;
            canvasOutput.width = img.width;
            canvasOutput.height = img.height;
            ctxInput.drawImage(img, 0, 0);
            ctxOutput.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    
    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('blurButton').addEventListener('click', () => {
    let src = cv.imread('canvasInput');
    let dst = new cv.Mat();
    let ksize = new cv.Size(15, 15);
    cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    src.delete();
    dst.delete();
});

document.getElementById('edgeButton').addEventListener('click', () => {
    let src = cv.imread('canvasInput');
    let gray = new cv.Mat();
    let edges = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(gray, edges, 50, 150, 3, false);
    cv.imshow('canvasOutput', edges);
    src.delete();
    gray.delete();
    edges.delete();
});
