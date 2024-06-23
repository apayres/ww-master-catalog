function searchClick() {
    const searchTerm = document.getElementById('globalSearchTerm').value;
    if (!searchTerm) {
        return false;
    }

    window.location.href = "/Items/Index?searchTerm=" + searchTerm;
    return false;
}