import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
  {
    id: 'p1',
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!',
  },
  {
    id: 'p2',
    title: 'Test 2',
    price: 5,
    description: 'This is a second product - even more amazing!',
  },
  {
    id: 'p3',
    title: 'Test 3',
    price: 8,
    description: 'This is a third product - you will love it!',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
