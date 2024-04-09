let currentPage = 0;
let pageContents = [''];

let isDragging = false;
let isLocked = false;
let isNextPageInProgress = false;

let offsetX, offsetY;

function previousPage() {
    if (isLocked) return;
    if (currentPage > 0) {
        currentPage--;
        displayPage();
    }
}

function nextPage() {
    if (isLocked || isNextPageInProgress) return;
    isNextPageInProgress = true;

    currentPage++;
    if (currentPage >= pageContents.length) {
        saveNote();
    } else {
        displayPage();
    }

    setTimeout(() => {
        isNextPageInProgress = false;
    }, 100);
}

function saveNote() {
    if (isLocked) return;
    updatePageContent();
    currentPage = pageContents.length;
    pageContents.push('');
    displayPage();
}

function displayPage() {
    document.getElementById('note').style.backgroundColor = "rgba(248, 229, 137, 0.7)";
    document.getElementById('page-counter').innerText = "Page " + (currentPage + 1);
    document.getElementById('note-content').value = pageContents[currentPage];
}

function updatePageContent() {
    pageContents[currentPage] = document.getElementById('note-content').value;
}

function toggleLock() {
    isLocked = !isLocked;
    let lockButton = document.querySelector('.lock-button');
    if (isLocked) {
        lockButton.innerText = "Unlock";
    } else {
        lockButton.innerText = "Lock";
    }
}

document.getElementById('note').addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', dragNote);
document.addEventListener('mouseup', stopDragging);

function startDragging(e) {
    if (!isLocked) {
        isDragging = true;
        offsetX = e.clientX - document.getElementById('note').getBoundingClientRect().left;
        offsetY = e.clientY - document.getElementById('note').getBoundingClientRect().top;
    }
}

function dragNote(e) {
    if (!isLocked && isDragging) {
        let note = document.getElementById('note');
        note.style.left = (e.clientX - offsetX) + 'px';
        note.style.top = (e.clientY - offsetY) + 'px';
    }
}

function stopDragging() {
    isDragging = false;
}
