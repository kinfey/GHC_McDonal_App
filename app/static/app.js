const translations = {
  "zh-CN": {
    languageLabel: "语言",
    demoPill: "非官方模拟体验",
    heroTitle: "今天想吃点",
    heroAccent: "什么好料？",
    heroDescription: "直接问 AI 菜单或优惠，也可以挑选餐点后核对明细、确认订单并发送 email。",
    chatNow: "直接咨询 AI",
    popular: "人气精选",
    menuHeading: "把快乐加入购物车",
    assistantTitle: "点餐 Copilot",
    assistantSubtitle: "由 GPT-6-astra 提供支持 · 可直接聊天",
    welcome: "嗨！无需先选择套餐，直接问我菜单、优惠券或点餐问题即可。",
    namePlaceholder: "称呼（下单必填）",
    emailPlaceholder: "Email（选填）",
    reviewOrder: "请 AI 核对",
    confirmOrder: "确认下单",
    chatPlaceholder: "直接输入：今天有什么优惠券？",
    all: "全部",
    addItem: "加入餐点",
    emptyCart: "购物车为空，但你仍可直接聊天咨询",
    estimatedTotal: "预计合计",
    thinking: "点餐 Copilot 思考中…",
    contactError: "暂时无法联系点餐 Agent：",
    emptyOrder: "请先加入至少一项餐点；普通咨询可直接在下方聊天框输入。",
    missingName: "确认下单前请填写称呼。",
    selectedPrompt: "我选择了“{name}”。请结合麦当劳官方 MCP 进入点餐查询流程；如果信息不足，请先询问我的取餐方式和位置。",
    confirmPrompt: "我明确确认以下模拟订单与总价，请建立订单。称呼：{name}；餐点 JSON：{items}。{email}",
    reviewPrompt: "请使用工具核对以下餐点与完整总价，但不要建立订单：{items}",
    sendEmail: "建立后请发送确认信至 {email}。",
    noEmail: "无需发送 email。",
    menuError: "菜单加载失败，请稍后重试。",
    categories: { "汉堡": "汉堡", "小食": "小食", "甜点": "甜点", "饮品": "饮品" },
    menu: {
      "big-mac": ["经典双层牛肉堡", "双层牛肉、酸黄瓜、爽脆生菜与经典酱汁"],
      "mc-chicken": ["黄金脆鸡堡", "酥脆鸡排、清爽生菜与顺滑蛋黄酱"],
      "nuggets-6": ["麦乐鸡 6 块", "外酥里嫩，附一款自选酱料"],
      fries: ["经典薯条", "金黄酥脆，中份"],
      "apple-pie": ["香芋派", "香甜馅料与酥脆外皮"],
      cola: ["冰爽可乐", "清凉气泡饮，中杯"],
    },
  },
  "zh-TW": {
    languageLabel: "語言",
    demoPill: "非官方模擬體驗",
    heroTitle: "今天想吃點",
    heroAccent: "什麼好料？",
    heroDescription: "直接問 AI 菜單或優惠，也可以挑選餐點後核對明細、確認訂單並寄送 email。",
    chatNow: "直接詢問 AI",
    popular: "人氣精選",
    menuHeading: "把快樂加入購物車",
    assistantTitle: "點餐 Copilot",
    assistantSubtitle: "由 GPT-6-astra 提供支援 · 可直接聊天",
    welcome: "嗨！無需先選擇套餐，直接問我菜單、優惠券或點餐問題即可。",
    namePlaceholder: "稱呼（下單必填）",
    emailPlaceholder: "Email（選填）",
    reviewOrder: "請 AI 核對",
    confirmOrder: "確認下單",
    chatPlaceholder: "直接輸入：今天有什麼優惠券？",
    all: "全部",
    addItem: "加入餐點",
    emptyCart: "購物車是空的，但你仍可直接聊天詢問",
    estimatedTotal: "預估合計",
    thinking: "點餐 Copilot 思考中…",
    contactError: "暫時無法聯絡點餐 Agent：",
    emptyOrder: "請先加入至少一項餐點；一般詢問可直接在下方聊天框輸入。",
    missingName: "確認下單前請填寫稱呼。",
    selectedPrompt: "我選擇了「{name}」。請結合麥當勞官方 MCP 進入點餐查詢流程；如果資訊不足，請先詢問我的取餐方式和位置。",
    confirmPrompt: "我明確確認以下模擬訂單與總價，請建立訂單。稱呼：{name}；餐點 JSON：{items}。{email}",
    reviewPrompt: "請使用工具核對以下餐點與完整總價，但不要建立訂單：{items}",
    sendEmail: "建立後請寄送確認信至 {email}。",
    noEmail: "無需寄送 email。",
    menuError: "菜單載入失敗，請稍後重試。",
    categories: { "汉堡": "漢堡", "小食": "小食", "甜点": "甜點", "饮品": "飲品" },
    menu: {
      "big-mac": ["經典雙層牛肉堡", "雙層牛肉、酸黃瓜、爽脆生菜與經典醬汁"],
      "mc-chicken": ["黃金脆雞堡", "酥脆雞排、清爽生菜與滑順蛋黃醬"],
      "nuggets-6": ["麥克雞塊 6 塊", "外酥內嫩，附一款自選醬料"],
      fries: ["經典薯條", "金黃酥脆，中份"],
      "apple-pie": ["香芋派", "香甜餡料與酥脆外皮"],
      cola: ["冰涼可樂", "沁涼氣泡飲，中杯"],
    },
  },
  en: {
    languageLabel: "Language",
    demoPill: "Unofficial demo",
    heroTitle: "What are you",
    heroAccent: "craving today?",
    heroDescription: "Ask AI about the menu or offers, or choose items and let it review, confirm, and email your order.",
    chatNow: "Chat with AI",
    popular: "Popular picks",
    menuHeading: "Add a little joy to your cart",
    assistantTitle: "Ordering Copilot",
    assistantSubtitle: "Powered by GPT-6-astra · Chat anytime",
    welcome: "Hi! You can ask about the menu, coupons, or ordering without selecting a meal first.",
    namePlaceholder: "Name (required to order)",
    emailPlaceholder: "Email (optional)",
    reviewOrder: "Review with AI",
    confirmOrder: "Confirm order",
    chatPlaceholder: "Ask: What coupons are available today?",
    all: "All",
    addItem: "Add item",
    emptyCart: "Your cart is empty, but you can still chat with the assistant",
    estimatedTotal: "Estimated total",
    thinking: "Ordering Copilot is thinking…",
    contactError: "Unable to reach the ordering agent: ",
    emptyOrder: "Add at least one item first. You can still ask general questions below.",
    missingName: "Enter your name before confirming the order.",
    selectedPrompt: "I selected “{name}”. Start the McDonald's official MCP ordering lookup flow. If details are missing, ask for my fulfillment method and location first.",
    confirmPrompt: "I explicitly confirm this simulated order and total. Customer: {name}; items JSON: {items}. {email}",
    reviewPrompt: "Use the tools to review these items and the complete total, but do not create an order: {items}",
    sendEmail: "After creating it, send the confirmation to {email}.",
    noEmail: "No email is required.",
    menuError: "The menu could not be loaded. Please try again.",
    categories: { "汉堡": "Burgers", "小食": "Sides", "甜点": "Desserts", "饮品": "Drinks" },
    menu: {
      "big-mac": ["Classic Double Beef Burger", "Two beef patties, pickles, lettuce, and classic sauce"],
      "mc-chicken": ["Golden Crispy Chicken Burger", "Crispy chicken, fresh lettuce, and creamy mayonnaise"],
      "nuggets-6": ["6-Piece Chicken Nuggets", "Crispy outside and tender inside, with one sauce"],
      fries: ["Classic Fries", "Golden and crispy, medium size"],
      "apple-pie": ["Taro Pie", "Sweet taro filling in a crisp pastry shell"],
      cola: ["Iced Cola", "Refreshing carbonated drink, medium size"],
    },
  },
};

const state = {
  menu: [],
  cart: new Map(),
  category: "all",
  locale: localStorage.getItem("golden-order-locale") || "zh-CN",
  sessionId: localStorage.getItem("golden-order-session") || crypto.randomUUID(),
};
localStorage.setItem("golden-order-session", state.sessionId);

const $ = (selector) => document.querySelector(selector);
const menuGrid = $("#menu-grid");
const panel = $("#order-panel");
const scrim = $("#scrim");

function t(key) {
  return translations[state.locale][key];
}

function format(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

function localizedItem(item) {
  const [name, description] = translations[state.locale].menu[item.id] || [
    item.name,
    item.description,
  ];
  return { ...item, name, description };
}

function money(cents) {
  return new Intl.NumberFormat(state.locale, {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function renderCategories() {
  const categories = ["all", ...new Set(state.menu.map((item) => item.category))];
  $("#categories").innerHTML = categories.map((category) => `
    <button class="${category === state.category ? "active" : ""}" data-category="${category}">
      ${category === "all" ? t("all") : t("categories")[category]}
    </button>`).join("");
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderCategories();
      renderMenu();
    });
  });
}

function renderMenu() {
  const visible = state.category === "all"
    ? state.menu
    : state.menu.filter((item) => item.category === state.category);
  menuGrid.innerHTML = visible.map((sourceItem) => {
    const item = localizedItem(sourceItem);
    return `
    <article class="menu-card">
      <div class="menu-visual" style="--accent:${item.accent}">${item.emoji}</div>
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-footer">
          <span class="price">${money(item.price_cents)}</span>
          <button class="add-button" data-add="${item.id}">${t("addItem")}</button>
        </div>
      </div>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.add;
      state.cart.set(id, (state.cart.get(id) || 0) + 1);
      renderCart();
      openPanel();
      const item = localizedItem(state.menu.find((entry) => entry.id === id));
      sendMessage(format(t("selectedPrompt"), { name: item.name }));
    });
  });
}

function cartItems() {
  return [...state.cart.entries()].map(([itemId, quantity]) => ({
    item_id: itemId,
    quantity,
    item: localizedItem(state.menu.find((entry) => entry.id === itemId)),
  }));
}

function renderCart() {
  const items = cartItems();
  $("#cart-count").textContent = items.reduce((sum, item) => sum + item.quantity, 0);
  if (!items.length) {
    $("#cart-summary").innerHTML = `<div class="empty-cart">${t("emptyCart")}</div>`;
    return;
  }
  const subtotal = items.reduce((sum, line) => sum + line.item.price_cents * line.quantity, 0);
  const service = subtotal >= 6000 ? 0 : 500;
  $("#cart-summary").innerHTML = `
    ${items.map((line) => `
      <div class="cart-line">
        <span>${line.item.name} × ${line.quantity}</span>
        <strong>${money(line.item.price_cents * line.quantity)}</strong>
        <button data-remove="${line.item_id}" aria-label="移除一份">−</button>
      </div>`).join("")}
    <div class="cart-total"><span>${t("estimatedTotal")}</span><span>${money(subtotal + service)}</span></div>`;
  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = state.cart.get(button.dataset.remove);
      if (current <= 1) state.cart.delete(button.dataset.remove);
      else state.cart.set(button.dataset.remove, current - 1);
      renderCart();
    });
  });
}

function openPanel() {
  panel.classList.add("open");
  scrim.classList.add("open");
}

function closePanel() {
  panel.classList.remove("open");
  scrim.classList.remove("open");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

function isTableDivider(line) {
  const cells = line.trim().replace(/^\||\|$/g, "").split("|");
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function tableCells(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function renderMarkdown(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const html = [];
  let index = 0;
  let listType = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      closeList();
      const language = escapeHtml(line.slice(3).trim());
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      html.push(
        `<pre><code${language ? ` data-language="${language}"` : ""}>` +
          `${escapeHtml(code.join("\n"))}</code></pre>`,
      );
      index += 1;
      continue;
    }

    if (index + 1 < lines.length && line.includes("|") && isTableDivider(lines[index + 1])) {
      closeList();
      const headers = tableCells(line);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      html.push(
        `<div class="markdown-table-wrap"><table><thead><tr>${headers
          .map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map(
            (row) =>
              `<tr>${headers
                .map((_, cellIndex) => `<td>${renderInlineMarkdown(row[cellIndex] || "")}</td>`)
                .join("")}</tr>`,
          )
          .join("")}</tbody></table></div>`,
      );
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length + 2;
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const nextListType = ordered ? "ol" : "ul";
      if (listType !== nextListType) {
        closeList();
        listType = nextListType;
        html.push(`<${listType}>`);
      }
      html.push(`<li>${renderInlineMarkdown((unordered || ordered)[1])}</li>`);
      index += 1;
      continue;
    }

    closeList();
    if (line.trim()) {
      html.push(`<p>${renderInlineMarkdown(line)}</p>`);
    }
    index += 1;
  }

  closeList();
  return html.join("");
}

function addMessage(text, role, extraClass = "") {
  const node = document.createElement("div");
  node.className = `message ${role} ${extraClass}`;
  if (role === "assistant" && !extraClass.includes("loading")) {
    node.innerHTML = renderMarkdown(text);
  } else {
    node.textContent = text;
  }
  $("#chat").append(node);
  $("#chat").scrollTop = $("#chat").scrollHeight;
  return node;
}

async function sendMessage(message) {
  addMessage(message, "user");
  const loading = addMessage(t("thinking"), "assistant", "loading");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: state.sessionId,
        message,
        cart: cartItems().map(({ item_id, quantity }) => ({ item_id, quantity })),
        locale: state.locale,
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || "Agent request failed");
    loading.innerHTML = renderMarkdown(payload.message);
    loading.classList.remove("loading");
  } catch (error) {
    loading.textContent = `${t("contactError")}${error.message}`;
    loading.classList.remove("loading");
  }
}

function orderPrompt(confirmed) {
  const items = cartItems().map(({ item_id, quantity }) => ({ item_id, quantity }));
  if (!items.length) {
    addMessage(t("emptyOrder"), "assistant");
    return null;
  }
  const name = $("#customer-name").value.trim();
  if (confirmed && !name) {
    addMessage(t("missingName"), "assistant");
    return null;
  }
  const email = $("#email").value.trim();
  return confirmed
    ? format(t("confirmPrompt"), {
        name,
        items: JSON.stringify(items),
        email: email ? format(t("sendEmail"), { email }) : t("noEmail"),
      })
    : format(t("reviewPrompt"), { items: JSON.stringify(items) });
}

function applyLocale() {
  document.documentElement.lang = state.locale;
  $("#language-select").value = state.locale;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  $("#welcome-message").innerHTML = renderMarkdown(t("welcome"));
  renderCategories();
  renderMenu();
  renderCart();
}

$("#cart-fab").addEventListener("click", openPanel);
$("#hero-chat").addEventListener("click", () => {
  openPanel();
  $("#chat-input").focus();
});
$("#close-panel").addEventListener("click", closePanel);
scrim.addEventListener("click", closePanel);
$("#language-select").addEventListener("change", (event) => {
  state.locale = event.target.value;
  localStorage.setItem("golden-order-locale", state.locale);
  applyLocale();
});
$("#review-order").addEventListener("click", () => {
  const prompt = orderPrompt(false);
  if (prompt) sendMessage(prompt);
});
$("#confirm-order").addEventListener("click", () => {
  const prompt = orderPrompt(true);
  if (prompt) sendMessage(prompt);
});
$("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#chat-input");
  const message = input.value.trim();
  if (!message) return;
  input.value = "";
  sendMessage(message);
});

fetch("/api/menu")
  .then((response) => response.json())
  .then((menu) => {
    state.menu = menu;
    applyLocale();
  })
  .catch(() => {
    menuGrid.innerHTML = `<p>${t("menuError")}</p>`;
  });
