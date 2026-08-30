import { useMemo, useState } from "react";
import data from "./inbox.json";
import teamsData from "./teams.json";
import { chatTypeLabel, displayIst, hottestFirst, snapshotWhen } from "./format";

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

type NeedReply = {
  rank?: number;
  heat?: string;
  chat_type?: string;
  title?: string;
  who?: string;
  when_ist?: string;
  unread?: boolean;
  what_they_asked?: string;
  why_needs_him?: string;
  suggested_reply_angle?: string;
  webUrl?: string;
};

type IgnoreRow = {
  title?: string;
  chat_type?: string;
  why?: string;
};

type Teams = {
  generated_at?: string;
  signed_in_as?: { name?: string; email?: string };
  needs_reply?: NeedReply[];
  ignore?: IgnoreRow[];
  skipped_hin_count?: number;
  skipped_hin_titles?: string[];
  coverage_notes?: Record<string, unknown>;
  mode?: string;
};

const inbox = data as Inbox;
const teams = teamsData as Teams;
const ist = displayIst;

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

function coverageLine(notes?: Record<string, unknown>) {
  return typeof notes?.test_scope === "string" ? notes.test_scope : "";
}

function InboxTab({ generated }: { generated: string }) {
  return (
    <>
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
    </>
  );
}

function TeamsTab() {
  const needs = hottestFirst(teams.needs_reply ?? []);
  const ignore = teams.ignore ?? [];
  const skipped = teams.skipped_hin_count ?? 0;
  const coverage = coverageLine(teams.coverage_notes);

  return (
    <>
      <p className="meta">
        snapshot {snapshotWhen(teams.generated_at)} · {needs.length} need reply · {ignore.length} ignore ·{" "}
        {skipped} HIN/HINU skipped
      </p>
      {coverage ? <p className="coverage">{coverage}</p> : null}

      <section>
        <h2>Needs reply</h2>
        <div className="table-wrap">
          {needs.length === 0 ? (
            <div className="empty">Nothing in this bucket.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Who</th>
                  <th>Chat</th>
                  <th>When (IST)</th>
                  <th>What they asked</th>
                  <th>Why you</th>
                  <th>Draft angle</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {needs.map((row, i) => (
                  <tr key={`${row.rank}-${row.who}-${row.when_ist}-${i}`}>
                    <td className="from">{row.who}</td>
                    <td className="chat">
                      {row.title}
                      <small>{chatTypeLabel(row.chat_type)}</small>
                    </td>
                    <td className="when">{displayIst(row.when_ist)}</td>
                    <td className="context">{row.what_they_asked}</td>
                    <td className="why">{row.why_needs_him}</td>
                    <td className="draft">{row.suggested_reply_angle}</td>
                    <td>
                      <div className="row-actions">
                        <Copy text={row.suggested_reply_angle ?? ""} />
                        {row.webUrl ? (
                          <a className="open" href={row.webUrl} target="_blank" rel="noreferrer">
                            Open
                          </a>
                        ) : null}
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
        <h2>Ignore</h2>
        <div className="table-wrap">
          {ignore.length === 0 ? (
            <div className="empty">Nothing in this bucket.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                {ignore.map((row, i) => (
                  <tr key={`${row.title}-${i}`}>
                    <td className="chat">
                      {row.title}
                      <small>{chatTypeLabel(row.chat_type)}</small>
                    </td>
                    <td className="why">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState<"inbox" | "teams">("inbox");
  const generated = useMemo(() => ist(inbox.generatedAt), []);
  return (
    <div className="page">
      <h1>Monitoring the situation</h1>
      <nav className="tabs">
        <button type="button" className={tab === "inbox" ? "tab on" : "tab"} onClick={() => setTab("inbox")}>
          Inbox
        </button>
        <button type="button" className={tab === "teams" ? "tab on" : "tab"} onClick={() => setTab("teams")}>
          Teams
        </button>
      </nav>
      {tab === "inbox" ? <InboxTab generated={generated} /> : <TeamsTab />}
    </div>
  );
}
