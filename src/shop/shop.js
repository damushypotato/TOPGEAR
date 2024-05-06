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
    const items = filteredProducts.filter(product => product.category === category);
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
        item.className = 'shop_item';
        const name = document.createElement('h3');
        name.textContent = product.name;
        item.appendChild(name);
        const image = document.createElement('img');
        image.src = product.image;
        item.appendChild(image);
        const category = document.createElement('p');
        category.textContent = product.category;
        item.appendChild(category);
        const description = document.createElement('p');
        description.textContent = product.description;
        item.appendChild(description);
        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        item.appendChild(price);

        shop.appendChild(item);
    }
}
