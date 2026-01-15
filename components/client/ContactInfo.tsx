import { ContactInfo as ContactInfoType } from "@/lib/data/types";
import CollapsibleSection from "./CollapsibleSection";

interface ContactInfoProps {
  contactInfo: ContactInfoType;
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  const summary = `${contactInfo.email} • Prefers ${contactInfo.preferredContactMethod.replace("-", " ")}`;

  return (
    <CollapsibleSection
      title="Contact & Logistics"
      summary={summary}
      defaultExpanded={false}
      variant="muted"
    >
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
    </CollapsibleSection>
  );
}
