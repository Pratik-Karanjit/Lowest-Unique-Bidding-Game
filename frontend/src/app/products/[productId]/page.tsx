import React from "react";

const page = ({ params }: { params: { productId: String } }) => {
  return <div>page of product {params.productId}</div>;
};

export default page;
