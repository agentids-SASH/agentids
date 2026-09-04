import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MemoToc, MemoTocMobile, type MemoTocItem } from "@/components/memo/MemoToc";

export const metadata: Metadata = {
  title: "Key Ingredients of AI Agent IDs — Research note",
  description:
    "A Singapore AI Safety Hub (SASH) post on the goals of AI agent IDs, the functions that serve those goals, and the protocols, platforms and standards work that already exist.",
};

/**
 * TODO(SASH): confirm before merging.
 *  - Publication date below is a placeholder.
 *  - Eyebrow reads "Research note"; switch to "Policy memo" if this
 *    belongs in the same series as /memo.
 *  - There is no PDF for this piece. If one is added, mirror the
 *    `PDF_HREF` / `withPublicBasePath` pattern from the memo page and
 *    re-add the masthead + footer download buttons.
 */
const PUBLISHED = { iso: "2026-09-04", label: "4 September 2026" };

/**
 * "Notes" is deliberately absent from the rail: it is footnote apparatus
 * rather than one of the post's own headings, matching the memo page's
 * rule that TOC labels mirror the document's headings. Add
 * `{ id: "notes", label: "Notes", level: 1 }` if you want it listed.
 */
const TOC_ITEMS: readonly MemoTocItem[] = [
  { id: "introduction", label: "Introduction", level: 1 },
  { id: "goals", label: "Goals of Agent IDs", level: 1 },
  { id: "landscape", label: "What already exists", level: 1 },
  { id: "conclusion", label: "Conclusion", level: 1 },
  { id: "appendix", label: "Appendix", level: 1 },
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

/** Footnote reference marker. Pairs with <FootnoteItem n={...}>. */
function FnRef({ n }: { n: number }) {
  return (
    <sup id={`fnref-${n}`} className="scroll-mt-24 text-[11px]">
      <a href={`#fn-${n}`} className="memo-link" aria-label={`Footnote ${n}`}>
        {n}
      </a>
    </sup>
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

export default function AgentIdIngredientsPage() {
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
              Key Ingredients of AI Agent IDs
            </h1>
            <p className="mt-4 text-sm text-slate-600">
              <time dateTime={PUBLISHED.iso}>{PUBLISHED.label}</time>
              <span className="mx-2 text-slate-300" aria-hidden>
                ·
              </span>
              Singapore AI Safety Hub (SASH)
            </p>
          </header>

          {/* ── Introduction ──────────────────────────────────────────── */}
          <section aria-labelledby="introduction" className="memo-section">
            <h2 id="introduction" className="memo-h2">
              Introduction
            </h2>

            <p>
              AI agents are{" "}
              <Ext href="https://arxiv.org/abs/2602.17753">
                increasingly ubiquitous
              </Ext>
              , yet they rarely present information about the construction and
              origins of the agent, and why they should be trusted.
            </p>

            <p>
              Consider the example of OpenAI agents hacking into Hugging
              Face&rsquo;s systems. On 16th July 2026, Hugging Face{" "}
              <Ext href="https://huggingface.co/blog/security-incident-july-2026">
                disclosed
              </Ext>{" "}
              a security incident where unauthorized access to a limited set of
              internal datasets and to several credentials was identified.
              However, five days would pass before OpenAI{" "}
              <Ext href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
                announced
              </Ext>{" "}
              that the incident was driven by their models. At the time of
              Hugging Face&rsquo;s announcement, they knew that the campaign was
              run by an autonomous agent framework, but did not know which LLM
              was used. Here, we see a gap between seeing the action an agent is
              taking but not being able to identify the agent and its operator.
            </p>

            <p>
              Agent IDs aim to mitigate risks similar to such cases.
              <FnRef n={1} /> While there are many industry solutions for agent
              IDs, they primarily address the functionality of agents and the
              technical needs of agent providers and deployers. Robust agent IDs
              can additionally address risks that affect other entities who are
              not directly involved in creating or operating the agent, as the
              ID can include information that provides transparency into how the
              agent was built, information to ensure accountability across all
              the actors involved, and a plan for what to do when something goes
              wrong with the agent.
            </p>

            <p>
              This post sets the stage for forthcoming research comparing
              features and functionality of different proposals for agent
              identity. We will describe the high level goals of agent IDs,
              examine some functions that contribute to the goals, and provide
              several examples of protocols implementing those functions.
            </p>
          </section>

          {/* ── Goals of Agent IDs ────────────────────────────────────── */}
          <section aria-labelledby="goals" className="memo-section">
            <h2 id="goals" className="memo-h2">
              Goals of Agent IDs
            </h2>

            <p>
              We use the term AI agent to mean the whole technical system that
              uses an LLM to turn a human or machine input into actions in the
              digital world. Some key actors
              <FnRef n={2} /> in this system are:
            </p>

            <ul className="memo-list">
              <li>
                The <strong>deployer</strong> who directs the agent to
                accomplish a task
              </li>
              <li>
                The <strong>agent provider</strong> who provides the agent
                scaffold, which is used to manage models, data sources, and
                tools, and specifies how the agent takes actions
              </li>
              <li>
                The <strong>model provider</strong> who hosts the LLM that
                decides how the agent will accomplish the task
              </li>
              <li>
                The <strong>service</strong>, not part of the agent, who
                ultimately receives a request from the agent and has to decide
                whether to take the requested action
              </li>
            </ul>

            <p>
              The agent may present an ID to the service that carries extra
              information to convince the service to trust the agent. For
              instance, if the service requires a user to log in to the service
              to take that action, then the agent clearly needs to present
              evidence to the service that the user authorized the agent to take
              that action.
            </p>

            <p>
              The ID can support the agent&rsquo;s functionality (like carrying
              authorization), prevent malicious or accidentally harmful actions,
              or provide additional information to the service to inform its
              decision to allow or reject a request. The table below summarizes
              the primary goals that an agent&rsquo;s ID can support, along with
              the specific functions that support the outcome.
            </p>

            <figure className="memo-table">
              <figcaption className="memo-table__caption">
                <strong>Table 1:</strong> Goals of agent IDs, alongside the
                functions required to achieve them. The functions are described
                in more detail in the{" "}
                <a href="#appendix" className="memo-link">
                  Appendix
                </a>
                .
              </figcaption>
              <div className="memo-table__scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" className="w-[20%]">
                        Goals
                      </th>
                      <th scope="col">Description / Examples</th>
                      <th scope="col" className="w-[26%]">
                        Functions Addressing the Goal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Access control</th>
                      <td>
                        The deployer of an agent communicates the intended
                        outcome to the agent through a prompt and other
                        configurations. The agent scaffold sends relevant
                        requests to services, alongside information on the IDs.
                        The service can compare the actions an agent attempts to
                        take against the allowed scope.
                      </td>
                      <td>
                        <p>Identification</p>
                        <p>Credentialing</p>
                        <p>Authentication</p>
                        <p>Authorization</p>
                        <p>Delegation</p>
                        <p>Provisioning &amp; Lifecycle</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Incident response</th>
                      <td>
                        If an agent causes harmful or unintended effects, the
                        service needs to stop the damage and figure out what
                        went wrong to prevent future harm. Information in the ID
                        can support each of these steps.
                      </td>
                      <td>
                        <p>Identification</p>
                        <p>Continuous Monitoring</p>
                        <p>Provisioning &amp; Lifecycle</p>
                        <p>Observability &amp; Logging</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Accountability</th>
                      <td>
                        Multiple actors contribute to an AI agent, and they play
                        unique roles that contribute to the agent&rsquo;s
                        functionality and risks. The ID can provide information
                        about each actor such as the model name of the LLM
                        powering the agent or the name of the provider running
                        the agent.
                      </td>
                      <td>
                        <p>Identification</p>
                        <p>Credentialing</p>
                        <p>Attestation &amp; Provenance</p>
                        <p>Observability &amp; Logging</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </figure>

            <p>
              Ultimately, agent IDs achieve these goals by enabling{" "}
              <strong>transparency</strong> across the ecosystem. Access control
              can only be enforced by knowing who is behind the agent, incidents
              can only be responded to if those able to take actions are
              identified, and actors can only be held accountable by knowing who
              provided the model or the agent scaffold.
            </p>
          </section>

          {/* ── What already exists ───────────────────────────────────── */}
          <section aria-labelledby="landscape" className="memo-section">
            <h2 id="landscape" className="memo-h2">
              What already exists
            </h2>

            <p>
              We now briefly discuss various parts of a solution that either
              already exist or are actively being developed, and provide some
              examples. These range from narrow building blocks we refer to as
              &ldquo;primitives&rdquo; that implement specific functions,
              protocols that describe how agents communicate, platforms and
              products for managing agents, to standards work that aims at
              something more comprehensive.
            </p>

            <p>
              As we have seen in the previous section, a robust agent ID
              solution would include authorization, authentication, identifiers,
              and other functions. Mature protocols and implementations already
              exist for many of these functions.{" "}
              <Ext href="https://oauth.net/2/">OAuth</Ext> is a standard that
              allows a user to authorize an application or a website to access
              certain resources.{" "}
              <Ext href="https://openid.net/developers/how-connect-works/">
                OpenID Connect
              </Ext>{" "}
              is a protocol that enables authentication of a user. Separately,{" "}
              <Ext href="https://spiffe.io/">
                Secure Production Identity Framework for Everyone (SPIFFE)
              </Ext>{" "}
              provides instance identifiers for any kind of software workload,
              and can be used for AI agent processes as well.
            </p>

            <p>
              Other protocols standardize how an agent reaches tools and other
              agents, and unlike the primitives above, they provide the means of
              communication an agent uses to take actions affecting the external
              world.{" "}
              <Ext href="https://modelcontextprotocol.io/">
                Model Context Protocol (MCP)
              </Ext>{" "}
              is an open-source standard for connecting AI applications to
              external systems.
              <FnRef n={3} />{" "}
              <Ext href="https://a2a-protocol.org/">Agent2Agent (A2A)</Ext> is
              an open protocol which provides a standard way for agents to
              collaborate with each other, regardless of the underlying
              framework or vendor.
            </p>

            <p>
              Besides protocols that simply specify a common language of
              communication, other efforts provide ways to build or manage
              agents.{" "}
              <Ext href="https://www.kya-os.org/">
                Know Your Agent - Operating System (KYA-OS)
              </Ext>
              , previously known as{" "}
              <Ext href="https://modelcontextprotocol-identity.io/mcp">
                MCP - Identity (MCP-I)
              </Ext>
              , addresses agent identity and delegation and can be implemented
              on top of MCP. The{" "}
              <Ext href="https://docs.cloud.google.com/gemini-enterprise-agent-platform">
                Gemini Enterprise Agent Platform
              </Ext>{" "}
              allows the creation of an agent with{" "}
              <Ext href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity">
                agent identity
              </Ext>
              , which can be used for access control and auditing, and agents on
              it can be built using their open-source{" "}
              <Ext href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk">
                Agent Development Kit (ADK)
              </Ext>
              .{" "}
              <Ext href="https://learn.microsoft.com/en-us/entra/agent-id/">
                Microsoft Entra Agent ID
              </Ext>{" "}
              and{" "}
              <Ext href="https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-agentcore-identity-securing-agentic-ai-at-scale/">
                Amazon Bedrock AgentCore Identity
              </Ext>{" "}
              are other offerings that support agent IDs from Microsoft and AWS
              respectively.
            </p>

            <p>
              In particular, the agent commerce domain has developed more mature
              implementations, with protocols that carry information about who
              authorized an agent and on what terms.{" "}
              <Ext href="https://ap2-protocol.org/">
                Agent Payments Protocol (AP2)
              </Ext>{" "}
              is an open protocol that uses cryptographically signed mandates to
              show a merchant that a user authorized a specific purchase. Visa
              developed{" "}
              <Ext href="https://developer.visa.com/capabilities/trusted-agent-protocol">
                Trusted Agent Protocol
              </Ext>{" "}
              which aims to distinguish trusted, commerce-focused agents from
              malicious bots.
            </p>

            <p>
              Finally, various efforts are underway towards developing a more
              comprehensive agent ID protocol. IETF has various working groups
              that would address specific parts of such a protocol, e.g.{" "}
              <Ext href="https://datatracker.ietf.org/group/wimse/about/">
                WIMSE
              </Ext>{" "}
              and{" "}
              <Ext href="https://datatracker.ietf.org/wg/webbotauth/about/">
                Web Bot Auth
              </Ext>
              , alongside Birds of a Feather (BOF) groups such as{" "}
              <Ext href="https://datatracker.ietf.org/group/agentproto/about/">
                Agent Communication Protocols
              </Ext>
              . Individuals also publicly submit proposed protocols as drafts to
              the IETF, for example{" "}
              <Ext href="https://datatracker.ietf.org/doc/draft-klrc-aiagent-auth/">
                AI Agent Authentication and Authorization
              </Ext>{" "}
              among{" "}
              <Ext href="https://github.com/nomoticai/ietf-agent-landscape/blob/main/agent-standards-landscape.md">
                many others
              </Ext>{" "}
              on various topics related to agent AI protocols. The ITU also has
              a{" "}
              <Ext href="https://www.itu.int/en/ITU-T/focusgroups/tida/Pages/default.aspx">
                Focus Group on Trust and Identity for Humans and Agentic AI
                (FG-TIDA)
              </Ext>{" "}
              which aims to address digital identity infrastructure for humans
              and for agentic AI. NIST National Cybersecurity Center of
              Excellence (NCCoE) also published a concept paper,{" "}
              <Ext href="https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd">
                Accelerating the Adoption of Software and Artificial
                Intelligence Agent Identity and Authorization
              </Ext>
              , to propose a project to demonstrate how identity standards and
              best practices can be applied to agentic AI applications and have
              started a{" "}
              <Ext href="https://www.nist.gov/blogs/cybersecurity-insights/back-future-why-agentic-ai-needs-strong-identity-foundation">
                series of blog posts
              </Ext>{" "}
              with some of their findings.
            </p>
          </section>

          {/* ── Conclusion ────────────────────────────────────────────── */}
          <section aria-labelledby="conclusion" className="memo-section">
            <h2 id="conclusion" className="memo-h2">
              Conclusion
            </h2>

            <p>
              Agent IDs aim to serve a wide range of purposes, from enabling
              basic functionality to safeguarding against harm to the broader
              ecosystem. In this post, we described the goals of agent IDs and
              the functions required to fulfill them, and gave a few examples of
              existing and ongoing work related to agent IDs.
            </p>

            <p>
              Next, we will develop a refined methodology and use it to compare
              existing agent ID proposals and implementations in order to
              identify areas of alignment and divergence across this fast-moving
              space. If you&rsquo;d like to contribute to this work or the
              methodology behind it, please reach out at{" "}
              <a href="mailto:agentids@aisafety.sg" className="memo-link">
                agentids@aisafety.sg
              </a>
              .
            </p>
          </section>

          {/* ── Appendix ──────────────────────────────────────────────── */}
          <section aria-labelledby="appendix" className="memo-section">
            <h2 id="appendix" className="memo-h2">
              Appendix
            </h2>

            <h3 id="core-functions" className="memo-h3">
              Core Functions
            </h3>

            <figure className="memo-table">
              <figcaption className="memo-table__caption">
                <strong>Table 2:</strong> Functions required to fulfill the
                different goals of agent IDs together with implementation
                examples.
              </figcaption>
              <div className="memo-table__scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" className="w-[20%]">
                        Function
                      </th>
                      <th scope="col">Description</th>
                      <th scope="col" className="w-[30%]">
                        Implementation examples
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Identification</th>
                      <td>
                        Give every agent a unique, stable, and resolvable
                        identifier.
                      </td>
                      <td>
                        <p>SPIFFE workload identifiers</p>
                        <p>Decentralized Identifiers (DIDs)</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Credentialing</th>
                      <td>
                        Bind the identifier to a verifiable key via a
                        cryptographic credential so it cannot be spoofed.
                      </td>
                      <td>
                        <p>Verifiable Credentials</p>
                        <p>X.509 certificates</p>
                        <p>SVIDs</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Attestation &amp; Provenance</th>
                      <td>
                        Provide independent evidence of what sits behind the
                        name, e.g., model, training provenance, code, and
                        runtime.
                      </td>
                      <td>
                        <p>RATS / TEE evidence</p>
                        <p>Chained manifests (cf. C2PA)</p>
                        <p>SBOM-style provenance records</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Provisioning &amp; Lifecycle</th>
                      <td>
                        Issue credentials at runtime, rotate short-lived ones,
                        and revoke on compromise.
                      </td>
                      <td>
                        <p>Credential revocation (CRL / status list)</p>
                        <p>OAuth 2.0 Token Revocation (RFC 7009)</p>
                        <p>SCIM (RFC 7644)</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Authentication</th>
                      <td>
                        Verify that a presented credential is valid and
                        unrevoked, and that the presenter controls the key it
                        binds.
                      </td>
                      <td>
                        <p>mTLS</p>
                        <p>Proof-of-possession tokens</p>
                        <p>OpenID Connect</p>
                        <p>X.509 client certificates</p>
                        <p>HTTP Message Signatures (RFC 9421)</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Authorization</th>
                      <td>
                        Decide and enforce what an authenticated agent may do,
                        granting scoped, least-privilege permissions; require
                        verifiable human approval for sensitive actions.
                      </td>
                      <td>
                        <p>OAuth 2.0</p>
                        <p>CIBA (out-of-band approval)</p>
                        <p>Rich Authorization Requests (RAR)</p>
                        <p>Transaction-bound tokens</p>
                        <p>Policy engines (OPA / Cedar)</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Delegation</th>
                      <td>
                        Represent and verify the authority chain from the
                        principal to the agent, and from the agent to other
                        agents or sub-agents, narrowing at each hop.
                      </td>
                      <td>
                        <p>OAuth Token Exchange (RFC 8693)</p>
                        <p>Biscuits and Macaroons</p>
                        <p>UCANs</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Observability &amp; Logging</th>
                      <td>
                        Produce durable, tamper-evident, correlatable records of
                        who did what under whose authority.
                      </td>
                      <td>
                        <p>OpenTelemetry</p>
                        <p>
                          Signed invocation / execution proofs (e.g., KYA-OS
                          proof)
                        </p>
                        <p>Certificate Transparency (RFC 9162)</p>
                        <p>Time-Stamp Protocol (RFC 3161)</p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Continuous Monitoring</th>
                      <td>
                        Continuously check that behavior still matches identity
                        to allow revoking or attenuating access in real time.
                      </td>
                      <td>
                        <p>Falco (CNCF)</p>
                        <p>OpenID Shared Signals (CAEP, RISC)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </figure>

            <p>
              Additionally, there are other functions that are valuable for AI
              agents and may be supported by agent IDs, even though they may not
              contribute directly to the goals of agent IDs. For example, agent
              discovery allows for agents, their capabilities, and other
              relevant information to be discovered without having prior
              interaction. Agents can also be scored for their
              &lsquo;trustworthiness&rsquo; by third parties according to
              various criteria, where only agents of a certain reputation would
              be allowed access. Furthermore, a registry can be used to store
              information related to the agent, including their IDs, their
              capabilities, and other details on the actors behind the agent.
            </p>
          </section>

          {/* ── Notes ─────────────────────────────────────────────────── */}
          <section aria-labelledby="notes" className="memo-section">
            <h2 id="notes" className="memo-h2">
              Notes
            </h2>

            <ol className="memo-list memo-list--ordered text-[14px]">
              <FootnoteItem n={1}>
                Unfortunately, this particular OpenAI / Hugging Face incident
                cannot be prevented by agent IDs alone, as the attack was
                conducted through several intermediaries where the ID would not
                have been carried through. We describe these learnings in more
                detail in an upcoming post.
              </FootnoteItem>
              <FootnoteItem n={2}>
                There are also additional actors who may be involved in the
                process and may also play a role in agent IDs, such as agent
                platform and gateway providers. On the other hand, there are
                often implementations where these roles are performed by the
                same actor, such as when an agent and the model used are
                open-source versions hosted locally.
              </FootnoteItem>
              <FootnoteItem n={3}>
                Additionally, MCP provides{" "}
                <Ext href="https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization">
                  authorization
                </Ext>{" "}
                capabilities at the transport level.
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
            {/* TODO(SASH): confirm the memo route before shipping this link. */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/memo"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 font-medium text-[#1a2744] transition-colors hover:border-[#1a2744]"
              >
                Related memo: Designing Agent IDs
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}