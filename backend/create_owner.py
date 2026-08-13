#from getpass import getpass

from sqlalchemy import select

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User, UserRole


def main():
    name = input("Owner name: ").strip()
    email = input("Owner email: ").strip().lower()
    password = input("Owner password: ")
    confirm_password = input("Confirm password: ")

    if not name:
        print("Error: Owner name is required.")
        return

    if not email:
        print("Error: Owner email is required.")
        return

    if not password:
        print("Error: Password is required.")
        return

    if password != confirm_password:
        print("Error: Passwords do not match.")
        return

    db = SessionLocal()

    try:
        existing_user = db.scalar(
            select(User).where(User.email == email)
        )

        if existing_user:
            print(f"Error: User with email '{email}' already exists.")
            return

        owner = User(
            school_id=None,
            name=name,
            email=email,
            password_hash=hash_password(password),
            role=UserRole.OWNER,
            is_active=True,
        )

        db.add(owner)
        db.commit()
        db.refresh(owner)

        print()
        print("Owner created successfully.")
        print(f"ID: {owner.id}")
        print(f"Name: {owner.name}")
        print(f"Email: {owner.email}")
        print(f"Role: {owner.role}")

    except Exception as error:
        db.rollback()
        print(f"Error creating owner: {error}")

    finally:
        db.close()


if __name__ == "__main__":
    main()