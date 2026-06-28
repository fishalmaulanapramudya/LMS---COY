from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from app.core.security import verify_password, hash_password, create_access_token, create_refresh_token

router = APIRouter()

FAKE_USERS = {
    "admin": {"password": hash_password("admin123"), "role": "ADMIN", "id": 1},
    "guru": {"password": hash_password("guru123"), "role": "TEACHER", "id": 2},
    "siswa": {"password": hash_password("siswa123"), "role": "STUDENT", "id": 3},
}

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(data: LoginRequest, response: Response):
    user = FAKE_USERS.get(data.username)
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Username atau password salah")

    access_token = create_access_token({"user_id": user["id"], "role": user["role"]})
    refresh_token = create_refresh_token({"user_id": user["id"]})

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=7 * 24 * 3600
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user["role"],
        "user_id": user["id"]
    }