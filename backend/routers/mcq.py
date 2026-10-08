from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db
from models import Attempt, Question, User
from schemas import SubmitRequest
from security import get_current_user, require_roles

router = APIRouter(prefix="/mcq", tags=["MCQ"])


@router.get("")
def questions(
    course_id: int | None = Query(default=None),
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    query = db.query(Question)
    if course_id:
        query = query.filter(Question.course_id == course_id)

    return [
        {
            "id": q.id,
            "course_id": q.course_id,
            "question": q.question,
            "options": {
                "A": q.option_a,
                "B": q.option_b,
                "C": q.option_c,
                "D": q.option_d,
            },
        }
        for q in query.all()
    ]


@router.post("/submit")
def submit(
    data: SubmitRequest,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("student")),
):
    questions = db.query(Question).filter(Question.course_id == data.course_id).all()
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found")

    answer_map = {item.question_id: item.answer.upper() for item in data.answers}
    score = sum(1 for q in questions if answer_map.get(q.id) == q.correct_answer)

    attempt = Attempt(
        user_id=user.id,
        course_id=data.course_id,
        score=score,
        total=len(questions),
    )
    db.add(attempt)
    db.commit()

    return {
        "score": score,
        "total": len(questions),
        "percentage": round(score / len(questions) * 100, 2),
    }
