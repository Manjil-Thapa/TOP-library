// getting selectors
const title = document.querySelector('#id');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const add = document.querySelector('.add');
const display = document.querySelector('.display');

const myLibrary = [];

// function createBook() {
//   const book = document.createElement("div");
//   book.classList.add("book");

//   const img = document.createElement("img");
//   img.setAttribute("src", "images/wallpaper.jpg");

//   const bookInfo = document.createElement("div");
//   bookInfo.classList.add("book-info");

//   const title = document.createElement("h2");
//   title.setAttribute("id", "title");
//   title.innerHTML = title.value;

//   const author = document.createElement("h3");
//   author.setAttribute("id", "author");
//   author.textContent = "testing";

//   const pages = document.createElement("h4");
//   pages.setAttribute("id", "pages");
//   pages.textContent = "testing";

//   const bookOptions = document.createElement("div");
//   bookOptions.classList.add("book-options");
//   const read = document.createElement("div");
//   read.classList.add("read");
//   const bookReadLabel = document.createElement("label");
//   bookReadLabel.setAttribute("for", "read");
//   bookReadLabel.textContent = "Read";
//   const bookReadInput = document.createElement("input");
//   bookReadInput.setAttribute("type", "checkbox");
//   bookReadInput.setAttribute("name", "read");
//   bookReadInput.setAttribute("id", "read");
//   read.append(bookReadLabel, bookReadInput);

//   const deleteBook = document.createElement("div");
//   deleteBook.classList.add("delete");
//   const bookDeleteLabel = document.createElement("label");
//   bookDeleteLabel.setAttribute("for", "delete");
//   bookDeleteLabel.textContent = "Delete";
//   const bookDeleteInput = document.createElement("input");
//   bookDeleteInput.setAttribute("type", "checkbox");
//   bookDeleteInput.setAttribute("name", "delete");
//   bookDeleteInput.setAttribute("id", "delete");
//   deleteBook.append(bookDeleteLabel, bookDeleteInput);

//   bookInfo.append(title, author, pages);
//   bookOptions.append(read, deleteBook);
//   book.append(img, bookInfo, bookOptions);
//   display.append(book);
//   const deleteBook2 = document.createElement("div");
//   deleteBook.classList.add("delete");
// }

// click event to close form when clicking outside
const outerForm = document.querySelector('.form-container');
window.addEventListener('click', function (e) {
  if (e.target == outerForm) {
    outerForm.style.display = 'none';
  }
});
function openForm() {
  document.querySelector('.form-container').style.display = 'flex';
}

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
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

// function render() {
//   let libraryEl = document.querySelector("#library");
//   libraryEl.innerHTML = "";
//   for (let i = 0; i < myLibrary.length; i++) {
//     let book = myLibrary[i];
//     let bookEl = document.createElement("div");
//     bookEl.innerHTML = `
//       <div class='card-header'>
//         <h3 class='title'>${book.title}</h3>
//         <h5 class='author'>${book.author}</h5>
//       </div>
//       <div class='card-body'>
//         <p>${book.pages} pages</p>
//     `;
//     libraryEl.appendChild(bookEl);
//   }
// }

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
          <label for="read">Read</label>
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

//function to render all books
function renderBook() {
  books.textcContet = '';
  myLibrary.map((book, index) => {
    createBookItem(book, index);
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
