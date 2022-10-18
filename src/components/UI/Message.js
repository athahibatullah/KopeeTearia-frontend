import { useState } from "react";
import { useSelector } from "react-redux";

const Message = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const selectorMessage = useSelector((state) => state.redux.message);
  const orderSuccess = (
    <>
      <div className="alert alert-success shadow-lg">
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Order is successfully added!</span>
        </div>
      </div>
    </>
  );
  const orderFailed = (
    <>
      <div className="alert alert-error shadow-lg">
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Unable to add order. Something went wrong.</span>
        </div>
      </div>
    </>
  );
  const updateSuccess = (
    <>
      <div className="alert alert-success shadow-lg">
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Order is successfully updated!</span>
        </div>
      </div>
    </>
  );
  const updateFailed = (
    <>
      <div className="alert alert-error shadow-lg">
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Unable to update item. Something went wrong.</span>
        </div>
      </div>
    </>
  );
  const deleteSuccess = (
    <>
      <div className="alert alert-success shadow-lg">
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Order is successfully deleted!</span>
        </div>
      </div>
    </>
  );
  const deleteFailed = (
    <>
      <div className="alert alert-error shadow-lg">
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Unable to delete item. Something went wrong.</span>
        </div>
      </div>
    </>
  );
  return (
    <>
      {selectorMessage.show &&
        selectorMessage.status === "success" &&
        ((selectorMessage.operation === "CREATE" && orderSuccess) ||
          (selectorMessage.operation === "UPDATE" && updateSuccess) ||
          (selectorMessage.operation === "DELETE" && deleteSuccess))}
      {selectorMessage.show &&
        selectorMessage.status === "failed" &&
        ((selectorMessage.operation === "CREATE" && orderFailed) ||
          (selectorMessage.operation === "UPDATE" && updateFailed) ||
          (selectorMessage.operation === "DELETE" && deleteFailed))}
    </>
  );
};
export default Message;
