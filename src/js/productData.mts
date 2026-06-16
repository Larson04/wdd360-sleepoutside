const baseURL = import.meta.env.PUBLIC_SERVER_URL;
import type {Product} from "./types.mts"
function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProducts(category = "tents") {
  return await fetch(baseURL + `products?category=${category}`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id:string) {
  try {
    const response = await fetch(baseURL + `products/${id}`);
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const product = await convertToJson(response) as Product;
    if(!product || product === null) {
      throw new Error(`Product is undefined or null`);
    }
    console.log("Here is the product:", product)
    return product;
  } catch (error: any) {
    console.log("findProductById caught an error", error, "Error Message", error.message);
  }
}

export async function searchProducts(query:string) {
  const response = await fetch(baseURL + `products/search/${query}`);
  console.log("response", response);
  const products = await convertToJson(response) as Product[];
  console.log(products);
  return products;
}
