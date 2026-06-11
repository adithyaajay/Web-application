export default function Card({ title, value }) {
  return (
    <div className="tax-card">
      <p>{title}</p>

      <h2>{value}</h2>
    </div>
  );
}
