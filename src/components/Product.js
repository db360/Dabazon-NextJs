import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating] = useState(
    //   RANDOMIZAMOS EL NUMERO DE ESTRELLAS
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  return (
    <div>
      <p>{category}</p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4>{title}</h4>

      <div className="flex"> {/*Creamos un array, mapeando con el state de rating*/}
        {Array(rating)
          .fill()
          .map((_, i) => (
              <StarIcon className="h-5" />
          ))}
      </div>
    </div>
  );
}

export default Product;
