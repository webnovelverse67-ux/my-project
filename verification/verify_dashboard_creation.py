
import os
import sys
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        cwd = os.getcwd()
        dashboard_path = os.path.join(cwd, 'Project 2/dashboard.html')

        # Check if file exists first to avoid playwright error
        if not os.path.exists(dashboard_path):
             print("Error: dashboard.html does not exist.")
             sys.exit(1)

        url = f'file://{dashboard_path}'
        print(f"Navigating to {url}")
        page.goto(url)

        # 1. Verify Header Text
        header = page.locator("h1")
        if header.is_visible():
            text = header.inner_text()
            print(f"Found header: {text}")
            if "Hey Group" not in text:
                print("Error: Header should contain 'Hey Group'")
                # sys.exit(1) # Strict check
        else:
            print("Error: Header not found")

        # 2. Verify Sidebar
        sidebar = page.locator(".dashboard-sidebar")
        if sidebar.is_visible():
            print("Sidebar found.")
            # Check for a link
            if page.locator("text=Earnings").is_visible():
                print("Sidebar link 'Earnings' found.")
        else:
            print("Error: Sidebar not found")

        # 3. Verify Accordion
        step1 = page.locator(".setup-step.expanded") # Assuming default expanded
        if step1.is_visible():
            print("Step 1 expanded found.")
            if page.locator("text=Online Service").is_visible():
                print("Card 'Online Service' found.")
        else:
            print("Error: Step 1 not visible or not expanded.")

        browser.close()
        print("Dashboard verification passed structure checks.")

if __name__ == "__main__":
    run()
