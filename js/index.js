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

  const bookAuthor = document.createElement('li');
  const bookAuthorText = document.createTextNode(`Book Author: ${author}`);
  bookAuthor.appendChild(bookAuthorText);

  const removeBook = document.createElement('button');
  const removeBookText = document.createTextNode('remove book');
  removeBook.appendChild(removeBookText)
  removeBook.id = id
  removeBook.className = 'buttons'
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

  const newBookAuthor = document.createElement('li');
  const newBookAuthorText = document.createTextNode(`Book Author: ${newObjects.author}`);
  newBookAuthor.appendChild(newBookAuthorText);

  const removeBook = document.createElement('button');
  const removeBookText = document.createTextNode('remove book');
  removeBook.appendChild(removeBookText)
  removeBook.className = 'buttons'
  removeBook.value = 'remove'
  removeBook.id = newObjects.id

if (inputBookTitle.value && inputBookAuthor.value) {
  books.push(newObjects)
  bookShelf.appendChild(newBookTitle);
  bookShelf.appendChild(newBookAuthor);
  bookShelf.appendChild(removeBook)

  console.log(books)
}
}
addBook.addEventListener('click', pushBooks)
}

const deleteBook = ( event ) => {
  const { target } = event;
  if(target.value === 'remove'){
    books.splice(1, 1);
  console.log(books);
  }
}

body.addEventListener('click', deleteBook)






const startApp = () => {
  iterateBooksList();
  adItem();
};

startApp();
