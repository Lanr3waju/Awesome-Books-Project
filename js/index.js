/* eslint-disable operator-linebreak */
const booksContainer = document.querySelector('#books-container');
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
    typeof pages === 'number';

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
      memory = [...memory, { author, title, id, read }];
      return true;
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

store();

const displayBook = ({ author, title, pages }) => {
  const ul = document.createElement('ul');
  ul.className = 'book-ul';

  const bookAuthor = document.createElement('li');
  bookAuthor.textContent = `Book Author: ${author}`;

  const bookTitle = document.createElement('li');
  bookTitle.textContent = `Book Title: ${title}`;

  const bookPages = document.createElement('li');
  bookPages.textContent = `No of Pages: ${pages}`;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove Book';
  removeButton.className = 'buttons';

  const readButton = document.createElement('button');
  readButton.textContent = 'Read';
  readButton.className = 'buttons';

  ul.appendChild(bookAuthor);
  ul.appendChild(bookTitle);
  ul.appendChild(bookPages);
  ul.appendChild(removeButton);
  ul.appendChild(readButton);
  booksContainer.appendChild(ul);
};

const displayAllBook = (allBooks = []) => {
  allBooks.forEach(displayBook);
};

const startApp = () => {
  displayAllBook([
    { author: 'Lanre', title: 'Java', pages: 24 },
    { author: 'Lanre', title: 'The DOM', pages: 15 },
  ]);
};

startApp();
