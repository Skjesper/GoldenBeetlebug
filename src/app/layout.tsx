import GlobalStyles from './styles/GlobalStyles';
import { GameContextProvider } from './services/GameContextProvider';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/rune.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body>
        <GameContextProvider>
        <GlobalStyles />
        {children}
        </GameContextProvider>
      </body>
    </html>
  );
}
