const body = document.querySelector('body');

const bookShelf = document.createElement('ul');


const bookSectionHeader = document.createElement('h1')
  const bookSectionHeaderText = document.createTextNode('Awesome Books');
  bookSectionHeader.appendChild(bookSectionHeaderText);

  const bookSection = document.createElement('section');
  bookSection.appendChild(bookSectionHeader);

  const inputBookTitle = document.createElement('input');
  inputBookTitle.setAttribute('type', 'text');
  inputBookTitle.placeholder = 'enter book title';
  inputBookTitle.className = 'book-title';


  const inputBookAuthor = document.createElement('input')
  inputBookAuthor.setAttribute('type', 'text');
  inputBookAuthor.placeholder = 'enter book author'

  const addBook = document.createElement('button');
  const addBookText = document.createTextNode('add');
  addBook.className = 'buttons adItem'
  addBook.appendChild(addBookText);
  
  const identification =() => {
   return Math.floor(Math.random()*100001)
  }

let books = [
  { 
    title: 'Things fall apart',
    author: 'Chinua Achebe',
    id: identification()

  },

  {
    title: 'JavaScript for Dummies',
    author: 'Abass Olanrewaju',
    id: identification()
  },

  {
    title: 'How to Eat Eba',
    author: 'Abass Olanrewaju',
    id: identification()
  }
]

const iterateBooksList = () => {


  
books.forEach( eachBook => {
  const { title, author, id } = eachBook
  const bookTitle = document.createElement('li');
  const bookTitleText = document.createTextNode(`Book Title: ${title}`);
  bookTitle.appendChild(bookTitleText);
  bookTitle.className = id

  const bookAuthor = document.createElement('li');
  const bookAuthorText = document.createTextNode(`Book Author: ${author}`);
  bookAuthor.appendChild(bookAuthorText);
  bookAuthor.className = id

  const removeBook = document.createElement('button');
  const removeBookText = document.createTextNode('remove book');
  removeBook.appendChild(removeBookText)
  removeBook.id = id
  removeBook.className = `buttons ${id}`
  removeBook.value = 'remove'

  bookShelf.appendChild(bookTitle);
  bookShelf.appendChild(bookAuthor);  

  bookSection.appendChild(bookShelf);
  bookShelf.appendChild(removeBook);
  body.appendChild(bookSection)
})

bookSection.appendChild(inputBookTitle);
bookSection.appendChild(inputBookAuthor);
bookSection.appendChild(addBook);
};

// Function that adds new book to the existing books object
const adItem = () => {

  const pushBooks = () => {
  
  let newObjects = {
    title: inputBookTitle.value,
    author: inputBookAuthor.value,
    id: identification()
  }

  const newBookTitle = document.createElement('li');
  const newBookTitleText = document.createTextNode(`Book Title: ${newObjects.title}`);
  newBookTitle.appendChild(newBookTitleText);
  newBookTitle.className = newObjects.id

  const newBookAuthor = document.createElement('li');
  const newBookAuthorText = document.createTextNode(`Book Author: ${newObjects.author}`);
  newBookAuthor.appendChild(newBookAuthorText);
  newBookAuthor.className = newObjects.id

  const removeBook = document.createElement('button');
  const removeBookText = document.createTextNode('remove book');
  removeBook.appendChild(removeBookText)
  removeBook.className = `buttons ${newObjects.id}`
  removeBook.value = 'remove'
  removeBook.id = newObjects.id

if (inputBookTitle.value && inputBookAuthor.value) {
  books.push(newObjects)
  localStorage.setItem('books', JSON.stringify(books));
  bookShelf.appendChild(newBookTitle);
  bookShelf.appendChild(newBookAuthor);
  bookShelf.appendChild(removeBook)
}
}
addBook.addEventListener('click', pushBooks)
}



const removeBookFn = () => {
const deleteBook = ( event ) => {
  const { target } = event;

  const currentId = parseInt(target.id, 10);
  const currentBookList = books.find(({ id }) => id === currentId);

  let currentBook = document.getElementsByClassName(currentId);
  let currentBookTitle = currentBook[0];
  let currentBookAuthor = currentBook[1]
  let bookButton = currentBook[2]

  const clearBook = () => {
    currentBookTitle.remove()
    currentBookAuthor.remove()
    bookButton.remove()
    localStorage.setItem('books', JSON.stringify(books));
    console.log(books)
  }

  let bookIndex = books.indexOf(currentBookList);

  if(target.value === 'remove'){
    books.splice(bookIndex, 1);
    clearBook()
  }
}

body.addEventListener('click', deleteBook)
}

const controlLocalStorageData = () => {
  const getBooks = localStorage.getItem('books');
  const updatedBooks = JSON.parse(getBooks);  
  addBook.onclick = () =>  console.log(updatedBooks)
  books = updatedBooks
};


const startApp = () => {
  controlLocalStorageData()
  iterateBooksList();
  adItem();
  removeBookFn()
};

startApp();