from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, SessionLocal, engine
from sqlalchemy import inspect, text
from routers import auth, courses, mcq, practice, progress, admin
from seed import seed_database


@asynccontextmanager
def ensure_user_role_column():
    # create_all() does not alter an existing SQLite table, so migrate old databases safely.
    columns = {column["name"] for column in inspect(engine).get_columns("users")}
    if "role" not in columns:
        with engine.begin() as connection:
            connection.execute(text(
                "ALTER TABLE users ADD COLUMN role VARCHAR(30) NOT NULL DEFAULT 'student'"
            ))


async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    ensure_user_role_column()
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="Recitation Learning API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(courses.router)
app.include_router(mcq.router)
app.include_router(practice.router)
app.include_router(progress.router)


@app.get("/")
def root():
    return {"message": "Recitation API is running"}
