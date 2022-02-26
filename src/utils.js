const domain = "http://localhost:8080";


export const searchCatagory = (query) => {
  const authToken = localStorage.getItem("authToken");
  const searchStaysUrl = new URL(`${domain}/search/`);
  searchStaysUrl.searchParams.append("category", query.category);

  return fetch(searchStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search catagories");
    }
    return response.json();
  });
};

export const getCart = () => {
  const authToken = localStorage.getItem("authToken");
  const getCartUrl = `${domain}/cart/`;

  return fetch(getCartUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
    }
    return response.json();
  });
};

export const addToCart = (itemId) => {
  return fetch(`/order/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to add menu item to shopping cart");
    }
  });
};




