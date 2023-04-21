// container to display all books
const booksDisplay = document.querySelector('.books-display');

// const formContainer = document.querySelector('.form-container');
const addBookBtn = document.querySelector('#add-book-btn');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();
}
addBookBtn.addEventListener('submit', function (e) {
  e.preventDefault();

  // grab form inputs and convert to obj
  const data = new FormData(e.target);
  let newBook = {};
  for (let [name, value] of data) {
    if (name === 'book-read') {
      newBook['book-read'] = true;
    } else {
      newBook[name] = value || '';
    }
  }
  if (!newBook['book-read']) {
    newBook['book-read'] = false;
  }
  addBookToLibrary(
    newBook['book-title'],
    newBook['book-author'],
    newBook['book-pages'],
    newBook['book-read']
  );
});

let myLibrary = [];

function addLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('library') || []);
  saveAndRenderBooks();
}

function openAddForm() {
  document.querySelector('.form-container').style.display = 'flex';
  document.querySelector('#form-header').textContent = 'Add New Book';
  document.querySelector('#add-book-btn').textContent = 'Add';
}

// close form btn
// span.addEventListener('click', function () {
//   document.querySelector('.form-container').style.display = 'none';
// });

// click event to close form when clicking outside form
const outerForm = document.querySelector('.form-container');
window.addEventListener('click', function (e) {
  if (e.target == outerForm) {
    outerForm.style.display = 'none';
  }
});
// helper fn to create html elements w/ classes and text
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

function createEdit() {
  const iconBtn = document.createElement('span');
  const editIcon = document.createElement('img');
  editIcon.setAttribute('src', 'images/pencil.svg');
  iconBtn.append(editIcon);
  return iconBtn;
}
function createDelete() {
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('book-delete');
  const deleteIcon = document.createElement('img');
  deleteIcon.setAttribute('src', 'images/delete.svg');
  deleteBtn.append(deleteIcon);
  deleteBtn.addEventListener('click', function () {
    deleteBook();
  });
  return deleteBtn;
}
// delete funtionality
function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveAndRenderBooks();
}

// helper fn to create input w/ event listener
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
      saveAndRenderBooks();
    } else {
      bookItem.setAttribute('class', 'book read-unchecked');
      book.read = false;
      saveAndRenderBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.setAttribute('class', 'book read-checked');
  }
  readDiv.appendChild(input);
  return readDiv;
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

  bookEditAndDelete = helperBookElement('div', null, 'book-icons');
  bookEditAndDelete.append(createEdit(), createDelete());

  bookOptions.append(createBookOptions(bookItem, book), bookEditAndDelete);
  bookItem.append(bookCover, bookInfo, bookOptions);
  booksDisplay.append(bookItem);
}

function renderLibrary() {
  booksDisplay.innerHTML = `
  <div class="book add-book" onclick="openAddForm()">
  <img src="images/plus.svg" alt="">
</div>
  `;
  myLibrary.map((book, index) => {
    createBookItems(book, index);
  });
}

function saveAndRenderBooks() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
  renderLibrary();
}

// render storage on page
addLocalStorage();
