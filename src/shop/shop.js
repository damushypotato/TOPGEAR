import catalogue from '../../assets/catalogue.json' assert { type: 'json' };
const { products } = catalogue;

const categories = [
    'Engine',
    'Exhaust',
    'Suspension',
    'Bodykits',
    'Brakes',
    'Gear',
    'Drivetrain',
    'Misc',
    'Cooling',
    'Lighting',
];

let filteredProducts = products;

function setFilteredList(p, s) {
    filteredProducts = p;
    renderProducts(filteredProducts, s);
}

const shop = document.querySelector('.shop');

const search = document.getElementById('search');
search.addEventListener('input', searchProducts);

const filter = document.getElementById('filter');
filter.add(new Option('All', 'All'));
categories.forEach(c => filter.add(new Option(c, c)));
filter.value = 'All';
filter.addEventListener('change', e => {
    const category = e.target.value;
    if (category === 'All') {
        setFilteredList(products);
        return;
    }
    const items = products.filter(product => product.category === category);
    setFilteredList(items, sort.value);
});

const sort = document.getElementById('sort');
sort.addEventListener('change', () => renderProducts(filteredProducts, sort.value));

renderProducts(filteredProducts, sort.value);

function searchProducts(input) {
    const query = input.target.value.toLowerCase();
    const items = products.filter(
        product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
    );

    const filtered = items.filter(i => i.category === filter.value || filter.value === 'All');

    setFilteredList(filtered, sort.value);
}

function clearProducts() {
    shop.innerHTML = '';
}

function renderProducts(_p, _s) {
    clearProducts();

    if (_s === 'asc') {
        _p.sort((a, b) => a.price - b.price);
    } else if (_s === 'des') {
        _p.sort((a, b) => b.price - a.price);
    } else if (_s === 'rel') {
        _p.sort((a, b) => a.name.localeCompare(b.name));
    }

    for (const product of _p) {
        const item = document.createElement('div');
        const info = document.createElement('div');
        const details = document.createElement('div');
        const image = document.createElement('img');
        const name = document.createElement('h3');
        const category = document.createElement('p');
        const price = document.createElement('p');

        item.className = 'shop_item';
        info.className = 'shop_item_info';
        details.className = 'shop_item_details';
        price.className = 'shop_item_price';
        category.className = 'shop_item_category';

        image.src = product.image;
        item.appendChild(image);

        name.textContent = product.name;
        info.appendChild(name);

        price.textContent = `$${product.price.toFixed(2)}`;
        details.appendChild(price);

        category.textContent = product.category;
        details.appendChild(category);

        info.appendChild(details);

        item.appendChild(info);

        shop.appendChild(item);
    }
}
