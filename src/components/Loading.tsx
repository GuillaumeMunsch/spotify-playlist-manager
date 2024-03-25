import theme from "../theme";

const Loading = () => {
  const loadingContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "300px",
  };

  const loadingSpinnerStyles = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: theme.colors.highlight[500],
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={loadingContainerStyles}>
      <div style={loadingSpinnerStyles}></div>
    </div>
  );
};

export default Loading;
