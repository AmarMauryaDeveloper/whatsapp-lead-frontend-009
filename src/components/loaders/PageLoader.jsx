function PageLoader() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-border-theme border-t-ring" />
        <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Loading CRM dashboard...</p>
      </div>
    </div>
  );
}

export default PageLoader;
