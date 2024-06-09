function searchClick() {
    const searchTerm = document.getElementById('globalSearchTerm').value;
    if (!searchTerm) {
        return false;
    }

    window.location.href = "/Items/List?searchTerm=" + searchTerm;
    return false;
}