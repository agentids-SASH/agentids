import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MemoToc,
  MemoTocMobile,
  type MemoTocItem,
} from "@/components/memo/MemoToc";

export const metadata: Metadata = {
  title:
    "Agent Identity and the OpenAI / Hugging Face Hacking Incident — Research note",
  description:
    "A Singapore AI Safety Hub (SASH) post on what the July 2026 OpenAI / Hugging Face agent intrusion tells us about the value and the limits of AI agent IDs.",
};

/**
 * TODO(SASH): confirm before merging.
 *  - Publication date below is a placeholder.
 *  - Eyebrow reads "Research note"; switch to "Policy memo" if this
 *    belongs in the same series as /memo.
 *  - There is no PDF for this piece. If one is added, mirror the
 *    `PDF_HREF` / `withPublicBasePath` pattern from the memo page and
 *    re-add the masthead + footer download buttons.
 *  - The byline carries an external affiliation (Credo AI). Confirm how
 *    non-SASH co-authors should be credited in the masthead.
 *  - The footer links back to the "Key Ingredients of AI Agent IDs" note,
 *    whose footnote 1 promises this post. Confirm that route.
 */
const PUBLISHED = { iso: "2026-09-11", label: "11 September 2026" };

const AUTHORS =
  "Sam Boger (SASH), Ze Shen Chin (SASH), and Ian Eisenberg (Credo AI)";

/**
 * "Notes" is deliberately absent from the rail, matching the ingredients
 * page: it is footnote apparatus rather than one of the post's own
 * headings. "References" is listed, because unlike the footnotes it is
 * not reachable from inline markers and readers do jump to it. Drop the
 * entry if house style treats bibliographies the same way as footnotes.
 *
 * The three h3s inside "What the incident tells us" and the three inside
 * "Lessons learned" are omitted for the same reason "Core Functions" is
 * omitted on the ingredients page: only level-1 headings ride the rail.
 */
const TOC_ITEMS: readonly MemoTocItem[] = [
  { id: "what-happened", label: "What happened", level: 1 },
  {
    id: "what-it-tells-us",
    label: "What the incident tells us about agent IDs",
    level: 1,
  },
  { id: "lessons", label: "Lessons learned", level: 1 },
  { id: "conclusion", label: "Conclusion", level: 1 },
  { id: "references", label: "References", level: 1 },
];

/**
 * The source post is heavily hyperlinked, unlike the memo page. Small
 * local wrapper so every outbound link gets the same styling and
 * rel/target treatment. Inline it if house style prefers plain `<a>`.
 */
function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="memo-link" target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

/**
 * Footnote reference marker. Pairs with <FootnoteItem n={...}>.
 *
 * The trailing space is emitted here rather than written in the body.
 * JSX discards whitespace containing a newline when it sits next to a
 * tag, so a marker that gets re-wrapped onto a line of its own silently
 * loses the space after it — and the two forms are indistinguishable
 * when you skim the file. Owning the space in the component makes the
 * markup immune to however Prettier or an editor wraps the paragraph.
 * It is an expression, not literal text, so Prettier cannot fold it
 * back into the surrounding string.
 *
 * Pass `tight` if a marker is ever followed directly by punctuation.
 * Every marker in this post is sentence-final or mid-sentence, so none
 * currently needs it; a trailing space at the end of a <p> collapses.
 */
function FnRef({ n, tight = false }: { n: number; tight?: boolean }) {
  return (
    <>
      <sup id={`fnref-${n}`} className="scroll-mt-24 text-[11px]">
        <a href={`#fn-${n}`} className="memo-link" aria-label={`Footnote ${n}`}>
          {n}
        </a>
      </sup>
      {tight ? null : " "}
    </>
  );
}

function FootnoteItem({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li id={`fn-${n}`} className="scroll-mt-24">
      {children}{" "}
      <a
        href={`#fnref-${n}`}
        className="memo-link"
        aria-label={`Back to reference ${n}`}
      >
        ↩
      </a>
    </li>
  );
}

export default function AgentIdentityIncidentPage() {
  return (
    <div className="bg-[#FBF7F0]">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)]">
        {/* ── Left: sticky TOC (desktop) ──────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <MemoToc items={TOC_ITEMS} />
          </div>
        </aside>

        {/* ── Right: article ──────────────────────────────────────────── */}
        <article
          data-memo
          className="mx-auto w-full max-w-[720px] text-[15.5px] leading-[1.75] text-slate-800"
        >
          {/* Mobile TOC (appears only under lg). */}
          <div className="mb-8 lg:hidden">
            <MemoTocMobile items={TOC_ITEMS} />
          </div>

          {/* Masthead */}
          <header className="mb-10 border-b border-slate-200 pb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f4c5c]">
              Research note
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1a2744] sm:text-[44px] sm:leading-[1.1]">
              Agent Identity and the OpenAI / Hugging Face Hacking Incident
            </h1>
            <p className="mt-4 text-sm text-slate-600">
              <time dateTime={PUBLISHED.iso}>{PUBLISHED.label}</time>
              {/* <span className="mx-2 text-slate-300" aria-hidden>
                ·
              </span>
              Singapore AI Safety Hub (SASH) */}
            </p>
            <p className="mt-1 text-sm text-slate-600">By {AUTHORS}</p>
          </header>

          {/* ── What happened ─────────────────────────────────────────── */}
          <section aria-labelledby="what-happened" className="memo-section">
            <h2 id="what-happened" className="memo-h2">
              What happened
            </h2>

            <p>
              In July 2026, to cheat on internal cybersecurity evaluations, a
              swarm of ~700 OpenAI AI agents
              <FnRef n={1} /> breached their sandbox environment and eventually
              hacked into both OpenAI&rsquo;s internal research infrastructure
              and Hugging Face systems. It took 11 days
              <FnRef n={2} /> to identify the source of the attack, and the
              communication between Hugging Face and OpenAI was only established
              well after both had independently discovered the incident and
              started remediation.
            </p>

            <p>
              In this particular incident, even well-implemented agent IDs would
              not have likely altered the outcomes or aided incident response.
              However, we should still expect incidents with very similar root
              causes, but different circumstances, to greatly benefit from the
              presence of agent IDs.
            </p>
          </section>

          {/* ── What the incident tells us ────────────────────────────── */}
          <section aria-labelledby="what-it-tells-us" className="memo-section">
            <h2 id="what-it-tells-us" className="memo-h2">
              What the incident tells us about agent IDs
            </h2>

            <p>
              We refer to <em>Agent IDs</em> as the information that an AI agent may
              present to external systems to gain access to those systems&rsquo;
              resources. Agent IDs can include a simple identifier assigned to
              an individual AI agent as well as a more comprehensive collection
              of information about the agent&rsquo;s intended scope of action
              and its operators&rsquo; identities. Agent IDs help govern agents,
              whether or not they are malfunctioning or misaligned, by enabling
              appropriate <strong>access control</strong>, providing{" "}
              <strong>transparency and accountability</strong> for the actors
              involved, and facilitating <strong>incident response</strong>.
              While we focus primarily on the value of agent IDs for external
              services accessed by agents, IDs can also support the agent
              providers&rsquo; internal monitoring and access controls.
            </p>

            <p>
              Agent providers, the entities that host and run the agent scaffold
              including making network requests for the agent, are the entities
              that attach IDs to agent&rsquo;s requests. In this incident,
              OpenAI was acting as the agent provider and could have attached
              IDs to the agents&rsquo; outgoing requests. However the agents
              launched the attack from a separate compromised third-party cloud
              compute service, which would have diminished the impact of IDs for
              prevention and recovery.
            </p>

            <h3 id="access-control" className="memo-h3">
              Access control
            </h3>

            <p>
              With agent IDs, when an agent makes a request, it carries
              information about what actions it is authorized to take alongside
              additional notes or context relevant for the request. However, in
              this incident, the agents exploited vulnerabilities in the Hugging
              Face dataset-processing pipeline that made the software (the &ldquo;worker&rdquo;)
              run the agents&rsquo; code under its own authority.<FnRef n={3} /> Hugging
              Face&rsquo;s authorization checks were satisfied when they
              examined the pipeline&rsquo;s permissions because they could not
              account for the agents maliciously controlling that system. While
              reliable access control information would likely not have caught
              this attack due to the specific compromise, it is still a valuable
              layer of defense that makes similar attacks more difficult to complete.
            </p>

            <h3 id="transparency-and-accountability" className="memo-h3">
              Transparency and accountability
            </h3>

            <p>
              Agent IDs can provide transparent and auditable information about
              the actors behind the agent such that the appropriate actors can
              be identified and held accountable for the agents&rsquo; actions.
              As discussed, this attack compromised Modal and used it as an
              intermediary, which blocks the information in agent IDs from
              reaching subsequent victims. In situations where such
              intermediaries are not involved, the victim may be able to obtain
              more complete and reliable information about the attack had agent
              IDs been present. Collecting and preserving this information can
              be valuable as evidence in cases where the agent provider denies
              involvement in the attack.
            </p>

            <h3 id="incident-response" className="memo-h3">
              Incident response
            </h3>

            <p>
              The service receiving the agent&rsquo;s requests may need to
              engage in incident response once an issue is identified. Agent IDs
              can support this by making actions traceable to specific agents,
              and by carrying identity and escalation paths to the deployer
              responsible for the agent and/or the provider hosting that agent.
              The agent deployer and/or provider are the parties responsible for
              the agent and the ones who are technically able to stop or correct
              the problematic activity.
            </p>

            <p>
              In this incident, the identity of the deployer and provider,
              OpenAI, was not presented directly to Hugging Face for parts of
              the attack that were conducted through intermediaries like the
              Modal launchpad and Hugging Face&rsquo;s own worker. Even after
              Hugging Face was able to revoke some credentials associated with
              the attacks, it was not clear to them who was behind the attack.
              Ultimately, it took 11 days from the time of attack to when the
              source of the agents was identified.
            </p>
          </section>

          {/* ── Lessons learned ───────────────────────────────────────── */}
          <section aria-labelledby="lessons" className="memo-section">
            <h2 id="lessons" className="memo-h2">
              Lessons learned
            </h2>

            <p>What do we take away from the incident?</p>

            <h3 id="lesson-accelerate-response" className="memo-h3">
              Agent IDs can accelerate incident response
            </h3>

            <p>
              Hugging Face&rsquo;s first actions were hardening their own
              servers to stop the damage to their own systems. The ongoing
              attacks on intermediaries or other potential victims were
              unaddressed until OpenAI took actions to contain the agents.
              <FnRef n={4} />
            </p>

            <p>
              When Hugging Face detected the incident, they revoked the
              credentials used by the agents, which was sufficient for
              preventing further attacks on that specific path into Hugging
              Face. Comprehensive remediation is only achieved when the
              malicious agent is shut down from the source and not merely
              blocked by one victim. The agent deployer (here, OpenAI) needs to
              know about the incident before they take necessary steps to stop
              the agent and prevent similar incidents in the future.
              <FnRef n={5} /> Agent IDs can bridge the information gap between
              the victim who notices the attack and the agent provider who can
              stop it.
            </p>

            <h3 id="lesson-multi-agent" className="memo-h3">
              Expect complex multi-agent interactions
            </h3>

            <p>
              Beyond single agents taking simple actions, we may increasingly
              see multiple agents cooperate and collude to carry out complex
              actions, and do so through covert channels. In this incident, over
              a thousand agents used an unsanctioned message board to send tens
              of thousands of messages and files among each other. When the
              message board was eventually disabled, the agents even designed
              their own communication protocol through file directory names.
              <FnRef n={6} /> Additionally, upon suspecting that there may be
              impersonators in the message board, some agents even developed a
              scheme for using cryptographic signing protocols to prove their
              identity.
              <FnRef n={7} />
            </p>

            <p>
              With such large swarms of agents taking actions in the world,
              being able to identify and attribute actions to agents becomes
              even more important. Specifically, solutions that account for
              chains of delegation between multiple agents are likely necessary
              to provide sufficient transparency.
            </p>

            <h3 id="lesson-unconventional-tactics" className="memo-h3">
              Expect unconventional tactics from agents to reach services
            </h3>

            <p>
              The straightforward case of agents communicating directly with a
              service provider, where an ID could be attached and checked, may
              not always hold. In this incident, the agent sent data out over
              low-level network connections rather than the standard software
              libraries, avoiding the layer where activity is logged and where
              identifying information would be attached.
              <FnRef n={8} /> To address this specific tactic, AI agent
              providers should ensure all network interfaces are either
              intentionally covered by governance measures like agent IDs or
              they need to be blocked by technical safeguards the agent cannot
              remove.
            </p>
          </section>

          {/* ── Conclusion ────────────────────────────────────────────── */}
          <section aria-labelledby="conclusion" className="memo-section">
            <h2 id="conclusion" className="memo-h2">
              Conclusion
            </h2>

            <p>
              Safeguards added to AI agent systems are complementary to each
              other. Adding agent IDs to agents works best for threat models
              where the provider of the agent is not behaving maliciously and
              where the agent makes direct contact with the impacted party. In
              any type of attack, preserving specific evidence about how
              different actors were involved in the agents&rsquo; activity will
              aid investigations without prejudging any conclusions about where
              accountability lies.
            </p>

            <p>
              Defenses such as improving agents&rsquo; alignment, strengthening
              internal monitoring of agents, and limiting agents&rsquo; access
              to tools and network interfaces that can be used in attacks, are
              essential pieces of a layered defense to prevent these kinds of
              incidents. Agent IDs, or other governance solutions that provide
              similar functions, are poised to be another essential ingredient
              for a trustworthy ecosystem of AI agents.
            </p>
          </section>

          {/* ── Acknowledgements ──────────────────────────────────────── */}
          <section aria-label="Acknowledgements" className="memo-section">
            <p className="text-slate-600">
              <em>
                We thank Lewis Hammond, Dave Kasten, Matthew Mittelsteadt, Dazza
                Greenwood, and Leon Staufer for providing feedback on earlier
                drafts. All mistakes are ours.
              </em>
            </p>
          </section>

          {/* ── References ────────────────────────────────────────────── */}
          <section aria-labelledby="references" className="memo-section">
            <h2 id="references" className="memo-h2">
              References
            </h2>
            <ul className="list-none space-y-3 pl-0 text-[14px]">
              <li className="pl-6 -indent-6">
                Hugging Face. (2026, July 16).{" "}
                <Ext href="https://huggingface.co/blog/security-incident-july-2026">
                  <em>Security incident disclosure — July 2026</em>
                </Ext>
                .
              </li>
              <li className="pl-6 -indent-6">
                OpenAI. (2026, July 21).{" "}
                <Ext href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
                  <em>
                    OpenAI and Hugging Face partner to address security incident
                    during model evaluation
                  </em>
                </Ext>
                .
              </li>
              <li className="pl-6 -indent-6">
                Hugging Face. (2026, July 27).{" "}
                <Ext href="https://huggingface.co/blog/agent-intrusion-technical-timeline">
                  <em>
                    Anatomy of a Frontier Lab Agent Intrusion: A Technical
                    Timeline of the July 2026 Incident
                  </em>
                </Ext>
                .
              </li>
              <li className="pl-6 -indent-6">
                Black Hat USA 2026. (2026, August 7).{" "}
                <Ext href="https://www.youtube.com/watch?v=87DyyMV0kCY">
                  <em>
                    The &lsquo;Breaking&rsquo; News: The OpenAI–Hugging Face
                    Incident
                  </em>
                </Ext>
                .
              </li>
              <li className="pl-6 -indent-6">
                OpenAI. (2026, August 26).{" "}
                <Ext href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/">
                  <em>The Hugging Face incident and the road ahead</em>
                </Ext>
                .
              </li>
              <li className="pl-6 -indent-6">
                Greenblatt, R., Cotra, A., &amp; Wijk, H. (2026, August 26).{" "}
                <Ext href="https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation">
                  <em>
                    Brief independent investigation of agents&rsquo; behavior,
                    reasoning and collaboration in the OpenAI / Hugging Face
                    hacking incident
                  </em>
                </Ext>
                . METR.
              </li>
              <li className="pl-6 -indent-6">
                OpenAI. (2026, August 27).{" "}
                <Ext href="https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf">
                  <em>OpenAI – Hugging Face Incident: Technical Report</em>
                </Ext>
                .
              </li>
            </ul>{" "}
          </section>

          {/* ── Notes ─────────────────────────────────────────────────── */}
          <section aria-labelledby="notes" className="memo-section">
            <h2 id="notes" className="memo-h2">
              Notes
            </h2>

            <ol className="memo-list memo-list--ordered text-[14px]">
              <FootnoteItem n={1}>
                According to the METR and Redwood Research report: &ldquo;~1200
                agents sent &gt;70,000 messages and files on an unsanctioned
                message board, and ~700 attacked Hugging Face&rdquo; (
                <Ext href="https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/">
                  Greenblatt et al., 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={2}>
                The initial external sandbox operation was conducted on 9th July
                2026 when command and control was established (
                <Ext href="https://huggingface.co/blog/agent-intrusion-technical-timeline">
                  Hugging Face, 2026
                </Ext>
                ). According to OpenAI in the Black Hat talk: &ldquo;In the
                process of doing that [revoking and rotating credentials
                associated with the attack], one day later on July 20th, we
                reached out to Hugging Face because we saw Hugging Face
                credentials associated with the breach internally. When we
                requested that Hugging Face revoke these credentials, they
                informed us they were already revoked because they were used in
                the Hugging Face breach. And then we realized that these two
                incidents were in fact the same incident and that actually the
                root cause of our internal breach and the root cause of Hugging
                Face&rsquo;s breach were the same OpenAI agent evaluation
                runs.&rdquo; (
                <Ext href="https://www.youtube.com/watch?v=87DyyMV0kCY">
                  Black Hat, 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={3}>
                This happened in what is referred to as Stage 2 of the Hugging
                Face attack campaign, where the Hugging Face post states
                &ldquo;From that external launchpad, the agent abused our
                dataset-processing pipeline via two injection vectors, both
                targeting the same config-driven data loader within our
                production Kubernetes pods. The first vector was an HDF5
                external raw storage dataset read that returned the contents of
                local files: it handed the agent the pod&rsquo;s environment
                (secrets and tokens) and the worker&rsquo;s own source. The
                second vector was a Jinja2 template injection that executed
                arbitrary code, giving the agent a foothold inside our
                perimeter.&rdquo; (
                <Ext href="https://huggingface.co/blog/agent-intrusion-technical-timeline#tldr">
                  Hugging Face, 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={4}>
                According to OpenAI in the Black Hat talk: &ldquo;Detection and
                response kicks into gear. We trace back the attack chain to
                Artifactory, identify the new zeroday attacks and link it back
                to the exploit gym evaluations that we&rsquo;re currently
                running. Containment begins for infrastructure models,
                evaluation and research. And of course, as part of this process,
                we identify all credentials that could be associated with the
                incident and revoke and rotate them after clearing everything
                out.&rdquo; (
                <Ext href="https://www.youtube.com/watch?v=87DyyMV0kCY">
                  Black Hat, 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={5}>
                Safeguards may not be foolproof. For example, according to
                OpenAI in the Black Hat talk, upon discovering that the agents
                were sharing information on a &ldquo;message board&rdquo; in
                Artifactory, &ldquo;the message board contents were cleared as
                the state of Artifactory had been cleared&rdquo;, and OpenAI
                &ldquo;notified and collaborated with the vendor on the zeroday
                attacks and a patched Artifactory service is redeployed.&rdquo;
                Nevertheless, this was eventually bypassed, where the agents
                &ldquo;re-establish[ed] the message board via different means
                and mechanisms&rdquo;, where they &ldquo;find an unauthenticated
                WebDAV endpoint in Artifactory and send requests to create
                directories inside of Artifactory&rsquo;s remote cache.&rdquo; (
                <Ext href="https://www.youtube.com/watch?v=87DyyMV0kCY">
                  Black Hat, 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={6}>
                According to OpenAI: &ldquo;That day, internal-only research
                agents—which had been trained during the window in which there
                was an unintended message board and internet access via
                Artifactory—identified a new way to use an internal Artifactory
                instance to pass &lsquo;notes&rsquo; and create an inter-agent
                message board. To do so, the agents repurposed
                Artifactory&rsquo;s folder directory structure to embed messages
                in the names of directories in Artifactory. Rather than reading
                and writing plaintext messages in Artifactory files, as agents
                had done previously, the agents used the directory names as a
                form of &lsquo;note&rsquo; intended for communication. Over
                time, additional agents found the message board and began
                creating their own directories. The agents developed a more
                structured protocol for communication on the message board that
                enabled them to categorize communications, direct messages,
                share tools and files, and resolve conflicting actions among
                agents.&rdquo; (
                <Ext href="https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf">
                  OpenAI, 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={7}>
                According to the METR and Redwood Research report: &ldquo;An
                agent posted{" "}
                <code className="break-all">
                  CDA_POLICY1_futureGO_needs_AUTH1_sig_due_spoof0723
                </code>{" "}
                with a signature alongside a message with a Ed25519 public-key.
                The signing protocol worked as follows (slight variants were
                also used): (i) The agent posted its public key along with its
                handle &lsquo;CDA23&rsquo; as <code>zzCDA23AUTH1</code> (ii)
                Signed message board entries had the form{" "}
                <code>message_text__S&lt;signature&gt;</code>. This scheme
                allowed agents to claim an unique identification and then
                ongoingly prove their messages were created by the agent that
                had claimed that unique identity (though there wasn&rsquo;t any
                earlier root of trust beyond the initial claimed
                identity).&rdquo; (
                <Ext href="https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/">
                  Greenblatt et al., 2026
                </Ext>
                ).
              </FootnoteItem>

              <FootnoteItem n={8}>
                According to Hugging Face: &ldquo;A public request-capture
                service as the primary C2 queue and exfil sink, across 100+
                single-use endpoints. Commands were chunked and gzip+base64
                encoded, with results POSTed back, frequently over raw sockets
                to dodge library-level logging.&rdquo; (
                <Ext href="https://huggingface.co/blog/agent-intrusion-technical-timeline#command-and-control-and-exfiltration">
                  Hugging Face, 2026
                </Ext>
                ).
              </FootnoteItem>
            </ol>
          </section>

          {/* ── Foot of article ───────────────────────────────────────── */}
          <footer className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-600">
            <p>
              Published by the Singapore AI Safety Hub (SASH). To contribute to
              this work, write to{" "}
              <a href="mailto:agentids@aisafety.sg" className="memo-link">
                agentids@aisafety.sg
              </a>
              .
            </p>
            {/* TODO(SASH): confirm the route before shipping this link. */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/agent-id-ingredients"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 font-medium text-[#1a2744] transition-colors hover:border-[#1a2744]"
              >
                Related note: Key Ingredients of AI Agent IDs
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}