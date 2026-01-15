import { ContactInfo as ContactInfoType } from "@/lib/data/types";

interface ContactInfoProps {
  contactInfo: ContactInfoType;
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div>
      <h2 className="font-heading text-base uppercase tracking-wider text-donna-text-tertiary mb-4 pb-2 border-b border-donna-text-tertiary/20">
        Contact & Logistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Email</p>
          <p className="font-body text-sm text-donna-text-primary">
            {contactInfo.email}
          </p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Phone</p>
          <p className="font-body text-sm text-donna-text-primary">
            {contactInfo.phone}
          </p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Address</p>
          <p className="font-body text-sm text-donna-text-secondary leading-relaxed">
            {contactInfo.address.street}<br />
            {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}<br />
            {contactInfo.address.country}
          </p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Preferred Contact Method</p>
          <p className="font-body text-sm text-donna-text-primary capitalize">
            {contactInfo.preferredContactMethod.replace("-", " ")}
          </p>
        </div>
      </div>
    </div>
  );
}
