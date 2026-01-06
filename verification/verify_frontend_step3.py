import re
import os
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Load the page
    pwd = os.getcwd()
    file_path = f"file://{pwd}/Project 2/create_online_service.html"
    page.goto(file_path)

    # Step 1 Fill
    page.fill("#service-title", "Frontend Verification Title")
    page.fill("#service-description", "Frontend verification description sufficiently long.")
    page.click("#btn-next-to-price")

    # Step 2 Fill
    page.click("#btn-flat")
    # Select 1 hour
    page.select_option("#flat-duration-section .time-select:nth-child(1)", index=1)
    page.click("#btn-next-to-schedule")

    # Step 3 Verify
    expect(page.locator("h2:text('When do you offer it?')")).to_be_visible()

    # Open Timezone Editor
    page.click("#btn-edit-timezone")
    expect(page.locator("#timezone-editor")).to_be_visible()

    # Check some days
    page.check("#day-mon")
    page.check("#day-wed")
    page.check("#day-fri")

    # Screenshot
    os.makedirs("/app/verification", exist_ok=True)
    screenshot_path = "/app/verification/step3_schedule.png"
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
