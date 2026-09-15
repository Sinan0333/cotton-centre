import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Cotton Centre | Vilayur & Chundambatta",
  description:
    "Contact Cotton Centre, a family clothing store in Vilayur near Chundambatta, Kerala.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const number1 = "917034451562";
  const number2 = "917592956164";

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We'd love to hear from you. Visit our store or reach out via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Cotton Centre</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-2xl flex-shrink-0">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-gray-600 mt-1">
                    Chundambatta, Vilayur
                    <br />
                    Kerala 679337, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Opening Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Sunday
                    <br />
                    9:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-2xl flex-shrink-0">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone Numbers</h3>
                  <p className="text-gray-600 mt-1">+91 70344 51562</p>
                  <p className="text-gray-600">+91 75929 56164</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-lg mb-4">
              Chat with us on WhatsApp
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${number1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-6 rounded-2xl transition-colors flex-1">
                <MessageCircle className="w-5 h-5" />
                +91 70344 51562
              </a>
              <a
                href={`https://wa.me/${number2}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-6 rounded-2xl transition-colors flex-1">
                <MessageCircle className="w-5 h-5" />
                +91 75929 56164
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[500px] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.452439474057!2d76.20887007273456!3d10.89385585702143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cf0015e74c25%3A0xf084686863d37dd8!2sCotton%20center%20readymades!5e1!3m2!1sen!2sin!4v1789452900813!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location of Cotton Centre"></iframe>
        </div>
      </div>
    </div>
  );
}
