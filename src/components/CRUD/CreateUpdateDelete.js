import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import menu from "../../assets/menu.png";
import {
  addData,
  updateData,
  selectData,
  showMessage,
} from "../Redux/DataSlice";

const Create = () => {
  const [orderName, setOrderName] = useState("");
  const [price, setPrice] = useState();
  const [isDiscounted, setIsDiscounted] = useState(false);

  const [orderNameUpdate, setOrderNameUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState();
  const [isDiscountedUpdate, setIsDiscountedUpdate] = useState(false);

  const selectorAPIData = useSelector((state) => state.redux.APIData);
  const selectorPrice = useSelector((state) => state.redux.TotalPrice);
  const selectedData = useSelector((state) => state.redux.selected);
  const selectorMenu = useSelector((state) => state.redux.Menu);
  const [showUpdate, setShowUpdate] = useState(false);
  const dispatch = useDispatch();

  const postData = () => {
    const dataJSON = {
      orderName: orderName,
      price: price,
      discounted: isDiscounted,
    };
    // if (menuValidation(dataJSON)) {
      axios
        .post(`http://localhost:8181/SpringKopeeTearia/add`, dataJSON)
        .then(() => messageHandler(true, "success", "CREATE"))
        .catch(() => messageHandler(true, "failed", "CREATE"));
      resetHandler();
    // } else {
    //   messageHandler(true, "failed", "CREATE");
    // }
  };
  const deleteDataHandler = (event, id) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:8181/SpringKopeeTearia/delete/${id}`)
      .then(() => messageHandler(true, "success", "DELETE"))
      .catch(() => messageHandler(true, "failed", "DELETE"));
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const resetHandler = () => {
    setOrderName("");
    setPrice();
    setIsDiscounted(false);
    reset();
  };
  const menuValidation = (data) => {
    const menuName = selectorMenu.map((menu) => menu.name);
    if (menuName.includes(data.orderName)) {
      if (
        selectorMenu[menuName.indexOf(data.orderName)].price ===
        parseFloat(data.price)
      ) {
        return true;
      }
    } else {
      return false;
    }
  };
  const message = (
    type,
    validRequired,
    validLength,
    validPattern,
    minLength
  ) => {
    return (
      <>
        {validRequired && (
          <p className="text-red-500" role="alert">
            {type} is required
          </p>
        )}
        {validLength && (
          <p className="text-red-500" role="alert">
            Minimum length of name is {minLength}
          </p>
        )}
        {validPattern && (
          <p className="text-red-500" role="alert">
            {type} format is not correct
          </p>
        )}
      </>
    );
  };
  const nameValidation = {
    required: true,
    minLength: 1,
    pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  };
  const floatValidation = {
    required: true,
    minLength: 1,
    pattern: /^[1-9]\d*(\.\d+)?$/,
  };
  const showUpdateHandler = (event, val) => {
    event.preventDefault();
    setShowUpdate(val);
  };
  const selectedUpdateHandler = (event, data) => {
    event.preventDefault();
    dispatch(selectData(data));
    setOrderNameUpdate(data.orderName);
    setPriceUpdate(data.price);
    setIsDiscountedUpdate(data.discounted);
  };
  const updateHandler = () => {
    const dataJSON = {
      id: selectedData.id,
      orderName: orderNameUpdate,
      price: priceUpdate,
      discounted: isDiscountedUpdate,
    };
    axios
      .put(`http://localhost:8181/SpringKopeeTearia/update`, dataJSON)
      .then(() => {
        messageHandler(true, "success", "UPDATE");
      })
      .catch(() => {
        messageHandler(true, "failed", "UPDATE");
      });
    setOrderNameUpdate("");
    setPriceUpdate("");
    setIsDiscountedUpdate(false);
    setShowUpdate(false);
  };

  const messageHandler = (show, status, success) => {
    dispatch(showMessage({ show: show, status: status, operation: success }));
    setTimeout(() => {
      dispatch(showMessage({ show: false, status: "", operation: "" }));
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-wrap flex-row">
        <div className="card w-96 bg-base-100 shadow-xl max-w-md h-full max-h-xs">
          <figure className="px-10 py-10 pt-10">
            <img src={menu} alt="Menu" className="rounded-xl" />
          </figure>
        </div>
        <div className="shadow-xl mx-12">
          <form onSubmit={handleSubmit(postData)}>
            <table className="table w-full mx-auto my-16 max-w-3xl">
              <thead className="text-center">
                <tr>
                  <th>Order Item</th>
                  <th>Price</th>
                  <th>On 5% Promo?</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>
                    <input
                      className="input w-full max-w-lg border-black"
                      {...register("orderName", nameValidation)}
                      aria-invalid={errors.orderName ? "true" : "false"}
                      value={setValue("orderName", orderName)}
                      onChange={(e) => setOrderName(e.target.value)}
                      id="ordName"
                    />
                    {errors.orderName?.type === "required" &&
                      message("Order Item", true, false, false)}
                    {errors.orderName?.type === "minLength" &&
                      message(
                        "Order Item",
                        false,
                        true,
                        false,
                        nameValidation.minLength
                      )}
                    {errors.orderName?.type === "pattern" &&
                      message("Order Item", false, false, true)}
                  </td>
                  <td>
                    <input
                      className="input w-full max-w-lg border-black"
                      {...register("price", floatValidation)}
                      aria-invalid={errors.price ? "true" : "false"}
                      value={setValue("price", price)}
                      onChange={(e) => setPrice(e.target.value)}
                      id="ordPrice"
                    />
                    {errors.price?.type === "required" &&
                      message("Price", true, false, false)}
                    {errors.price?.type === "pattern" &&
                      message("Price", false, false, true)}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox mx-auto"
                      {...register("isDiscounted")}
                      checked={setValue("isDiscounted", isDiscounted)}
                      onChange={(e) => setIsDiscounted(e.target.checked)}
                      id="ordDiscounted"
                    />
                  </td>
                  <td>
                    <button
                      className="btn w-full max-w-xs bg-indigo-900"
                      type="submit"
                      id="addOrderBtn"
                    >
                      Place Order
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <table className="table w-full mx-auto my-16 max-w-3xl">
            <thead className="text-center">
              <tr>
                <th colSpan={4}>Attending Clerk: Nilou</th>
              </tr>
              <tr>
                <th>Order Item</th>
                <th>Price</th>
                <th>On 5% Promo?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {selectorAPIData.map((data, index) => (
                // <>
                <tr key={index}>
                  <td>{data.orderName}</td>
                  <td>${data.price}</td>
                  <td>
                    {
                      <input
                        type="checkbox"
                        className="checkbox mx-auto"
                        checked={data.discounted}
                      />
                    }
                  </td>
                  <td>
                    <button
                      className="btn bg-sky-500 border-none"
                      onClick={(e) => (
                        showUpdateHandler(e, true),
                        selectedUpdateHandler(e, data)
                      )}
                      id="editOrd"
                    >
                      Edit
                    </button>
                    <button
                      className="btn bg-rose-600 border-none"
                      onClick={(e) => deleteDataHandler(e, data.id)}
                      id="deleteOrd"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                // </>
              ))}

              {showUpdate && (
                <tr>
                  <td>
                    <input
                      className="input w-full max-w-lg border-black"
                      {...register("orderNameUpdate", nameValidation)}
                      aria-invalid={errors.orderNameUpdate ? "true" : "false"}
                      value={setValue("orderNameUpdate", orderNameUpdate)}
                      onChange={(e) => setOrderNameUpdate(e.target.value)}
                      id="updName"
                    />
                    {errors.orderNameUpdate?.type === "required" &&
                      message("Order Item", true, false, false)}
                    {errors.orderNameUpdate?.type === "minLength" &&
                      message(
                        "Order Item",
                        false,
                        true,
                        false,
                        nameValidation.minLength
                      )}
                    {errors.orderNameUpdate?.type === "pattern" &&
                      message("Order Item", false, false, true)}
                  </td>
                  <td>
                    <input
                      className="input w-full max-w-lg border-black"
                      {...register("priceUpdate")}
                      aria-invalid={errors.priceUpdate ? "true" : "false"}
                      value={setValue("priceUpdate", priceUpdate)}
                      onChange={(e) => setPriceUpdate(e.target.value)}
                      id="updPrice"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox mx-auto"
                      {...register("isDiscountedUpdate")}
                      checked={setValue(
                        "isDiscountedUpdate",
                        isDiscountedUpdate
                      )}
                      onChange={(e) => setIsDiscountedUpdate(e.target.checked)}
                      id="updDiscount"
                    />
                  </td>
                  <td>
                    <button
                      className="btn bg-sky-300 border-none"
                      onClick={updateHandler}
                      id="updOrd"
                    >
                      Update
                    </button>
                    <button
                      className="btn bg-rose-400 border-none"
                      onClick={(e) => showUpdateHandler(e, false)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}

              <tr>
                <td colSpan="4">
                  Total Regular Bill: ${selectorPrice.regularPrice}
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  Total Discounted Bill: ${selectorPrice.discountPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Create;
