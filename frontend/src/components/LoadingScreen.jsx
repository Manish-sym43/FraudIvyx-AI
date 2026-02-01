function LoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0d1117",
        color: "white",
        flexDirection: "column"
      }}
    >
      <div className="spinner-border text-info mb-3" />
      <h5>Preparing your dashboard...</h5>
    </div>
  );
}

export default LoadingScreen;
