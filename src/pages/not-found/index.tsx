import { memo } from "react";

const PageNotFound = memo(function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] gap-10">
      <h1>!OOPS</h1>
      <h2>Page Not Found</h2>
    </div>
  );
});

export default PageNotFound;
