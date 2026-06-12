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
    return {"message":"FastAPI Gateway Running"}

@app.get("/api/books")
def get_books():
    response = requests.get(
        f"{SPRING_BOOT_URL}/api/books"
    )
    return response.json()



@app.post("/api/books")
async def add_book(request: Request):
    data = await request.json()

    response = requests.post(
        f"{SPRING_BOOT_URL}/api/books",
        json=data
    )

    return response.json()
@app.delete("/api/books/{id}")
async def delete_book(id: int):

    response = requests.delete(
        f"{SPRING_BOOT_URL}/api/books/{id}"
    )

    return response.json()

    if response.status_code == 200:
        return response.json()

    return {"error": "Invalid Email or Password"}