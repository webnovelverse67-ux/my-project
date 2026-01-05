
import os
import sys
from playwright.sync_api import sync_playwright

def verify_step4():
    cwd = os.getcwd()
    file_path = f"file://{cwd}/Project 2/create_online_service.html"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(file_path)

        print("Navigating to Step 4...")

        # Step 1: Fill mandatory
        page.fill('#service-title', 'Test Service Title')
        page.fill('#service-description', 'This is a description that is long enough for validation.')
        page.click('#btn-next-to-price')

        # Step 2: Set Duration (Mandatory)
        # By default we are on Hourly.
        # We need to set Minimum Duration (first row) and Maximum Duration (second row).
        # We must select an option > 0.

        # The selects are:
        # #hourly-duration-section .time-select-row:nth-child(1) select:nth-child(1) (Min Hours)
        # #hourly-duration-section .time-select-row:nth-child(1) select:nth-child(2) (Min Mins)
        # #hourly-duration-section .time-select-row:nth-child(2) select:nth-child(1) (Max Hours)
        # ...

        # Actually structure is:
        # .duration-inputs
        #   .form-group (Min)
        #     .time-select-row
        #        select (Hours)
        #        select (Mins)
        #   .form-group (Max)
        #     .time-select-row
        #        select (Hours)
        #        select (Mins)

        # Select 1 hour for Minimum Duration
        page.select_option('#hourly-duration-section .form-group:nth-child(1) .time-select-row select:nth-child(1)', '1')

        # Select 2 hours for Maximum Duration
        page.select_option('#hourly-duration-section .form-group:nth-child(2) .time-select-row select:nth-child(1)', '2')

        # Click next
        page.click('#btn-next-to-schedule')

        # Step 3: Check visibility
        if page.is_hidden('#step-3-content'):
             print("Failed to reach Step 3. Dumping Step 2 state.")
             # print(page.content())
             raise Exception("Failed to reach Step 3")

        # Step 3 Next
        page.click('#btn-next-to-method')

        # Check if we are on Step 4
        assert not page.is_hidden('#step-4-content'), "Step 4 should be visible"

        print("Checking Default State...")
        # Built-in should be selected by default
        assert "selected" in page.get_attribute('#card-builtin', 'class'), "Built-in card should be selected"
        assert page.is_hidden('#custom-method-details'), "Custom details should be hidden"

        print("Testing Interaction: Click Custom Method...")
        page.click('#card-custom')

        assert "selected" in page.get_attribute('#card-custom', 'class'), "Custom card should be selected"
        assert not "selected" in page.get_attribute('#card-builtin', 'class'), "Built-in card should NOT be selected"
        assert not page.is_hidden('#custom-method-details'), "Custom details should be visible"

        print("Testing Dropdown Logic: Phone Number...")
        page.select_option('#custom-method-select', 'Phone Number')

        assert not page.is_hidden('#custom-input-container'), "Input container should be visible"
        label_text = page.inner_text('#custom-input-label')
        assert "Phone Number" in label_text, f"Label should be 'Phone Number*', got {label_text}"

        input_type = page.get_attribute('#custom-input-field', 'type')
        assert input_type == 'tel', f"Input type should be 'tel', got {input_type}"

        print("Testing Dropdown Logic: Zoom...")
        page.select_option('#custom-method-select', 'Zoom')

        label_text_zoom = page.inner_text('#custom-input-label')
        assert "Link" in label_text_zoom, f"Label should be 'Link*', got {label_text_zoom}"

        input_type_zoom = page.get_attribute('#custom-input-field', 'type')
        assert input_type_zoom == 'text', f"Input type should be 'text', got {input_type_zoom}"

        print("Testing Validation (Next Button)...")
        # Clear input to trigger validation
        page.fill('#custom-input-field', '')

        # Try empty input
        page.click('#btn-next-to-addons')

        # Alert handling is tricky in sync without handler, but let's check if we stayed on page
        assert not page.is_hidden('#step-4-content'), "Should still be on Step 4 due to validation error"

        # Fill input
        page.fill('#custom-input-field', 'https://zoom.us/j/123456')

        # Click Next again
        page.click('#btn-next-to-addons')

        # Should navigate to Step 5 (placeholder) or just hide Step 4
        assert page.is_hidden('#step-4-content'), "Step 4 should be hidden after valid submission"

        print("Verification Passed!")
        browser.close()

if __name__ == "__main__":
    verify_step4()
