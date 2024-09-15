import ContentSection from "@/components/common/ContentSection";

const TermsOfServices = () => {
  return (
    <section>
      <ContentSection title="1. Introduction">
        <p>
          Welcome to our AI tutoring platform. By using our services, you agree
          to these Terms and Conditions.
        </p>
      </ContentSection>
      <ContentSection title="2. User Account">
        <ol className="list-disc pl-4">
          <li>
            <strong>Registration: </strong>You must register an account to
            access our platform. You are responsible for maintaining the
            confidentiality of your account information.
          </li>
          <li>
            <strong>Eligibility: </strong>Our services are intended for
            students. By using our platform, you confirm that you are a student
            or have permission to use the platform.
          </li>
        </ol>
      </ContentSection>
      <ContentSection title="3. Use of the Platform">
        <ol className="list-disc pl-4">
          <li>
            <strong>Permitted Use: </strong>You may use our platform for
            personal, educational purposes only.
          </li>
          <li>
            <strong>Prohibited Actions: </strong>You may not misuse our
            platform, including but not limited to hacking, transmitting
            malware, or engaging in any activity that disrupts the platform.
          </li>
        </ol>
      </ContentSection>
      <ContentSection title="4. Intellectual Property">
        <p>
          All content on our platform, including text, graphics, logos, and
          software, is the property of [Your Company Name]. You may not
          reproduce, distribute, or create derivative works from this content
          without our express permission.
        </p>
      </ContentSection>
      <ContentSection title="5. Limitation of Liability">
        <p>
          We are not liable for any direct, indirect, or consequential damages
          arising from your use of our platform. We make no warranties, express
          or implied, regarding the accuracy, reliability, or availability of
          the platform.
        </p>
      </ContentSection>
      <ContentSection title="6. Termination">
        <p>
          We reserve the right to terminate or suspend your account if you
          violate these Terms and Conditions.
        </p>
      </ContentSection>
      <ContentSection title="7. Governing Law">
        <p>
          These Terms and Conditions are governed by the laws of Vietnam. Any
          disputes arising from the use of our platform will be resolved in
          accordance with Vietnamese law.
        </p>
      </ContentSection>
      <ContentSection title="8. Changes to These Terms">
        <p>
          We may update these Terms and Conditions from time to time. We will
          notify you of any significant changes by posting the new terms on our
          platform.
        </p>
      </ContentSection>
      <ContentSection title="9. Contact Us">
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at
        </p>
      </ContentSection>
    </section>
  );
};

export default TermsOfServices;
