from fastapi import FastAPI
from .routers import analyze

app = FastAPI(
    title="Codon Usage Calculator API",
    description="Simple API to analyze DNA sequences into codon usage and amino acids",
    version="0.1.0"
)

app.include_router(analyze.router)

@app.get("/")
def root():
    return {"message": "Codon Usage Calculator API is running 🚀"}
