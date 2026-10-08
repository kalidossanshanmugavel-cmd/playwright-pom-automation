from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Attempt, Course, User
from security import get_current_user

router = APIRouter(prefix="/progress", tags=["Progress"])


@router.get("")
def progress(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    attempts = db.query(Attempt).filter(Attempt.user_id == user.id).all()
    result = []

    for a in attempts:
        course = db.get(Course, a.course_id)
        result.append(
            {
                "id": a.id,
                "course_id": a.course_id,
                "course": course.title if course else "Unknown",
                "score": a.score,
                "total": a.total,
                "percentage": round(a.score / a.total * 100, 2) if a.total else 0,
            }
        )

    return result
