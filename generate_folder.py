from pathlib import Path

structure = {
    "lms-backend": [
        "app/api/v1/auth.py",
        "app/api/v1/users.py",
        "app/api/v1/courses.py",
        "app/api/v1/attendance.py",
        "app/api/v1/exams.py",
        "app/api/v1/grades.py",
        "app/api/v1/reports.py",
        "app/api/v1/security.py",

        "app/core/config.py",
        "app/core/security.py",
        "app/core/deps.py",

        "app/models/.gitkeep",
        "app/schemas/.gitkeep",
        "app/services/.gitkeep",
        "app/utils/.gitkeep",

        "alembic/.gitkeep",
        "tests/.gitkeep",

        "main.py",
        "requirements.txt",
    ],

    "lms-frontend": [
        "app/(auth)/.gitkeep",

        "app/(dashboard)/student/.gitkeep",
        "app/(dashboard)/teacher/.gitkeep",
        "app/(dashboard)/homeroom/.gitkeep",
        "app/(dashboard)/admin/.gitkeep",

        "components/ui/.gitkeep",
        "components/modules/.gitkeep",

        "lib/api.ts",
        "lib/auth.ts",

        "hooks/.gitkeep",
        "types/.gitkeep",
        "public/.gitkeep",
    ],
}


def create_structure():
    for project, paths in structure.items():
        root = Path(project)

        for item in paths:
            path = root / item

            if path.suffix:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.touch(exist_ok=True)
            else:
                path.mkdir(parents=True, exist_ok=True)

    print("Struktur project berhasil dibuat!")


if __name__ == "__main__":
    create_structure()