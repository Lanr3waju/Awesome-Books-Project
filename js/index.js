/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable operator-linebreak */
/* eslint-disable max-classes-per-file */
class Book {
  constructor({ author, title, pages }) {
    if (Book.isValid({ author, title, pages })) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.read = false;
      this.id = Book.generateID();
    }
  }

  static isValid = ({ author, title, pages }) =>
    typeof author === 'string' &&
    author.length > 0 &&
    typeof title === 'string' &&
    title.length > 0 &&
    typeof pages === 'number';

  static generateID = () => {
    const id = `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return id;
  };

  toggleRead = () => {
    this.read = !this.read;
  };
}
class Store {
  constructor(initialData = []) {
    this.memory = [];
    this.newBook = {};
    if (localStorage.getItem('lanr3wajuAwesomeBooksLibrary') === null) {
      initialData.forEach(this.add, this);
    } else {
      this.memory = JSON.parse(localStorage.getItem('lanr3wajuAwesomeBooksLibrary')).map(
        item => new Book(item),
      );
    }
  }

  static setToLocalStorage = item => {
    localStorage.setItem('lanr3wajuAwesomeBooksLibrary', JSON.stringify(item));
  };

  add = (book = {}) => {
    this.newBook = new Book(book);
    this.memory = [...this.memory, this.newBook];
    Store.setToLocalStorage(this.memory);
    return this.newBook;
  };

  toggleRead = id => {
    this.memory = this.memory.map(element => {
      if (element.id === id) {
        element.toggleRead();
      }
      return element;
    });
    Store.setToLocalStorage(this.memory);
    return this.memory;
  };

  remove = id => {
    this.memory = this.memory.filter(book => book.id !== id);
    Store.setToLocalStorage(this.memory);
    return this.memory;
  };

  count = () => this.memory.length;

  all = () => this.memory;
}

class BookUi {
  static getElementParentId = element => {
    const parentID = element.parentElement.id;
    return parentID;
  };

  static updateBookNo = noOfBooks => {
    const bookNo = document.querySelector('#book-no');
    bookNo.textContent = `No. of Books: ${noOfBooks}`;
  };

  static toggleRead = (element, read) => {
    if (read) {
      element.textContent = 'You have read this book';
      element.classList.add('buttons');
    } else {
      element.textContent = 'Try this book';
      element.classList.remove('buttons');
    }
  };

  static displayBook = ({ author, title, pages, id, read }) => {
    const ul = document.createElement('li');
    ul.className = 'parent-li';

    const bookCard = document.createElement('section');
    bookCard.className = 'book-ul';
    bookCard.id = id;

    const bookCardUl = document.createElement('ul');
    bookCardUl.className = 'card-ul';

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = author;
    bookAuthor.className = 'li-class';

    const bookTitle = document.createElement('li');
    bookTitle.textContent = title;
    bookTitle.className = 'li-class';

    const bookPages = document.createElement('li');
    bookPages.textContent = pages;
    bookPages.className = 'li-class';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.className = 'buttons';
    removeButton.value = 'remove-btn';

    const readButton = document.createElement('button');
    readButton.className = 'read';
    readButton.value = 'read-btn-val';

    BookUi.toggleRead(readButton, read);

    const container = document.querySelector('#books-container');
    bookCardUl.appendChild(bookAuthor);
    bookCardUl.appendChild(bookTitle);
    bookCardUl.appendChild(bookPages);
    bookCard.appendChild(bookCardUl);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(readButton);
    ul.appendChild(bookCard);
    container.appendChild(ul);
  };

  static displayAllBook = (allBooks = []) => {
    allBooks.forEach(BookUi.displayBook);
  };
}

const handleEventListeners = (
  bookAuthorClass,
  bookTitleClass,
  bookPagesClass,
  storeFact,
  displayFact,
) => {
  const inputBookAuthor = document.querySelector(bookAuthorClass);
  const inputBookTitle = document.querySelector(bookTitleClass);
  const inputBookPage = document.querySelector(bookPagesClass);

  const updateBookNo = bookNo => displayFact.updateBookNo(bookNo);

  const handleBookAddition = event => {
    event.preventDefault();
    const book = storeFact.add({
      author: inputBookAuthor.value,
      title: inputBookTitle.value,
      pages: inputBookPage.valueAsNumber,
    });
    displayFact.displayBook(book);
    const bookNo = storeFact.count();
    updateBookNo(bookNo);
  };

  const handleBookRemoval = event => {
    const { target } = event;
    if (target.value === 'remove-btn') {
      const parentId = displayFact.getElementParentId(target);
      const element = document.getElementById(parentId);
      element.parentElement.remove();
      storeFact.remove(parentId);
      const bookNo = storeFact.count();
      updateBookNo(bookNo);
    }
  };

  const newBookNo = () => storeFact.count();

  const handleReadMethod = event => {
    const { target } = event;
    const parentId = displayFact.getElementParentId(target);
    if (target.value === 'read-btn-val') {
      storeFact.toggleRead(parentId);
      const readStatus = storeFact.all().find(({ id }) => id === parentId).read;
      displayFact.toggleRead(target, readStatus);
    }
  };

  return {
    handleBookAddition,
    handleBookRemoval,
    handleReadMethod,
    newBookNo,
  };
};

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');

  const keep = new Store([
    { author: 'Abass Olanrewaju', title: 'JS for Dummies', pages: 500 },
    { author: 'Lanr3waju', title: 'Photography 101', pages: 250 },
    { author: 'Abdul Wasi', title: 'HTML for beginners', pages: 100 },
  ]);

  const eventListener = handleEventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    BookUi,
  );

  BookUi.displayAllBook(keep.all());
  const bookNo = eventListener.newBookNo();
  BookUi.updateBookNo(bookNo);

  form.addEventListener('submit', eventListener.handleBookAddition);
  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
};

startApp();
