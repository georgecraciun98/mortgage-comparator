from math import pow


def monthly_payment(principal, annual_rate, years):

    r = annual_rate / 100 / 12
    n = years * 12

    payment = principal * (
        r * pow(1 + r, n)
    ) / (
        pow(1 + r, n) - 1
    )

    return round(payment, 2)
