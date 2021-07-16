export const getDialogItemObject = (orders, products, customers) => {
  if (orders) {
    return {
      ID: null,
      Discount: null,
      "Original Price": null,
      "Final Price": null,
      Status: null,
      "Created At": null,
      "Last Update": null,
    };
  }

  if (products) {
    return {
      ID: null,
      "Product Name": null,
      Categoty: null,
      "Sub Category": null,
      Price: null,
      OriginalPrice: null,
      Revinue: this.Price - this.OriginalPrice,
      Stock: null,
      Sold: null,
      Description: null,
      "Created At": null,
      "Last Update": null,
    };
  }

  if (customers) {
    return {
      ID: null,
      Email: null,
      Phone: null,
      "First Name": null,
      "Last Name": null,
      Country: null,
      State: null,
      "Adress 1": null,
      "Adress 2": null,
      "Zip Code": null,
      "Created At": null,
      "Last Update": null,
    };
  }

  return {};
};
