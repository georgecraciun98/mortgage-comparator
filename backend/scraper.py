import requests
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import re

url = "https://www.garantibbva.ro/persoane-fizice/calculator-rate-credit/"

response = requests.get(
    url,
    headers={
        "User-Agent":
        "Mozilla/5.0"
    }
)


soup = BeautifulSoup(response.text, "html.parser")



def scrape_garanti():

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)

        page = browser.new_page()

        page.goto("https://www.garantibbva.ro/")

        page.get_by_role("button", name="Permite toate").click()

        page.get_by_role("link", name="Credite", exact=True).click()

        page.get_by_role("link", name="Credit imobiliar", exact=True).click()
        
        page.get_by_role("table").click() 
        
        page.wait_for_load_state("networkidle")

        text = page.locator("body").inner_text()

        rates = re.findall(r"\d+\.\d+%", text)

        result = rates[2]

        print(result)

        browser.close()

def scrape_banca_transilvania():

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)

        page = browser.new_page()

        page.goto("https://www.bancatransilvania.ro/")
        page.get_by_role("button", name="Sunt de acord", exact=True).click()
        page.get_by_role("link", name="Înapoi la bancatransilvania.ro").click()
        page.get_by_role("button", name="Ai nevoie de ajutor?").click()
        page.get_by_role("link", name="Creditul pentru casă").click()
        page.get_by_role("link", name="Simulează credit").click()
        page.get_by_role("textbox", name="Cât costă locuința?").dblclick()
        page.get_by_role("textbox", name="Cât costă locuința?").fill("52.0000")
        page.get_by_role("button", name="Vezi calculul detaliat").click()
        page.get_by_text("Produs Creditul imobiliar-ipotecar Generată în 30 iulie 2026 Moneda î").click()


        
        page.wait_for_load_state("networkidle")

        text = page.locator("body").inner_text()

        print(text)

        rates = re.findall(r"\d+\.\d+%", text)

        result = rates[2]

        print(result)

        browser.close()


def scrape_unicredit():

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)

        page = browser.new_page()

        page.goto("https://www.unicredit.ro")
        page.get_by_role("button", name="Accept toate cookie-urile").click()
        page.get_by_role("list").filter(has_text="Credite Conturi si Carduri").get_by_role("button").click()
        page.get_by_role("menuitem", name="Acceseaza Aplica acum pentru").click()
        page.get_by_role("tab", name="CREDITUL CASA VERDE").click()
        page.get_by_role("button", name="Dobanzi si Comisioane ").click()
        page.locator("#expand_15 > div:nth-child(3)").click()


        
        page.wait_for_load_state("networkidle")

        text = page.locator("body").inner_text()


        rates = re.findall(r"\d+\.\d+%", text)

        result = rates[2]

        print(result)

        browser.close()
    
if __name__ == "__main__":
    scrape_unicredit()


    import re





