const body = document.querySelector('body');
const booksContainer = document.querySelector('#books-container');
const bookSection = document.querySelector('#main-section');
const inputBookTitle = document.querySelector('#book-title');
const inputBookAuthor = document.querySelector('#book-author');
const newBookForm = document.querySelector('#new-book-form');
const generateUniqueId = () => Math.floor(Math.random() * 100001);
const setItemToStore = item => {
  localStorage.setItem('books', JSON.stringify(item));
};
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  pushBook(booksArr, newBooksArr, updatedArr) {
    if (inputBookTitle.value && inputBookAuthor.value) {
      booksArr.push(newBooksArr);
      setItemToStore(booksArr);
      booksContainer.appendChild(updatedArr);
    }
    return this;
  }
}

const iterateArrayList = booksArr => {
  booksArr.forEach(eachBook => {
    const { title, author, id } = eachBook;
    const bookTitle = document.createElement('li');
    bookTitle.textContent = `Book Title: ${title}`;

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = `Book Author: ${author}`;

    const removeBookButton = document.createElement('button');
    removeBookButton.textContent = 'remove book';

    removeBookButton.id = id;
    removeBookButton.className = `buttons ${id}`;
    removeBookButton.value = 'remove';

    const bookShelf = document.createElement('ul');
    bookShelf.className = 'books-ul';
    bookShelf.appendChild(bookTitle);
    bookShelf.appendChild(bookAuthor);
    bookShelf.id = id;

    booksContainer.appendChild(bookShelf);
    bookSection.appendChild(booksContainer);
    bookShelf.appendChild(removeBookButton);
  });
};

let books = [
  new Book('Things fall apart', 'Chinua Achebe', generateUniqueId()),

  new Book('JavaScript for Dummies', 'Abass Olanrewaju', generateUniqueId()),

  new Book('How to eat Eba', 'Abass Olanrewaju', generateUniqueId()),
];

const pushBooks = () => {
  const newBooks = new Book(inputBookTitle.value, inputBookAuthor.value, generateUniqueId());

  const newBookTitle = document.createElement('li');
  newBookTitle.textContent = `Book Title: ${newBooks.title}`;

  const newBookAuthor = document.createElement('li');
  newBookAuthor.textContent = `Book Author: ${newBooks.author}`;

  const removeBookButton = document.createElement('button');
  removeBookButton.textContent = 'remove book';

  removeBookButton.className = `buttons ${newBooks.id}`;
  removeBookButton.value = 'remove';
  removeBookButton.id = newBooks.id;

  const newBookLists = document.createElement('ul');
  newBookLists.appendChild(newBookTitle);
  newBookLists.appendChild(newBookAuthor);
  newBookLists.appendChild(removeBookButton);
  newBookLists.className = 'books-ul';
  newBookLists.id = newBooks.id;

  newBooks.pushBook(books, newBooks, newBookLists);
};

const deleteBook = event => {
  const { target } = event;

  const currentId = parseInt(target.id, 10);
  const currentBookList = books.find(({ id }) => id === currentId);
  const currentBook = document.getElementById(currentId);
  const bookIndex = books.indexOf(currentBookList);

  if (target.value === 'remove') {
    books.splice(bookIndex, 1);
    currentBook.remove();
    setItemToStore(books);
  }
};

const displayLocalStorageData = () => {
  const getBooks = localStorage.getItem('books');
  const updatedBooks = JSON.parse(getBooks);
  if (localStorage.length > 0) {
    books = updatedBooks;
  }
};

const handleEventListeners = () => {
  newBookForm.addEventListener('submit', pushBooks);
  newBookForm.addEventListener('submit', event => {
    event.preventDefault();
  });
  body.addEventListener('click', deleteBook);
};

const startApp = () => {
  displayLocalStorageData();
  iterateArrayList(books);
  handleEventListeners();
};

startApp();
