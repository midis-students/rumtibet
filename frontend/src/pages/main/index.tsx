import Page from '../../components/Page';
import Header from './header';
import SectionMain from './sections/main';
import SectionAbout from './sections/about';

export default function MainPage() {
  return (
    <>
      <Header />
      <Page>
        <SectionMain />
        <SectionAbout />
      </Page>
    </>
  );
}
