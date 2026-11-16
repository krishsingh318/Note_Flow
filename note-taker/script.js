

const newNoteBtn = document.querySelector("#new-note-btn");
const noteDialog = document.querySelector("#note-dialog");
const closeDialogBtn = document.querySelector("#close-dialog-btn");
const noteForm = document.querySelector("#note-form");
const noteTitle = document.querySelector("#note-title");
const noteText = document.querySelector("#note-text");
const pinNote = document.querySelector("#pin-note");
const notesContainer = document.querySelector("#notes-container");
const searchInput = document.querySelector("#search-input");
const showPinnedBtn = document.querySelector("#show-pinned-btn");
const noteCount = document.querySelector("#note-count");
const emptyMessage = document.querySelector("#empty-message");



let notes = [];

if(localStorage.getItem("notes") !== null){
  notes = JSON.parse(localStorage.getItem("notes"));
} else  {
  notes = [];
}



function saveNotes(){
  localStorage.setItem("notes", JSON.stringify(notes));
}

// for test purpose
// notes.push({
//     title: "Test",
//     text: "Hello"
// });

// saveNotes();




newNoteBtn.addEventListener("click", function(){
    noteDialog.showModal();
});

closeDialogBtn.addEventListener("click",function(){
  noteDialog.close();
});

noteForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  let title = noteTitle.value;
  let text = noteText.value;
  let pinned = pinNote.checked;

  let note = {
    title : title,
    text : text,
    pinned : pinned,
    id : Date.now(),
    date : new Date().toLocaleDateString()
  }

  notes.push(note);
  saveNotes();
  displayNotes(notes);
  noteForm.reset();
  noteDialog.close();
});

function displayNotes(notesToShow) {

  notesContainer.innerHTML = "";

  notesToShow.forEach(function (note) {
    let article =  document.createElement("article");
    article.classList.add("note-card");
    article.innerHTML = `
        <button
          class="pin-btn ${note.pinned ? "is-pinned" : ""}"
          type="button"
          data-id="${note.id}">
          ${note.pinned ? "★" : "☆"}
        </button>
        <p class="note-date">${note.date}</p>
        <h2>${note.title}</h2>
        <p>${note.text}</p>
        <button
          class="delete-btn"
          type="button"
          data-id="${note.id}">
          ×
        </button>
    `;
    notesContainer.appendChild(article);    

  });

}
notesContainer.addEventListener("click", function(evt){
   const deleteBtn = evt.target.closest(".delete-btn");
   const pinnedBtn = evt.target.closest(".pin-btn");

   
    if(deleteBtn){
        const id = Number(deleteBtn.dataset.id);

        notes = notes.filter(function(note){
            return note.id !== id;
        });
        saveNotes();
        displayNotes(notes);
    }

    if(pinnedBtn){
      const id = Number(pinnedBtn.dataset.id);

      const pinnedNote = notes.find(function(note){
          return note.id === id;
      });
      pinnedNote.pinned =! pinnedNote.pinned;

      saveNotes();
      notes.sort(function(a, b) {
        return b.pinned - a.pinned;
        // if b pine then true=1 a =0 then return 1 -0 = 1 means b comes first  if b not pinned a comes first
      });
      displayNotes(notes);

    }
});

searchInput.addEventListener("input", function(){
   let searchText = searchInput.value.toLowerCase();
   let filterNotes = notes.filter(function(note){
              return note.title.toLowerCase().includes(searchText) ||
                note.text.toLowerCase().includes(searchText)
            });
        
        displayNotes(filterNotes);
    
});

let  showingPinned = false;
showPinnedBtn.addEventListener("click", function(){
    showingPinned = !showingPinned;

    if(showingPinned) {
      let pinedOnlyNote = notes.filter(function(note) {
        return note.pinned;
      })
      displayNotes(pinedOnlyNote);
      showPinnedBtn.classList.add("is-active");
    } else {
      displayNotes(notes);
      showPinnedBtn.classList.remove("is-active");
    }
});

displayNotes(notes);


