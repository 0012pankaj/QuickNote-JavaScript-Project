// C R U D [Create Read Update Delete ] Search

//Read function ---------------------------------------
let addNoteContainer=document.getElementById('addNoteContainer');

function showEveryNotes(){
    addNoteContainer.style.display='none';

 let everyNotes;
 let notes=localStorage.getItem("notes")

 if(notes===null){
    everyNotes=[]
 }else{
    everyNotes=JSON.parse(notes);
 }
 let notesArea=document.getElementById('notes');
  notesArea.innerHTML='';
  //run loop on storege data 
  everyNotes.forEach((element ,index)=> {
    newNotesForShown=`<div class="notes" id="notes">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
          <h5S class="card-title">${element.title}</h5S>
          <p class="card-text">${element.descp}</p>
          <button class="btn btn-primary card_btns"  onclick="deleteNoteFun(${index})"><img src="./delete.svg" alt="" class="delete_btn"></button>
          <button class="btn btn-primary card_btns" onclick="updateNoteFun(${index})"><img src="./edit.svg" alt="" class="edit_btn"></button>
      </div>
    </div>
  </div>`

  notesArea.innerHTML=notesArea.innerHTML+newNotesForShown ;
    
  });
}
showEveryNotes();

// Read function END-----------------------------------
// Create function start--------------------------------
// on save & nav add button button



let addNoteBtn=document.getElementById('addNote')
addNoteBtn.addEventListener('click',()=>{
 let everyNotes;
 let notes=localStorage.getItem("notes")

 if(notes===null){
    everyNotes=[]
 }else{
    everyNotes=JSON.parse(notes);
 }

 let title=document.getElementById('title')
 let descp=document.getElementById('descp');
 let newNoteObject={
    title : title.value,
    descp : descp.value
 }

if( addNoteBtn.innerText === "Update"){ //condition to update
   let editCard = document.querySelector('.card')
   let editIndex = editCard.getAttribute('editIndex')// get an index from update function using set and get attribute
    everyNotes[editIndex]=newNoteObject//put new object at that required index for update
}else{
   everyNotes.push(newNoteObject);
}


 localStorage.setItem("notes",JSON.stringify(everyNotes))
 title.value=''
 descp.value=''
 showEveryNotes();

})

//Create function End-------------------------
let navAddbtn=document.getElementById('navAddNote')
navAddbtn.addEventListener('click',function(){
    addNoteContainer.style.display='block';
    addNoteBtn.innerText='save'
})

//Delet function------------
function deleteNoteFun(noteIndex){
   let everyNotes=JSON.parse(localStorage.getItem('notes'))
   everyNotes.splice(noteIndex,1)
   localStorage.setItem("notes",JSON.stringify(everyNotes))

   showEveryNotes();
}
//Delet function Ends------------
//update function start-------------------

function updateNoteFun(noteIndex){
   let allNote=JSON.parse(localStorage.getItem('notes'));
   addNoteContainer.style.display='block';
   addNoteBtn.innerText="Update";

   let title =document.getElementById('title')
   let descp=document.getElementById('descp')

    title.value=allNote[noteIndex].title
    descp.value=allNote[noteIndex].descp

    let editCard=document.querySelector('.card')
     editCard.setAttribute('editIndex',`${noteIndex}`)// creating new Attribute and passing note index for update***
}

//update function end-------------------


//Search event 
let search=document.getElementById('search');

search.addEventListener('input',()=>{

   let inputValue=search.value.toLowerCase()
   let allCards=document.getElementsByClassName('card');

   Array.from(allCards).forEach((ele)=>{
      let cardText=ele.getElementsByTagName('p')[0].innerText;

      if(cardText.toLowerCase().includes(inputValue)){
         ele.style.display='block';
      }else{
         ele.style.display='none';
      }
   })
})