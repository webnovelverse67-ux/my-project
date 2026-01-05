
import os
from playwright.sync_api import sync_playwright

def capture_step4():
    cwd = os.getcwd()
    file_path = f"file://{cwd}/Project 2/create_online_service.html"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto(file_path)

        # Navigate to Step 4
        page.fill('#service-title', 'Test Service Title')
        page.fill('#service-description', 'This is a description that is long enough.')
        page.click('#btn-next-to-price')

        page.select_option('#hourly-duration-section .form-group:nth-child(1) .time-select-row select:nth-child(1)', '1')
        page.select_option('#hourly-duration-section .form-group:nth-child(2) .time-select-row select:nth-child(1)', '2')
        page.click('#btn-next-to-schedule')

        page.click('#btn-next-to-method')

        # State 1: Built-in Selected (Default)
        page.screenshot(path="verification/step4_method_builtin.png")

        # State 2: Custom Method Selected (Phone Number)
        page.click('#card-custom')
        page.select_option('#custom-method-select', 'Phone Number')
        page.fill('#custom-input-field', '+1234567890')
        page.screenshot(path="verification/step4_method_custom_phone.png")

        browser.close()

if __name__ == "__main__":
    capture_step4()
