let noteArea = document.querySelector(".note-area");
let noteText = document.querySelector("#note-text");
let title = document.querySelector("#title");
let notes = document.querySelector("#notes");
let note = document.querySelector(".note");

// show
const showNoteArea = () => {
  noteText.style = "display: block";
  noteArea.classList.add("note-now");
  title.setAttribute("placeholder", "Title");
  title.style = "font-size : 20px";
};
// hiding note

const hideNoteArea = () => {
  noteText.style = "display: none ";
  noteArea.classList.remove("note-now");
};

// Adding note from local storage 

const addNoteToLocalStorage = (note) =>{
  if(note.length <  0){
    return;
  }
  let oldNote;

  if(localStorage.getItem("notes") === null){
    oldNote = [];
  
  }else{
    oldNote = JSON.parse(localStorage.getItem('notes'));
  }

  oldNote.push(note);

  localStorage.setItem('notes' , JSON.stringify(oldNote));

}


// get notes 

const getNotesFromLocalStorage = () =>{

  let oldNote;

  if(localStorage.getItem("notes") === null){
    oldNote = [];
  
  }else{
    oldNote = JSON.parse(localStorage.getItem('notes'));
  }

  oldNote.forEach(note => {
    notes.innerHTML += `<div class="note">
    <h3 class="title-text" id="title-text">${note[0]}</h3>
    <p class="note-blog">${note[1]}</p>
    <i class='bx bxs-trash'></i>
</div>`;
  })

}


// delete from local storage 

const deleteFromLocalStorage = (deletedNote) => {
  let oldNote;

  if(localStorage.getItem("notes") === null){
    oldNote = [];
  
  }else{
    oldNote = JSON.parse(localStorage.getItem('notes'));
  }

  oldNote.map((note,index) => {
    
    if(note[0] == deletedNote.children[0].textContent && note[1] == deletedNote.children[1].textContent){
      oldNote.splice(index,1);

      return oldNote;
    }
  });

  localStorage.setItem('notes',JSON.stringify(oldNote));

}
// every load page
document.addEventListener("DOMContentLoaded",getNotesFromLocalStorage)




// function adding note 
const addNote = (t, n) => {
  notes.innerHTML += `<div class="note">
    <h3 class="title-text" id="title-text">${t}</h3>
    <p class="note-blog">${n}</p>
    <i class='bx bxs-trash'></i>
</div>`;

  title.value = "";
  noteText.value = "";

  
};




// showing noteArea

noteArea.addEventListener("click", showNoteArea);

document.addEventListener("click", (event) => {
  let isclicked = noteArea.contains(event.target);

  if (!isclicked) {
    hideNoteArea();
    if (title.value.length === 0 && noteText.value.length === 0) {
      return;
    } else {
      addNoteToLocalStorage([title.value,noteText.value]);
      addNote(title.value, noteText.value);
     
    }
  }
});

document.addEventListener("mouseover" ,(event) => {
  if(event.target.classList.contains("note")){
    event.target.querySelector("i").classList.add("show")
  } 

})
document.addEventListener("mouseout" ,(event) => {
  if(event.target.classList.contains("note")){
    event.target.querySelector("i").classList.remove("show");
  } 
  
})
document.addEventListener("click" ,(event) => {
  if(event.target.classList.contains("bxs-trash")){
    event.target.parentElement.remove();
    deleteFromLocalStorage(event.target.parentElement);
  } 
  
})


localStorage.setItem('title','discription');