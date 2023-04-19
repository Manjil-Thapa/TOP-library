// getting selectors
const title = document.querySelector('#id');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const add = document.querySelector('.add');
const display = document.querySelector('.display');


//books - main div holding all the books
const books = document.querySelector(".books");
//add book button
const addBook = document.querySelector(".add-book");
//add/edit book modal
const modal = document.querySelector("#modal");

// click event to close form when clicking outside
const outerForm = document.querySelector('.form-container');
window.addEventListener('click', function (e) {
  if (e.target == outerForm) {
    outerForm.style.display = 'none';
  }
});

//button to open the modal and set modal title and button
addBook.addEventListener("click", () => {
  modal.style.display = "block";
  document.querySelector(".form-title").textContent = "Add Book";
  document.querySelector(".form-add-button").textContent = "Add";
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();

function createBookItem(book, index) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "card book");
  bookItem.appendChild(
    createBookElement("h1", `Title: ${book.title}`, "book-title")
  );
  bookItem.appendChild(
    createBookElement("h1", `Author: ${book.author}`, "book-author")
  );
  bookItem.appendChild(
    createBookElement("h1", `Pages: ${book.pages}`, "book-pages")
  );
  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createBookElement("button", "X", "delete"));
  bookItem.appendChild(createIcons());
  bookItem.appendChild(createEditIcon(book));
  
  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });
  
  books.insertAdjacentElement("afterbegin", bookItem);
}

function renderBooks() {
  books.textContent = "";
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
}

function saveAndRenderBooks() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
  renderBooks();
}

addLocalStorage();


function createBook() {
  let libraryContainer = document.querySelector('.display');
  libraryContainer.innerHTML = `
  <div class="book add-book" onclick="openForm()">
  <img src="images/plus.svg" alt="">
</div>
  `;
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.innerHTML = `
      <img src="images/wallpaper.jpg" alt="" />

      <div class="book-info">
        <h2 id="title">${book.title}</h2>
        <h3 id="author">${book.author}</h3>
        <h4 id="pages">${book.pages}</h3>
      </div>

      <div class="book-options">
        <div>
          <label for="read">${book.read}</label>
          <input type="checkbox" name="read" id="read" />
        </div>
        <div>
          <label for="delete">Delete</label>
          <input type="checkbox" name="delete" id="delete" />
        </div>
      </div>
    `;
    libraryContainer.append(bookCard);
  }
}



function openForm() {
  document.querySelector('.form-container').style.display = 'flex';
}

function addBookToLibrary() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').checked;
  let addBook = new Book(title, author, pages, read);

  myLibrary.push(addBook);

  createBook();
  console.log(myLibrary);
}

const addBookBtn = document.querySelector('#add-book-btn');
addBookBtn.addEventListener('click', function (e) {
  e.preventDefault();
  addBookToLibrary();
});

// another method to add form
// const addBookBtn = document.querySelector('#add-book-btn');
// addBookBtn.addEventListener('click', function (e) {
//   e.preventDefault();

//   const data = new FormData(e.target);
//   let newBook = {};
//   for (let [name, value] of data) {
//     if (name === 'book-read') {
//       newBook['book-read'] = true;
//     } else {
//       newBook[name] = value || '';
//     }
//   }
//   if (!newBook['book-read']) {
//     newBook['book-read'] = false;
//   }
// });

// helper fn to create html el with textcontent and classes
function createBookEl(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute('class', className);
  return element;
}

//helper function to create input checkbox for books read / unread w/ event listener
function createReadElement(bookItem, book) {
  let read = document.createElement('div');
  read.setAttribute('class', 'book-read');
  read.appendChild(createReadElement('h1', 'read?', 'book-read-title'));
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('click', (e) => {
    if (e.target.checked) {
      bookItem.setAttribute('class', 'card book read-checked');
      book.read = true;
      saveAndRenderBooks();
    } else {
      bookItem.setAttribute('class', 'card book read-unchecked');
      book.read = false;
      saveAndRenderBooks();
    }
  });
}

// delete function
function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveAndRenderBooks();
}
// delete functionality - pop up form
//use modal

bookItem.querySelector('.delete').addEventListener('click', function () {
  deleteBook(index);
});

// add local storage

// grab local storage data if not empty array
function addLocalStorage() {
  // myLibrary = JSON.parse(localStorage.getItem('library')) || []
  saveAndRenderBooks();
}
// render books from local storage
function saveAndRenderBooks() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
  renderBook();
}
// addLocalStorage - render on page load
// addLocalStorage();