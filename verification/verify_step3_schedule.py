import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Load the page (assuming local file access for verification)
    # Using absolute path for safety in the sandbox
    import os
    pwd = os.getcwd()
    file_path = f"file://{pwd}/Project 2/create_online_service.html"
    page.goto(file_path)

    print("Navigating to Step 3...")

    # Step 1 Fill
    page.fill("#service-title", "Test Service Title Long Enough")
    page.fill("#service-description", "This is a sufficiently long description for the test to pass validation rules.")
    page.click("#btn-next-to-price")

    # Step 2 Fill
    page.click("#btn-flat")
    # Select 1 hour
    page.select_option("#flat-duration-section .time-select:nth-child(1)", index=1)

    page.click("#btn-next-to-schedule")

    # Verify Step 3 Loaded
    print("Verifying Step 3 UI...")
    expect(page.locator("h2:text('When do you offer it?')")).to_be_visible()

    # Verify Timezone Display
    tz_text = page.locator("#current-timezone-text")
    expect(tz_text).to_contain_text("GST - Dubai Time")

    # Verify Edit Timezone
    print("Testing Timezone Editor...")
    page.click("#btn-edit-timezone")
    expect(page.locator("#timezone-editor")).to_be_visible()
    expect(page.locator("#timezone-display")).to_be_hidden()

    # Select different timezone
    page.select_option("#timezone-select", "EST - Eastern Standard Time (UTC -5:00)")
    page.click("#btn-save-timezone")

    # Verify Save
    expect(page.locator("#timezone-editor")).to_be_hidden()
    expect(page.locator("#timezone-display")).to_be_visible()
    expect(tz_text).to_contain_text("EST - Eastern Standard Time")

    # Verify Days
    print("Testing Day Selection...")
    expect(page.locator("#day-mon")).to_be_visible()
    page.check("#day-mon")
    page.check("#day-wed")
    expect(page.locator("#day-mon")).to_be_checked()
    expect(page.locator("#day-tue")).not_to_be_checked()
    expect(page.locator("#day-wed")).to_be_checked()

    # Verify Next Button
    print("Testing Navigation to Step 4...")
    page.click("#btn-next-to-method")

    # Verify Step 4 Navigation
    # Since Step 4 logic in script.js (goToStep(4)) should trigger:
    # 1. Hide Step 3 content
    # 2. Show Step 4 content (if it exists) OR
    # 3. Update Sidebar to Step 4 active

    # The current HTML has: <li class="step-item disabled">... <span class="step-text">Method</span> ...</li>
    # Its ID is likely not explicit in HTML but JS logic infers it.
    # Looking at `goToStep` logic (which I haven't seen fully but can infer), it likely iterates steps.
    # The sidebar items are `nav-step-1`, `nav-step-2`. Step 4 should be `nav-step-4` if the pattern holds.
    # Let's check if `nav-step-4` exists in HTML.

    # I read the HTML file, and I see:
    # <li class="step-item disabled"> <div class="step-circle">4</div> ... </li>
    # It does NOT have an ID "nav-step-4" explicitly in the HTML I read?
    # Wait, let me check the HTML again.

    # HTML:
    # <li class="step-item disabled">
    #   <div class="step-circle">4</div>
    #   <span class="step-text">Method</span>
    #   <span class="step-time">1 MIN</span>
    # </li>

    # Ah! Step 1 and 2 have IDs `nav-step-1` and `nav-step-2`. Step 3, 4, etc. DO NOT have IDs in the HTML I read.
    # This is why the test fails. The JS `goToStep` logic probably adds the class `active` to the `li` element based on index or querySelector, but my test is looking for an ID that doesn't exist.

    # I need to fix the verification script to target the element correctly (e.g. by text "Method" or nth-child).

    expect(page.locator(".wizard-steps li:nth-child(4)")).to_have_class(re.compile(r"active"))

    print("Verification Successful!")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
