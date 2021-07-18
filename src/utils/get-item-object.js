export const getDialogItemObject = (item, itemData) => {
  const { products, orders, customers } = item;

  if (orders) {
    return {
      ID: itemData._id,
      Customer: `${itemData.customer.firstName} ${itemData.customer.lastName}`,
      Discount: itemData.discount,
      "Original Price": itemData.originalPrice,
      "Final Price": itemData.finalPrice,
      Status: itemData.status,
      "Created At": itemData.createdAt,
      "Last Update": itemData.updatedAt,
    };
  }

  if (products) {
    return {
      ID: itemData.id,
      "Product Name": itemData.productName,
      images: itemData.images,
      Category: itemData.category,
      "Sub Category": itemData.subCategory,
      Price: itemData.price,
      OriginalPrice: itemData.originalPrice,
      Revinue: `${itemData.price - itemData.originalPrice}`,
      Stock: itemData.stock,
      Sold: itemData?.sold,
      "Created At": itemData.createdAt,
      "Last Update": itemData.updatedAt,
    };
  }

  if (customers) {
    return {
      ID: itemData.id,
      Email: itemData.email,
      Phone: itemData.phone,
      "First Name": itemData.firstName,
      "Last Name": itemData.lastName,
      Country: itemData.country,
      State: itemData.state,
      "Address 1": itemData.address1,
      "Address 2": itemData.address2 ? itemData.address2 : "not found",
      "Zip Code": itemData.zipCode,
      "Created At": itemData.createdAt,
      "Last Update": itemData.updatedAt,
    };
  }

  return {};
};
