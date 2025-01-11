import "./Tab.css";

export default function Tab({ children, color }) {
  return (
    <div className="tab" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
}
