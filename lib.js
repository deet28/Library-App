const titleDiv = document.querySelector(".title-container")
const formDiv = document.querySelector(".form-container");
const formPage = document.querySelector(".form-1");
const bookDiv = document.querySelector(".book-container");

const titleInput = document.querySelector(".title");
const authInput = document.querySelector(".author");
const pageInput = document.querySelector(".pages");
const checkInput = document.querySelector("#check-box");


const addButton = document.querySelector(".add-note");
const subButton = document.querySelector(".sub");
const closeButton = document.querySelector(".close-form");

var myLibrary = [];


class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = "false"
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//GET BOOK INPUT FROM FORM AND CREATE NEW BOOK WITH INPUT INFORMATION
function getBook(){
  const title = titleInput.value;
  const name = authInput.value;
  const pages = pageInput.value;
  const isRead = checkInput.checked; 
  return new Book(title,name,pages,isRead);
}

function findBook(bookTitle){
  for (let book of myLibrary){
    if (book.title === bookTitle){
      return book;
    }
  }
  return null; 
}

//ADD BOOK TO LIBRARY

function addBookToLibrary(newBook){
  myLibrary.push(newBook);
};

function addBook(e) {
  e.preventDefault();
  addBookToLibrary(getBook());
  return false; 
}

//DISPLAY FORM

function displayForm(){
  titleInput.value = "";
  authInput.value = "";
  pageInput.value = "";
  
  document.body.style.background = "rgba(0,0,0,0.5)";
  formPage.style.zIndex = 1;
  formPage.style.border = "1px solid gray";
  titleDiv.style.background = "rgba(0,255,255,0.5)";

  addButton.style.zIndex = -1;
  titleDiv.style.zIndex = -1;
}

//HIDE FORM AFTER ADDING BOOK 

function hideForm(){

  if (titleInput.value == ""){
    return; 
  } else if (authInput.value == ""){
    return; 
  } else if (pageInput.value == ""){
    return; 
  }
  document.body.style.background = "rgb(255,255,255)"
  formPage.style.zIndex = -1;
  titleDiv.style.background = "rgb(0,255,255)";

  addButton.style.zIndex = 1;
  titleDiv.style.zIndex = 1;
}

//HIDE FORM BY CLICKING CLOSE

function hideFormB(){

  document.body.style.background = "rgb(255,255,255)"
  formPage.style.zIndex = -1;
  titleDiv.style.background = "rgb(0,255,255)";

  addButton.style.zIndex = 1;
  titleDiv.style.zIndex = 1;
}

//CHANGE READ

bookDiv.addEventListener('click', changeRead);

function changeRead(e){
  if (e.target.classList.contains("read")){
    if (e.target.innerHTML === "Read"){
    findBook(e.target.parentNode.firstChild.innerHTML).isRead = false;
    e.target.innerHTML = "Not Read";
    e.target.textContent = "Not Read"
    e.target.style.background = "Red";
  } else {
    findBook(e.target.parentNode.firstChild.innerHTML).isRead = true;
    e.target.innerHTML = "Read";
    e.target.textContent = "Read";
    e.target.style.background = "Green";
  }
  }
}

//MAKE BOOK CARDS

let a;
let b;
let c;
let d; 
let f;
let divCard; 

function makeCards(book){

  if (titleInput.value == ""){
    alert("please enter a title");
    return;
  }
  else if (authInput.value == ""){
    alert ("please provide author");
    return;
  }
  else if (pageInput.value == ""){
    alert ("provide number of pages"); 
    return;
  } 

//IF INFORMATION PROVIDED, CREATE DIV CARD, APPEND INFO

  divCard = document.createElement('div');
  
  a = document.createElement("H1");
  a.textContent = titleInput.value; 

  b = document.createElement('p');
  b.textContent = "By: " + authInput.value

  c = document.createElement('p');
  c.textContent = "Pages: " + pageInput.value;

  d = document.createElement("BUTTON");
    if (checkInput.checked){
      d.textContent = "Read";
      d.style.background = "Green";
    } else {
      d.textContent = "Not Read";
      d.style.background = "Red";
  }; 

  d.classList.add("read");
  
  f = document.createElement("BUTTON");
  f.textContent = "Remove";
  f.addEventListener('click',removeCards);

  divCard.appendChild(a);
  divCard.appendChild(b);
  divCard.appendChild(c);
  divCard.appendChild(d);
  divCard.appendChild(f);

  bookDiv.appendChild(divCard);
  checkInput.checked = false;

} 

//REMOVE CARDS. REMOVE FROM LIBRARY.

function removeCards(e){
  const { target } = (e);
  
  for (var key in myLibrary){
    if (myLibrary[key].title == target.parentElement.firstChild.innerText){
      
      delete myLibrary[key];
    }
  } 
  target.closest('div').remove();
}


//ADDITIONAL BUTTON LISTENERS

addButton.addEventListener('click', displayForm); 
formPage.addEventListener('submit',addBook);
subButton.addEventListener('click', hideForm);
closeButton.addEventListener('click',hideFormB);
subButton.addEventListener('click', makeCards);