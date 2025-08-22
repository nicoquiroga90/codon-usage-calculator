from fastapi import FastAPI
from .routers import analyze
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI(
    title="Codon Usage Calculator API",
    description="Simple API to analyze DNA sequences into codon usage and amino acids",
    version="0.1.0"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(analyze.router)

@app.get("/")
def root():
    return {"message": "Codon Usage Calculator API is running 🚀"}
