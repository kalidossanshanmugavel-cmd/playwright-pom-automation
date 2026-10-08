from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from models import PracticeQuestion
from security import get_current_user

router=APIRouter(prefix="/practice",tags=["Practice"])

@router.get("")
def list_practice(course_id:int|None=Query(default=None),
                  db:Session=Depends(get_db), _=Depends(get_current_user)):
    q=db.query(PracticeQuestion)
    if course_id: q=q.filter(PracticeQuestion.course_id==course_id)
    return [{"id":x.id,"course_id":x.course_id,"title":x.title,
             "question":x.question,"difficulty":x.difficulty} for x in q.all()]
