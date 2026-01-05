from playwright.sync_api import sync_playwright

def generate_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set a larger viewport to ensure everything fits
        page = browser.new_page(viewport={'width': 1280, 'height': 1200})

        # Load the page
        page.goto("file://" + "/app/Project 2/create_online_service.html")

        # Step 1 Screenshot
        page.screenshot(path="/home/jules/verification/step1.png")

        # Click Next
        page.click("#btn-next-to-price")

        # Toggle Cash Payments to show full UI
        print("Clicking toggle...")
        page.click("label[for='toggle-cash-payments']", force=True)

        # Wait for the options to appear
        print("Waiting for container...")
        page.wait_for_selector("#cash-options-container", state="visible")

        # Check if checkbox is checked
        is_checked = page.is_checked("#toggle-cash-payments")
        print(f"Checkbox checked: {is_checked}")

        # Check visibility of container
        is_visible = page.is_visible("#cash-options-container")
        print(f"Container visible: {is_visible}")

        # Step 2 Screenshot (Price + Cash Options)
        print("Taking screenshot...")
        page.screenshot(path="/home/jules/verification/verification.png", full_page=True)

        print("Screenshots generated.")
        browser.close()

if __name__ == "__main__":
    generate_screenshot()
