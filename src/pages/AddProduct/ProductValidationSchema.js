import * as yup from "yup";

export const schema = yup.object().shape({
  productName: yup.string("Required").required("Required"),
  category: yup.string("Required").required("Required"),
  subCategory: yup.string("Required").required("Required"),
  price: yup
    .number("Required")
    .typeError("you must specify a number")
    .required("Required")
    .positive("Positive values only")
    .default(0),
  originalPrice: yup
    .number("price must be a number type")
    .typeError("you must specify a number")
    .required("Required")
    .positive("Positive values only")
    .default(0),
  stock: yup
    .number("Required")
    .typeError("you must specify a number")
    .integer()
    .positive("Must be positive")
    .required()
    .default(0),
  createdDate: yup.date().default(() => new Date()),
  creator: yup.string().default(() => "user1"),
  images: yup.array().min(1).required(),
  description: yup.string().required(),
});
