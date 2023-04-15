// getting selectors
const title = document.querySelector("#id");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const add = document.querySelector(".add");
const display = document.querySelector(".display");

// add.addEventListener("click", function () {
//   console.log("clicked");
//   createBook();
// });

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

const myLibrary = [];
function sayHi() {
  console.log("hey");
}
function Book() {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
