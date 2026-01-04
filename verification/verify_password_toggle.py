
import os
import sys
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        cwd = os.getcwd()
        filepath = os.path.join(cwd, 'Project 2/login.html')
        url = f'file://{filepath}'
        page.goto(url)

        # Go to email view
        page.click("#btn-email-login")

        # Check initial type
        initial_type = page.get_attribute("#password-input", "type")
        print(f"Initial type: {initial_type}")
        if initial_type != "password":
            print("Error: Initial type is not password")
            sys.exit(1)

        # Click toggle
        print("Clicking toggle...")
        page.click("#toggle-password")

        # Check type
        toggled_type = page.get_attribute("#password-input", "type")
        print(f"Toggled type: {toggled_type}")
        if toggled_type != "text":
            print("Error: Type did not change to text")
            sys.exit(1)

        # Click toggle again
        print("Clicking toggle again...")
        page.click("#toggle-password")

        # Check type
        final_type = page.get_attribute("#password-input", "type")
        print(f"Final type: {final_type}")
        if final_type != "password":
            print("Error: Type did not change back to password")
            sys.exit(1)

        browser.close()
        print("Password toggle verified!")

if __name__ == "__main__":
    run()
