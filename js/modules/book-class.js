class Book {
  constructor({ author, title, pages, read = false, id = this.#generateID() }) {
    if (Book.#isValid({ author, title, pages })) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.read = read;
      this.id = id;
    }
  }

  static #isValid = ({ author, title, pages }) => typeof author === 'string'
    && author.length > 0
    && typeof title === 'string'
    && title.length > 0
    && typeof pages === 'number';

  #generateID = () => `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  toggleRead = () => {
    this.read = !this.read;
  };
}

export default Book;
