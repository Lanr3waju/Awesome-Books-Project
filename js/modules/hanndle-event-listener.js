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
    this.body = document.querySelector('body');
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

  #handleToggleBookList = () => {
    this.#toggleBookList();
  };

  #toggleAddBookForm = () => {
    this.addBookForm.classList.add('new-book-form');
    this.bookList.classList.remove('main-section');
    this.contactPage.classList.remove('contact');
  };

  #toggleContactPage = () => {
    this.contactPage.classList.add('contact');
    this.bookList.classList.remove('main-section');
    this.addBookForm.classList.remove('new-book-form');
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

  #handleBookRemoval = (button) => {
    const parentId = this.newBook.getElementParentId(button);
    const book = document.getElementById(parentId);
    book.parentElement.remove();
    this.storeFact.remove(parentId);
    this.updateBookNo(this.newBookNo());
    this.handleEmptyLibraryAlert(this.storeFact.count());
  };

  newBookNo = () => this.storeFact.count();

  #handleReadMethod = (element) => {
    const bookReadStatus = this.newBook.getElementParentId(element);
    this.storeFact.toggleRead(bookReadStatus);
    const readStatus = this.storeFact.all().find(({ id }) => id === bookReadStatus).read;
    this.newBook.toggleRead(element, readStatus);
  };

  addClickEventListener = ({ target }) => {
    if (target.dataset.action) {
      switch (target.dataset.action) {
        case 'toggle-read':
          this.#handleReadMethod(target);
          break;

        case 'remove-book':
          this.#handleBookRemoval(target);
          break;

        case 'show-book-list':
          this.#handleToggleBookList();
          break;

        case 'show-add-book':
          this.#toggleAddBookForm();
          break;

        case 'show-contact-us':
          this.#toggleContactPage();
          break;

        default:
          // no default operation
          break;
      }
    }
  };
}

export default HandleEventListeners;
