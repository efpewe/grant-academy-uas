import MainLayout from '../components/templates/MainLayout'
import PageHeader from '../components/atoms/PageHeader'
import ContactInfo from '../components/molecules/ContactInfo'
import ContactForm from '../components/molecules/ContactForm'

export default () => {
  return (
    <MainLayout>
      <PageHeader>Hubungi Kami</PageHeader>
      
      <section className="pb-[80px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[50px] bg-white p-[30px] md:p-[40px] rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.07)]">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}