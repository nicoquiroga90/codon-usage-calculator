from fastapi import APIRouter
from pydantic import BaseModel
from ..services import codon_service

router = APIRouter(prefix="/analyze", tags=["analyze"])

class SequenceInput(BaseModel):
    sequence: str

@router.post("/")
def analyze_sequence(input_data: SequenceInput):
    result = codon_service.analyze(input_data.sequence)
    return result
