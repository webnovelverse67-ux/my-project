from playwright.sync_api import sync_playwright
import os
import time

def test_free_trial_redirect():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to the file
        cwd = os.getcwd()
        login_path = f"file://{cwd}/Project 2/login.html"

        print(f"Navigating to {login_path}")
        page.goto(login_path)

        # 1. Login
        print("Clicking 'Continue with Email'...")
        page.click("#btn-email-login")

        print("Filling login form...")
        # Now input should be visible
        page.fill("#email-input", "group@gmail.com")
        page.fill("#password-input", "123456789")

        print("Submitting login...")
        page.click("#email-login-form button[type='submit']")

        # 2. Verify redirect to pricing
        print("Waiting for navigation to loginpricing.html...")
        page.wait_for_url("**/loginpricing.html")
        print("Successfully reached loginpricing.html")

        # 3. Click 'Continue' on Free Trial card
        # The card has ID 'card-free'. The button is inside.
        print("Clicking 'Continue' on Free Trial card...")
        # Select the button inside the free card
        try:
            page.click("#card-free button")
        except Exception as e:
            print(f"Error clicking button: {e}")
            browser.close()
            return False

        # 4. Verify redirect to dashboard
        print("Waiting for navigation to dashboard.html...")
        try:
            page.wait_for_url("**/dashboard.html", timeout=3000)
            print("SUCCESS: Redirected to dashboard.html")
            browser.close()
            return True
        except Exception:
            print(f"FAILURE: Did not redirect to dashboard.html. Current URL: {page.url}")
            browser.close()
            return False

if __name__ == "__main__":
    if test_free_trial_redirect():
        exit(0)
    else:
        exit(1)
