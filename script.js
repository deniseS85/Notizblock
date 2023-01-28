// Array eingegebene Werte: Title und Notice
let titles = [];
let notices = [];

// Array gelöschte Werte: Title und Notice
let trashTitles = [];
let trashNotices = [];

// Erstellung Initial HTML
function render() {
    let linkStart = document.getElementById('start');
    linkStart.classList.add('navClick');

    let content = document.getElementById('contentNotice');

    content.innerHTML = "";
    content.classList.remove('newContent');

    content.innerHTML = /*html*/`
            <div onclick="openNoticeBox()" class="placeholder">
                Notiz schreiben...
            </div>
            <div class="tooltip">
                <img onclick="openNoticeBox()" class="noticeIcon" src="img/newNotice.png">
                <span class="tooltiptext">
                    Neue Notiz
                </span>
            </div> 
    `;
}

// Mit Klick wird Eingabefeld geöffnet
function openNoticeBox() {
    let content = document.getElementById('contentNotice');
    
    content.innerHTML = "";
    content.classList.add('newContent');
   
    content.innerHTML += /*html*/`
        <textarea id="inputTitle" placeholder="Titel" class="title" autofocus></textarea>
        <textarea id="inputNotice" placeholder="Notiz schreiben..." class="notice" onInput="textareaSize()"></textarea>
        <button onclick="addNotice(); closeNoticeBox()"; class="saveNotice">
            Speichern
        </button>
    `;
    textareaSize();
}

// newContent-Container passt die Höhe von dem Inhalt von inputNotice an
// onInput = führt Funktionen aus, wenn im Eingabefeld geschrieben  wird(inkl. Steuerzeichen, z.B. Enter)
function textareaSize() {
    let textareaNotice = document.getElementById('inputNotice');

    textareaNotice.style.height  = "";
    textareaNotice.style.height = textareaNotice.scrollHeight + "px";
}

// Wenn Link "Start" aktiv ist, wird Hintergrundfarbe hinzugefügt
function linkActiveStart() {
    let linkStart = document.getElementById('start');
    let linkTrash = document.getElementById('basket');
    linkStart.classList.add('navClick');
    linkTrash.classList.remove('navClick');
}

// Eingabe wird in einem separaten Container angezeigt
function showNotice() {
    let savedMessages = document.getElementById('addPost');
    savedMessages.innerHTML = '';

    for (let i = 0; i < notices.length; i++) {
        
        savedMessages.innerHTML += /*html*/`
        <div class="savedMessages">
            <div>
                <b>${titles[i]}</b><br>${notices[i]}
            </div>
            <img onclick="deleteNotice(${i})" class="deleteImg" src="img/delete.png">
        </div>
        `;
    }
    linkActiveStart();
}

function closeNoticeBox() {
    render();
}

// Title und Notice werden im Array gespeichert
function addNotice() {
    let title = document.getElementById('inputTitle').value;
    let text = document.getElementById('inputNotice').value;
    
    if (title == '' || text == '') {
        alert('Bitte schreibe eine Notiz!');
    } else {
        titles.push(title);
        notices.push(text);
        showNotice(); 
        save();
    }
}

//Notiz wird gelöscht und in das Array trashTitles/trashNotices gespeichert
function deleteNotice(position) {
    trashTitles.push(titles.splice(position, 1));
    trashNotices.push(notices.splice(position, 1));

    showNotice();
    save();
    saveTrash();
}

/// Arrays titles und notices in localStorage speichern
function save() {
    localStorage.setItem('Title', JSON.stringify(titles));
    localStorage.setItem('Notice', JSON.stringify(notices));
}

// Array titles und notices werden vom localStorage geladen
function load() {
    let titlesAsText = localStorage.getItem('Title');
    let noticeAsText = localStorage.getItem('Notice');

    if (titlesAsText && noticeAsText) {
        titles = JSON.parse(titlesAsText);
        notices = JSON.parse(noticeAsText);
    }
    showNotice();
}

// Array trashTitle und trashNotice werden in localStorage gespeichert
function saveTrash() {
    localStorage.setItem('TrashTitle', JSON.stringify(trashTitles));
    localStorage.setItem('TrashNotice', JSON.stringify(trashNotices));
}

// Wenn Link "Papierkorb" aktiv ist, wird Hintergrundfarbe hinzufügt
function linkActiveBasket() {
    let linkTrash = document.getElementById('basket');
    let linkStart = document.getElementById('start');
    linkTrash.classList.add('navClick');
    linkStart.classList.remove('navClick');
}

// Array trashTitle und trashNotice werden vom localStorage geladen
function loadTrash() {
    let titlesTrashAsText = localStorage.getItem('TrashTitle');
    let notesTrashAsText = localStorage.getItem('TrashNotice');

    if (titlesTrashAsText && notesTrashAsText) { 
        trashTitles = JSON.parse(titlesTrashAsText);
        trashNotices = JSON.parse(notesTrashAsText);
    }
    showTrash();
    linkActiveBasket();  
} 

// Papierkorb wird angezeigt
function showTrash() {
    let savedMessages = document.getElementById('addPost');

    savedMessages.innerHTML = '';

        for (let i = 0; i < trashNotices.length; i++) {
            savedMessages.innerHTML += /*html*/`
            <div class="savedMessages">
                <div>
                    <b>${trashTitles[i]}</b><br>${trashNotices[i]}
                </div>
                <img onclick="deleteCompleteNotice(${i})" class="deleteImg" src="img/delete.png">
            </div>
            `; 
        }
}

// Einträge vom localStorage löschen, Einträge werden komplett gelöscht
function deleteCompleteNotice(position) {
    trashTitles.splice(position, 1);
    trashNotices.splice(position, 1);

    save();
    saveTrash();
    load();
    loadTrash();
    showTrash();
}













