const BgPattern = ({ opacity }: { opacity?: number }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "url('/topography.svg')",
        backgroundSize: "400px",
        opacity: opacity ? opacity : "0.04",
        position: "fixed",
      }}
    />
  );
};

export default BgPattern;