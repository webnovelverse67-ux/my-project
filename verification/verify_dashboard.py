from playwright.sync_api import sync_playwright
import os

def capture_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to the file
        cwd = os.getcwd()
        # We start at dashboard because we just want to verify it loads and looks correct after our theoretical redirect
        dashboard_path = f"file://{cwd}/Project 2/dashboard.html"

        print(f"Navigating to {dashboard_path}")
        page.goto(dashboard_path)

        # Take screenshot
        output_path = "verification/dashboard_verified.png"
        page.screenshot(path=output_path)
        print(f"Screenshot saved to {output_path}")
        browser.close()

if __name__ == "__main__":
    capture_dashboard()
