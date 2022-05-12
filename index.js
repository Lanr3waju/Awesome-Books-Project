import Store from './modules/store';
import BookUi from './modules/book-ui';
import HandleEventListeners from './modules/hanndle-event-listener';

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');
  const hamburger = document.querySelector('#hamburger-btn');
  const nav = document.querySelector('#mobile-menu');

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

  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
  body.addEventListener('click', eventListener.handleToggleBookList);
  body.addEventListener('click', eventListener.toggleAddBookForm);
  body.addEventListener('click', eventListener.toggleContactPage);
  hamburger.addEventListener('click', eventListener.handleHamburgerToggle);
  nav.addEventListener('click', eventListener.handleHamburgerToggle);
  form.addEventListener('submit', eventListener.handleBookAddition);
};

startApp();