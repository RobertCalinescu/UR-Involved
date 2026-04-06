document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchSortFilterForm");
  const clubContainer = document.getElementById("club-container");

  if (form && clubContainer) {
    
    // FIX: Listen to the whole document since inputs are physically outside the form tag
    document.addEventListener("input", (e) => {
      // Check if the specific input they clicked/typed in belongs to our form
      if (e.target.form === form) {
        fetchAndUpdateClubs();
      }
    });

    // Prevent page reload if they hit "Enter" in the text box
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetchAndUpdateClubs();
    });

    async function fetchAndUpdateClubs() {
      const formData = new FormData(form);
      const params = new URLSearchParams(formData);

      try {
        const response = await fetch(`/partials/clubs?${params.toString()}`);
        const htmlChunk = await response.text();

        clubContainer.innerHTML = htmlChunk;
        window.history.replaceState({}, '', `/?${params.toString()}`);

      } catch (error) {
        console.error("Error updating clubs:", error);
      }
    }
  }
});