const myLibrary = [];

function Book(author, title, pages, read) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title) {
  const book = new Book(author, title);
  myLibrary.push(book);
}

function displayBooks() {
  const container = document.getElementById("books-container");

  // Clear container
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    container.appendChild(bookCard);

    const bookTitle = document.createElement("h4");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");
    const bookRemove = document.createElement("button");
    const bookStatus = document.createElement("button");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = "Pages:" + book.pages;
    bookRemove.id = "remove-book";
    bookRemove.textContent = " Remove";
    bookStatus.textContent = "Toggle 'read' status";

    if (book.read === true) {
      bookRead.textContent = "Read: Yes";
    } else {
      bookRead.textContent = "Read: No";
    }

    // Remove book button
    bookRemove.addEventListener("click", () => {
      removeBookFromLib(book.id);
    });

    // Read status button
    bookStatus.addEventListener("click", () => {
      toggleReadStatus(book.id);
    });

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(bookRemove);
    bookCard.appendChild(bookStatus);
  });
}

// Get elements from doc
const addBookButton = document.getElementById("add-new-book-button");
const cancelButton = document.getElementById("cancel-button");
const dialogWindow = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const bookDialog = document.getElementById("book-dialog");

// Buttons actions
addBookButton.addEventListener("click", () => {
  dialogWindow.showModal();
});

cancelButton.addEventListener("click", () => {
  dialogWindow.close();
});

// Form submitting handler
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookAuthor = document.getElementById("author").value;
  const bookTitle = document.getElementById("title").value;
  const bookPages = document.getElementById("pages").value;
  const bookRead = document.getElementById("read").checked;

  const book = {
    id: crypto.randomUUID(),
    author: bookAuthor,
    title: bookTitle,
    pages: bookPages,
    read: bookRead,
  };

  myLibrary.push(book);
  bookForm.reset();
  bookDialog.close();
  displayBooks();
});

// Remove book handler
function removeBookFromLib(bookID) {
  const index = myLibrary.findIndex((book) => book.id === bookID);
  myLibrary.splice(index, 1);
  displayBooks();
}

// Toggle read status
function toggleReadStatus(bookID) {
  const index = myLibrary.findIndex((book) => book.id === bookID);
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}
