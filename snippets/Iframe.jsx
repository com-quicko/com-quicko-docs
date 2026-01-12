export const Iframe = ({
  lightUrl,
  darkUrl,
  title,
  height = 900,
  className = "",
}) => {
  const resolvedHeight =
    typeof height === "number" ? `${height}px` : height

  return (
    <div className="w-full">
      {/* Light */}
      <iframe
        src={lightUrl}
        title={title}
        className={`block w-full border-0 dark:hidden ${className}`}
        style={{ height: resolvedHeight }}
        allow="clipboard-write"
      />

      {/* Dark */}
      <iframe
        src={darkUrl}
        title={title}
        className={`hidden w-full border-0 dark:block ${className}`}
        style={{ height: resolvedHeight }}
        allow="clipboard-write"
      />
    </div>
  )
}
