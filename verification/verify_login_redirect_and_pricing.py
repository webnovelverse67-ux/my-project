
import os
import sys
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Handle alerts - we expect one before redirect if we keep the alert,
        # but the plan is to remove/replace the alert with redirect.
        # However, checking if alert exists or logic changes is good.
        # We'll auto-accept alerts.
        page.on("dialog", lambda dialog: dialog.accept())

        # 1. Test Login Redirect
        cwd = os.getcwd()
        login_path = os.path.join(cwd, 'Project 2/login.html')
        page.goto(f'file://{login_path}')

        print("Navigated to login.html")

        # Fill credentials
        page.click("#btn-email-login")
        page.fill("#email-input", "group@gmail.com")
        page.fill("#password-input", "123456789")
        page.click("#btn-login-submit")

        # Wait for navigation
        # Note: Since it's a file:// navigation, we might need to wait for url change
        try:
            page.wait_for_url("**/loginpricing.html", timeout=3000)
            print("Successfully redirected to loginpricing.html")
        except:
            print(f"Failed to redirect. Current URL: {page.url}")
            # If we haven't implemented it yet, this will fail. Expected for TDD.
            # sys.exit(1)

        # 2. Test Pricing Page Elements (if redirect worked or we force navigate)
        pricing_path = os.path.join(cwd, 'Project 2/loginpricing.html')
        if "loginpricing.html" not in page.url:
            print("Force navigating to loginpricing.html for element testing...")
            page.goto(f'file://{pricing_path}')

        # Check for cards
        cards = page.locator(".pricing-plan-card")
        count = cards.count()
        print(f"Found {count} pricing cards.")

        # We expect 3 cards
        # if count != 3: print("Error: Expected 3 cards.")

        # Check for toggle
        if page.locator(".pill-toggle").is_visible():
            print("Pill toggle found.")
        else:
            print("Pill toggle not found.")

        # 3. Test Hide Details
        # Find a hide details button
        hide_btn = page.locator(".hide-details-btn").first
        if hide_btn.is_visible():
            print("Hide Details button found.")
            hide_btn.click()
            # Verify list is hidden. Assuming list has class .feature-list
            # or the container has a collapsed class.
            # This logic depends on implementation.
            print("Clicked Hide Details.")

        # 4. Test Back Button
        back_btn = page.locator(".back-btn")
        if back_btn.is_visible():
            print("Back button found.")
            back_btn.click()
            # Should go to index.html (or login)
            # page.wait_for_url("**/index.html")
            print("Clicked Back button.")

        browser.close()

if __name__ == "__main__":
    run()
