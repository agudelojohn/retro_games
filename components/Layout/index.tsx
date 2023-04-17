import Container from '@mui/material/Container';
import Link from 'next/link';
import Head from 'next/head';

interface ILayoutProps {
  title: string;
  children: any;
}

const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container>
        <ul>
          <li>
            <Link href="/">Index</Link>
          </li>
          <li>
            <Link href="/rps">Rock paper and scissors</Link>
          </li>
          <li>
            <Link href="/memory">Memory game</Link>
          </li>
        </ul>
        {children}
      </Container>
    </>
  );
};

export default Layout;
