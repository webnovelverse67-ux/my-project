from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Seed localStorage with services that have missing/invalid images
    # Service 1: Image "none" (should trigger fallback)
    # Service 2: Image "undefined" (should trigger fallback)
    # Service 3: Image empty string (should trigger fallback)
    # Service 4: Valid image (control)

    init_script = """
    const services = [
        { id: 1, title: 'Service One (No Img)', description: 'Should have fallback 1', price: '100', isHourly: true, image: 'none' },
        { id: 2, title: 'Service Two (Undef)', description: 'Should have fallback 2 (based on ID/Title)', price: '200', isHourly: false, image: 'undefined' },
        { id: 3, title: 'Service Three (Empty)', description: 'Should have fallback', price: '300', isHourly: true, image: '' },
        { id: 4, title: 'Service Four (Valid)', description: 'Should have original', price: '400', isHourly: false, image: 'url("Images/bookme logo.png")' }
    ];
    localStorage.setItem('allServices', JSON.stringify(services));
    """

    page.add_init_script(init_script)

    # Convert local path to file URL
    file_path = os.path.abspath("Project 2/services.html")
    page.goto(f"file://{file_path}")

    # Wait for the list to render
    page.wait_for_selector(".service-card-item")

    # Take screenshot
    page.screenshot(path="verification/service_images_verification.png", full_page=True)

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
