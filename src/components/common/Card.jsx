function Card({ title, subtitle, children, icon }) {
  return (
    <div className="card-bg rounded-3xl p-6 hover:-translate-y-0.5 hover:shadow-glow">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
        </div>
        
        {icon && <div className="rounded-2xl bg-brand-500/10 p-3 text-brand-600">{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Card;
