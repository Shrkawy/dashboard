import { forwardRef } from "react";
import * as yup from "yup";
import { Button, Grid, Typography } from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";

import { useForm } from "../hooks/form-hook";
import { Categories, SubCategories } from "../data/Categories";
import Paper from "../compnoants/UI/Paper";
import ImagePicker from "../compnoants/form/ImagePicker";
import Select from "../compnoants/form/Select";
import Input from "../compnoants/form/Input";
import Draft from "../compnoants/form/Draft";
import Tags from "../compnoants/form/Tags";
import { FormProvider } from "react-hook-form";

const initValues = {
  productName: "",
  category: "",
  subCategory: "",
  price: 0,
  originalPrice: 0,
  stock: 0,
  description: "",
  tags: [],
  images: [],
  createdDate: new Date(),
  creator: "user1",
};

const schema = yup.object().shape({
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

const AddProduct = forwardRef((props, ref) => {
  const { passedValues } = props;
  const methods = useForm(!passedValues ? initValues : passedValues, schema);

  return (
    <FormProvider {...methods}>
      <Paper
        component="form"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        <Grid container spacing={5}>
          {/* Title */}

          <Grid item xs={12}>
            <Typography variant="h6">Add Product</Typography>
          </Grid>

          {/* Box 1 */}

          <Grid item xs={12} lg={9}>
            <Paper variant="outlined" align="center">
              <Grid container spacing={3}>
                <ImagePicker
                  setImagesArray={methods.setImagesArray}
                  images={methods.images}
                  setImages={methods.setImages}
                  helperText={
                    Boolean(methods.errors.images)
                      ? methods.errors.images.message
                      : false
                  }
                />
                <input
                  {...methods.register("images")}
                  style={{ display: "none" }}
                />
                <Draft
                  description={methods.description}
                  setDescription={methods.setDescription}
                  helperText={
                    Boolean(methods.errors.description) ? "Required" : false
                  }
                />
                <input
                  {...methods.register("description")}
                  style={{ display: "none" }}
                />
              </Grid>
            </Paper>
          </Grid>

          {/* Box 2 */}

          <Grid item xs={12} lg={3}>
            <Paper variant="outlined" align="center">
              <Grid container spacing={4}>
                <Input
                  name="productName"
                  control={methods.control}
                  label="Product Name"
                  error={Boolean(methods.errors.productName)}
                  helperText={
                    Boolean(methods.errors.productName)
                      ? methods.errors.productName.message
                      : false
                  }
                />
                <Select
                  id="category"
                  name="category"
                  control={methods.control}
                  value={methods.getValues("category")}
                  label="Category"
                  items={Categories}
                  error={Boolean(methods.errors.category)}
                  helperText={
                    Boolean(methods.errors.category)
                      ? methods.errors.category.message
                      : false
                  }
                />
                <Select
                  id="subCategory"
                  value={methods.getValues("subCategory")}
                  name="subCategory"
                  control={methods.control}
                  label="Sub category"
                  items={SubCategories}
                  error={Boolean(methods.errors.subCategory)}
                  helperText={
                    Boolean(methods.errors.subCategory)
                      ? methods.errors.subCategory.message
                      : false
                  }
                />
                <Input
                  icon={<AttachMoney fontSize="small" />}
                  name="price"
                  control={methods.control}
                  label="Selling Price"
                  placeholder="0.00"
                  error={Boolean(methods.errors.price)}
                  helperText={
                    Boolean(methods.errors.price)
                      ? methods.errors.price.message
                      : false
                  }
                />
                <Input
                  icon={<AttachMoney fontSize="small" />}
                  name="originalPrice"
                  control={methods.control}
                  label="Original Price"
                  placeholder="0.00"
                  error={Boolean(methods.errors.originalPrice)}
                  helperText={
                    Boolean(methods.errors.originalPrice)
                      ? methods.errors.originalPrice.message
                      : false
                  }
                />
                <Input
                  name="stock"
                  control={methods.control}
                  label="In stock"
                  placeholder="0"
                  error={Boolean(methods.errors.stock)}
                  helperText={
                    Boolean(methods.errors.stock)
                      ? methods.errors.stock.message
                      : false
                  }
                />
                <Grid item xs={12}>
                  <Tags tags={methods.tags} setTags={methods.setTags} />
                  <input
                    {...methods.register("tags")}
                    style={{ display: "none" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="reset"
                  variant="text"
                  color="secondary"
                  onClick={methods.onReset}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={methods.isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
});

export default AddProduct;
