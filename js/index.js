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

  let memory = [];

  const setToLocalStorage = item => {
    localStorage.setItem('awesomeBooksStore', JSON.stringify(item));
  };

  const add = ({ author, title, pages }) => {
    if (isValid({ author, title, pages })) {
      const id = generateID();
      memory = [...memory, { author, title, pages, id, read: false }];
      return { author, title, pages, id, read: false };
    }
    return null;
  };

  const awesomeBooksStore = () => {
    if (localStorage.getItem('awesomeBooksStore') === null) {
      initialData.forEach(add);
    } else {
      memory = JSON.parse(localStorage.getItem('awesomeBooksStore'));
    }
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

  const remove = id => {
    memory = memory.filter(data => data.id !== id);
    setToLocalStorage(memory);
    return memory;
  };

  const count = () => {
    setToLocalStorage(memory);
    return memory.length;
  };

  const all = () => memory;

  awesomeBooksStore();

  return {
    all,
    add,
    remove,
    count,
    toggleRead,
    generateID,
  };
};

const bookUi = () => {
  const getElementParentId = element => {
    const parentID = element.parentElement.id;
    return parentID;
  };

  const updateBookNo = noOfBooks => {
    const bookNo = document.querySelector('#book-no');
    bookNo.textContent = `No. of Books: ${noOfBooks}`;
  };

  const toggleRead = (element, read) => {
    if (read) {
      element.textContent = 'You have read this book';
      element.classList.add('buttons');
    } else {
      element.textContent = 'Try this book';
      element.classList.remove('buttons');
    }
  };

  const displayBook = ({ author, title, pages, id, read }) => {
    const ul = document.createElement('li');
    ul.className = 'parent-li';

    const bookCard = document.createElement('section');
    bookCard.className = 'book-ul';
    bookCard.id = id;

    const bookCardUl = document.createElement('ul');
    bookCardUl.className = 'card-ul';

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = author;

    const bookTitle = document.createElement('li');
    bookTitle.textContent = title;

    const bookPages = document.createElement('li');
    bookPages.textContent = pages;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.className = 'buttons';
    removeButton.value = 'remove-btn';

    const readButton = document.createElement('button');
    readButton.className = 'read';
    readButton.value = 'read-btn-val';

    toggleRead(readButton, read);

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
    getElementParentId,
    updateBookNo,
    toggleRead,
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

  const updateBookNo = bookNo => displayFact.updateBookNo(bookNo);

  const handleBookAddition = event => {
    event.preventDefault();
    const book = storeFact.add({
      author: inputBookAuthor.value,
      title: inputBookTitle.value,
      pages: inputBookPage.value,
    });
    displayFact.displayBook(book);
    const bookNo = storeFact.count();
    updateBookNo(bookNo);
  };

  const handleBookRemoval = event => {
    const { target } = event;
    if (target.value === 'remove-btn') {
      const parentId = displayFact.getElementParentId(target);
      const element = document.getElementById(parentId);
      element.parentElement.remove();
      storeFact.remove(parentId);
      const bookNo = storeFact.count();
      updateBookNo(bookNo);
    }
  };

  const newBookNo = () => storeFact.count();

  const handleReadMethod = event => {
    const { target } = event;
    const parentId = displayFact.getElementParentId(target);
    if (target.value === 'read-btn-val') {
      storeFact.toggleRead(parentId);
      const readStatus = storeFact.all().find(({ id }) => id === parentId).read;
      displayFact.toggleRead(target, readStatus);
    }
  };

  return {
    handleBookAddition,
    handleBookRemoval,
    handleReadMethod,
    newBookNo,
  };
};

const startApp = () => {
  const body = document.querySelector('body');
  const form = document.querySelector('#new-book-form');

  const keep = store([
    {
      author: 'Chinua Achebe',
      title: 'Things fall apart',
      pages: '500',
    },
    {
      author: 'Chinua Achebe',
      title: 'Java for Dummies',
      pages: '120000',
    },
    {
      author: 'Chinua Achebe',
      title: 'Things fall apart',
      pages: '1200',
    },
  ]);

  const display = bookUi();
  const eventListener = handleEventListeners(
    '.book-author',
    '.book-title',
    '.book-pages',
    keep,
    display,
  );

  display.displayAllBook(keep.all());
  const bookNo = eventListener.newBookNo();
  display.updateBookNo(bookNo);

  form.addEventListener('submit', eventListener.handleBookAddition);
  body.addEventListener('click', eventListener.handleBookRemoval);
  body.addEventListener('click', eventListener.handleReadMethod);
};

startApp();
