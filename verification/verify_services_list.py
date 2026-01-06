from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Grant permissions for clipboard or just handle alerts
        context = browser.new_context()
        page = context.new_page()

        # Handle alerts
        page.on("dialog", lambda dialog: dialog.accept())

        cwd = os.getcwd()
        create_service_url = f"file://{cwd}/Project 2/create_online_service.html"

        print(f"Navigating to {create_service_url}")
        page.goto(create_service_url)

        # Step 1
        print("Step 1: Details")
        page.fill('#service-title', "Test Service for List")
        page.fill('#service-description', "This is a test description longer than 20 chars.")
        page.click('#btn-next-to-price')

        # Step 2
        print("Step 2: Price")
        page.fill('.rate-input', "50")

        # Set Duration (Required for validation)
        # Assuming Hourly is active.
        # Select 1 hour min (index 0)
        page.locator('#hourly-duration-section select').nth(0).select_option(index=1)
        # Select 2 hours max (index 2 - because index 1 is min-mins)
        page.locator('#hourly-duration-section select').nth(2).select_option(index=2)

        page.click('#btn-next-to-schedule')

        # Step 3: Schedule
        print("Step 3: Schedule")
        expect(page.locator('#step-3-content')).to_be_visible()
        page.click('#btn-next-to-method')

        # Step 4: Method
        print("Step 4: Method")
        expect(page.locator('#step-4-content')).to_be_visible()
        page.click('#btn-next-to-addons')

        # Step 5: Addons
        print("Step 5: Addons")
        expect(page.locator('#step-5-content')).to_be_visible()
        page.click('#btn-next-to-duration')

        # Step 6: Duration (Date Range)
        print("Step 6: Duration")
        expect(page.locator('#step-6-content')).to_be_visible()

        # Select Date Range
        page.click('#start-date-trigger')
        page.locator('.cal-day:not(.empty)').first.click()

        page.click('#end-date-trigger')
        page.locator('.cal-day:not(.empty)').nth(1).click()

        page.click('#btn-next-to-notifications')

        # Step 7: Notifications
        print("Step 7: Notifications")
        expect(page.locator('#step-7-content')).to_be_visible()
        page.click('#btn-create-service')

        # Verify Finish Page
        print("Waiting for Finish Page...")
        page.wait_for_url("**/service_finish.html")
        expect(page.locator('#congrats-modal')).to_be_visible()

        # Close modal
        page.click('#btn-finish-modal')

        # Navigate to Services List
        print("Navigating to Services List...")
        page.click('a.back-link')

        page.wait_for_url("**/services.html")

        # Verify Service is Listed
        print("Verifying Service Card...")
        expect(page.locator('#empty-services-placeholder')).to_be_hidden()

        card = page.locator('.service-card-item').first
        expect(card).to_be_visible()
        expect(card).to_contain_text("Test Service for List")

        # Check menu
        page.locator('.card-menu-btn').click()
        expect(page.locator('.card-menu-dropdown')).to_be_visible()

        # Check Delete
        # We need to handle confirm dialog for delete
        # Dialog handler is already set to accept().
        print("Verifying Delete...")
        page.click('.delete-opt')

        # Verify it's gone
        expect(page.locator('.service-card-item')).to_have_count(0)
        expect(page.locator('#empty-services-placeholder')).to_be_visible()

        # Verify Add New Modal
        print("Verifying Add New Modal...")
        page.click('#btn-add-new-service')
        modal = page.locator('#create-new-modal')
        expect(modal).to_be_visible()

        page.screenshot(path="/app/verification/services_list_verification.png")
        print("Screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
