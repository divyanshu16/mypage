(function () {
  "use strict";

  var CALENDAR_URL = "https://calendar.app.google/hpWXbSN4HfuSRyvXA";
  var EMAIL = "divyanshu@divyanshus.com";

  var BOOK_CTA =
    '<a href="' + CALENDAR_URL + '" target="_blank" class="chat-cal-link">Book a free 30-min call</a>';
  var EMAIL_CTA =
    ' or <a href="mailto:' + EMAIL + '">' + EMAIL + "</a>";

  var intents = [
    {
      name: "greeting",
      triggers: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "sup"],
      response:
        "Hey! I'm here to help you learn about Divyanshu's services. What would you like to know about?",
    },
    {
      name: "services_overview",
      triggers: ["services", "what do you do", "what do you offer", "what can you build", "help me with", "offerings", "what you do"],
      response:
        "Divyanshu builds three types of solutions:<br><br>" +
        "<b>1. Custom AI Agents</b> — autonomous agents that handle support tickets, qualify leads, enrich records, etc.<br>" +
        "<b>2. Process Automation</b> — end-to-end pipelines for document processing, report generation, data validation.<br>" +
        "<b>3. ML Systems</b> — real models (classification, forecasting, recommendations) built and deployed in production.<br><br>" +
        BOOK_CTA + " to discuss which fits your needs.",
    },
    {
      name: "ai_agents",
      triggers: ["ai agent", "custom agent", "autonomous agent", "chatbot", "support ticket", "lead qualification", "agents"],
      response:
        "Custom AI Agents can autonomously handle tasks like triaging support tickets, qualifying leads, drafting responses, and enriching records — so your team focuses on work that actually needs a human.<br><br>" +
        BOOK_CTA + " to explore what an agent could do for your workflow.",
    },
    {
      name: "process_automation",
      triggers: ["automation", "automate", "process automation", "document processing", "report generation", "data validation", "pipeline", "workflow"],
      response:
        "Divyanshu builds AI-powered pipelines that handle manual workflows end-to-end — document processing, report generation, data validation. You upload a file, the system does the rest.<br><br>" +
        BOOK_CTA + " to map out your automation opportunity.",
    },
    {
      name: "ml_systems",
      triggers: ["ml system", "machine learning", "model", "classification", "forecasting", "recommendation", "demand forecasting", "text classification", "ml consulting"],
      response:
        "Sometimes you need a real model, not just an API call. Divyanshu builds and deploys production ML systems — text classification, demand forecasting, recommendation engines, route optimization — with proper monitoring.<br><br>" +
        BOOK_CTA + " to discuss whether ML is the right fit.",
    },
    {
      name: "pricing",
      triggers: ["pricing", "price", "cost", "how much", "rate", "fees", "budget", "expensive", "affordable", "payment"],
      response:
        "Pricing is <b>Base Fee + Performance Bonus</b>:<br><br>" +
        "- <b>Base fee</b> covers effort and infrastructure<br>" +
        "- <b>Performance bonus</b> (the larger portion) is tied to agreed outcomes<br><br>" +
        "If we don't hit the agreed KPIs, you don't pay the performance portion. Flexible options include milestone-based or a small paid pilot first.<br><br>" +
        BOOK_CTA + " to get a tailored estimate.",
    },
    {
      name: "experience",
      triggers: ["experience", "background", "track record", "portfolio", "past work", "what have you built", "results", "case study", "clients", "fortune"],
      response:
        "7+ years building AI for Fortune 100 companies:<br><br>" +
        "- <b>Smart Bidding</b> (Sprinklr) — 37% more leads, 19% lower cost per lead, $5M+ annual revenue, pending US patent<br>" +
        "- <b>Smart Reply & Compose</b> — multilingual AI for Samsung, Telefónica<br>" +
        "- <b>CI/CD Automation</b> — saved 900+ dev hours/month across 50+ repos<br><br>" +
        BOOK_CTA + " to discuss your project.",
    },
    {
      name: "booking",
      triggers: ["book", "call", "schedule", "meeting", "discovery", "consultation", "talk", "chat with divyanshu", "speak"],
      response:
        "Great idea! The discovery call is free — 30 minutes to understand your problem. Divyanshu will be honest if AI isn't the right solution.<br><br>" +
        BOOK_CTA + EMAIL_CTA + ".",
    },
    {
      name: "contact",
      triggers: ["contact", "email", "reach", "get in touch", "linkedin"],
      response:
        "You can reach Divyanshu at:<br><br>" +
        "- " + BOOK_CTA + "<br>" +
        '- Email: <a href="mailto:' + EMAIL + '">' + EMAIL + "</a><br>" +
        '- LinkedIn: <a href="https://www.linkedin.com/in/divyanshushekhar16/" target="_blank">divyanshushekhar16</a>',
    },
    {
      name: "process",
      triggers: ["how do you work", "process", "how it works", "what's the process", "engagement", "steps", "timeline"],
      response:
        "Here's how engagements work:<br><br>" +
        "<b>1. Discovery (Free)</b> — 30-min call to understand your problem<br>" +
        "<b>2. Proposal</b> — clear scope and pricing, no surprises<br>" +
        "<b>3. Build</b> — working software shipped on a timeline, not slide decks<br>" +
        "<b>4. Deliver</b> — production-ready system with docs. No disappearing after handoff.<br><br>" +
        BOOK_CTA + " to kick things off.",
    },
    {
      name: "ideal_client",
      triggers: ["good fit", "ideal client", "right for me", "who do you work with", "should i", "is this for me", "my company"],
      response:
        "<b>Good fit:</b><br>" +
        "- Tech companies with manual, repetitive processes<br>" +
        "- Teams that tried automation but got stuck<br>" +
        "- Companies that want AI but don't know where to start<br>" +
        "- Scaling teams that need to do more without proportionally hiring<br><br>" +
        "<b>Not a fit:</b> \"AI for our pitch deck\", no clear problem, or need a manager not a builder.<br><br>" +
        BOOK_CTA + " — the call is free, and Divyanshu will be honest about fit.",
    },
    {
      name: "thanks_bye",
      triggers: ["thanks", "thank you", "bye", "goodbye", "see you", "cheers", "appreciate it"],
      response:
        "You're welcome! If you think of anything else, feel free to come back anytime.<br><br>" +
        BOOK_CTA + " whenever you're ready.",
    },
  ];

  var fallbackResponse =
    "I'm not sure I have a specific answer for that, but Divyanshu would be happy to discuss it directly.<br><br>" +
    BOOK_CTA + EMAIL_CTA + ".";

  var welcomeMessage =
    "Hi! I can help you learn about Divyanshu's AI & ML services. What are you interested in?";

  var suggestedTopics = [
    { label: "Services", text: "What services do you offer?" },
    { label: "Pricing", text: "How does pricing work?" },
    { label: "Experience", text: "What's your track record?" },
    { label: "Book a call", text: "I'd like to book a call" },
  ];

  // Short triggers that need word-boundary matching to avoid false positives
  // e.g. "hi" inside "this", "book" inside "facebook"
  var wordBoundaryTriggers = ["hi", "hey", "sup", "book", "call", "model"];

  // --- Intent matching ---
  function matchIntent(input) {
    var lower = input.toLowerCase();
    var best = null;
    var bestScore = 0;

    for (var i = 0; i < intents.length; i++) {
      var score = 0;
      for (var j = 0; j < intents[i].triggers.length; j++) {
        var trigger = intents[i].triggers[j];
        var matched = false;

        if (wordBoundaryTriggers.indexOf(trigger) !== -1) {
          var re = new RegExp("\\b" + trigger + "\\b");
          matched = re.test(lower);
        } else {
          matched = lower.indexOf(trigger) !== -1;
        }

        if (matched) {
          score += trigger.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = intents[i];
      }
    }

    return best ? best.response : fallbackResponse;
  }

  // --- DOM creation ---
  var chatIcon =
    '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>';
  var closeIcon =
    '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
  var sendIcon =
    '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

  var isOpen = false;
  var hasOpened = false;

  function build() {
    // Toggle button
    var toggle = document.createElement("button");
    toggle.className = "chat-toggle";
    toggle.setAttribute("aria-label", "Open chat");
    toggle.innerHTML = chatIcon;

    // Popup
    var popup = document.createElement("div");
    popup.className = "chat-popup";
    popup.innerHTML =
      '<div class="chat-header"><span class="chat-header-dot"></span> Ask me anything</div>' +
      '<div class="chat-messages"></div>' +
      '<div class="chat-input-area">' +
      '<input class="chat-input" type="text" placeholder="Type a question..." />' +
      '<button class="chat-send" aria-label="Send">' + sendIcon + "</button>" +
      "</div>";

    document.body.appendChild(popup);
    document.body.appendChild(toggle);

    var messagesEl = popup.querySelector(".chat-messages");
    var inputEl = popup.querySelector(".chat-input");
    var sendBtn = popup.querySelector(".chat-send");

    function addMessage(html, sender) {
      var div = document.createElement("div");
      div.className = "chat-msg chat-msg-" + sender;
      div.innerHTML = html;

      // FB Pixel on calendar link clicks from chat
      var calLinks = div.querySelectorAll("a.chat-cal-link");
      for (var k = 0; k < calLinks.length; k++) {
        calLinks[k].addEventListener("click", function () {
          if (typeof fbq !== "undefined") {
            fbq("track", "Lead", {
              content_name: "Chat Widget - Book Call",
              content_category: "Consultation",
            });
          }
        });
      }

      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addSuggestions() {
      var wrap = document.createElement("div");
      wrap.className = "chat-suggestions";
      for (var s = 0; s < suggestedTopics.length; s++) {
        var btn = document.createElement("button");
        btn.className = "chat-suggestion-btn";
        btn.textContent = suggestedTopics[s].label;
        btn.setAttribute("data-text", suggestedTopics[s].text);
        btn.addEventListener("click", function () {
          var text = this.getAttribute("data-text");
          // Remove suggestion buttons
          var existing = messagesEl.querySelector(".chat-suggestions");
          if (existing) existing.remove();
          handleUserMessage(text);
        });
        wrap.appendChild(btn);
      }
      messagesEl.appendChild(wrap);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleUserMessage(text) {
      if (!text.trim()) return;
      addMessage(text.replace(/</g, "&lt;").replace(/>/g, "&gt;"), "user");
      var response = matchIntent(text);
      setTimeout(function () {
        addMessage(response, "bot");
      }, 300);
    }

    function toggleChat() {
      isOpen = !isOpen;
      popup.classList.toggle("open", isOpen);
      toggle.innerHTML = isOpen ? closeIcon : chatIcon;
      toggle.setAttribute("aria-label", isOpen ? "Close chat" : "Open chat");

      if (isOpen && !hasOpened) {
        hasOpened = true;
        addMessage(welcomeMessage, "bot");
        addSuggestions();
        if (typeof fbq !== "undefined") {
          fbq("trackCustom", "ChatWidgetOpen");
        }
      }

      if (isOpen) {
        setTimeout(function () {
          inputEl.focus();
        }, 200);
      }
    }

    toggle.addEventListener("click", toggleChat);

    sendBtn.addEventListener("click", function () {
      handleUserMessage(inputEl.value);
      inputEl.value = "";
    });

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        handleUserMessage(inputEl.value);
        inputEl.value = "";
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        toggleChat();
      }
    });
  }

  // MkDocs instant nav only fires DOMContentLoaded once, so this is safe
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
