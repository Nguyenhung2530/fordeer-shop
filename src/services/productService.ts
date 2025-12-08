/*** Xử lý sản phẩm - lấy danh sách, danh mục ***/

const API_URL = import.meta.env.VITE_API_URL;

export interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  description?: string;
  productUrl?: string;
}

/**
 * Lấy danh sách sản phẩm public
 */
const getProducts = async (category = null) => {
  try {
    const params = new URLSearchParams();
    params.append("limit", "50");
    if (category) {
      params.append("category", category);
    }

    const response = await fetch(
      `${API_URL}/api/products/public?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};

/**
 * Lấy danh sách danh mục từ sản phẩm
 */
const getCategories = async () => {
  try {
    const response = await getProducts();
    const categoryMap = new Map();

    response.data.forEach((product) => {
      const cat = product.category || "Khác";
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    });

    return Array.from(categoryMap.entries()).map(([label, count]) => ({
      label,
      count,
    }));
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};

export const productService = {
  getProducts,
  getCategories,
};
