
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to login.html
        cwd = os.getcwd()
        login_path = os.path.join(cwd, 'Project 2/login.html')
        page.goto(f'file://{login_path}')

        # Click "Continue with Email"
        # Since we changed it to an anchor, we can click it and expect navigation
        with page.expect_navigation():
            page.click('a.email')

        # Verify we are on loginwithemail.html
        # Since we are using file:// protocol, check the url ends with loginwithemail.html
        print(f"Current URL: {page.url}")
        assert "loginwithemail.html" in page.url

        # Verify form exists
        assert page.is_visible('form.login-form')

        # Take a screenshot
        page.screenshot(path='verification/login_email_page.png')
        print("Verification successful: Navigated to Login with Email page.")

        browser.close()

if __name__ == "__main__":
    run()
