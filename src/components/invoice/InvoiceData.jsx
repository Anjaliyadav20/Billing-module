// components/invoice/InvoiceData.jsx

export const invoices = [
  {
    id: "1",
    invoiceNumber: "5460930",
    company: "Avantor Performance Pvt Ltd",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Jan 8, 2025",
    status: "Processing",
    previewUrl: "/invoices/sample_invoice.pdf",
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
    ],
  },
  {
    id: "2",
    invoiceNumber: "5460931",
    company: "Ford Civil Contracting Pty Ltd.",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 30, 2025",
    status: "Manual Review",
    previewUrl: "/invoices/invoice_1.pdf",
    products: [
      { code: "3002000067", name: "Ultra-Strong Concrete", price: "$1,775.00" },
    ],
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Billing Information for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "Please see attached billing documents for final submission." },
    ],
  },
  {
    id: "3",
    invoiceNumber: "5460932",
    company: "SAI Life Sciences Limited",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 4, 2024",
    status: "Approved",
    previewUrl: "/invoices/invoice_2.pdf",
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Billing Information for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "Please see attached billing documents for final submission." },
    ],
  },
  {
    id: "4",
    invoiceNumber: "5460933",
    company: "Avantor Performance Pvt Ltd",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 7, 2025",
    status: "AI Approved",
    previewUrl: "/invoices/invoice_3.pdf",
    warning: true,
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Billing Information for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "Please see attached billing documents for final submission." },
    ],
  },
  {
    id: "5",
    invoiceNumber: "5460934",
    company: "Zhejiang chemical import and export co., ltd.",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 30, 2023",
    status: "Flagged",
    previewUrl: "/invoices/invoice_4.pdf",
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Billing Information for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "Please see attached billing documents for final submission." },
    ],
  },
  {
    id: "6",
    invoiceNumber: "5460935",
    company: "Mexichem UK Limited",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Feb 2, 2024",
    status: "Processing",
    previewUrl: "/invoices/invoice_5.pdf",
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Billing Information for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "Please see attached billing documents for final submission." },
    ],
  },
  {
    id: "7",
    invoiceNumber: "5460936",
    company: "Denisco Chemicals Private Limited Performance Pvt Ltd",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 7, 2025",
    status: "Processing",
    previewUrl: "/invoices/invoice_6.pdf",
    warning: true,
    products: [
      { code: "3004005125", name: "Cement Bags for Construction and Renovation Projects", price: "$32.15" },
      { code: "3004005126", name: "High-Strength Steel Bars for Enhanced Durability", price: "$88.00" },
      { code: "3002000055", name: "Reinforced Concrete Blend for Lasting Structures", price: "$2,475.00" },
      { code: "3002000067", name: "Ultra-Strong Concrete Mix for Resilient Foundations", price: "$1,775.00" },
      { code: "3002000055", name: "Premium Concrete Blend for Long-Lasting Builds", price: "$2,475.00" },
      { code: "3002000067", name: "Robust Concrete Solution for Structural Excellence", price: "$2,475.00" },
      { code: "3002000055", name: "Durable Concrete Mix for Reliable Construction", price: "$2,475.00" },
      { code: "3002000055", name: "Versatile Concrete Formula for All Building Needs", price: "$2,475.00" },
      { code: "3002000055", name: "Modular Scaffolding Solutions for Secure Work Environments", price: "$2,475.00" },
    ],
    pos: [
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Mar 24, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jun 10, 2025", match: "Full Match" },
      { poNumber: "1902390", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Jan 23, 2025", match: "Full Match" },
      { poNumber: "1943465", description: "Multi Pkg of machine raw material", deliveryDate: "Aug 14, 2025", poDate: "Aug 14, 2025", match: "Partial Match" },
    ],
    quotes: [
      { quoteNumber: "1902390", amount: "$12,340", vendor: "Mexichem UK Limited Pvt Ltd.", date: "Aug 14, 2025" },
      { quoteNumber: "1902391", amount: "$12,340", vendor: "Ford Civil Contracting Pty Ltd.", date: "Aug 14, 2025" },
    ],
    jobs: [
      { jobNumber: "1902390", description: "Ensuring structural integrity is crucial in every construction project.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "Steel plays a vital role in maintaining the strength of construction structures.", date: "Aug 14, 2025", status: "In-Progress" },
      { jobNumber: "1902390", description: "The use of steel enhances the durability of construction jobs significantly.", date: "Aug 14, 2025", status: "In-Progress" },
    ],
    emails: [
      {
        subject: "Invoice Details for Project Alpha-2023",
        date: "Jan 8, 2022",
        time: "11:11 AM",
        from: "smerigan@psccgib.com.au",
        to: "deepaksingh@gradianproject.com",
        body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
      },
      { subject: "Invoice Summary for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "This is a placeholder summary for Delta-2023. Kindly review." },
      { subject: "Billing Information for Project Delta-2023", date: "Jan 8, 2022", time: "11:11 AM", from: "smerigan@psccgib.com.au", to: "deepaksingh@gradianproject.com", body: "Please see attached billing documents for final submission." },
    ],
  },
];



// Account Codes (from the screenshots you shared)
export const ACCOUNT_CODES = [
  "Choose",
  "200 - Sales",
  "260 - Other Revenue",
  "270 - Interest Income",
  "310 - Cost of Goods Sold",
  "400 - Advertising",
  "404 - Bank Fees",
  "408 - Cleaning",
  "412 - Consulting & Accounting",
  "416 - Depreciation",
  "420 - Entertainment",
  "425 - Freight & Courier",
  "429 - General Expenses",
  "433 - Insurance",
  "437 - Interest Expense",
  "441 - Legal expenses",
  "445 - Light, Power, Heating",
  "449 - Motor Vehicle Expenses",
  "453 - Office Expenses",
  "461 - Printing & Stationery",
  "469 - Rent",
  "473 - Repairs and Maintenance",
  "477 - Wages and Salaries",
  "478 - Superannuation",
  "485 - Subscriptions",
  "489 - Telephone & Internet",
  "493 - Travel - National",
  "494 - Travel - International",
  "497 - Bank Revaluations",
  "498 - Unrealised Currency Gains",
  "499 - Realised Currency Gains",
  "505 - Income Tax Expense",
  "600 - Accounts Receivable",
  "610 - Accounts Receivable",
  "620 - Prepayments",
  "630 - Inventory",
  "710 - Office Equipment",
  "711 - Less Accumulated Depreciation on Office Equipment",
  "720 - Computer Equipment",
  "721 - Less Accumulated Depreciation on Computer Equipment",
  "800 - Accounts Payable",
  "801 - Unpaid Expense Claims",
  "804 - Wages Payable - Payroll",
  "820 - GST",
  "825 - PAYG Withholdings Payable",
  "826 - Superannuation Payable",
  "830 - Income Tax Payable",
  "840 - Historical Adjustment",
  "850 - Suspense",
  "860 - Rounding",
  "877 - Tracking Transfers",
  "880 - Owner A Drawings",
  "881 - Owner A Funds Introduced",
  "900 - Loan",
  "960 - Retained Earnings" ,
  "970 - Owner A Share Capital",
];

// Tax Rate options (shared by Summary & XeroDestination)
export const TAX_RATES = [
  { value: "GST on Expenses 10%", label: "GST on Expenses 10%" },
  { value: "GST Free", label: "GST Free" },
  { value: "extracted_amount", label: "Extracted Amount" },
  { value: "bas_excluded_0", label: "BAS Excluded 0%" },
  { value: "gst_free_expenses_0", label: "GST Free Expenses 0%" },
  { value: "gst_free_income_0", label: "GST Free Income 0%" },
  { value: "gst_on_imports_0", label: "GST on Imports 0%" },
  { value: "gst_on_income_10", label: "GST on Income 10%" },
];
