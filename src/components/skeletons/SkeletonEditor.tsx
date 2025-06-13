export default function GrapesEditorSkeleton() {
  return (
    <div className="flex h-full animate-pulse">
      {/* Toolbar izquierda */}
      <div className="w-16 bg-gray-800 p-2 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-gray-700 rounded" />
        ))}
      </div>

      {/* Lienzo central */}
      <div className="flex-1 bg-gray-900 p-4 mx-2 rounded">
        <div className="h-full bg-gray-800 rounded" />
      </div>

      {/* Panel derecho */}
      <div className="w-64 bg-gray-800 p-2 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  );
}
