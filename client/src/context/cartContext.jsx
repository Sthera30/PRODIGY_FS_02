import { createContext, useContext, useState, useMemo} from "react";



const CartContext = createContext()


export function CartContextProvider({ children }) {

    const [food, setFood] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const [cart, setCart] = useState([])


    function addToCart(food) {

        const exist = cartItems.find((x) => x._id === food._id)

        if (exist) {
            setCartItems(
                cartItems.map((x) => x._id === food._id ? { ...exist, qty: exist.qty + 1 } : x)
            )
        }

        else {

            setCartItems(
                [...cartItems, { ...food, qty: 1 }]
            )

        }
        console.log('Cart after adding:', cartItems);


    }

    function removeFromCart(food) {

        const exist = cartItems.find((x) => x._id === food._id)

        if (exist.qty === 1) {
            setCartItems(
                cartItems.filter((x) => x._id !== food._id)
            )
        }

        else {
            setCartItems(
                cartItems.map((x) => x._id === food._id ? { ...exist, qty: exist.qty - 1 } : x)
            )
        }
        console.log('Cart after removing:', cartItems);

    }


    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
      }), [cartItems]);

    return (

        <CartContext.Provider value={contextValue}>

            {children}

        </CartContext.Provider>

    )    

}







export function useCartContext() {

    return useContext(CartContext)

}