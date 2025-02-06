import React from "react";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

const TransactionModal = ({ show, onHide, organisationname, transactionData }) => {
  return (
    <Modal show={show} onHide={onHide} animation={true} size="xl">
      <Modal.Header closeButton>
        <button className="custom-close-button" onClick={onHide}>
          &times;
        </button>
        <Modal.Title>{organisationname}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Fee Type</th>
                <th scope="col">Status</th>
                <th scope="col">Method</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.length > 0 ? (
                transactionData.map((payment, index) => (
                  <tr key={index}>
                    <td>
                      {payment.paymentDate
                        ? moment(payment.paymentDate).format("DD-MM-YYYY")
                        : ""}
                    </td>
                    <td>{payment.paymentId}</td>
                    <td>
                      {payment.amount ? (
                        <>
                          <i className="fa fa-dollar"></i>
                          {payment.amount.toFixed(2)}
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{payment.feeType}</td>
                    <td>
                      {payment.paymentStatus === "APPROVED"
                        ? "COMPLETED"
                        : payment.paymentStatus}
                    </td>
                    <td>{payment.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No transaction data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
