import "./GreetingSection.css"
const GreetingSection = ({ userName }) => {
  return (
    <div className="greeting-section">
      <p className="welcome-text">Welcome back,</p>

   <h1 className="user-name">
  John Doe 👋
</h1>

<p className="greeting-subtitle">
  Find the best products from your favourite stores
</p>
    </div>
  );
};

export default GreetingSection;