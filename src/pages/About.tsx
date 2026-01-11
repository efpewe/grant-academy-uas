import HomeLayout from '../components/templates/MainLayout';
import PageHeader from '../components/atoms/PageHeader';
import AboutContent from '../components/organisms/AboutContent';
import StorySection from '../components/organisms/StorySection';
import TeamGrid from '../components/organisms/TeamGrid';

export default () => {
  return (
    <HomeLayout>
      <PageHeader>Tentang Grant Academy</PageHeader>
      <AboutContent />
      <StorySection />
      <TeamGrid />
    </HomeLayout>
  );
}