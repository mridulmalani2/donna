import { Client } from "@/lib/data/types";
import ContactInfo from "./ContactInfo";
import PriorityBreakdown from "./PriorityBreakdown";
import AssetsOverview from "./AssetsOverview";
import RedFlagMovements from "./RedFlagMovements";
import RecentCommunications from "./RecentCommunications";
import OpenTopics from "./OpenTopics";

interface SnapshotProps {
  client: Client;
}

export default function Snapshot({ client }: SnapshotProps) {
  return (
    <div className="space-y-8">
      <ContactInfo contactInfo={client.contactInfo} />
      <PriorityBreakdown priorityBreakdown={client.priorityBreakdown} />
      <AssetsOverview assets={client.assets} />
      <RedFlagMovements movements={client.redFlagMovements} />
      <RecentCommunications communications={client.communications} />
      <OpenTopics topics={client.openTopics} />
    </div>
  );
}
