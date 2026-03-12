function PageNotFound() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
        </div>
      </div>
    </div>
  );
}
export default PageNotFound;
