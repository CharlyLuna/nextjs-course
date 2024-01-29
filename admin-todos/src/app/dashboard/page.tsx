import { WidgetItem } from "@/components"

export default function DashboardPage() {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <WidgetItem
        title='Global Activities'
        subtitle='Compared to last week $13,988'
        value='$23,988'
      />
    </div>
  )
}
