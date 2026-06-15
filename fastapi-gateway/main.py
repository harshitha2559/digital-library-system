from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

SPRING_BOOT_URL = "http://localhost:8082"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "FastAPI Gateway Running"}

# Get all books
@app.get("/api/books")
def get_books():
    response = requests.get(
        f"{SPRING_BOOT_URL}/api/books"
    )
    return response.json()

# Add book
@app.post("/api/books")
async def add_book(request: Request):

    data = await request.json()

    response = requests.post(
        f"{SPRING_BOOT_URL}/api/books",
        json=data
    )

    return response.json()

# Delete book
@app.delete("/api/books/{id}")
async def delete_book(id: int):

    response = requests.delete(
        f"{SPRING_BOOT_URL}/api/books/{id}"
    )

    return response.json()

# Borrow book
@app.get("/api/books/borrow/{id}")
def borrow_book(id: int):

    response = requests.get(
        f"{SPRING_BOOT_URL}/api/books/borrow/{id}"
    )

    return response.text

# Return book
@app.get("/api/books/return/{id}")
def return_book(id: int):

    response = requests.get(
        f"{SPRING_BOOT_URL}/api/books/return/{id}"
    )

    return response.text