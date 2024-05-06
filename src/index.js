import catalogue from '../assets/catalogue.json' assert { type: 'json' };
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

const main = document.querySelector('main');

for (const category of categories) {
    const section = document.createElement('div');
    section.classList.add('category');
    main.appendChild(section);

    const title = document.createElement('h2');
    title.textContent = category;
    section.appendChild(title);

    const list = document.createElement('ul');
    section.appendChild(list);

    for (const product of products) {
        if (product.category === category) {
            const item = document.createElement('li');
            item.textContent = product.name;
            list.appendChild(item);
        }
    }
}
