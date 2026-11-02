export function formatDuration(startDate: Date, endDate: Date = new Date()): string {
  const start = startDate.getTime()
  const end = endDate?.getTime() ?? Date.now()
  const totalMinutes = Math.max(0, Math.floor((end - start) / 60000))
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  if (days > 0) return `${days} j ${hours} h`
  if (hours > 0) return `${hours} h ${minutes} min`
  return `${minutes} min`
}

export function formatDate(date?: Date | string) {
  const dateFormatter = new Intl.DateTimeFormat('fr-FR')
  return date ? dateFormatter.format(new Date(date)) : '—'
}
