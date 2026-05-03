

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          {/* Who we are section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider font-bold">Who We Are</h2>
            <p className="text-text-secondary">
              GUL FASHION is a luxury clothing brand committed to protecting your privacy. 
              Our website address is available upon request.
            </p>
          </section>

          {/* Comments section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider font-bold">Comments</h2>
            <p className="mb-4 text-text-secondary">
              When visitors leave comments on the site we collect the data shown in the comments form, 
              and also the visitor's IP address and browser user agent string to help spam detection.
            </p>
            <p className="text-text-secondary">
              An anonymized string created from your email address (also called a hash) may be provided 
              to the Gravatar service to see if you are using it. The Gravatar service privacy policy is 
              available at <a href="https://automattic.com/privacy/" className="text-primary-red hover:text-text-primary transition-colors underline">https://automattic.com/privacy/</a>. 
              After approval of your comment, your profile picture is visible to the public in the context 
              of your comment.
            </p>
          </section>

          {/* Media section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">Media</h2>
            <p>
              If you upload images to the website, you should avoid uploading images with embedded 
              location data (EXIF GPS) included. Visitors to the website can download and extract any 
              location data from images on the website.
            </p>
          </section>

          {/* Cookies section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">Cookies</h2>
            <p className="mb-4">
              If you leave a comment on our site you may opt-in to saving your name, email address and 
              website in cookies. These are for your convenience so that you do not have to fill in your 
              details again when you leave another comment. These cookies will last for one year.
            </p>
            <p className="mb-4">
              If you visit our login page, we will set a temporary cookie to determine if your browser 
              accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
            </p>
            <p className="mb-4">
              When you log in, we will also set up several cookies to save your login information and your 
              screen display choices. Login cookies last for two days, and screen options cookies last for a 
              year. If you select "Remember Me", your login will persist for two weeks. If you log out of your 
              account, the login cookies will be removed.
            </p>
            <p>
              If you edit or publish an article, an additional cookie will be saved in your browser. This 
              cookie includes no personal data and simply indicates the post ID of the article you just edited. 
              It expires after 1 day.
            </p>
          </section>

          {/* Embedded content section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">Embedded Content from Other Websites</h2>
            <p className="mb-4">
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). 
              Embedded content from other websites behaves in the exact same way as if the visitor has 
              visited the other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed additional third-party tracking, 
              and monitor your interaction with that embedded content, including tracking your interaction with 
              the embedded content if you have an account and are logged in to that website.
            </p>
          </section>

          {/* Data sharing section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">Who We Share Your Data With</h2>
            <p>
              If you request a password reset, your IP address will be included in the reset email.
            </p>
          </section>

          {/* Data retention section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">How Long We Retain Your Data</h2>
            <p className="mb-4">
              If you leave a comment, the comment and its metadata are retained indefinitely. This is so we 
              can recognize and approve any follow-up comments automatically instead of holding them in a 
              moderation queue.
            </p>
            <p>
              For users that register on our website (if any), we also store the personal information they 
              provide in their user profile. All users can see, edit, or delete their personal information at 
              any time (except they cannot change their username). Website administrators can also see and 
              edit that information.
            </p>
          </section>

          {/* Data rights section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">What Rights You Have Over Your Data</h2>
            <p>
              If you have an account on this site, or have left comments, you can request to receive an 
              exported file of the personal data we hold about you, including any data you have provided to us. 
              You can also request that we erase any personal data we hold about you. This does not include any 
              data we are obliged to keep for administrative, legal, or security purposes.
            </p>
          </section>

          {/* Data transfer section */}
          <section>
            <h2 className="luxury-serif text-3xl text-gold-primary mb-4">Where We Send Your Data</h2>
            <p>
              Visitor comments may be checked through an automated spam detection service.
            </p>
          </section>

          {/* Contact section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm relative overflow-hidden group">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider font-black">Contact Us</h2>
            <p className="text-text-secondary font-medium leading-relaxed mb-8">
              If you have any questions about our privacy policy or how we handle your data, please contact us at:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-text-primary font-bold tracking-widest uppercase text-[10px]">
               <div className="bg-white/40 p-4 rounded-xl border border-gold-primary/10">
                  <p className="text-primary-red mb-1">EMAIL</p>
                  <p className="text-sm">GUL FASHIONfashion@gmail.com</p>
               </div>
               <div className="bg-white/40 p-4 rounded-xl border border-gold-primary/10">
                  <p className="text-primary-red mb-1">PHONE</p>
                  <p className="text-sm">+91 78779 37350</p>
               </div>
               <div className="bg-white/40 p-4 rounded-xl border border-gold-primary/10">
                  <p className="text-primary-red mb-1">ADDRESS</p>
                  <p className="text-sm">Pahadiya chowk, Jaipur 302002</p>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
