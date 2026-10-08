from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import LoginRequest, RegisterRequest
from security import create_token, get_current_user, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Authentication"])


def public_user(user: User):
    return {"id": user.id, "name": user.name, "email": user.email, "role": user.role}


@router.post("/register", status_code=201)
def register(data: RegisterRequest, response: Response, db: Session = Depends(get_db)):
    email = data.email.lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(name=data.name.strip(), email=email, password_hash=hash_password(data.password), role="student")
    db.add(user)
    db.commit()
    db.refresh(user)

    response.set_cookie(
        "access_token",
        create_token(user.id),
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=7200,
        path="/",
    )
    return public_user(user)


@router.post("/login")
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email.lower()).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    response.set_cookie(
        "access_token",
        create_token(user.id),
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=7200,
        path="/",
    )
    return public_user(user)


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"message": "Logged out"}


@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return public_user(user)
