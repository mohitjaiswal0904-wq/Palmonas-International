/** Policy & help pages (shipping, returns, FAQs, …). */
import type { InfoPage } from "@/types";

export const policyPages: InfoPage[] = [
  {
    slug: "shipping-delivery",
    title: "Shipping & Delivery Policy",
    description:
      "Dispatch timelines, shipping charges, international delivery and order tracking at Palmonas.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      {
        type: "p",
        text: "At Palmonas, we partner with trusted courier services to ensure your orders reach you safely and efficiently.",
      },
      { type: "h2", text: "Dispatch Timelines" },
      {
        type: "ul",
        items: [
          "Demifine: Dispatched within 1–2 working days.",
          "Gold Jewelry & Lab-Grown Diamonds (LGD): Dispatched within 15–20 working days.",
        ],
      },
      { type: "h2", text: "Delivery Timelines" },
      {
        type: "p",
        text: "Delivery estimates are shown on the product pages and at checkout. These estimates depend on your specific pincode and the items you've chosen.",
      },
      { type: "h2", text: "Shipping Charges" },
      {
        type: "ul",
        items: [
          "Prepaid Orders: Free shipping across India.",
          "Cash on Delivery (COD): ₹75 COD charge is applicable. (COD not available for LGD & Fine Gold items.)",
        ],
      },
      { type: "h2", text: "International Shipping" },
      {
        type: "ul",
        items: [
          "We ship select products internationally. Delivery may take up to 18–20 working days based on destination and customs clearance.",
          "Shipping charges will be calculated at checkout.",
        ],
      },
      { type: "h2", text: "Order Tracking" },
      {
        type: "ul",
        items: [
          "Once shipped, you'll receive a tracking link via SMS, WhatsApp and Email.",
          "For any queries, contact us at support.palmonas.com.",
        ],
      },
      { type: "h2", text: "Delays & Exceptions" },
      {
        type: "ul",
        items: [
          "Occasional delays may occur due to weather, local restrictions, or courier-related issues.",
          "If your address becomes unserviceable, our team will contact you with alternatives or a refund.",
        ],
      },
      {
        type: "cta",
        label: "Visit Palmonas Support",
        href: "https://support.palmonas.com/",
      },
    ],
  },
  {
    slug: "return-exchange",
    title: "Return & Exchange Policy",
    description:
      "No-questions-asked returns within 2 days, exchanges within 10 days, and refund timelines.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      {
        type: "p",
        text: "At Palmonas, shop with confidence with our no questions asked return policy. Here's our clear and transparent policy for returns, exchanges, and refunds.",
      },
      {
        type: "h2",
        text: "For Demifine®, Gold, and Lab-Grown Diamonds (LGD)",
      },
      {
        type: "ul",
        items: [
          "You can raise a return request within 2 days of the delivery of the order.",
          "Return of products purchased under Buy 1 Get 1 or other related offers would be eligible for refund to Palmonas Wallet.",
          "Items sold at a strike-through or discounted price (without applying a coupon) are eligible for return.",
          "For Gold product returns, please ensure that all freebies received with the order are returned along with the product.",
        ],
      },
      { type: "h2", text: "Return Conditions" },
      {
        type: "ul",
        items: [
          "Items must be unused, with original packaging and tags intact.",
          "An unboxing video is required to process any claims for missing items in your order. Please ensure you record the package being opened from the sealed state for your claim to be considered.",
        ],
      },
      { type: "h2", text: "Initiating a Return Request" },
      {
        type: "ol",
        items: [
          "Go to the Return/Exchange section on the Palmonas website or app menu, or visit returns.palmonas.com/login.",
          "Enter your Palmonas Order ID and Contact Number. Ensure the Order ID is correctly entered, beginning with #PM1570.",
          "Choose the items you wish to return.",
          "Provide necessary details: select a return reason, upload a minimum of two images, specify the pickup address and date, and choose your refund method.",
          "Review your information and confirm the return request.",
        ],
      },
      {
        type: "cta",
        label: "Start a return",
        href: "https://returns.palmonas.com/login",
      },
      { type: "h2", text: "Refunds" },
      {
        type: "ul",
        items: [
          "Refunds are processed in 7–10 working days as per RBI guidelines, following item pickup and verification.",
          "Prepaid orders: Refunded to original payment method.",
          "COD orders: Refunded to UPI or bank account provided by you.",
          "LGD products can only be exchanged for other LGD items.",
          "If a customer wishes to exchange an LGD item for a Demifine® product, the total value of the selected Demifine® items must be equal to or greater than the value of the LGD item.",
          "If the value is lower, the remaining balance will be issued as store credit, which can be redeemed at checkout.",
        ],
      },
      { type: "h2", text: "Non-Returnable Items" },
      {
        type: "ul",
        items: [
          "Custom-made or personalized Jewellery.",
          "Goodbye sale or clearance products (as mentioned on product page).",
        ],
      },
      { type: "h2", text: "Exchange Policy — Within 10 Days" },
      {
        type: "table",
        headers: ["Issue Faced", "Exchange Process"],
        rows: [
          ["Damaged Item", "Exchange with same item"],
          ["Wrong Item Received", "Exchange with same item"],
          ["Size Issue", "Exchange with same variant item"],
        ],
      },
      {
        type: "p",
        text: "If the exact item is not available, our team will assist you with the closest available variant or process a refund.",
      },
      { type: "h2", text: "Initiating an Exchange Request" },
      {
        type: "ol",
        items: [
          "Go to the Return/Exchange section on the Palmonas website or app, or visit returns.palmonas.com/login.",
          "Enter your Palmonas Order ID and Contact Number.",
          "Choose the specific items from your order that you wish to exchange.",
          "Specify an exchange reason, upload at least two images, enter your pickup address and preferred date, and choose same item or a different size/color.",
          "Review all provided information and finalize your exchange request.",
        ],
      },
      {
        type: "note",
        text: "Need help? Visit support.palmonas.com — we're always here to assist you.",
      },
    ],
  },
  {
    slug: "rewards",
    title: "Palmonas Rewards Policy",
    description:
      "How Palmonas Rewards and Wallet credits are earned, redeemed and expired.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      { type: "h2", text: "What are PALMONAS REWARDS?" },
      {
        type: "p",
        text: "PALMONAS REWARDS are points that are accumulated in the PALMONAS wallet by the customer through various different avenues as mentioned below. For clearance of doubt, Palmonas rewards and points are referred as same.",
      },
      { type: "h2", text: "Avenues to earn PALMONAS REWARDS" },
      {
        type: "ul",
        items: [
          "When you register on PALMONAS you get PALMONAS REWARDS in your Wallet",
          "Refunds on any return of products purchased in offer",
          "Refund of orders purchased using PALMONAS REWARDS",
          "Refund of any other value upon the discretion of the company",
          "Order rewards (cashback of purchases)",
          "Birthday rewards",
        ],
      },
      { type: "h2", text: "Redeeming rewards" },
      {
        type: "ul",
        items: [
          "These PALMONAS REWARDS shall be applicable on all orders worth Rs 1 and above, which can be used to pay up to 99% of the order value at a time.",
          "Yes, you can pay for part of your order using PALMONAS REWARDS.",
          "When the user cancels or returns the product, the PALMONAS REWARDS get re-credited to the user's Wallet in active or expired state depending on the original expiry duration.",
          "You can view your PALMONAS Wallet under the My Accounts section.",
        ],
      },
      { type: "h2", text: "Eligibility" },
      {
        type: "ul",
        items: [
          "This Offer is open to all individual legal residents of the Republic of India aged 18 or above on the Offer Start Date.",
          "Each PALMONAS Customer should have a valid phone number and e-mail address.",
          "Participation in this Offer is purely voluntary.",
        ],
      },
      { type: "h2", text: "PALMONAS REWARDS Expiry" },
      {
        type: "table",
        headers: ["Credit Type", "Description", "Expiry Duration"],
        rows: [
          [
            "Sign-in Rewards",
            "Credits given to customers for logging into their account or through engagement campaigns",
            "30 days from date of issuance",
          ],
          [
            "Birthday Rewards",
            "Special reward credits issued to customers on their birthday",
            "30 days from date of issuance",
          ],
          [
            "Order Rewards",
            "Rewards earned based on order value (e.g., 5% cashback on purchases)",
            "90 days from date of issuance",
          ],
          [
            "Review Rewards",
            "Credits issued when a customer reviews a product",
            "30 days from date of issuance",
          ],
          [
            "Refund Credits",
            "Credits issued when a customer chooses wallet refund for a returned or cancelled order",
            "3 years from the date of issuance",
          ],
        ],
      },
      { type: "h2", text: "Other terms and conditions" },
      {
        type: "ul",
        items: [
          "The PALMONAS REWARDS can be redeemed only on website, mobile app and offline stores and is non-transferable, non-negotiable.",
          "The PALMONAS REWARDS cannot be exchanged for cash in part or full.",
          "Cannot be transferred to another account.",
          "May be subject to minimum purchase conditions during promotions.",
          "The PALMONAS REWARDS cannot be combined with any other promotion offered by PALMONAS on the Platform.",
          "Expired credits will be automatically removed from the wallet.",
          "These Terms shall be governed by the laws of India and courts at Pune, Maharashtra shall have exclusive jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "lifetime-warranty",
    title: "Lifetime Warranty Policy",
    description:
      "Lifetime warranty coverage for Demifine®, Gold, LGD and Tungsten jewellery.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      {
        type: "p",
        text: "Palmonas provides a Lifetime Warranty on all demifine® collection, ensuring long-term assurance and usability for customers.",
      },
      { type: "h2", text: "For Demifine® Collection" },
      { type: "h3", text: "Scope of Warranty" },
      {
        type: "p",
        text: "Covers tarnishing or discoloration of plating on eligible demifine® collection.",
      },
      { type: "h3", text: "Warranty Resolution & Palmonas Wallet" },
      {
        type: "table",
        headers: ["Time from Delivery", "Resolution"],
        rows: [
          ["0–6 months", "Replacement of the item"],
          [
            "6–9 months",
            "50% of invoice value in Palmonas Wallet (valid for 6 months)",
          ],
          [
            "9–12 months",
            "25% of invoice value in Palmonas Wallet (valid for 6 months)",
          ],
          [
            "Beyond 12 months",
            "15% of invoice value in Palmonas Wallet (valid for 6 months)",
          ],
        ],
      },
      {
        type: "note",
        text: "Palmonas Wallet can be used online or in-store and is not refundable or transferable.",
      },
      { type: "h3", text: "Exclusions from Warranty" },
      {
        type: "ul",
        items: [
          "Damage from regular wear and tear",
          "Breakage due to mishandling",
          "Loss of stones or crystals",
          "Third-party alterations or resizing",
          "Custom Made Jewellery sets",
        ],
      },
      { type: "h2", text: "For Gold & Lab Grown Diamonds" },
      {
        type: "p",
        text: "Lifetime warranty includes repolishing services for Gold and Lab Grown Diamonds (LGD) products.",
      },
      { type: "h2", text: "How to Raise a Warranty Claim" },
      {
        type: "ol",
        items: [
          "Visit a Palmonas Store near you with the original product and invoice (digital or printed). Store staff will guide you through the process and arrange for QC.",
          "If a store is not accessible: take a clear photograph of the affected item showing the tarnishing, then raise a request at support.palmonas.com with subject “Warranty Request – [Your Order Number]”, including a description of the issue and photo evidence.",
          "Once approved, self-ship the product to: Palmonas Warranty Desk, Office No 501/502/503/504/505(A), 5th Floor, Verdant 84, Plot 1, Lane Z, Koregaon Park Annexe, Mundhwa, Pune, Maharashtra – 411036.",
          "Share courier details and AWB number in the same email thread.",
        ],
      },
      { type: "h2", text: "For Tungsten Jewellery" },
      {
        type: "table",
        headers: ["Time from Delivery", "Resolution"],
        rows: [
          ["0–12 months", "Replacement of the item"],
          [
            "12–15 months",
            "50% of invoice value in Palmonas Wallet (valid for 6 months)",
          ],
          [
            "15–18 months",
            "25% of invoice value in Palmonas Wallet (valid for 6 months)",
          ],
          [
            "Beyond 18 months",
            "15% of invoice value in Palmonas Wallet (valid for 6 months)",
          ],
        ],
      },
      { type: "h2", text: "Additional Notes" },
      {
        type: "ul",
        items: [
          "Claims are subject to inspection and validation by the Palmonas team.",
          "Palmonas reserves the right to decline a claim if the issue does not fall within warranty terms.",
        ],
      },
    ],
  },
  {
    slug: "lifetime-buyback",
    title: "Lifetime Buy-Back Policy",
    description:
      "Buy-back values for Demifine® (paused for new purchases), Gold and Lab Grown Diamond jewellery.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      { type: "h2", text: "1. For Demi-fine® Jewellery (Paused as of 10 June 2025)" },
      {
        type: "p",
        text: "As of 10 June 2025, the Palmonas Buy-Back Program has been paused for Demi-fine Jewellery new purchases. However, customers who purchased before this date can continue to avail benefits under this policy.",
      },
      { type: "h3", text: "Eligibility" },
      {
        type: "ul",
        items: [
          "Applies only to purchases made before 10 June 2025",
          "Product must be in good condition",
          "Cannot be claimed if the product has already been processed under the Lifetime Warranty Policy",
        ],
      },
      { type: "h3", text: "Buy-Back Value — Demi-fine Jewellery" },
      {
        type: "table",
        headers: ["Time Since Purchase", "Buy-Back Value (in Palmonas Wallet)"],
        rows: [
          ["0–6 months", "50% of invoice value"],
          ["6–12 months", "25% of invoice value"],
          ["After 12 months", "15% of invoice value"],
        ],
      },
      {
        type: "note",
        text: "Palmonas Money will be credited to your Palmonas Wallet upon successful inspection and will remain valid for 12 months. It can be used online or in-store, but is non-transferable and non-refundable.",
      },
      { type: "h2", text: "2. For Lab Grown Diamond & Gold Jewellery" },
      { type: "h3", text: "Eligibility" },
      {
        type: "ul",
        items: [
          "Product must be in good condition",
          "Cannot be claimed if the product has already been processed under the Lifetime Warranty Policy",
          "Cannot be claimed if the product has been purchased from any other platforms other than our Palmonas App/Website/Retail Stores",
        ],
      },
      {
        type: "table",
        headers: ["Category", "Buy-Back Value Calculation"],
        rows: [
          [
            "Lab Grown Diamond Jewellery",
            "100% of gold value at current market rate; 80% of diamond value at current market rate. Making charges are non-refundable and will be deducted.",
          ],
          [
            "Plain Gold Jewellery",
            "100% of gold value at current market rate",
          ],
        ],
      },
      { type: "h3", text: "Note on complimentary products" },
      {
        type: "ul",
        items: [
          "Buy-back value will be calculated based on gold weight and diamond specifications at the time of inspection.",
          "Complimentary products/freebies provided with a purchase are not eligible for buy-back. Return the freebie to receive the calculated buy-back value; keep the freebie and its applicable value is deducted from the buy-back amount.",
        ],
      },
      { type: "h2", text: "3. How to Claim Buy-Back" },
      {
        type: "ol",
        items: [
          "Visit a Palmonas Store near you with the original product and invoice. Store staff will guide you and arrange for QC.",
          "If a store is not accessible: raise a request at support.palmonas.com with subject “Buy-Back Request – [Your Order Number]”, including a photo of the product and invoice/order confirmation.",
          "Once approved, self-ship the product to: Palmonas Buy-Back Desk, Office No 501/502/503/504/505(A), 5th Floor, Verdant 84, Plot 1, Lane Z, Koregaon Park Annexe, Mundhwa, Pune, Maharashtra – 411036.",
          "Share courier details and AWB number in the same email thread.",
        ],
      },
      { type: "h2", text: "Additional Notes" },
      {
        type: "ul",
        items: [
          "Hallmarked sterling silver Jewellery: If hallmark certificate is missing, ₹500 will be deducted per item.",
          "Buy-back claims are subject to quality check and approval by Palmonas.",
          "If a product is damaged or fails inspection, Palmonas may decline the buy-back claim.",
        ],
      },
    ],
  },
  {
    slug: "payment",
    title: "Payment Policy",
    description:
      "Accepted payment methods and COD eligibility restrictions at Palmonas.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      {
        type: "p",
        text: "Palmonas accepts the following payment methods for purchases made on palmonas.com and at our physical stores:",
      },
      { type: "h2", text: "Accepted Payment Methods" },
      {
        type: "ul",
        items: [
          "Prepaid Payments: Credit Cards, Debit Cards, UPI, Net Banking, Wallets",
          "Cash on Delivery (COD): Available for select orders as per the conditions below",
        ],
      },
      { type: "h2", text: "COD Eligibility Restrictions" },
      {
        type: "p",
        text: "COD is not available in the following cases:",
      },
      {
        type: "ul",
        items: [
          "Orders containing Lab-Grown Diamond (LGD) jewelry",
          "Orders containing Gold jewelry (9K, 14K & 18K)",
          "Orders above ₹10,000 in value",
          "International orders",
        ],
      },
      {
        type: "note",
        text: "All such orders must be placed using prepaid payment options only.",
      },
      {
        type: "cta",
        label: "Payment support",
        href: "https://support.palmonas.com/",
      },
    ],
  },
  {
    slug: "grievance",
    title: "Grievance Redressal Policy",
    description:
      "How Demifine Fashion Private Limited handles customer grievances and escalations.",
    group: "policy",
    eyebrow: "Policy",
    blocks: [
      {
        type: "p",
        text: "This grievance redressal policy (the “Policy”) sets out Demifine Fashion Private Limited’s (the “Company”, “we”, “us”, or “our”) approach to addressing grievances raised by customers purchasing products and services from our website https://palmonas.com/ (the “Website”).",
      },
      {
        type: "p",
        text: "This Policy is an electronic record in terms of the Information Technology Act, 2000 and applicable rules thereunder. This electronic record is generated by a computer system and does not require any physical or digital signatures.",
      },
      { type: "h2", text: "Details of the Company" },
      {
        type: "ul",
        items: [
          "Legal Entity: Demifine Fashion Private Limited",
          "Corporate Address: Office No 501/502/503/504/505(A), 5th Floor, Verdant 84, Plot 1, Lane Z, Koregaon Park Annexe, Mundhwa, Pune, Maharashtra 411036",
          "Website: https://palmonas.com",
          "Support Form: https://support.palmonas.com/",
          "Phone: +91 9175008322",
        ],
      },
      { type: "h2", text: "Objective and Scope" },
      {
        type: "p",
        text: "This Policy applies to grievances raised in connection with the purchase of goods and services through our Website. It aims to provide a clear and effective mechanism for handling complaints, ensuring customers are treated fairly, and grievances are addressed promptly and courteously.",
      },
      { type: "h2", text: "What Constitutes a Grievance" },
      {
        type: "p",
        text: "For the purpose of this Policy, a “grievance” refers to any written or verbal communication expressing dissatisfaction with any product or service offered on the Website and requesting remedial action. This does not include:",
      },
      {
        type: "ul",
        items: [
          "Incomplete or vague queries",
          "General suggestions or feedback",
          "Requests for information or clarification",
        ],
      },
      { type: "h2", text: "Submission and Handling of Grievances" },
      {
        type: "p",
        text: "Customers may raise complaints or concerns through the Support Form at support.palmonas.com or by phone at +91 9175008322.",
      },
      {
        type: "ul",
        items: [
          "Upon receipt of a grievance, an acknowledgment will be sent within 48 hours, including a Ticket ID for tracking.",
          "All grievances will be resolved within 15 working days of receipt.",
          "Customers may be contacted via email or phone during the resolution process.",
        ],
      },
      { type: "h2", text: "Escalation" },
      {
        type: "p",
        text: "If the grievance is not resolved to the satisfaction of the customer, or if further escalation is required, the customer may contact our designated officer below. The Company has appointed this individual in accordance with the Consumer Protection (E-Commerce) Rules, 2020.",
      },
      {
        type: "ul",
        items: [
          "Name: Ashish Pandey — Designation: Customer Support Head — Email: grievance@palmonas.com",
          "Nodal Officer: Akshay Deshmukh — Email: akshay.deshmukh@palmonas.com — Phone: +91 9356103736",
          "Office Address: Office No 501/502/503/504/505(A) 5th Floor, Verdant 84, Plot 1, Lane Z, Koregaon Park Annexe, Mundhwa, Pune, 411036 Maharashtra, India",
          "Working Hours: 10am to 7pm",
        ],
      },
      { type: "h2", text: "Closure of Complaints" },
      {
        type: "ul",
        items: [
          "The customer has communicated acceptance of the proposed resolution",
          "The customer fails to respond to the Company’s communication within 7 days",
          "The Company has provided a resolution and no further communication is received from the customer within the stipulated time",
        ],
      },
      {
        type: "note",
        text: "This Policy is to be read along with our Shipping & Delivery, Lifetime Warranty, Return & Exchange, Lifetime BuyBack, Payment Policy and other applicable policies listed on our Website.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Palmonas collects, uses and shares personal information when you visit or shop on the site.",
    group: "help",
    eyebrow: "Help",
    blocks: [
      {
        type: "p",
        text: "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.palmonas.com (the “Site”).",
      },
      { type: "h2", text: "Personal Information We Collect" },
      {
        type: "p",
        text: "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.",
      },
      {
        type: "ul",
        items: [
          "Cookies are data files that are placed on your device or computer and often include an anonymous unique identifier.",
          "Log files track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.",
          "Web beacons, tags, and pixels are electronic files used to record information about how you browse the Site.",
        ],
      },
      {
        type: "p",
        text: "Additionally when you make a purchase or attempt to make a purchase through the Website, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. But we do not store your credit card and other payment details with us. We refer to this information as “Order Information”.",
      },
      {
        type: "note",
        text: "We shall not be responsible for the authenticity of any of your personal information or sensitive personal data or information supplied by you.",
      },
      { type: "h2", text: "How Do We Use Your Personal Information?" },
      {
        type: "p",
        text: "We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to communicate with you; screen our orders for potential risk or fraud; and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.",
      },
      {
        type: "p",
        text: "We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site.",
      },
      { type: "h2", text: "Sharing Your Personal Information" },
      {
        type: "p",
        text: "We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store and Google Analytics to help us understand how our customers use the Site. Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
      },
      { type: "h2", text: "Your Rights" },
      {
        type: "p",
        text: "Prior to the creation of account and sharing your information and personal data including sensitive personal data or information, you have an option to not provide the same and also not give us consent to use the same. However, in such a scenario, we reserve the right, at our sole discretion, to not provide any goods or services.",
      },
      {
        type: "p",
        text: "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. Contact legal@palmonas.com with subject “Review/Changes of my Personal Data”. We will make the necessary changes within 60 days of receipt of such written communication.",
      },
      {
        type: "p",
        text: "You may, at any time, also have an option to withdraw your consent given by emailing legal@palmonas.com with subject “Withdrawal of Consent for my Personal Data”.",
      },
      { type: "h2", text: "Data Retention & Changes" },
      {
        type: "p",
        text: "When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information. We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal or regulatory reasons.",
      },
      { type: "h2", text: "Agreement to Receive Communication" },
      {
        type: "p",
        text: "By accepting these Terms of Service, you consent to receive communications from us through various channels, including in-app messages, SMS, RCS, emails, promotional and marketing calls, and newsletters.",
      },
      { type: "h2", text: "Contact Us" },
      {
        type: "p",
        text: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint visit support.palmonas.com or reach out to us at support@palmonas.com and grievance@palmonas.com.",
      },
      {
        type: "ul",
        items: [
          "Grievance Officer under IT Rules, 2011: Ashish Pandey — Customer Support Head — grievance@palmonas.com",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description:
      "General conditions for using the Palmonas website and purchasing products online.",
    group: "help",
    eyebrow: "Help",
    blocks: [
      {
        type: "p",
        text: "This website is operated by Demifine® FASHION PVT LTD. Throughout the site, the terms “we”, “us” and “our” refer to PALMONAS Jewellery. PALMONAS Jewellery offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
      },
      {
        type: "p",
        text: "By visiting our website and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the website.",
      },
      {
        type: "p",
        text: "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.",
      },
      { type: "h2", text: "Section 1 — Online Website/Store Terms" },
      {
        type: "p",
        text: "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority and have given us your consent to allow any of your minor dependents to use this site. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction. A breach or violation of any of the Terms will result in an immediate termination of your Services.",
      },
      { type: "h2", text: "Section 2 — General Conditions" },
      {
        type: "p",
        text: "We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information) may be transferred unencrypted and involve transmissions over various networks. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.",
      },
      { type: "h2", text: "Section 3 — Accuracy of Information" },
      {
        type: "p",
        text: "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions. Any reliance on the material on this site is at your own risk.",
      },
      { type: "h2", text: "Section 4 — Modifications to the Service and Prices" },
      {
        type: "p",
        text: "Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
      },
      { type: "h2", text: "Section 5 — Products or Services" },
      {
        type: "p",
        text: "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.",
      },
      { type: "h2", text: "Section 6 — Accuracy of Billing and Account Information" },
      {
        type: "p",
        text: "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.",
      },
      { type: "h2", text: "Section 7 — Optional Tools" },
      {
        type: "p",
        text: "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties. Any use by you of optional tools offered through the site is entirely at your own risk and discretion.",
      },
      { type: "h2", text: "Section 8 — Third-Party Links" },
      {
        type: "p",
        text: "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.",
      },
      { type: "h2", text: "Section 9 — User Comments, Feedback and Other Submissions" },
      {
        type: "p",
        text: "If you send certain specific submissions or creative ideas, suggestions, proposals, plans, or other materials (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.",
      },
      { type: "h2", text: "Section 10 — Personal Information" },
      {
        type: "p",
        text: "Your submission of personal information through the store is governed by our Privacy Policy.",
      },
      { type: "h2", text: "Section 11 — Errors, Inaccuracies and Omissions" },
      {
        type: "p",
        text: "Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service is inaccurate at any time without prior notice.",
      },
      { type: "h2", text: "Section 12 — Prohibited Uses" },
      {
        type: "p",
        text: "You are prohibited from using the site or its content for any unlawful purpose; to solicit others to perform or participate in any unlawful acts; to violate any regulations or laws; to infringe upon intellectual property rights; to harass or discriminate; to submit false or misleading information; to upload viruses or malicious code; to collect personal information of others; to spam or scrape; for any obscene or immoral purpose; or to interfere with or circumvent the security features of the Service.",
      },
      { type: "h2", text: "Section 13 — Disclaimer of Warranties; Limitation of Liability" },
      {
        type: "p",
        text: "We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use.",
      },
      { type: "h2", text: "Section 14 — Indemnification" },
      {
        type: "p",
        text: "You agree to indemnify, defend and hold harmless PALMONAS Jewelry and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service.",
      },
      { type: "h2", text: "Sections 15–18 — Severability, Termination, Entire Agreement, Governing Law" },
      {
        type: "p",
        text: "If any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law. These Terms of Service are effective unless and until terminated by either you or us. These Terms of Service and any policies posted by us on this site constitute the entire agreement between you and us. These Terms of Service shall be governed by and construed in accordance with the laws of India.",
      },
      { type: "h2", text: "Section 19 — Changes to Terms of Service" },
      {
        type: "p",
        text: "You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. Your continued use of or access to our website or the Service following the posting of any changes constitutes acceptance of those changes.",
      },
      { type: "h2", text: "Section 20 — Contact Information" },
      {
        type: "p",
        text: "Questions about the Terms of Service should be sent to us at care@palmonas.com.",
      },
      { type: "h2", text: "Section 21 — Agreement to Receive Communication" },
      {
        type: "p",
        text: "By accepting these Terms of Service, you consent to receive communications from us through various channels, including in-app messages, SMS (Short Message Service), RCS (Rich Communication Services), emails, promotional and marketing calls, and newsletters.",
      },
    ],
  },
  {
    slug: "faqs",
    title: "FAQs",
    description: "Frequently asked questions about Demifine® jewellery, care and materials.",
    group: "help",
    eyebrow: "Help",
    blocks: [
      { type: "h2", text: "What is Demifine® collection?" },
      {
        type: "p",
        text: "Demifine® collection is in between fine (pure gold and diamonds) and imitation (brass) jewellery. Fine jewellery stays the same for years while imitation is tarnished in a few uses. Demi fine collection is made of sterling silver and premium alloys as the base metal.",
      },
      { type: "h2", text: "Will the jewellery tarnish?" },
      {
        type: "p",
        text: "The jewellery will not tarnish if you use it properly and follow the care instructions.",
      },
      { type: "h2", text: "Is it pure silver?" },
      {
        type: "p",
        text: "Yes, the purity is 92.5, the maximum possible purity that can be attained while making silver ornaments.",
      },
      {
        type: "h2",
        text: "What kind of stones do you use? Are they genuine precious stones?",
      },
      {
        type: "p",
        text: "It varies from product to product. Most gemstone products have natural semi-precious stones, but you can go through the description of the product to verify the quality of the stones used in that specific product. We also use synthetic gemstones in various colours. Wherever a synthetic stone is used, it is clearly mentioned in the product description.",
      },
      { type: "h2", text: "How long does gold-plating on the Jewellery last?" },
      {
        type: "p",
        text: "The brightness of the gold finish on gold plated jewellery depends on a number of factors like usage, weather conditions (humid weather dulls gold finish faster) and appropriate storage.",
      },
      {
        type: "ol",
        items: [
          "We provide up to 1 year guarantee for the gold plating on the jewellery.",
          "We advise you to use gold-dipped pieces occasionally and completely dry them of sweat/moisture along with storage in air-tight plastic covers.",
          "We gold plate our jewellery with 18-carat gold which gives it a real gold look.",
          "We do not use lacquer or other harmful chemicals.",
        ],
      },
    ],
  },
];
