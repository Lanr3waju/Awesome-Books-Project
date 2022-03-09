const body = document.querySelector('body');

const booksContainer = document.createElement('div');
booksContainer.className = 'books-container';

const bookSectionHeader = document.createElement('h1');
const bookSectionHeaderText = document.createTextNode('Awesome Books');
bookSectionHeader.appendChild(bookSectionHeaderText);

const bookSection = document.createElement('section');
bookSection.appendChild(bookSectionHeader);

const inputBookTitle = document.createElement('input');
inputBookTitle.setAttribute('type', 'text');
inputBookTitle.placeholder = 'enter book title';
inputBookTitle.className = 'book-title';

const inputBookAuthor = document.createElement('input');
inputBookAuthor.setAttribute('type', 'text');
inputBookAuthor.placeholder = 'enter book author';

const addBook = document.createElement('button');
const addBookText = document.createTextNode('add');
addBook.className = 'buttons adItem';
addBook.appendChild(addBookText);

const identification = () => Math.floor(Math.random() * 100001);

let books = [
  {
    title: 'Things fall apart',
    author: 'Chinua Achebe',
    id: identification(),
  },

  {
    title: 'JavaScript for Dummies',
    author: 'Abass Olanrewaju',
    id: identification(),
  },

  {
    title: 'How to Eat Eba',
    author: 'Abass Olanrewaju',
    id: identification(),
  },
];

const iterateBooksList = () => {
  books.forEach(eachBook => {
    const { title, author, id } = eachBook;
    const bookTitle = document.createElement('li');
    const bookTitleText = document.createTextNode(`Book Title: ${title}`);
    bookTitle.appendChild(bookTitleText);

    const bookAuthor = document.createElement('li');
    const bookAuthorText = document.createTextNode(`Book Author: ${author}`);
    bookAuthor.appendChild(bookAuthorText);

    const removeBook = document.createElement('button');
    const removeBookText = document.createTextNode('remove book');
    removeBook.appendChild(removeBookText);
    removeBook.id = id;
    removeBook.className = `buttons ${id}`;
    removeBook.value = 'remove';

    const bookShelf = document.createElement('ul');
    bookShelf.className = 'books-ul';
    bookShelf.appendChild(bookTitle);
    bookShelf.appendChild(bookAuthor);
    bookShelf.id = id;

    booksContainer.appendChild(bookShelf);
    bookSection.appendChild(booksContainer);
    bookShelf.appendChild(removeBook);
    body.appendChild(bookSection);
  });

  bookSection.appendChild(inputBookTitle);
  bookSection.appendChild(inputBookAuthor);
  bookSection.appendChild(addBook);
};

const addbooks = () => {
  const pushBooks = () => {
    const newObjects = {
      title: inputBookTitle.value,
      author: inputBookAuthor.value,
      id: identification(),
    };

    const newBookTitle = document.createElement('li');
    const newBookTitleText = document.createTextNode(`Book Title: ${newObjects.title}`);
    newBookTitle.appendChild(newBookTitleText);

    const newBookAuthor = document.createElement('li');
    const newBookAuthorText = document.createTextNode(`Book Author: ${newObjects.author}`);
    newBookAuthor.appendChild(newBookAuthorText);

    const removeBook = document.createElement('button');
    const removeBookText = document.createTextNode('remove book');
    removeBook.appendChild(removeBookText);
    removeBook.className = `buttons ${newObjects.id}`;
    removeBook.value = 'remove';
    removeBook.id = newObjects.id;

    const newBookLists = document.createElement('ul');
    newBookLists.appendChild(newBookTitle);
    newBookLists.appendChild(newBookAuthor);
    newBookLists.appendChild(removeBook);
    newBookLists.className = 'books-ul';
    newBookLists.id = newObjects.id;

    if (inputBookTitle.value && inputBookAuthor.value) {
      books.push(newObjects);
      localStorage.setItem('books', JSON.stringify(books));
      booksContainer.appendChild(newBookLists);
    }
  };
  addBook.addEventListener('click', pushBooks);
};

const removeBook = () => {
  const deleteBook = event => {
    const { target } = event;

    const currentId = parseInt(target.id, 10);
    const currentBookList = books.find(({ id }) => id === currentId);
    const currentBook = document.getElementById(currentId);

    const clearBook = () => {
      currentBook.remove();
      localStorage.setItem('books', JSON.stringify(books));
    };
    const bookIndex = books.indexOf(currentBookList);

    if (target.value === 'remove') {
      books.splice(bookIndex, 1);
      clearBook();
    }
  };

  body.addEventListener('click', deleteBook);
};

const displayLocalStorageData = () => {
  const getBooks = localStorage.getItem('books');
  const updatedBooks = JSON.parse(getBooks);
  books = updatedBooks;
};

const startApp = () => {
  displayLocalStorageData();
  iterateBooksList();
  addbooks();
  removeBook();
};

startApp();
