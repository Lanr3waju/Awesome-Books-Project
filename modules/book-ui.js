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

export default BookUi;