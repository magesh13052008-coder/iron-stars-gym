"use client";

import { useEffect, useState } from "react";

const reviews = [
  "Friendly staff and motivating vibes.",
  "Iron star gym is amazing facility, top equipment and great environment.",
  "I feel great and enjoy the compliments I received from friends and family.",
];

const membershipPlans = [
  { name: "Monthly", duration: "30 days", price: "₹999", note: "Flexible start", featured: false },
  { name: "Quarterly", duration: "90 days", price: "₹2,499", note: "Most popular", featured: true },
  { name: "Half yearly", duration: "180 days", price: "₹4,499", note: "Stronger value", featured: false },
  { name: "Annual", duration: "365 days", price: "₹7,999", note: "Best transformation", featured: false },
];

const gymMembers = [
  { id: "ISG-1001", name: "Arun Kumar", mobile: "98410 22031", plan: "Quarterly", joined: "01 Jul 2026", expiry: "30 Sep 2026", payment: "Paid", entry: "06:42 AM", exit: "08:11 AM", duration: "1h 29m", status: "Completed" },
  { id: "ISG-1014", name: "Priya S", mobile: "98847 61320", plan: "Annual", joined: "12 Jan 2026", expiry: "11 Jan 2027", payment: "Paid", entry: "07:08 AM", exit: "—", duration: "1h 12m", status: "Inside" },
  { id: "ISG-1028", name: "Vignesh R", mobile: "97908 44512", plan: "Monthly", joined: "02 Jul 2026", expiry: "01 Aug 2026", payment: "Pending", entry: "08:22 AM", exit: "09:35 AM", duration: "1h 13m", status: "Completed" },
  { id: "ISG-1035", name: "Divya M", mobile: "99403 81645", plan: "Half yearly", joined: "10 Feb 2026", expiry: "09 Aug 2026", payment: "Paid", entry: "09:04 AM", exit: "—", duration: "42m", status: "Inside" },
];

const photos = [
  {
    src: "https://lh3.googleusercontent.com/JUEw9HLO5uG91w-MU4Fsm5M9le8xx5M2RAHOd0zJpbTLjbVwJ8HpnDd1oFQ9v97L0hAEEjbkhS38lF25E9aBfDTGk2NTZMTvgweHV1dM=w1600-rw",
    alt: "Iron Stars Gym training floor in Kodambakkam",
  },
  {
    src: "https://lh3.googleusercontent.com/5x3aHeVWOA2uqXBDa05W5kqcTfqmErABcb1UCziTy13s3a7rEkpF-D5SWghvLfOKY1J-TvP1jG8VKjErv4yhlbrbbhY=w1200-rw",
    alt: "Strength equipment at Iron Stars Gym",
  },
  {
    src: "https://lh3.googleusercontent.com/mLBeo2tF3ixEVeRU2TgPJpqu87g85L71A_HbqEtUO5W9GHxIaACgaTHMT06TPo6G7FuCYhQIu2rltmFO_b9QWOF9Uda9=w1200-rw",
    alt: "Iron Stars Gym interior",
  },
  {
    src: "https://lh3.googleusercontent.com/tGQnV6GJu3e3PaMm5Rt9H1mdkoHnFQ4UR4XiViE40HpSbtUPY3P5CAojYCvZz6dE9KP3BPsJfOU5ssXpsHb52X9PiL29=w1200-rw",
    alt: "Iron Stars Gym workout area",
  },
];

function Mark() {
  return <span className="is-mark" aria-hidden="true">★</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [memberRating, setMemberRating] = useState(0);
  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [memberId, setMemberId] = useState("ISG-1001");
  const [memberChecked, setMemberChecked] = useState(true);
  const [entryStatus, setEntryStatus] = useState<"ready" | "approved">("ready");
  const [adminView, setAdminView] = useState<"attendance" | "members" | "alerts">("attendance");
  const [selectedPlanName, setSelectedPlanName] = useState("Quarterly");
  const [members, setMembers] = useState(gymMembers);

  const recordEntry = () => {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setEntryStatus("approved");
    setMembers((current) => current.map((member) => member.id === "ISG-1001" ? { ...member, entry: time, exit: "—", duration: "In progress", status: "Inside" } : member));
  };

  const recordExit = (id: string) => {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setMembers((current) => current.map((member) => member.id === id ? { ...member, exit: time, duration: "1h 24m", status: "Completed" } : member));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("shown")),
      { threshold: 0.14 },
    );
    document.querySelectorAll("[data-rise]").forEach((node) => observer.observe(node));
    const timer = window.setInterval(() => setActiveReview((value) => (value + 1) % reviews.length), 5200);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const toggleTag = (tag: string) => {
    setFeedbackTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  return (
    <main className="gym-site">
      <nav className="gym-nav" aria-label="Main navigation">
        <a className="gym-brand" href="#home"><Mark /><span>IRON <b>STARS</b></span></a>
        <button className="gym-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><i /><i /></button>
        <div className={`gym-links ${menuOpen ? "open" : ""}`}>
          <a href="#experience">Experience</a>
          <a href="#entry">Entry check</a>
          <a href="#admin">Admin</a>
          <a href="#memberships">Plans</a>
          <a href="#feedback">Feedback</a>
          <a href="#reviews">Reviews</a>
          <a href="#visit">Visit us</a>
          <a className="nav-call" href="tel:+919176961222">Call now <span>↗</span></a>
        </div>
      </nav>

      <section className="gym-hero" id="home">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <div className="gym-hero-copy">
          <span className="micro">Kodambakkam · Chennai</span>
          <h1><span>Train hard.</span><br />Rise stronger.</h1>
          <p>Three dedicated floors for cardio, strength and CrossFit—powered by serious equipment, expert support and the energy to keep you moving.</p>
          <div className="gym-actions">
            <a className="solid-action" href="tel:+919176961222">Start your transformation <b>→</b></a>
            <a className="glass-action" href="https://maps.app.goo.gl/TXpQV9a27S7Wm6BC8" target="_blank" rel="noreferrer">Get directions</a>
          </div>
        </div>
        <div className="rating-card">
          <div className="rating-main"><strong>4.5</strong><span>★★★★★</span></div>
          <div><b>319 Google reviews</b><small>Trusted by the Kodambakkam fitness community</small></div>
        </div>
        <div className="hero-index" aria-hidden="true">01</div>
      </section>

      <section className="trust-ribbon" aria-label="Gym highlights">
        <span><b>03</b> Training floors</span>
        <span><b>7000</b> Sq. ft. facility</span>
        <span><b>05:30</b> Morning opening</span>
        <span><b>22:00</b> Evening close</span>
      </section>

      <section className="gym-story" id="experience">
        <div className="story-copy" data-rise>
          <span className="micro">More than a workout</span>
          <h2>Built for your<br /><em>next level.</em></h2>
          <p>Whether your goal is fat loss, muscle gain or a complete transformation, Iron Stars brings the space, equipment and motivating atmosphere to make every session count.</p>
          <div className="discipline-list">
            <span><i>01</i> Strength &amp; weights</span>
            <span><i>02</i> Cardio conditioning</span>
            <span><i>03</i> CrossFit training</span>
            <span><i>04</i> Personal training</span>
          </div>
        </div>
        <div className="story-photo" data-rise>
          <img src={photos[0].src} alt={photos[0].alt} />
          <span>Real space.<br />Real momentum.</span>
        </div>
      </section>

      <section className="gym-gallery" aria-label="Iron Stars Gym gallery">
        <div className="gallery-intro" data-rise>
          <span className="micro">Inside Iron Stars</span>
          <h2>Everything you need.<br /><em>Nothing holding you back.</em></h2>
        </div>
        <div className="photo-grid" data-rise>
          {photos.slice(1).map((photo, index) => (
            <figure key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>0{index + 1} / Iron Stars</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="member-demo" id="entry">
        <div className="member-demo-heading" data-rise>
          <span className="micro">Smart front-desk experience</span>
          <h2>One member.<br /><em>One fast entry.</em></h2>
          <p>This prototype shows how staff can check a single member, confirm plan validity and approve entry in seconds.</p>
        </div>

        <div className="entry-workspace" data-rise>
          <div className="entry-search">
            <div className="entry-title">
              <span>Member entry check</span>
              <em><i /> System ready</em>
            </div>
            <label htmlFor="member-id">Enter member ID</label>
            <div className="member-input">
              <span>⌕</span>
              <input id="member-id" value={memberId} onChange={(event) => { setMemberId(event.target.value); setMemberChecked(false); setEntryStatus("ready"); }} placeholder="Try ISG-1001" />
              <button type="button" onClick={() => setMemberChecked(memberId.trim().toUpperCase() === "ISG-1001")}>Check member</button>
            </div>
            <small>Demo member ID: <button type="button" onClick={() => { setMemberId("ISG-1001"); setMemberChecked(true); }}>ISG-1001</button></small>

            {memberChecked ? (
              <div className="member-profile">
                <div className="profile-top">
                  <span className="profile-avatar">AK</span>
                  <div><small>ISG-1001</small><h3>Arun Kumar</h3><p>Quarterly membership</p></div>
                  <em><i /> Active</em>
                </div>
                <div className="profile-facts">
                  <span><small>Valid until</small><b>30 Sep 2026</b></span>
                  <span><small>Visits this month</small><b>18</b></span>
                  <span><small>Last entry</small><b>Yesterday · 7:12 PM</b></span>
                </div>
                <button
                  className={`approve-entry ${entryStatus}`}
                  type="button"
                  onClick={recordEntry}
                >
                  {entryStatus === "approved" ? <><b>✓ Entry approved</b><span>Main floor · Gate 01</span></> : <><b>Approve gym entry</b><span>→</span></>}
                </button>
              </div>
            ) : (
              <div className="member-empty"><span>◎</span><b>Enter ISG-1001 to check the demo member</b><small>Only one sample user is included in this prototype.</small></div>
            )}
          </div>

          <div className="entry-pass">
            <span className="pass-label">IRON STARS / DIGITAL PASS</span>
            <div className={`pass-visual ${entryStatus}`}>
              <Mark />
              <span>ISG</span>
              <b>1001</b>
              <i />
            </div>
            <div className="pass-status">
              <span><small>Access</small><b>{entryStatus === "approved" ? "Granted" : "Ready"}</b></span>
              <span><small>Floor</small><b>Main gym</b></span>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section" id="admin">
        <div className="admin-heading" data-rise>
          <div><span className="micro">Iron Stars control centre</span><h2>Today at the<br /><em>gym.</em></h2></div>
          <div className="admin-live"><i /><span>Saturday · 25 July 2026</span><strong>Live operations</strong></div>
        </div>

        <div className="admin-shell" data-rise>
          <aside className="admin-side">
            <div className="admin-logo"><Mark /><span>IRON STARS<small>ADMIN</small></span></div>
            <nav aria-label="Admin dashboard">
              <button className={adminView === "attendance" ? "active" : ""} onClick={() => setAdminView("attendance")}><span>◷</span> Today&apos;s attendance <b>4</b></button>
              <button className={adminView === "members" ? "active" : ""} onClick={() => setAdminView("members")}><span>◎</span> Member profiles <b>4</b></button>
              <button className={adminView === "alerts" ? "active" : ""} onClick={() => setAdminView("alerts")}><span>!</span> Expiry &amp; payment alerts <b>2</b></button>
            </nav>
            <div className="admin-user"><span>AD</span><div><b>Gym Admin</b><small>Front desk access</small></div></div>
          </aside>

          <div className="admin-content">
            {adminView === "attendance" && (
              <>
                <div className="admin-top"><div><small>Dashboard / Attendance</small><h3>Today&apos;s activity</h3></div><button>+ Add member</button></div>
                <div className="admin-metrics">
                  <article><span>●</span><small>Total check-ins</small><strong>42</strong><em>↑ 8% vs Friday</em></article>
                  <article><span>↗</span><small>Currently inside</small><strong>18</strong><em>Live count</em></article>
                  <article><span>◷</span><small>Average workout</small><strong>1h 18m</strong><em>Today</em></article>
                  <article><span>✓</span><small>Completed sessions</small><strong>24</strong><em>57% of entries</em></article>
                </div>
                <div className="admin-table-wrap">
                  <div className="table-heading"><div><h4>Recent member activity</h4><p>Automatic entry, exit and duration records</p></div><span>Updated now</span></div>
                  <div className="admin-table">
                    <div className="admin-tr admin-th"><span>Member</span><span>Plan</span><span>Entry time</span><span>Exit time</span><span>Duration</span><span>Status</span></div>
                    {members.map((member) => (
                      <div className="admin-tr" key={member.id}>
                        <span className="admin-member"><i>{member.name.split(" ").map((word) => word[0]).join("")}</i><b>{member.name}<small>{member.id}</small></b></span>
                        <span>{member.plan}</span><span>{member.entry}</span><span>{member.exit}</span><span><b>{member.duration}</b></span>
                        <span>
                          {member.status === "Inside" ? (
                            <button className="exit-action" type="button" onClick={() => recordExit(member.id)}>Mark exit</button>
                          ) : <em className="complete">{member.status}</em>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {adminView === "members" && (
              <>
                <div className="admin-top"><div><small>Dashboard / Members</small><h3>Member profiles</h3></div><button>+ New profile</button></div>
                <div className="member-directory">
                  {members.map((member) => (
                    <article key={member.id}>
                      <div><span>{member.name.split(" ").map((word) => word[0]).join("")}</span><div><small>{member.id}</small><h4>{member.name}</h4><p>+91 {member.mobile}</p></div><em className={member.payment.toLowerCase()}>{member.payment}</em></div>
                      <dl><div><dt>Membership</dt><dd>{member.plan}</dd></div><div><dt>Joining date</dt><dd>{member.joined}</dd></div><div><dt>Expiry date</dt><dd>{member.expiry}</dd></div></dl>
                    </article>
                  ))}
                </div>
              </>
            )}

            {adminView === "alerts" && (
              <>
                <div className="admin-top"><div><small>Dashboard / Notifications</small><h3>Expiry &amp; payments</h3></div><button>Send all reminders</button></div>
                <div className="alerts-panel">
                  <article className="warning"><span>7 days</span><div><small>Membership expiring soon</small><h4>Vignesh R · ISG-1028</h4><p>Monthly plan expires on 01 Aug 2026. Customer and admin reminder ready.</p></div><button>Send reminder</button></article>
                  <article className="danger"><span>₹</span><div><small>Payment pending</small><h4>Vignesh R · ₹999</h4><p>Monthly membership payment has not been completed.</p></div><button>Notify member</button></article>
                  <article><span>14 days</span><div><small>Membership expiring soon</small><h4>Divya M · ISG-1035</h4><p>Half-yearly plan expires on 09 Aug 2026.</p></div><button>Send reminder</button></article>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="membership-section" id="memberships">
        <div className="membership-heading" data-rise>
          <div><span className="micro">Simple membership pricing</span><h2>Choose your<br /><em>commitment.</em></h2></div>
          <p>Clear demo pricing, easy duration comparison and no confusing plan structure.</p>
        </div>
        <div className="membership-grid" data-rise>
          {membershipPlans.map((plan, index) => (
            <article key={plan.name} className={selectedPlanName === plan.name ? "featured" : ""}>
              <div className="plan-index">0{index + 1}</div>
              <span>{plan.note}</span>
              <h3>{plan.name}</h3>
              <small>{plan.duration} access</small>
              <strong>{plan.price}</strong>
              <ul><li>✓ Full gym access</li><li>✓ Cardio, weights &amp; CrossFit</li><li>✓ Digital member entry</li></ul>
              <button type="button" onClick={() => setSelectedPlanName(plan.name)}>{selectedPlanName === plan.name ? "Selected plan" : "Select plan"} <b>→</b></button>
            </article>
          ))}
        </div>
        <div className="plan-selection"><span><small>Selected membership</small><b>{selectedPlanName}</b></span><a href="tel:+919176961222">Continue with {selectedPlanName} <b>→</b></a></div>
        <p className="price-note">Prototype price list for demonstration. Confirm current membership offers directly with Iron Stars Gym.</p>
      </section>

      <section className="feedback-section" id="feedback">
        <div className="feedback-heading" data-rise>
          <div>
            <span className="micro">Your voice builds a stronger gym</span>
            <h2>How was your<br /><em>Iron Stars experience?</em></h2>
          </div>
          <p>Share a quick, honest review. Your feedback helps the team improve the equipment, coaching, cleanliness and energy of every session.</p>
        </div>

        <div className="feedback-console" data-rise>
          <div className="console-side">
            <span className="console-number">01</span>
            <div>
              <small>Member satisfaction</small>
              <strong>{memberRating ? `${memberRating}.0` : "—"}</strong>
              <span>{memberRating ? "Your current rating" : "Waiting for your rating"}</span>
            </div>
            <div className="console-progress">
              <i style={{ width: `${memberRating * 20}%` }} />
            </div>
          </div>

          <form
            className="feedback-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (memberRating) setSubmitted(true);
            }}
          >
            {submitted ? (
              <div className="thank-you">
                <span>✓</span>
                <small>Feedback received</small>
                <h3>Thank you for helping<br />Iron Stars grow stronger.</h3>
                <p>Your {memberRating}-star rating has been recorded in this demo.</p>
                <button type="button" onClick={() => { setSubmitted(false); setMemberRating(0); setFeedbackTags([]); setFeedback(""); }}>Submit another response</button>
              </div>
            ) : (
              <>
                <div className="form-step">
                  <span>01 / Rate your overall experience</span>
                  <div className="member-stars" role="group" aria-label="Choose a rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={memberRating >= star ? "active" : ""}
                        onClick={() => setMemberRating(star)}
                        aria-label={`${star} stars`}
                      >★</button>
                    ))}
                  </div>
                  <small>{memberRating ? ["", "Needs improvement", "Fair", "Good", "Excellent", "Outstanding"][memberRating] : "Tap a star to begin"}</small>
                </div>

                <div className="form-step">
                  <span>02 / What stood out today?</span>
                  <div className="tag-row">
                    {["Friendly staff", "Equipment", "Cleanliness", "Trainer support", "Motivating vibe"].map((tag) => (
                      <button type="button" key={tag} className={feedbackTags.includes(tag) ? "active" : ""} onClick={() => toggleTag(tag)}>
                        {feedbackTags.includes(tag) ? "✓ " : "+ "}{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-step">
                  <label htmlFor="member-feedback">03 / Tell us more <small>Optional</small></label>
                  <textarea
                    id="member-feedback"
                    value={feedback}
                    onChange={(event) => setFeedback(event.target.value)}
                    placeholder="Write your experience here..."
                    maxLength={280}
                  />
                  <small>{feedback.length} / 280</small>
                </div>

                <button className="submit-feedback" type="submit" disabled={!memberRating}>
                  Send feedback <span>→</span>
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="review-section" id="reviews">
        <div className="review-score" data-rise>
          <span className="micro">Member voices</span>
          <strong>4.5</strong>
          <span className="big-stars">★★★★★</span>
          <p>Based on 319 Google reviews</p>
          <a href="https://maps.app.goo.gl/TXpQV9a27S7Wm6BC8" target="_blank" rel="noreferrer">View on Google Maps ↗</a>
        </div>
        <div className="review-stage" data-rise>
          <span className="quote-mark">“</span>
          <blockquote>{reviews[activeReview]}</blockquote>
          <div className="review-meta"><span>Verified customer review</span><b>Google</b></div>
          <div className="review-dots">
            {reviews.map((review, index) => (
              <button key={review} className={index === activeReview ? "active" : ""} onClick={() => setActiveReview(index)} aria-label={`Show review ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-heading" data-rise>
          <span className="micro">Your next session starts here</span>
          <h2>Meet us at<br /><em>Iron Stars.</em></h2>
        </div>
        <div className="contact-grid" data-rise>
          <article>
            <span>01 / Address</span>
            <p>200, Rangarajapuram Main Rd, opposite Sriram Studios, Subramaniyan Nagar, Kodambakkam, Chennai, Tamil Nadu 600024</p>
            <a href="https://maps.app.goo.gl/TXpQV9a27S7Wm6BC8" target="_blank" rel="noreferrer">Open directions ↗</a>
          </article>
          <article>
            <span>02 / Call &amp; WhatsApp</span>
            <p><a className="contact-big" href="tel:+919176961222">+91 91769 61222</a></p>
            <a href="https://wa.me/919176961222" target="_blank" rel="noreferrer">Message on WhatsApp ↗</a>
          </article>
          <article>
            <span>03 / Instagram</span>
            <p><a className="contact-big" href="https://www.instagram.com/ironstars_gym/" target="_blank" rel="noreferrer">@ironstars_gym</a></p>
            <a href="https://www.instagram.com/ironstars_gym/" target="_blank" rel="noreferrer">Follow the journey ↗</a>
          </article>
        </div>
      </section>

      <section className="closing-cta" data-rise>
        <Mark />
        <span className="micro">No excuses. Just progress.</span>
        <h2>Your strongest<br />chapter starts now.</h2>
        <a className="solid-action" href="tel:+919176961222">Call Iron Stars <b>→</b></a>
      </section>

      <footer className="gym-footer">
        <a className="gym-brand" href="#home"><Mark /><span>IRON <b>STARS</b></span></a>
        <p>Kodambakkam, Chennai · +91 91769 61222</p>
        <div><a href="https://www.instagram.com/ironstars_gym/" target="_blank" rel="noreferrer">Instagram</a><a href="#home">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
