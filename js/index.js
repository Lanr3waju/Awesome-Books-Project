class Book {
  constructor({ author, title, pages, read = false, id = this.generateID() }) {
    if (Book.isValid({ author, title, pages })) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.read = read;
      this.id = id;
    }
  }

  static isValid = ({ author, title, pages }) => typeof author === 'string' && author.length > 0 && typeof title === 'string' && title.length > 0 && typeof pages === 'number';

  generateID = () => `_${Math.random().toString(36).substr(2, 9)}`;

  toggleRead = () => {
    this.read = !this.read;
  };
}
class Store {
  constructor(initialData = []) {
    this.memory = [];
    if (localStorage.getItem('lanr3wajuAwesomeBooksLibrary') === null) {
      initialData.forEach(this.add, this);
    } else {
      JSON.parse(localStorage.getItem('lanr3wajuAwesomeBooksLibrary')).forEach(this.add, this);
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
  displayBook = ({ author, title, pages, id, read }) => {
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

    this.toggleRead(readButton, read);

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

  getElementParentId = element => {
    const parentID = element.parentElement.id;
    return parentID;
  };

  updateBookNo = noOfBooks => {
    const bookNo = document.querySelector('#book-no');
    bookNo.textContent = `No. of Books: ${noOfBooks}`;
  };

  toggleRead = (element, read) => {
    if (read) {
      element.textContent = 'You have read this book';
      element.classList.add('buttons');
    } else {
      element.textContent = 'Try this book';
      element.classList.remove('buttons');
    }
  };

  displayAllBook = (allBooks = []) => {
    allBooks.forEach(this.displayBook);
  };
}

class EventListeners {
  constructor(bookAuthorClass, bookTitleClass, bookPagesClass, storeFact, newBook) {
    this.inputBookAuthor = document.querySelector(bookAuthorClass);
    this.inputBookTitle = document.querySelector(bookTitleClass);
    this.inputBookPage = document.querySelector(bookPagesClass);
    this.storeFact = storeFact;
    this.newBook = newBook;
  }

  updateBookNo = bookNo => this.newBook.updateBookNo(bookNo);

  handleBookAddition = event => {
    event.preventDefault();
    const book = this.storeFact.add({
      author: this.inputBookAuthor.value,
      title: this.inputBookTitle.value,
      pages: this.inputBookPage.valueAsNumber,
    });
    this.newBook.displayBook(book);
    const bookNo = this.storeFact.count();
    this.updateBookNo(bookNo);
  };

  handleBookRemoval = event => {
    const { target } = event;
    if (target.value === 'remove-btn') {
      const parentId = this.newBook.getElementParentId(target);
      const element = document.getElementById(parentId);
      element.parentElement.remove();
      this.storeFact.remove(parentId);
      const bookNo = this.storeFact.count();
      this.updateBookNo(bookNo);
    }
  };

  newBookNo = () => this.storeFact.count();

  handleReadMethod = event => {
    const { target } = event;
    const parentId = this.newBook.getElementParentId(target);
    if (target.value === 'read-btn-val') {
      this.storeFact.toggleRead(parentId);
      const readStatus = this.storeFact.all().find(({ id }) => id === parentId).read;
      this.newBook.toggleRead(target, readStatus);
    }
  };
}

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');

  const keep = new Store([
    { author: 'Abass Olanrewaju', title: 'JS for Dummies', pages: 500 },
    { author: 'Lanr3waju', title: 'Photography 101', pages: 250 },
    { author: 'Abdul Wasi', title: 'HTML for beginners', pages: 100 },
  ]);

  const newBook = new BookUi();

  const eventListener = new EventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    newBook,
  );

  newBook.displayAllBook(keep.all());
  const bookNo = eventListener.newBookNo();
  newBook.updateBookNo(bookNo);

  form.addEventListener('submit', eventListener.handleBookAddition);
  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
};

startApp();
