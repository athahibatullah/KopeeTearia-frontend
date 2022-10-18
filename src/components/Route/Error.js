import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto my-48">
        <div className="card-body items-center text-center">
          <h1 className="card-title">ERROR</h1>
          <p>Page not found</p>
          <div className="card-actions">
            <Link to={`/`}>
              <button className="btn">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Error;
