import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeAPIData, storeTotalPrice } from "../Redux/DataSlice";

const Read = () => {
  const dispatch = useDispatch();

  const getAPIData = async () => {
    const responseAPIData = await axios.get(`http://localhost:9000/get`);
    const responseRegular = await axios.get(`http://localhost:9000/regular`);
    const responseDiscount = await axios.get(`http://localhost:9000/discount`);
    return {
      APIData: responseAPIData.data,
      regularPrice: responseRegular.data,
      discountPrice: responseDiscount.data,
    };
  };

  const { isLoading, isError, data, error} = useQuery(["todos"], getAPIData,
  {
    refetchInterval: 500,
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    alert("Cannot load details. Something went wrong.")
    return <span>Error: {error.message}</span>;
  }
  const priceJSON = {
    regularPrice: data.regularPrice.regular.toFixed(2),
    discountPrice: data.discountPrice.discount.toFixed(2),
  };
  dispatch(storeAPIData(data.APIData));
  dispatch(storeTotalPrice(priceJSON));
};
export default Read;
