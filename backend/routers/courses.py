from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Course
from security import get_current_user

router = APIRouter(prefix="/courses", tags=["Courses"])

def course_dict(c):
    return {"id":c.id,"slug":c.slug,"title":c.title,"description":c.description,
            "level":c.level,"duration":c.duration,
            "lesson_count":len(c.lessons),"question_count":len(c.questions),
            "practice_count":len(c.practice_questions)}

@router.get("")
def list_courses(db: Session=Depends(get_db), _=Depends(get_current_user)):
    return [course_dict(c) for c in db.query(Course).order_by(Course.id).all()]

@router.get("/{course_id}")
def get_course(course_id:int, db:Session=Depends(get_db), _=Depends(get_current_user)):
    c=db.get(Course,course_id)
    if not c: raise HTTPException(404,"Course not found")
    result=course_dict(c)
    result["lessons"]=[{"id":x.id,"title":x.title,"content":x.content,"order":x.lesson_order}
                       for x in sorted(c.lessons,key=lambda x:x.lesson_order)]
    return result
