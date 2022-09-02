import { useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { BUY_PRODUCT } from "../mutations/productMutations";

const BuyProduct = ({ product, user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [addBuy] = useMutation(BUY_PRODUCT, {
    variables: {
      buyer_id: user,
      seller_id: product.user.user_unique_id,
      product_unique_id: product.product_unique_id,
    },
    onCompleted: () => navigate("/history"),
  });

  const initModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <button className="ui primary button" onClick={initModal}>
        Buy
      </button>
      <Modal
        aria-labelledby="contained-modal-title-vcenter close"
        centered
        show={open}
      >
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Are you sure you want to buy this product?</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addBuy(
                user,
                product.user.user_unique_id,
                product.product_unique_id
              ).then((res) => {
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

export default BuyProduct;
