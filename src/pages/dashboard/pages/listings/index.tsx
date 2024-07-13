import { memo, useCallback, useState } from "react";

const Listings = memo(function Listings() {
  const fetchListingsData = useCallback(function fetchListingsData() {
    console.log("getdata");
  }, []);
  const [count, setCount] = useState(0);
  console.log(count);

  return (
    <div className=" ">
      <p>counter : {count}</p>
      <button type="button" onClick={fetchListingsData}>
        fetch
      </button>
      <button
        type="button"
        onClick={function IncreaseCountVal() {
          setCount((prev) => prev + 1);
        }}
      >
        counter
      </button>
    </div>
  );
});

export default Listings;
