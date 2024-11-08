import CartItem from './CartItem';
import { useGlobalConetext } from './context';

const CartContainer = () => {
  const { cart, clearCart, totalCost } = useGlobalConetext();
  const cartArr = Array.from(cart);

  if (cartArr.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArr.map((cartItem) => {
          const [id, value] = cartItem;

          return <CartItem key={id} id={id} {...value} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${totalCost}</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={() => clearCart()}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
