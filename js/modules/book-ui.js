import { DateTime } from '../lib/luxon.js';

class BookUi {
  constructor() {
    this.container = document.querySelector('#books-container');
    this.displayDate = document.querySelector('#display-date');
    this.displayTime = document.querySelector('#display-time');
  }

  showTime = () => {
    const date = DateTime.now().toFormat('yyyy LLL dd');
    const time = DateTime.now().toISOTime();
    this.displayDate.textContent = date;
    this.displayTime.textContent = time;
  };

  displayBook = ({ author, title, pages, id, read }) => {
    const ul = document.createElement('li');
    const bookCard = document.createElement('section');
    const bookCardUl = document.createElement('ul');
    const bookData = document.createElement('li');
    const bookPages = document.createElement('li');
    const removeButton = document.createElement('button');
    const readButton = document.createElement('button');

    const addDomElementAttr = (elementName, elementClass, elementId, elementTextContent, value) => {
      elementName.className = elementClass;
      elementName.id = elementId;
      elementName.textContent = elementTextContent;
      elementName.value = value;
    };

    addDomElementAttr(ul, 'parent-li');
    addDomElementAttr(bookCard, 'book-ul', id);
    addDomElementAttr(bookCardUl, 'card-ul');
    addDomElementAttr(bookData, 'li-class', '', `${title} by ${author}`);
    addDomElementAttr(bookPages, 'li-class', '', `${pages} pages(s)`);
    addDomElementAttr(removeButton, 'buttons', '', 'Remove', 'remove-btn');
    addDomElementAttr(readButton, 'read');

    removeButton.setAttribute('data-action', 'remove-book');
    readButton.setAttribute('data-action', 'toggle-read');

    this.toggleRead(readButton, read);

    bookCardUl.append(bookData, bookPages);
    bookCard.append(bookCardUl, removeButton, readButton);
    ul.append(bookCard);
    this.container.prepend(ul);
  };

  getElementParentId = element => element.parentElement.id;

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

  displayAllBook = (allBooks = []) => allBooks.forEach(this.displayBook);
}

export default BookUi;
