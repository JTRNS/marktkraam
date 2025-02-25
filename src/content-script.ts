import { throttle } from "./utils.js";

const RESULTS_PER_PAGE = 21;

const PROCESSED_ITEMS = new WeakSet<HTMLElement>();

async function handlePageUpdate() {
  const listings =
    document.querySelectorAll<HTMLUListElement>("ul.hz-Listings");
  for (let i = 0; i < listings.length; i++) {
    const list = listings[i];
    if (!list) continue;
    const items = list.children;
    let promotedListingCount = 0;
    for (let j = 0; j < items.length; j++) {
      const element = items.item(j);
      if (element instanceof HTMLElement === false) {
        continue;
      }
      if (PROCESSED_ITEMS.has(element)) {
        break;
      }
      PROCESSED_ITEMS.add(element);

      // Hide promoted listings
      if (isPromotedListing(element)) {
        element.style.display = "none";
        promotedListingCount++;
      }
    }
    if (promotedListingCount >= RESULTS_PER_PAGE) {
      const nextButton = document.querySelector(
        ".hz-PaginationControls-pagination a:last-child"
      );
      if (nextButton instanceof HTMLAnchorElement) {
        nextButton.click();
      }
    }
  }
}

function isPromotedListing(listing: HTMLElement): boolean {
  const priority = listing.querySelector(".hz-Listing-priority");
  return (
    priority !== null &&
    priority.textContent !== null &&
    priority.textContent.trim() === "Dagtopper"
  );
}

const throttledUpdate = throttle(handlePageUpdate, 250);
const observer = new MutationObserver(throttledUpdate);
observer.observe(document.head, {
  childList: true,
});
