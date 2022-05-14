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
    this.hamburger = document.querySelector('#hamburger-btn');
    this.nav = document.querySelector('#mobile-menu');
  }

  handleHamburgerToggle = () => {
    this.nav.classList.toggle('active');
    this.hamburger.classList.toggle('active');
  };

  #toggleBookList = () => {
    this.bookList.classList.add('main-section');
    this.addBookForm.classList.remove('new-book-form');
    this.contactPage.classList.remove('contact');
  };

  handleToggleBookList = ({ target }) => {
    if (target.value === 'list-button') {
      this.#toggleBookList();
    }
  };

  toggleAddBookForm = ({ target }) => {
    if (target.value === 'add-button') {
      this.addBookForm.classList.add('new-book-form');
      this.bookList.classList.remove('main-section');
      this.contactPage.classList.remove('contact');
    }
  };

  toggleContactPage = ({ target }) => {
    if (target.value === 'contact-button') {
      this.contactPage.classList.add('contact');
      this.bookList.classList.remove('main-section');
      this.addBookForm.classList.remove('new-book-form');
    }
  };

  updateBookNo = bookNo => this.newBook.updateBookNo(bookNo);

  handleEmptyLibraryAlert = bookNo => {
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
    this.inputBookAuthor.value = '';
    this.inputBookTitle.value = '';
    this.inputBookPage.value = '';
    this.#toggleBookList();
    this.handleEmptyLibraryAlert(this.storeFact.count());
    this.updateBookNo(this.newBookNo());
  };

  handleBookRemoval = ({ target }) => {
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

  handleReadMethod = ({ target }) => {
    const parentId = this.newBook.getElementParentId(target);
    if (target.value === 'read-btn-val') {
      this.storeFact.toggleRead(parentId);
      const readStatus = this.storeFact.all().find(({ id }) => id === parentId).read;
      this.newBook.toggleRead(target, readStatus);
    }
  };
}

export default HandleEventListeners;