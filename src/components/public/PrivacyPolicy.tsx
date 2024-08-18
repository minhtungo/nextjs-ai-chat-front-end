import Typography from "@/components/ui/typography";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Typography variant="h3" tag="h2" className="mb-4 mt-10">
        {title}
      </Typography>
      <div className="space-y-4 text-base font-normal text-muted-foreground">
        {children}
      </div>
    </>
  );
};

const PrivacyPolicy = () => {
  return (
    <section>
      <Section title="1. Introduction">
        <p>
          Your privacy is important to us. This Privacy Policy outlines how we
          collect, use, and protect your personal information when you use our
          AI tutoring platform.
        </p>
      </Section>
      <Section title="2. Information We Collect">
        <ol className="list-disc pl-4">
          <li>
            <strong>Personal Data: </strong>When you register, we collect
            information such as your name, email address, and academic details.
          </li>
          <li>
            <strong>Usage Data: </strong>We collect data on how you interact
            with our platform, including pages visited, features used, and time
            spent on each section.
          </li>
          <li>
            <strong>Cookies: </strong>We use cookies to enhance your user
            experience and improve our services.
          </li>
        </ol>
      </Section>
      <Section title="3. How We Use Your Information">
        <ol className="list-disc pl-4">
          <li>
            <strong>Personalization: </strong>To tailor your learning experience
            based on your academic level and preferences.
          </li>
          <li>
            <strong>Improvement of Services: </strong>To analyze usage patterns
            and improve platform features.
          </li>
          <li>
            <strong>Communication: </strong>To send you updates, newsletters,
            and other relevant information.
          </li>
        </ol>
      </Section>
      <Section title="4. Data Security">
        <p>
          We implement industry-standard security measures to protect your data
          from unauthorized access, disclosure, or modification.
        </p>
      </Section>
      <Section title="5. Your Rights">
        <p>
          You have the right to access, correct, or delete your personal
          information at any time. You can also opt-out of receiving
          communications from us.
        </p>
      </Section>
      <Section title="6. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting the new policy on our
          platform.
        </p>
      </Section>
      <Section title="7. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at
        </p>
      </Section>
    </section>
  );
};

export default PrivacyPolicy;
