import os
from playwright.sync_api import sync_playwright

def verify_step5():
    file_path = os.path.abspath("Project 2/create_online_service.html")
    file_url = f"file://{file_path}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(file_url)

        print("Navigating to Step 5 (Add-ons)...")
        # Step 1 -> 2
        page.fill("#service-title", "Test Service Title")
        page.fill("#service-description", "Test Service Description is long enough.")
        page.click("#btn-next-to-price")

        # Step 2 -> 3
        page.click("#btn-next-to-schedule") # Hourly default is 0, might fail validation if I didn't set inputs
        # Wait, validation requires duration > 0.
        # Set duration
        page.select_option("#hourly-duration-section .time-select-row:nth-child(2) select:nth-child(1)", "1") # Min duration 1 hour
        page.select_option("#hourly-duration-section .form-group:nth-child(2) .time-select-row select:nth-child(1)", "2") # Max duration 2 hours
        page.click("#btn-next-to-schedule")

        # Step 3 -> 4
        page.click("#btn-next-to-method")

        # Step 4 -> 5
        # Select built-in (default)
        page.click("#btn-next-to-addons")

        # Verify Step 5 Visible
        if page.is_visible("#step-5-content"):
            print("SUCCESS: Step 5 content is visible.")
        else:
            print("FAILURE: Step 5 content not visible.")
            browser.close()
            return

        # Check Initial View (Cards)
        if page.is_visible("#addons-initial-view") and page.is_visible("#btn-create-addon-trigger"):
             print("SUCCESS: Initial Add-on cards visible.")
        else:
             print("FAILURE: Initial Add-on cards missing.")

        # Click Create Add-on
        print("Clicking Create Add-on...")
        page.click("#btn-create-addon-trigger")

        # Verify Modal Open
        if page.is_visible("#create-addon-modal") and not page.evaluate("document.getElementById('create-addon-modal').classList.contains('hidden')"):
             print("SUCCESS: Modal opened.")
        else:
             print("FAILURE: Modal did not open.")
             browser.close()
             return

        # Check AI Buttons Exclusion
        content = page.content()
        if "AI Generate" in content:
            # Need to be careful, "AI Generate" might be in comments or other parts. Check visible text in modal.
            # Using specific selectors to check if buttons exist
            ai_btns = page.query_selector_all("button:has-text('AI Generate')")
            visible_ai = [btn for btn in ai_btns if btn.is_visible()]
            if visible_ai:
                 print("FAILURE: AI Generate buttons found visible!")
            else:
                 print("SUCCESS: AI Generate buttons excluded (or not visible).")

        # Fill Form
        print("Filling Add-on Form...")
        page.fill("#addon-title", "My New Addon")
        page.fill("#addon-desc", "This is a great addon.")
        page.fill("#addon-qty", "10")
        page.fill("#addon-price", "50")

        # Save
        print("Clicking Save Add-on...")
        page.click("#btn-save-addon")

        # Verify List View
        if page.evaluate("document.getElementById('addons-initial-view').classList.contains('hidden')"):
             print("SUCCESS: Initial view hidden.")
        else:
             print("FAILURE: Initial view not hidden after save.")

        if page.is_visible("#addons-list-container") and page.is_visible(".addon-list-item"):
             print("SUCCESS: Add-ons list visible with item.")
             # Check item text
             if "My New Addon" in page.inner_text(".addon-list-item"):
                 print("SUCCESS: Correct addon title in list.")
        else:
             print("FAILURE: Add-ons list not visible or empty.")

        # Capture screenshot
        page.screenshot(path="verification/step5_addons_list.png")
        print("Screenshot saved to verification/step5_addons_list.png")

        browser.close()

if __name__ == "__main__":
    verify_step5()
