/* eslint-disable operator-linebreak */
const store = () => {
  const generateID = () => {
    const id = `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return id;
  };

  let memory = () => {
    if (localStorage.length <= 0) {
      memory = [];
    }
    if (localStorage.length > 0) {
      memory = JSON.parse(localStorage.getItem('memory'));
    }
    return memory;
  };

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
    localStorage.setItem('memory', JSON.stringify(memory));
    return memory;
  };

  const add = ({ author, title, pages }) => {
    if (isValid({ author, title, pages })) {
      const id = generateID();
      const read = false;
      memory = [...memory, { author, title, pages, id, read }];
      localStorage.setItem('memory', JSON.stringify(memory));
      return { author, title, pages, id, read };
    }
    return null;
  };

  const remove = id => {
    memory = memory.filter(data => data.id !== id);
    localStorage.setItem('memory', JSON.stringify(memory));
    return memory;
  };

  const find = id => memory.find(data => data.id === id);

  const count = () => memory.length;

  return {
    memory,
    add,
    remove,
    find,
    count,
    toggleRead,
  };
};

const bookUI = (ulClass, parentLi, buttonClass, removeBtn, bookUlClass, readValue, readBtn) => {
  const displayBook = ({ author, title, pages, id }) => {
    const ul = document.createElement('li');
    ul.className = parentLi;
    ul.id = id;

    const bookCard = document.createElement('section');
    bookCard.className = ulClass;

    const bookCardUl = document.createElement('ul');
    bookCardUl.className = bookUlClass;

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = `Book Author: ${author}`;

    const bookTitle = document.createElement('li');
    bookTitle.textContent = `Book Title: ${title}`;

    const bookPages = document.createElement('li');
    bookPages.textContent = `No of Pages: ${pages}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Book';
    removeButton.className = buttonClass;
    removeButton.value = removeBtn;
    removeButton.id = id;

    const readButton = document.createElement('button');
    readButton.textContent = 'Try this Book';
    readButton.className = buttonClass;
    readButton.className = readBtn;
    readButton.value = readValue;
    readButton.id = id;

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

  const handleBookRemoval = event => {
    const { target } = event;
    if (target.value === 'remove-btn') {
      const currentId = target.id;
      const element = document.getElementById(currentId);
      element.remove();
      storeFact.remove(currentId);
    }
  };

  const load = () => {
    const read = document.querySelectorAll('.read');
    const rea = () => {
      read.forEach(eachReadButton => {
        const currentId = eachReadButton.id;
        const readButton = eachReadButton;
        const readBook = storeFact.memory().find(({ id }) => id === currentId);
        if (readBook.read === true) {
          readButton.textContent = 'You Have Read This Book';
          readButton.classList.add('buttons');
        } else {
          readButton.textContent = 'Try this Book';
          readButton.classList.remove('buttons');
        }
      });
    };
    rea();
  };

  const handleReadMethod = event => {
    const { target } = event;
    const read = target;
    const currentId = target.id;
    if (target.value === 'read-btn-val') {
      storeFact.toggleRead(currentId);
      const readBook = storeFact.memory().find(({ id }) => id === currentId);
      if (readBook.read === true) {
        read.textContent = 'You Have Read This Book';
        read.classList.add('buttons');
      } else {
        read.textContent = 'Try this Book';
        read.classList.remove('buttons');
      }
    }
  };

  return {
    load,
    handleBookAddition,
    handleBookRemoval,
    handleReadMethod,
  };
};

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');
  const keep = store();
  const display = bookUI(
    'book-ul',
    'parent-li',
    'buttons',
    'remove-btn',
    'card-ul',
    'read-btn-val',
    'read',
  );
  const eventListener = handleEventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    display,
  );

  display.displayAllBook(keep.memory());

  form.addEventListener('submit', eventListener.handleBookAddition);
  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
  window.addEventListener('load', eventListener.load);
};

startApp();
