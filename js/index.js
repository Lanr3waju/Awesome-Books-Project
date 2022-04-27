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
  constructor() {
    this.container = document.querySelector('#books-container');
  }

  displayBook = ({ author, title, pages, id, read }) => {
    const ul = document.createElement('li');
    ul.className = 'parent-li';

    const bookCard = document.createElement('section');
    bookCard.className = 'book-ul';
    bookCard.id = id;

    const bookCardUl = document.createElement('ul');
    bookCardUl.className = 'card-ul';

    const bookData = document.createElement('li');
    bookData.textContent = `${title} by ${author}`;
    bookData.className = 'li-class';

    const bookPages = document.createElement('li');
    bookPages.textContent = `${pages} page(s)`;
    bookPages.className = 'li-class';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'buttons';
    removeButton.value = 'remove-btn';

    const readButton = document.createElement('button');
    readButton.className = 'read';
    readButton.value = 'read-btn-val';

    this.toggleRead(readButton, read);

    bookCardUl.appendChild(bookData);
    bookCardUl.appendChild(bookPages);
    bookCard.appendChild(bookCardUl);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(readButton);
    ul.appendChild(bookCard);
    this.container.prepend(ul);
  };

  getElementParentId = element => {
    const parentID = element.parentElement.id;
    return parentID;
  };

  updateBookNo = noOfBooks => {
    const bookNo = document.querySelector('#book-no');
    bookNo.textContent = `No. of Books: ${noOfBooks}`;
  };

  displayEmptyBookAlert = noOfBooks => {
    if (noOfBooks < 1) {
      const emptyBookAlert = document.createElement('li');
      emptyBookAlert.id = 'empty-book-alert';
      emptyBookAlert.className = 'empty-book-alert';
      this.container.appendChild(emptyBookAlert);
      emptyBookAlert.textContent = 'This Library is Empty, Add your Awesome Books';
    } else {
      const alert = document.querySelector('#empty-book-alert');
      if (alert) {
        this.container.removeChild(alert);
      }
    }
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

class HandleEventListeners {
  constructor(bookAuthorClass, bookTitleClass, bookPagesClass, storeFact, newBook) {
    this.inputBookAuthor = document.querySelector(bookAuthorClass);
    this.inputBookTitle = document.querySelector(bookTitleClass);
    this.inputBookPage = document.querySelector(bookPagesClass);
    this.storeFact = storeFact;
    this.newBook = newBook;
    this.bookList = document.querySelector('#main-section');
    this.addBookForm = document.querySelector('#new-book-form');
    this.contactPage = document.querySelector('#contact');
  }

  toggleBookList = () => {
    this.bookList.classList.add('main-section');
    this.addBookForm.classList.remove('new-book-form');
    this.contactPage.classList.remove('contact');
  };

  toggleAddBookForm = () => {
    this.addBookForm.classList.add('new-book-form');
    this.bookList.classList.remove('main-section');
    this.contactPage.classList.remove('contact');
  };

  toggleContactPage = () => {
    this.contactPage.classList.add('contact');
    this.bookList.classList.remove('main-section');
    this.addBookForm.classList.remove('new-book-form');
  };

  updateBookNo = bookNo => this.newBook.updateBookNo(bookNo);

  handleEmptyLibraryAlert = (bookNo) => {
    this.newBook.displayEmptyBookAlert(bookNo);
  };

  handleBookAddition = event => {
    event.preventDefault();
    const book = this.storeFact.add({
      author: this.inputBookAuthor.value,
      title: this.inputBookTitle.value,
      pages: this.inputBookPage.valueAsNumber,
    });
    this.newBook.displayBook(book);
    this.handleEmptyLibraryAlert(this.storeFact.count());
    this.toggleBookList();
    this.inputBookAuthor.value = '';
    this.inputBookTitle.value = '';
    this.inputBookPage.value = '';
    this.updateBookNo(this.newBookNo());
  };

  handleBookRemoval = event => {
    const { target } = event;
    if (target.value === 'remove-btn') {
      const parentId = this.newBook.getElementParentId(target);
      const element = document.getElementById(parentId);
      element.parentElement.remove();
      this.storeFact.remove(parentId);
      this.updateBookNo(this.newBookNo());
      this.handleEmptyLibraryAlert(this.storeFact.count());
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
  const displayListBtn = document.querySelector('#list-btn');
  const displayAddNewBtn = document.querySelector('#add-new-btn');
  const displayContactFormBtn = document.querySelector('#contact-btn');

  const keep = new Store([
    { author: 'Abass Olanrewaju', title: 'JS for Dummies', pages: 500 },
    { author: 'Lanr3waju', title: 'Photography 101', pages: 250 },
    { author: 'Abdul Wasi', title: 'HTML for beginners', pages: 100 },
  ]);

  const newBook = new BookUi();

  const eventListener = new HandleEventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    newBook,
  );

  newBook.displayAllBook(keep.all());
  const bookNo = eventListener.newBookNo();
  newBook.updateBookNo(bookNo);
  newBook.displayEmptyBookAlert(bookNo);

  form.addEventListener('submit', eventListener.handleBookAddition);
  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
  displayListBtn.addEventListener('click', eventListener.toggleBookList);
  displayAddNewBtn.addEventListener('click', eventListener.toggleAddBookForm);
  displayContactFormBtn.addEventListener('click', eventListener.toggleContactPage);
};

startApp();
