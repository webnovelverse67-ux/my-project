
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the file
        cwd = os.getcwd()
        filepath = os.path.join(cwd, 'Project 2/login.html')
        page.goto(f'file://{filepath}')

        # Wait for potential animations or layout
        page.wait_for_timeout(1000)

        # Screenshot
        screenshot_path = 'verification/login_split.png'
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
