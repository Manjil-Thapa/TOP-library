// getting selectors
const title = document.querySelector("#id");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const add = document.querySelector(".add");
const display = document.querySelector(".display");

const myLibrary = [];

// // Local Storage
// myLibrary = JSON.parse(localStorage("myLibrary") || "[]");

function createBook() {
  const book = document.createElement("div");
  book.classList.add("book");

  const img = document.createElement("img");
  img.setAttribute("src", "images/wallpaper.jpg");

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");
  const title = document.createElement("h2");
  title.setAttribute("id", "title");
  title.textContent = "testing";

  const author = document.createElement("h3");
  author.setAttribute("id", "author");
  author.textContent = "testing";

  const pages = document.createElement("h4");
  pages.setAttribute("id", "pages");
  pages.textContent = "testing";

  const bookOptions = document.createElement("div");
  bookOptions.classList.add("book-options");
  const read = document.createElement("div");
  read.classList.add("read");
  const bookReadLabel = document.createElement("label");
  bookReadLabel.setAttribute("for", "read");
  bookReadLabel.textContent = "Read";
  const bookReadInput = document.createElement("input");
  bookReadInput.setAttribute("type", "checkbox");
  bookReadInput.setAttribute("name", "read");
  bookReadInput.setAttribute("id", "read");
  read.append(bookReadLabel, bookReadInput);

  const deleteBook = document.createElement("div");
  deleteBook.classList.add("delete");
  const bookDeleteLabel = document.createElement("label");
  bookDeleteLabel.setAttribute("for", "delete");
  bookDeleteLabel.textContent = "Delete";
  const bookDeleteInput = document.createElement("input");
  bookDeleteInput.setAttribute("type", "checkbox");
  bookDeleteInput.setAttribute("name", "delete");
  bookDeleteInput.setAttribute("id", "delete");
  deleteBook.append(bookDeleteLabel, bookDeleteInput);

  bookInfo.append(title, author, pages);
  bookOptions.append(read, deleteBook);
  book.append(img, bookInfo, bookOptions);
  display.append(book);
  const deleteBook2 = document.createElement("div");
  deleteBook.classList.add("delete");
}

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let addBook = new Book(title, author, pages, read);

  myLibrary.push(addBook);
  console.log(myLibrary);
}

function openForm() {
  document.querySelector(".form-container").style.display = "flex";
}

const addBookBtn = document.querySelector("#create-book-btn");
addBookBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addBookToLibrary();
});
