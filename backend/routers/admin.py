from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User
from security import require_roles
router = APIRouter(prefix="/admin", tags=["Admin"])
@router.get("/users")
def users(db: Session = Depends(get_db), _=Depends(require_roles("admin"))):
    return [{"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in db.query(User).order_by(User.id).all()]
