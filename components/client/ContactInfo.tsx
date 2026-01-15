import { ContactInfo as ContactInfoType } from "@/lib/data/types";

interface ContactInfoProps {
  contactInfo: ContactInfoType;
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact & Logistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Email</p>
          <a href={`mailto:${contactInfo.email}`} className="text-sm text-navy hover:underline">
            {contactInfo.email}
          </a>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Phone</p>
          <a href={`tel:${contactInfo.phone}`} className="text-sm text-navy hover:underline">
            {contactInfo.phone}
          </a>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Address</p>
          <p className="text-sm text-slate-700">
            {contactInfo.address.street}<br />
            {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}<br />
            {contactInfo.address.country}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Preferred Contact Method</p>
          <p className="text-sm text-slate-700 capitalize">
            {contactInfo.preferredContactMethod.replace("-", " ")}
          </p>
        </div>
      </div>
    </div>
  );
}
