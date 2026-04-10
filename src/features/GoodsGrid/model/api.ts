const PRODUCTS_URL: string = "https://dummyjson.com/products";

export interface Product {
  price: number;
  sku: string;
  rating: number;
  brand: string;
  title: string;
  id: number;
  category: string;
}

export interface ProductsData {
  goods: Product[];
  total: number;
}

export const getProducts = async (
  skip: number = 0,
  search: string = "",
  sortBy?: string | null,
  order?: "asc" | "desc" | null,
): Promise<ProductsData | null> => {
  const limit = 20;
  try {
    let url = `${PRODUCTS_URL}${search ? `/search?q=${search}&` : "?"}limit=${limit}&skip=${skip}`;
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok || !data || !data.products) {
      throw new Error(data.message);
    }

    return {
      goods: data.products.map(
        ({ price, sku, rating, brand, title, id, category }: Product) => ({
          price,
          sku,
          rating,
          brand,
          title,
          id,
          category,
        }),
      ),

      total: data.total,
    };
  } catch {
    return null;
  }
};
