import { useMemo, useState } from "react";
import data from "./inbox.json";

type ActionRow = {
  id: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  receivedAt: string;
  webLink: string;
  context: string;
  draftReply: string;
};

type UnsureRow = {
  id: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  receivedAt: string;
  webLink: string;
  context: string;
  whyUnsure: string;
};

type Inbox = {
  generatedAt: string;
  mailbox: string;
  needsAction: ActionRow[];
  unsure: UnsureRow[];
};

const inbox = data as Inbox;

function ist(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  if (!text || text.startsWith("No reply")) return null;
  return (
    <button
      className="copy"
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

export default function App() {
  const generated = useMemo(() => ist(inbox.generatedAt), []);
  return (
    <div className="page">
      <h1>Monitoring the situation — Inbox</h1>
      <p className="meta">
        {inbox.mailbox} · snapshot {generated} IST · {inbox.needsAction.length} need action ·{" "}
        {inbox.unsure.length} unsure
      </p>

      <section>
        <h2>Needs action</h2>
        <div className="table-wrap">
          {inbox.needsAction.length === 0 ? (
            <div className="empty">Nothing in this bucket.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>When</th>
                  <th>Context</th>
                  <th>Draft reply</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {inbox.needsAction.map((row) => (
                  <tr key={row.id}>
                    <td className="from">
                      {row.fromName}
                      <small>{row.fromAddress}</small>
                    </td>
                    <td className="subject">{row.subject}</td>
                    <td className="when">{ist(row.receivedAt)}</td>
                    <td className="context">{row.context}</td>
                    <td className="draft">{row.draftReply}</td>
                    <td>
                      <div className="row-actions">
                        <Copy text={row.draftReply} />
                        <a className="open" href={row.webLink} target="_blank" rel="noreferrer">
                          Open
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section>
        <h2>Unsure</h2>
        <div className="table-wrap">
          {inbox.unsure.length === 0 ? (
            <div className="empty">Nothing in this bucket.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>When</th>
                  <th>Context</th>
                  <th>Why confidence is low</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {inbox.unsure.map((row) => (
                  <tr key={row.id}>
                    <td className="from">
                      {row.fromName}
                      <small>{row.fromAddress}</small>
                    </td>
                    <td className="subject">{row.subject}</td>
                    <td className="when">{ist(row.receivedAt)}</td>
                    <td className="context">{row.context}</td>
                    <td className="why">{row.whyUnsure}</td>
                    <td>
                      <a className="open" href={row.webLink} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
