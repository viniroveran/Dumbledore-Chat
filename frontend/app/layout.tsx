export const metadata = {
  title: 'Dumbledore Chat',
  description: 'A realtime chat developed in NextJS + NodeJS',
}
import '@components/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  )
}
