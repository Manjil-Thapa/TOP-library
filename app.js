const booksDisplay = document.querySelector('.books-display');

const myLibrary = [
  {
    title: 'Real Camp',
    author: 'Curry',
    pages: 402,
    read: false,
  },
  {
    title: 'Champ',
    author: 'James',
    pages: '4',
    read: false,
  },
];
function openForm() {
  document.querySelector('.form-container').style.display = 'flex';
}
// click event to close form when clicking outside
const outerForm = document.querySelector('.form-container');
window.addEventListener('click', function (e) {
  if (e.target == outerForm) {
    outerForm.style.display = 'none';
  }
});

function helperBookElement(el, textContent, className) {
  const element = document.createElement(el);
  element.textContent = textContent;
  element.classList.add(className);
  return element;
}
function helperLabelElement(el, attribute, attData, textContent) {
  const label = document.createElement(el);
  label.setAttribute(attribute, attData);
  label.textContent = textContent;
  return label;
}

function createBookOptions(bookItem, book) {
  let readDiv = document.createElement('div');
  readDiv.classList.add('book-read');
  readDiv.appendChild(helperLabelElement('label', 'for', 'read', 'Read'));

  let input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('name', 'read');
  input.setAttribute('id', 'read');
  input.addEventListener('click', function (e) {
    if (e.target.checked) {
      bookItem.setAttribute('class', 'book read-checked');
      book.read = true;
      renderAllBooks();
    } else {
      bookItem.setAttribute('class', 'book read-unchecked');
      book.read = false;
      renderAllBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.setAttribute('class', 'book read-checked');
  }
  readDiv.appendChild(input);
  return readDiv;
}

function createDeleteOptions(bookItem, book) {
  let deleteDiv = document.createElement('div');
  deleteDiv.classList.add('book-delete');
  deleteDiv.appendChild(helperLabelElement('label', 'for', 'delete', 'Delete'));

  let input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('name', 'delete');
  input.setAttribute('id', 'delete');
  input.addEventListener('click', function (e) {
    if (e.target.checked) {
      bookItem.setAttribute('class', 'book delete-checked');
      book.read = true;
      renderAllBooks();
    } else {
      bookItem.setAttribute('class', 'book delete-unchecked');
      book.read = false;
      renderAllBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.setAttribute('class', 'book delete-checked');
  }
  deleteDiv.appendChild(input);
  return deleteDiv;
}

function createBookItems(book, index) {
  const bookItem = document.createElement('div');
  bookItem.setAttribute('id', index);
  bookItem.setAttribute('key', index);
  bookItem.classList.add('book');

  const bookCover = document.createElement('img');
  bookCover.setAttribute('src', 'images/wallpaper.jpg');

  bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');
  bookInfo.append(helperBookElement('h2', book.title, 'title'));
  bookInfo.append(helperBookElement('h3', book.author, 'author'));
  bookInfo.append(helperBookElement('h4', `${book.pages} pages`, 'pages'));

  bookOptions = document.createElement('div');
  bookOptions.classList.add('book-options');
  bookOptions.append(
    createBookOptions(bookItem, book),
    createDeleteOptions(bookItem, book)
  );

  bookItem.append(bookCover, bookInfo, bookOptions);
  booksDisplay.append(bookItem);
}

function renderAllBooks() {
  booksDisplay.innerHTML = `
  <div class="book add-book" onclick="openForm()">
  <img src="images/plus.svg" alt="">
</div>
  `;
  myLibrary.map((book, index) => {
    createBookItems(book, index);
  });
}

renderAllBooks();
