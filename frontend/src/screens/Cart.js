import React from "react";

import { useCart, useDispatchcart } from "../components/ContextReducer";

// import trash from "../trash.svg";
function Cart() {
  let data = useCart();
  let dispatch = useDispatchcart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-2 w-100 text-center fs-3 bg-white">Cart is Empty</div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  return (
    <div>
      {/* {console.log(data)} */}
      <div className="container m-auto mt-2 mb-5 table-responsive  table-responsive-sm table-responsive-md bg-light ">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">NO</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">Dlt</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <button
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      Dlt
                    </button>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2  bg-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success text-white mt-2 mb-3"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
