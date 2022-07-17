import "../styles/LoadingSpinner.css";
const LoadingSpinner = () => {
  // source https://loading.io
  return (
    <div data-testid="loading-spinner" className="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
