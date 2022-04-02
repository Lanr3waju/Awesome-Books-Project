/* eslint-disable operator-linebreak */
const store = (initialData = []) => {
  const isValid = ({ author, title, pages }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    typeof author === 'string' &&
    author.length > 0 &&
    typeof title === 'string' &&
    title.length > 0 &&
    pages.length > 0;

  const generateID = () => {
    const id = `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return id;
  };

  let memory;

  const setToLocalStorage = item => {
    localStorage.setItem('awesomeBooksStore', JSON.stringify(item));
  };

  const initialBook = [...initialData];

  const awesomeBooksStore = () => {
    if (localStorage.length <= 0) {
      memory = initialBook;
    }
    if (localStorage.length > 0) {
      memory = JSON.parse(localStorage.getItem('awesomeBooksStore'));
    }
    return memory;
  };

  const toggleRead = id => {
    memory = memory.map(element => {
      if (element.id === id) {
        return { ...element, read: !element.read };
      }

      return element;
    });
    setToLocalStorage(memory);
    return memory;
  };

  const add = ({ author, title, pages }) => {
    if (isValid({ author, title, pages })) {
      const id = generateID();
      memory = [...memory, { author, title, pages, id, read: false }];
      setToLocalStorage(memory);
      return { author, title, pages, id, read: false };
    }
    return null;
  };

  const remove = id => {
    memory = memory.filter(data => data.id !== id);
    setToLocalStorage(memory);
    return memory;
  };

  const count = () => memory.length;

  return {
    awesomeBooksStore,
    add,
    remove,
    count,
    toggleRead,
    generateID,
  };
};

const bookUI = store => {
  const getElementParentId = element => {
    const parentID = element.parentElement.id;
    return parentID;
  };

  const displayBook = ({ author, title, pages, id, read }) => {
    const toggleRead = (element, read) => {
      const button = element;
      if (read) {
        button.textContent = 'You have read this book';
        button.classList.add('buttons');
      } else {
        button.textContent = 'Try this book';
        button.classList.remove('buttons');
      }
    };

    const evaluateReadButton = element => {
      if (read) {
        toggleRead(element, read);
      } else {
        toggleRead(element, read);
      }
    };

    const ul = document.createElement('li');
    ul.className = 'parent-li';

    const bookCard = document.createElement('section');
    bookCard.className = 'book-ul';
    bookCard.id = id;

    const bookCardUl = document.createElement('ul');
    bookCardUl.className = 'card-ul';

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = `${author} `;

    const bookTitle = document.createElement('li');
    bookTitle.textContent = `${title}`;

    const bookPages = document.createElement('li');
    bookPages.textContent = `${pages}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.className = 'buttons';
    removeButton.value = 'remove-btn';

    const readButton = document.createElement('button');
    readButton.className = 'read';
    readButton.value = 'read-btn-val';

    evaluateReadButton(readButton);

    const container = document.querySelector('#books-container');
    bookCardUl.appendChild(bookAuthor);
    bookCardUl.appendChild(bookTitle);
    bookCardUl.appendChild(bookPages);
    bookCard.appendChild(bookCardUl);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(readButton);
    ul.appendChild(bookCard);
    container.appendChild(ul);

    const bookNo = document.querySelector('#book-no');
    bookNo.textContent = `No. of Books: ${store.count()}`;
  };

  const displayAllBook = (allBooks = []) => {
    allBooks.forEach(displayBook);
  };

  return {
    displayBook,
    displayAllBook,
    getElementParentId,
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
      const removeButton = target;
      const parentId = displayFact.getElementParentId(removeButton);
      const element = document.getElementById(parentId);
      element.parentElement.remove();
      storeFact.remove(parentId);
    }
  };

  const handleReadMethod = event => {
    const { target } = event;
    const readButton = target;
    const parentId = displayFact.getElementParentId(readButton);
    if (target.value === 'read-btn-val') {
      storeFact.toggleRead(parentId);
      const readBook = storeFact.awesomeBooksStore().find(({ id }) => id === parentId);
      if (readBook.read === true) {
        readButton.textContent = 'You Have Read This Book';
        readButton.classList.add('buttons');
      } else {
        readButton.textContent = 'Try this Book';
        readButton.classList.remove('buttons');
      }
    }
  };

  return {
    handleBookAddition,
    handleBookRemoval,
    handleReadMethod,
  };
};

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');
  let keep = store();

  keep = store([
    {
      author: 'Chinua Achebe',
      title: 'Things fall apart',
      pages: '500',
      id: keep.generateID(),
      read: false,
    },
    {
      author: 'Chinua Achebe',
      title: 'Java for Dummies',
      pages: '120000',
      id: keep.generateID(),
      read: false,
    },
    {
      author: 'Chinua Achebe',
      title: 'Things fall apart',
      pages: '1200',
      id: keep.generateID(),
      read: false,
    },
  ]);

  const display = bookUI(keep);
  const eventListener = handleEventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    display,
  );

  display.displayAllBook(keep.awesomeBooksStore());

  form.addEventListener('submit', eventListener.handleBookAddition);
  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
};

startApp();
