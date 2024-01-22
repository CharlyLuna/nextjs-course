import Link from "next/link"

interface Props {
  title: string
  subtitle?: string
  label?: string
  icon?: React.ReactNode
  href?: string
}

export const SimpleWidget = ({ title, subtitle, label, icon, href }: Props) => {
  return (
    <div className='bg-white shadow-xl p-3 max-w-[200px] w-full rounded-2xl border-1 border-gray-50 m-2'>
      <div className='flex flex-col'>
        {label && (
          <div>
            <h2 className='font-bold text-gray-600 text-center'>{label}</h2>
          </div>
        )}
        <div className='my-3 flex flex-col'>
          <div className='flex items-center justify-center space-x-1'>
            {icon}
            <h4 className='text-4xl'>{title}</h4>
          </div>
          <p className='text-xs text-gray-500 self-center'>{subtitle}</p>
        </div>

        {href && (
          <div className='w-full place-items-end text-right border-t-2 border-gray-100 mt-2'>
            <Link href={href} className='text-indigo-600 text-xs font-medium'>
              Go to page
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
