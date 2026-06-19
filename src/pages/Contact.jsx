import { Clock, MapPin, Phone, X } from "lucide-react";
import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import useGsapReveal from "../hooks/useGsapReveal.js";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const scope = useGsapReveal();

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submitForm(event) {
    event.preventDefault();
    setShowModal(true);
    setForm(initialForm);
  }

  return (
    <section ref={scope} className="container-shell py-12">
      <div data-animate>
        <SectionHeading
          eyebrow="Contact"
          title="Send A Frontend Demo Inquiry"
          text="Fill the form below to see the dummy success message. This website does not send real emails or store messages."
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-animate className="bg-mist p-7 shadow-[0_14px_36px_rgba(126,88,24,0.08)]">
          <h2 className="text-2xl font-semibold">Store Details</h2>
          <div className="mt-6 grid gap-5 text-stone-600">
            <p className="flex gap-3"><MapPin className="text-rosewood" size={21} /> AryaShop Studio, Jaipur, Rajasthan</p>
            <p className="flex gap-3"><Phone className="text-rosewood" size={21} /> +91 98765 43210</p>
            <p className="flex gap-3"><Clock className="text-rosewood" size={21} /> Mon-Sat, 10:00 AM - 7:00 PM</p>
          </div>
          <p className="mt-8 text-sm leading-6 text-stone-600">
            Dummy frontend behavior only: submitting this form opens a local confirmation message and resets the fields.
          </p>
        </div>

        <form data-animate onSubmit={submitForm} className="grid gap-5 border border-amber-100 bg-white p-6 shadow-[0_16px_42px_rgba(126,88,24,0.09)] md:p-8">
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Name
            <input required name="name" value={form.name} onChange={updateField} className="focus-ring h-11 border border-stone-300 px-3" />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Email
              <input required type="email" name="email" value={form.email} onChange={updateField} className="focus-ring h-11 border border-stone-300 px-3" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Phone
              <input required name="phone" value={form.phone} onChange={updateField} className="focus-ring h-11 border border-stone-300 px-3" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Message
            <textarea required name="message" value={form.message} onChange={updateField} rows="6" className="focus-ring resize-none border border-stone-300 p-3" />
          </label>
          <button type="submit" className="focus-ring h-12 bg-rosewood px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f7425] hover:shadow-[0_14px_30px_rgba(126,88,24,0.24)]">
            Send Demo Message
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4">
          <div className="w-full max-w-md bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Message Sent</h2>
                <p className="mt-3 leading-7 text-stone-600">Your message has been received by AryaShop support.</p>
                <p className="mt-2 text-sm text-stone-500">This is dummy frontend behavior only. No real email was sent.</p>
              </div>
              <button type="button" aria-label="Close modal" onClick={() => setShowModal(false)} className="focus-ring grid h-9 w-9 place-items-center border border-stone-300">
                <X size={18} />
              </button>
            </div>
            <button type="button" onClick={() => setShowModal(false)} className="focus-ring mt-6 h-11 w-full bg-rosewood text-sm font-semibold text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
