const _color_blue = '#0069D9'
const _color_red = '#C82332'
const _color_green = '#218838'

export default class DropdownButton {
    el;
    onItemClick;
    constructor(text, color, items, onItemClick, onTagListInputChange) {
        this.onItemClick = onItemClick;
        this.el = document.createElement('div');
        this.el.classList.add('btn-group');
        this.el.innerHTML = `
        <button
        type="button"
        class="btn btn-${color} dropdown-toggle filter-tag"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">${text}</button>
        `;

        const dropdownMenuEl = document.createElement('div');
        dropdownMenuEl.classList.add('dropdown-menu');
       

        const container = document.createElement('div');
        container.classList.add('container-dropdown');


        switch (color) {
            case 'primary':
                container.style.backgroundColor = _color_blue;
                break;
            case 'danger':
                container.style.backgroundColor = _color_red;
                break;
            case 'success':
                container.style.backgroundColor = _color_green;
                break;
            default:
        }

        const searchTagInput = document.createElement('input');
        searchTagInput.classList.add('form-control');
        searchTagInput.classList.add('search-tag-input');
        searchTagInput.setAttribute('type', 'text');
        searchTagInput.setAttribute('placeholder', 'Recherche un ingredient');
        searchTagInput.addEventListener('keyup', (e) => {
            onTagListInputChange(e.target.value.trim());
        });
        container.appendChild(searchTagInput);
        dropdownMenuEl.appendChild(container);

        this.el.appendChild(dropdownMenuEl);

        this.updateOptionList(items);
    }

    updateOptionList(items) {
        const container = this.el.querySelector('div.container-dropdown');
        container.querySelectorAll('.dropdown-item').forEach((element) => element.remove());
        items.forEach((item) => {
            const dropdownItemEl = document.createElement('a');
            dropdownItemEl.classList.add('dropdown-item');
            dropdownItemEl.innerHTML = item;
            dropdownItemEl.addEventListener('click', () => this.onItemClick(item));
            container.appendChild(dropdownItemEl);
        });
    }
}