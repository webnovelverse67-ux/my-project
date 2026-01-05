from playwright.sync_api import sync_playwright

def verify_navigation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Test 1: Dashboard -> Create Online Service
        page = browser.new_page()
        page.goto("file://" + "/app/Project 2/dashboard.html")

        # Find the Select button for Online Service
        # In dashboard, it's the first .service-card button
        # Or I can look for text "Online Service" parent
        print("Testing Dashboard navigation...")

        # Wait for the button to be visible
        # Using a text selector or css selector relative to "Online Service"
        # The card h4 is "Online Service". The button is a sibling.
        # But text="Select" is generic.
        # Let's use CSS: .service-card:has(h4:text("Online Service")) button

        # Playwright pseudo-class :has is supported
        page.click(".service-card:has(h4:text('Online Service')) button")

        # Check URL or title or content
        if "create_online_service.html" in page.url:
            print("Dashboard -> Create Online Service: Success")
        else:
            print(f"Dashboard -> Create Online Service: Failed. URL is {page.url}")

        page.close()

        # Test 2: Services -> Create Online Service
        page = browser.new_page()
        page.goto("file://" + "/app/Project 2/services.html")

        print("Testing Services navigation...")
        # Structure is .service-create-card -> .service-card-header -> h3:text("Online Service")
        # Button is sibling of header

        page.click(".service-create-card:has(h3:text('Online Service')) button")

        if "create_online_service.html" in page.url:
             print("Services -> Create Online Service: Success")
        else:
             print(f"Services -> Create Online Service: Failed. URL is {page.url}")

        page.close()
        browser.close()

if __name__ == "__main__":
    verify_navigation()
