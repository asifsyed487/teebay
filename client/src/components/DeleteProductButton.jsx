import { useMutation } from "@apollo/client";
import { useState } from "react";
import Decoder from "jwt-decode";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT } from "../mutations/productMutations";
import { GET_MY_PRODUCTS } from "../queries/productQueries";

const DeleteProductButton = ({ productId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = localStorage.usertoken_hash;
  const decodedData = Decoder(token);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    variables: { product_unique_id: productId },
    onCompleted: () => navigate("/myproducts"),
    update(cache, { data: { deleteProduct } }) {
      const { myproducts } = cache.readQuery({
        query: GET_MY_PRODUCTS,

        variables: {
          user_unique_id: decodedData.user_unique_id,
        },
      });
      cache.writeQuery({
        query: GET_MY_PRODUCTS,
        variables: {
          user_unique_id: decodedData.user_unique_id,
        },

        data: {
          myproducts: myproducts.filter(
            (product) =>
              product.product_unique_id !== deleteProduct.product_unique_id
          ),
        },
      });
    },
  });

  const initModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <i className="ui large trash link icon" onClick={initModal}></i>
      <Modal
        aria-labelledby="contained-modal-title-vcenter close"
        centered
        show={open}
      >
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Are you sure you want to delete this product?</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteProduct().then((res) => {
                console.log(res);
                initModal();
              });
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductButton;
