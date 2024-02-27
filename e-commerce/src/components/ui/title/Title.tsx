import { titleFont } from "@/config/fonts"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className}`}>
      <h1
        className={`${titleFont.className} py-4 text-2xl font-semibold antialiased`}
      >
        {title}
      </h1>
      {subtitle && <h2 className='text-lg mb-5'>{subtitle}</h2>}
    </div>
  )
}
