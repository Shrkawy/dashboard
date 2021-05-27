import * as yup from "yup";
import { Button, Grid, Typography } from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";

import { useForm } from "../hooks/form-hook";
import { Categories, SubCategories } from "../data/Categories";
import Paper from "../compnoants/UI/Paper";
import ImagePicker from "../compnoants/form/ImagePicker/ImagePicker";
import Select from "../compnoants/form/Select";
import Input from "../compnoants/form/Input";
import Draft from "../compnoants/form/Draft";
import Tags from "../compnoants/form/Tags";

const initValues = {
  productName: "",
  category: "",
  subCategory: "",
  price: 0,
  originalPrice: 0,
  stock: 0,
  description: "",
  tags: "",
  createdDate: new Date(),
  creator: "",
  images: [],
};

const schema = yup.object().shape({
  productName: yup.string("Required").required("Required"),
  category: yup.string("Required").required("Required"),
  subCategory: yup.string("Required").required("Required"),
  price: yup
    .number("price must be a number type")
    .required("Required")
    .positive("Positive values only"),
  originalPrice: yup
    .number("price must be a number type")
    .required("Required")
    .positive("Positive values only"),
  stock: yup.number().integer().positive().required(),
  createdDate: yup.date().default(() => new Date()),
  creator: yup.string().default(() => "user1"),
  images: yup.array().min(1).required(),
  description: yup.string().required(),
});

const AddProduct = (props) => {
  const {
    register,
    errors,
    control,
    handleSubmit,
    setImagesArray,
    setDescription,
    tags,
    setTags,
    images,
    setImages,
    onReset,
    onSubmit,
    description,
  } = useForm(initValues, schema);

  console.log("errors", errors);

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)}>
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
                setImagesArray={setImagesArray}
                images={images}
                setImages={setImages}
                helperText={
                  Boolean(errors.images) ? errors.images.message : false
                }
              />
              <input {...register("images")} style={{ display: "none" }} />
              <Draft
                description={description}
                setDescription={setDescription}
                helperText={Boolean(errors.description) ? "Required" : false}
              />
              <input {...register("description")} style={{ display: "none" }} />
            </Grid>
          </Paper>
        </Grid>

        {/* Box 2 */}

        <Grid item xs={12} lg={3}>
          <Paper variant="outlined" align="center">
            <Grid container spacing={4}>
              <Input
                name="productName"
                control={control}
                label="Product Name"
                error={Boolean(errors.productName)}
                helperText={
                  Boolean(errors.productName)
                    ? errors.productName.message
                    : false
                }
              />
              <Select
                id="category"
                name="category"
                control={control}
                label="Category"
                items={Categories}
                error={Boolean(errors.category)}
                helperText={
                  Boolean(errors.category) ? errors.category.message : false
                }
              />
              <Select
                id="subCategory"
                name="subCategory"
                control={control}
                label="Sub category"
                items={SubCategories}
                error={Boolean(errors.subCategory)}
                helperText={
                  Boolean(errors.subCategory)
                    ? errors.subCategory.message
                    : false
                }
              />
              <Input
                icon={<AttachMoney fontSize="small" />}
                name="price"
                control={control}
                label="Selling Price"
                placeholder="0.00"
                error={Boolean(errors.price)}
                helperText={
                  Boolean(errors.price) ? errors.price.message : false
                }
              />
              <Input
                icon={<AttachMoney fontSize="small" />}
                name="originalPrice"
                control={control}
                label="Original Price"
                placeholder="0.00"
                error={Boolean(errors.originalPrice)}
                helperText={
                  Boolean(errors.originalPrice)
                    ? errors.originalPrice.message
                    : false
                }
              />
              <Input
                name="stock"
                control={control}
                label="In stock"
                placeholder="0"
                error={Boolean(errors.stock)}
                helperText={
                  Boolean(errors.stock) ? errors.stock.message : false
                }
              />
              <Grid item xs={12}>
                <Tags tags={tags} setTags={setTags} />
                <input {...register("tags")} style={{ display: "none" }} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="reset"
                variant="text"
                color="secondary"
                onClick={onReset}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddProduct;
