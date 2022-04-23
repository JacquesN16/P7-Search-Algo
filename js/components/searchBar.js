export default class SearchBar {
    el;
    constructor(placeHolder, onChange) {
        this.el = document.createElement('div');
        this.el.classList.add('input-group');
        this.el.classList.add('search-input');
        this.el.classList.add('col-10');


        const searchInput = document.createElement('input');
        searchInput.classList.add('form-control');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', placeHolder);
        searchInput.addEventListener('keyup', (e) => {
            onChange(e.target.value);
        });
        this.el.appendChild(searchInput);

        const searchIcon = document.createElement('div');
        searchIcon.classList.add('input-group-append');
        searchIcon.innerHTML = `<span class="input-group-text" id="basic-addon2">
        <i class="fas fa-search"></i> </span>`;
        this.el.appendChild(searchIcon);
    }
}