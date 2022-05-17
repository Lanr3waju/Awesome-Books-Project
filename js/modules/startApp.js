import Store from './store.js';
import BookUi from './book-ui.js';
import HandleEventListeners from './hanndle-event-listener.js';
import initialData from './initialData.js';

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');
  const hamburger = document.querySelector('#hamburger-btn');
  const nav = document.querySelector('#mobile-menu');

  const keep = new Store(initialData);
  const newBook = new BookUi();

  const eventListener = new HandleEventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    newBook,
  );

  newBook.showTime();
  newBook.displayAllBook(keep.all());
  const bookNo = eventListener.newBookNo();
  newBook.updateBookNo(bookNo);
  newBook.displayEmptyBookAlert(bookNo);

  body.addEventListener('click', eventListener.addClickEventListener);
  body.addEventListener('click', eventListener.removeMobileMenu);
  hamburger.addEventListener('click', eventListener.handleHamburgerToggle);
  nav.addEventListener('click', eventListener.handleHamburgerToggle);
  form.addEventListener('submit', eventListener.handleBookAddition);
};

export default startApp;
