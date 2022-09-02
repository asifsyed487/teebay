import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RENT_PRODUCT } from "../mutations/productMutations";

const RentProduct = ({ user, product }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rentalPeriodEnds, setRentalPeriodEnds] = useState("");
  const [rentalPeriodStarts, setRentalPeriodStarts] = useState("");
  const [addRent] = useMutation(RENT_PRODUCT, {
    variables: {
      lenter_id: product.user.user_unique_id,
      borrower_id: user,
      product_unique_id: product.product_unique_id,
      rental_period_starts: rentalPeriodStarts,
      rental_period_ends: rentalPeriodEnds,
    },
    onCompleted: () => navigate("/history"),
  });
  const initModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <button className="ui primary button" onClick={initModal}>
        Rent
      </button>
      <Modal
        aria-labelledby="contained-modal-title-vcenter close"
        centered
        show={open}
      >
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>
            <h1>Rental Period</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="content"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="field">
              <label>From</label>
              <input
                className="form-control block"
                type="date"
                name="rental_period_starts"
                onChange={(e) => {
                  setRentalPeriodStarts(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>To</label>
              <input
                className="form-control"
                type="date"
                name="rental_period_ends"
                onChange={(e) => {
                  setRentalPeriodEnds(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addRent(
                product.user.user_unique_id,
                user,
                product.product_unique_id,
                rentalPeriodStarts,
                rentalPeriodEnds
              ).then((res) => {
                console.log(res);
                initModal();
              });
            }}
          >
            Confirm Rent
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentProduct;
