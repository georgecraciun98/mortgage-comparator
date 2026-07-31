from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import DateTime

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from database import Base


class Bank(Base):

    __tablename__ = "banks"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(100))

    website: Mapped[str]

    logo_url: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    mortgage_products = relationship(
        "MortgageProduct",
        back_populates="bank"
    )

class MortgageProduct(Base):

    __tablename__ = "mortgage_products"

    id: Mapped[int] = mapped_column(primary_key=True)

    bank_id: Mapped[int] = mapped_column(
        ForeignKey("banks.id")
    )

    product_name: Mapped[str]

    currency: Mapped[str]

    interest_rate: Mapped[float]

    dae: Mapped[float]

    fixed_years: Mapped[int]

    reference_index: Mapped[str]

    margin: Mapped[float]

    max_ltv: Mapped[float]

    active: Mapped[bool]

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    bank = relationship(
        "Bank",
        back_populates="mortgage_products"
    )

class InterestHistory(Base):

    __tablename__ = "interest_history"

    id: Mapped[int] = mapped_column(primary_key=True)

    mortgage_product_id: Mapped[int] = mapped_column(
        ForeignKey("mortgage_products.id")
    )

    interest_rate: Mapped[float]

    dae: Mapped[float]

    scraped_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )