import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions} from "@mui/material";
import {useParams} from "react-router-dom";
import {useProductById} from "../../hooks/useProducts";
import {LoaderComponent} from "../LoaderComponent/LoaderComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

import "./ItemDetailContainer.css";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const ItemDetailContainerComponent = () => {
  const {itemId} = useParams();
  const {cart, setCart} = useContext(CartContext);
  const {product, isLoading, error} = useProductById(itemId);

  const addToCart = () => {
    let cartProduct = cart.find((product) => product.id === itemId);
    if (cartProduct) {
      cartProduct.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...{id: product.id, price: product.price, title: product.title, image: product.image}, quantity: 1 }]);
    }
  }

  return isLoading ? (
    <LoaderComponent />
  ) : error ? (
    <ErrorComponent />
  ) : (
    <div className="item-detail-container">
      <Card sx={{maxWidth: "40%"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            src={product.image}
            alt={product.title}
            sx={{objectFit: "contain"}}
          />
          <CardContent sx={{height: "content-fit"}}>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={addToCart}>
            Agregar al carrito
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
