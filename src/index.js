import  './style.css';

const titleDiv = document.querySelector(".title-container")
const formPage = document.querySelector(".form");
const bookDiv = document.querySelector(".book-container");

const titleInput = document.querySelector(".title-input");
const authInput = document.querySelector(".author-input");
const pageInput = document.querySelector(".pages-input");
const checkInput = document.querySelector(".check-box");


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
  
  formPage.classList.add('visible');

  addButton.classList.add('hidden');
  titleDiv.classList.add('opaque');
  bookDiv.classList.add('opaque');
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
  formPage.classList.remove('visible');
  addButton.classList.remove('hidden');
  titleDiv.classList.remove('opaque');
  bookDiv.classList.remove('opaque');
}

//HIDE FORM BY CLICKING CLOSE

function hideFormB(){
  formPage.classList.remove('visible');
  addButton.classList.remove('hidden');
  titleDiv.classList.remove('opaque');
  bookDiv.classList.remove('opaque');
}

//CHANGE READ

function changeRead(e){
  if (e.target.classList.contains("read")){
    findBook(e.target.parentNode.firstChild.textContent).isRead = false;
    e.target.textContent = "Not Read"
    e.target.classList.remove("read");
    e.target.classList.add("not-read");
    e.target.style.background = "Red";
  } else if (e.target.classList.contains("read")===false){
    findBook(e.target.parentNode.firstChild.textContent).isRead = true;
    e.target.textContent = "Read";
    e.target.classList.remove("not-read")
    e.target.classList.add("read");
    e.target.style.background = "Green";
  }
}

//MAKE BOOK CARDS

let title;
let author;
let pages;
let readStatus;
let remove; 
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
  
  title = document.createElement("H1");
  title.textContent = titleInput.value; 

  author = document.createElement('p');
  author.textContent = "By: " + authInput.value

  pages = document.createElement('p');
  pages.textContent = "Pages: " + pageInput.value;

  readStatus = document.createElement("BUTTON");
 
    if (checkInput.checked){
      readStatus.textContent = "Read";
      readStatus.classList.add("read");
    } else {
      readStatus.textContent = "Not Read";
      readStatus.classList.add("not-read");
  }; 


  
      remove = document.createElement("BUTTON");
      remove.classList.add('card-button')
      remove.textContent = "Remove";
      remove.addEventListener('click',removeCards);

      divCard.appendChild(title);
      divCard.appendChild(author);
      divCard.appendChild(pages);
      divCard.appendChild(readStatus);
      divCard.appendChild(remove);

      readStatus.classList.add('card-button');
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
bookDiv.addEventListener('click', changeRead);