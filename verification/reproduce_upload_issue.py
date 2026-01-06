from playwright.sync_api import sync_playwright
import os
import json

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Path to create_online_service.html
    file_path = os.path.abspath("Project 2/create_online_service.html")
    page.goto(f"file://{file_path}")

    # 1. Fill Step 1
    page.fill("#service-title", "Test Service With Image")
    page.fill("#service-description", "This is a test service description that is long enough.")

    # 2. Upload Image
    img_path = os.path.abspath("Project 2/Images/updated_service_1.jpg")
    page.set_input_files("#file-input", img_path)

    # 3. Handle Upload Modal
    page.wait_for_selector("#upload-modal")
    page.click("#btn-confirm-upload")
    page.wait_for_function("document.getElementById('upload-modal').classList.contains('hidden')")

    # Wait for Preview to update
    page.wait_for_function("document.getElementById('preview-image-div').style.backgroundImage.includes('url')")

    # 4. Navigate through wizard
    page.click("#btn-next-to-price")

    # Select 1 Hour for Min Duration
    page.select_option("#hourly-duration-section .duration-inputs .form-group:nth-child(1) select:nth-child(1)", "1")

    # Select 2 Hours for Max Duration
    page.select_option("#hourly-duration-section .duration-inputs .form-group:nth-child(2) select:nth-child(1)", "2")

    page.click("#btn-next-to-schedule")
    page.click("#btn-next-to-method")
    page.click("#btn-next-to-addons")
    page.click("#btn-next-to-duration")

    page.click("#duration-ongoing")
    page.click("#btn-next-to-notifications")

    # 5. Create Service
    page.click("#btn-create-service")

    # 6. Wait for redirection
    page.wait_for_url("**/service_finish.html")

    # 7. Check LocalStorage
    new_service_data = page.evaluate("localStorage.getItem('newServiceData')")
    data = json.loads(new_service_data)
    image_data = data.get('image', '')
    print(f"Saved Image Data Length: {len(image_data)}")
    print(f"Saved Image Data Start: {image_data[:50]}...")

    # 8. Go to Services Page
    services_path = os.path.abspath("Project 2/services.html")
    page.goto(f"file://{services_path}")

    # 9. Check if Card exists and has background
    card_xpath = "//h4[contains(@class, 'service-card-title') and text()='Test Service With Image']/ancestor::div[contains(@class, 'service-card-item')]"

    # Wait for render
    page.wait_for_selector(".service-card-item")

    if page.locator(card_xpath).count() > 0:
        card = page.locator(card_xpath).first
        img_area = card.locator(".card-image-area")
        bg_style = img_area.evaluate("el => el.style.backgroundImage")
        print(f"Service Card Background Style: {bg_style[:100]}...")

        if "data:image" in bg_style:
             print("SUCCESS: Image rendered correctly on Services page (Data URL preserved).")
        elif "updated_service" in bg_style:
             print("WARNING: Fallback image rendered.")
        else:
             print("FAILURE: No image url found.")
    else:
        print("FAILURE: Card not found.")

    # Screenshot
    page.screenshot(path="verification/upload_fix_verified.png", full_page=True)

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
