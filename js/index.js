/* eslint-disable operator-linebreak */
const store = () => {
  const generateID = () => {
    const id = `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return id;
  };

  let memory = [];
  const read = false;

  const isValid = ({ author, title, pages }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    typeof author === 'string' &&
    author.length > 0 &&
    typeof title === 'string' &&
    title.length > 0 &&
    pages.length > 0;

  const toggleRead = id => {
    memory = memory.map(element => {
      if (element.id === id) {
        return { ...element, read: !element.read };
      }

      return element;
    });
    return memory;
  };

  const add = ({ author, title, pages }) => {
    if (isValid({ author, title, pages })) {
      const id = generateID();
      memory = [...memory, { author, title, pages, id, read }];
      return { author, title, pages, id, read };
    }
    return null;
  };

  const remove = id => {
    memory = memory.filter(data => data.id !== id);
    return memory;
  };

  const find = id => memory.find(data => data.id === id);

  const count = () => memory.length;

  const all = () => memory;

  return {
    all,
    add,
    remove,
    find,
    count,
    toggleRead,
  };
};

const bookUI = (ulClass, buttonClass, liClass) => {
  const displayBook = ({ author, title, pages }) => {
    const ul = document.createElement('ul');
    ul.className = ulClass;

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = `Book Author: ${author}`;
    bookAuthor.className = liClass;

    const bookTitle = document.createElement('li');
    bookTitle.textContent = `Book Title: ${title}`;
    bookTitle.className = liClass;

    const bookPages = document.createElement('li');
    bookPages.textContent = `No of Pages: ${pages}`;
    bookTitle.className = liClass;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Book';
    removeButton.className = buttonClass;

    const readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.className = buttonClass;

    const container = document.querySelector('#books-container');
    ul.appendChild(bookAuthor);
    ul.appendChild(bookTitle);
    ul.appendChild(bookPages);
    ul.appendChild(removeButton);
    ul.appendChild(readButton);
    container.appendChild(ul);
  };

  const displayAllBook = (allBooks = []) => {
    allBooks.forEach(displayBook);
  };

  return {
    displayBook,
    displayAllBook,
  };
};

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

  const handleBookAddition = event => {
    event.preventDefault();
    const book = storeFact.add({
      author: inputBookAuthor.value,
      title: inputBookTitle.value,
      pages: inputBookPage.value,
    });
    displayFact.displayBook(book);
  };

  return {
    handleBookAddition,
  };
};

const form = document.querySelector('#new-book-form');
const keep = store();
const display = bookUI('book-ul', 'buttons');
display.displayAllBook(keep.all());

const addToDom = handleEventListeners('.book-author', '.book-title', '.book-pages', keep, display);

const startApp = () => {
  form.addEventListener('submit', addToDom.handleBookAddition);
};

startApp();
