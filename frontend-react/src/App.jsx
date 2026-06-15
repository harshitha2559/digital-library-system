import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Welcome from "./Welcome";

function App() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("all");

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    fetch("http://localhost:8000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  };

  const addBook = () => {

    if (!title || !author) {
      alert("Please enter title and author");
      return;
    }

    const newBook = {
      title,
      author,
      category,
      imageUrl,
      status: "Available",
    };

    fetch("http://localhost:8000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    }).then(() => {

      alert("Book Added Successfully");

      setTitle("");
      setAuthor("");
      setCategory("");
      setImageUrl("");

      loadBooks();

      setActiveSection("all");
    });
  };

 const borrowBook = (id) => {
  fetch(`http://localhost:8000/api/books/borrow/${id}`)
    .then(() => {
      setBooks(
        books.map((book) =>
          book.id === id
            ? { ...book, status: "Borrowed" }
            : book
        )
      );

      const book = books.find((b) => b.id === id);

      if (book) {
        setHistory([
          ...history,
          `${book.title} borrowed`,
        ]);
      }

      setTimeout(() => {
        loadBooks();
      }, 500);
    });
};

  const returnBook = (id) => {

    fetch(`http://localhost:8000/api/books/return/${id}`)
      .then(() => {

        const book = books.find((b) => b.id === id);

        if (book) {
          setHistory([
            ...history,
            `${book.title} returned`,
          ]);
        }

        loadBooks();
      });
  };

  const deleteBook = (id) => {

    fetch(`http://localhost:8000/api/books/${id}`, {
      method: "DELETE",
    }).then(() => loadBooks());
  };

  const toggleFavorite = (id) => {

    if (favorites.includes(id)) {

      setFavorites(
        favorites.filter((f) => f !== id)
      );

    } else {

      setFavorites([
        ...favorites,
        id,
      ]);
    }
  };

  const getBookImage = (book) => {

    if (
      book.imageUrl &&
      book.imageUrl.trim() !== ""
    ) {
      return book.imageUrl;
    }

    const title = (
      book.title || ""
    ).toLowerCase();

    if (title.includes("harry")) {
      return "https://covers.openlibrary.org/b/id/10521270-L.jpg";
    }

    if (title.includes("spring")) {
      return "https://images.unsplash.com/photo-1512820790803-83ca734da794";
    }

    if (title.includes("java")) {
      return "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
    }

    return "https://images.unsplash.com/photo-1512820790803-83ca734da794";
  };

 const filteredBooks = books.filter((book) => {
  const keyword = search.toLowerCase();

  return (
    (book.title || "").toLowerCase().includes(keyword) ||
    (book.author || "").toLowerCase().includes(keyword) ||
    (book.category || "").toLowerCase().includes(keyword)
  );
});

  const visibleBooks =
    activeSection === "favorites"
      ? filteredBooks.filter((book) =>
          favorites.includes(book.id)
        )
      : activeSection === "borrowed"
      ? filteredBooks.filter(
          (book) =>
            book.status &&
            book.status
              .toLowerCase()
              .trim() === "borrowed"
        )
      : filteredBooks;

  const totalBooks = books.length;

  const availableBooks = books.filter(
    (b) =>
      b.status &&
      b.status.toLowerCase().trim() ===
        "available"
  ).length;

  const borrowedBooks = books.filter(
  (book) => book.status?.toLowerCase().trim() === "borrowed"
).length;

  if (showWelcome) {
    return (
      <Welcome
        onStart={() =>
          setShowWelcome(false)
        }
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div
      className={
        darkMode ? "app dark" : "app"
      }
    >

      <aside className="sidebar">

        <div className="brand">
          <div className="logo">
            📖
          </div>

          <h2>Digital Library</h2>

          <p>Knowledge is Power</p>
        </div>

        <nav>

          <a
            onClick={() =>
              setActiveSection("all")
            }
          >
            🏠 Dashboard
          </a>

          <a
            onClick={() =>
              setActiveSection("all")
            }
          >
            📚 My Library
          </a>

          <a
            onClick={() =>
              setActiveSection("all")
            }
          >
            📖 All Books
          </a>

          <a
            onClick={() =>
              setActiveSection(
                "favorites"
              )
            }
          >
            ❤️ Favorites
          </a>

          <a
            onClick={() =>
              setActiveSection(
                "borrowed"
              )
            }
          >
            🕒 History
          </a>

          {user?.role === "ADMIN" && (
            <>
              <a
                onClick={() =>
                  setActiveSection("add")
                }
              >
                ➕ Add Book
              </a>

              <a
                onClick={() =>
                  setActiveSection("all")
                }
              >
                🛠 Manage Books
              </a>
            </>
          )}
        </nav>

        <button
          className="logout"
          onClick={() => {
            setIsLoggedIn(false);
            setUser(null);
          }}
        >
          Logout
        </button>

        <button
          className="dark-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀ Light Mode"
            : "🌙 Dark Mode"}
        </button>
      </aside>

      <main className="main">

        <header className="topbar">

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="top-user">

            <span>Welcome,</span>

            <b>{user?.name}</b>

            <img
              className="profile-image-top"
              src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
              alt="profile"
            />
          </div>
        </header>

        <section className="stats">

          <div className="stat-card">
            <span>📚</span>

            <h2>{totalBooks}</h2>

            <p>Total Books</p>
          </div>

          <div className="stat-card">
            <span>✅</span>

            <h2>{availableBooks}</h2>

            <p>Available</p>
          </div>

          <div className="stat-card">
            <span>📕</span>

            <h2>{borrowedBooks}</h2>

            <p>Borrowed</p>
          </div>

          <div className="stat-card">
            <span>❤️</span>

            <h2>{favorites.length}</h2>

            <p>Favorites</p>
          </div>
        </section>

        <div className="content-grid">

          <section className="books-section">

            <div className="section-title">

              <h2>📚 All Books</h2>

              <span>
                {user?.role} Dashboard
              </span>
            </div>

            {user?.role === "ADMIN" &&
              activeSection === "add" && (

              <div className="add-box">

                <h3>Add New Book</h3>

                <input
                  placeholder="Book Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

                <input
                  placeholder="Author"
                  value={author}
                  onChange={(e) =>
                    setAuthor(e.target.value)
                  }
                />

                <input
                  placeholder="Category"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) =>
                    setImageUrl(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={addBook}
                >
                  Add Book
                </button>
              </div>
            )}

            <div className="book-grid">

              {visibleBooks.map((book) => (

                <div
                  className="book-card"
                  key={book.id}
                >

                  <button
                    className="fav"
                    onClick={() =>
                      toggleFavorite(book.id)
                    }
                  >
                    {favorites.includes(
                      book.id
                    )
                      ? "❤️"
                      : "♡"}
                  </button>

                  <img
                    src={getBookImage(book)}
                    alt={book.title}
                  />

                  <h3>{book.title}</h3>

                  <p>{book.author}</p>

                  <small>
                    {book.category ||
                      "General"}
                  </small>

                  <div
                    className={
                      book.status ===
                      "Borrowed"
                        ? "status borrowed"
                        : "status available"
                    }
                  >
                    {book.status}
                  </div>

                  {book.status ===
                  "Borrowed" ? (

                    <button
                      onClick={() =>
                        returnBook(book.id)
                      }
                    >
                      Return Book
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        borrowBook(book.id)
                      }
                    >
                      Borrow Book
                    </button>
                  )}

                  {user?.role ===
                    "ADMIN" && (

                    <button
                      className="delete"
                      onClick={() =>
                        deleteBook(book.id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <aside className="right-panel">

            <div className="profile-box">

              <img
                className="profile-image"
                src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                alt="profile"
              />

              <h2>{user?.name}</h2>

              <p>{user?.role}</p>

              <small>{user?.email}</small>
            </div>

            <div className="activity-box">

              <h3>
                Recent Activity
              </h3>

              {history.length === 0 ? (

                <p>No activity yet</p>

              ) : (

                history
                  .slice(-5)
                  .reverse()
                  .map((h, i) => (
                    <p key={i}>
                      📌 {h}
                    </p>
                  ))
              )}
            </div>

            <div className="quote-box">

              <h3>Daily Quote</h3>

              <p>
                “A reader lives a
                thousand lives before
                he dies.”
              </p>

              <span>
                — George R.R.
                Martin
              </span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;