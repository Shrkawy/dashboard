import { Backdrop, Button, Fade, makeStyles, Modal } from "@material-ui/core";
import { useState } from "react";
import AddProduct from "./AddProduct";

const existedValues = {
  productName: "Hello",
  category: "men",
  subCategory: "",
  price: 10,
  originalPrice: 15,
  stock: 20,
  description: "",
  tags: ["hello", "from", "the"],
  createdDate: new Date(),
  creator: "user1",
  images: [
    {
      url: "https://res.cloudinary.com/sharkawy/image/upload/v1622496794/wbltapeczz5ffqfessbe.jpg",
      name: "hello",
      size: 10251,
      id: "123456789",
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: theme.shape.borderRadius,
    width: "75vw",
    height: "70vh",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    "&::-webkit-scrollbar": {
      width: "0.4em",
      borderRadius: theme.shape.borderRadius,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
}));

const Settings = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div>
      Settings
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Open
        </Button>
        <Modal
          className={classes.container}
          open={open}
          onClose={() => setOpen(false)}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.modal}>
              <AddProduct passedValues={existedValues} />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
