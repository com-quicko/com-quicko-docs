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
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800">
      {/* Iframe container */}
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

      {/* Footer */}
      <div 
      onClick={() => window.open("https://quicko.com", "_blank", "noopener,noreferrer")}
      className="
        flex items-center justify-center gap-2
        h-14 px-2
        border-t border-[#c6c5d0] dark:border-[#313b4a]
        bg-[#f6f7f8] dark:bg-[#1c1c1f]
        cursor-pointer
      ">
        <span className="text-sm leading-none dark:text-zinc-400">
          Powered by
        </span>
        <img
          src="https://cdn.brandfetch.io/id6OWxavk2/theme/dark/idpHm6Kke3.svg?c=1bxid64Mup7aczewSAYMX&t=1765534843947"
          alt="Quicko"
          className="h-4 object-contain"
        />
      </div>
    </div>
  )
}
