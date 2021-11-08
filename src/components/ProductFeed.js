import Product from "./Product"

function ProductFeed({products}) { // Products Viene de las props del fetch

    return (
        <div>
            <h1>Products...</h1>

            {products.map(({id, title, price, description, category, image}) => ( // Mapeamos los products como product, desestructurando lo que nos interese, lo mandamos al subcomponente Product
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                />
            ))}
        </div>
    )
}

export default ProductFeed
