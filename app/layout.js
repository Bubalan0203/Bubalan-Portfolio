import './globals.css'
import 'slick-carousel/slick/slick.css'
import StyledComponentsRegistry from './registry'

export const metadata = {
  title: 'Bubalan S',
  description: 'MERN Stack Developer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
