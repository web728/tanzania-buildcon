import { sendMail, getNotificationRecipients } from "./mailer";
import { organiserNotificationEmail, userAcknowledgementEmail } from "./templates";
import type { ExhibitorEnquiryInput } from "@/lib/validation/exhibitorEnquiry";
import type { VisitorRegistrationInput } from "@/lib/validation/visitorRegistration";
import type { ContactEnquiryInput } from "@/lib/validation/contactEnquiry";
import type { PartnerEnquiryInput } from "@/lib/validation/partnerEnquiry";

export async function sendExhibitorEnquiryEmails(data: ExhibitorEnquiryInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Exhibitor Enquiry – ${data.companyName} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Exhibitor Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Company", value: data.companyName },
          { label: "Country", value: data.country },
          { label: "Company Type", value: data.companyType },
          { label: "Contact", value: `${data.firstName} ${data.lastName} (${data.designation})` },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Product Category", value: data.productCategory },
          { label: "Preferred Participation", value: data.preferredParticipation },
          { label: "Required Area", value: data.requiredArea },
          { label: "Products / Services", value: data.productsServices || "-" },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your exhibitor enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.firstName,
      heading: "Exhibitor Enquiry Received",
      bodyText:
        "Thank you for your interest in exhibiting at Tanzania Buildcon International Expo. Our exhibition sales team has received your enquiry and will contact you shortly with participation details.",
      referenceId: data.referenceId,
    }),
  });
}

export async function sendVisitorRegistrationEmails(data: VisitorRegistrationInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Visitor Registration – ${data.company} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Visitor Registration",
        referenceId: data.referenceId,
        rows: [
          { label: "Name", value: `${data.firstName} ${data.lastName}` },
          { label: "Company", value: data.company },
          { label: "Designation", value: data.designation },
          { label: "Country", value: data.country },
          { label: "City", value: data.city },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Nature of Business", value: data.natureOfBusiness },
          { label: "Products Interested", value: data.productsInterested.join(", ") },
          { label: "Purchasing Responsibility", value: data.purchasingResponsibility },
          { label: "Purpose of Visit", value: data.purposeOfVisit },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `Your visitor registration is confirmed – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.firstName,
      heading: "Visitor Registration Received",
      bodyText:
        "Thank you for registering to visit Tanzania Buildcon International Expo. Please keep this reference for your records — further visit details will follow closer to the show.",
      referenceId: data.referenceId,
    }),
  });
}

export async function sendContactEnquiryEmails(data: ContactEnquiryInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Website Enquiry – ${data.name} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Website Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Name", value: data.name },
          { label: "Company", value: data.company },
          { label: "Country", value: data.country },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Interest", value: data.interest },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.name,
      heading: "Enquiry Received",
      bodyText:
        "Thank you for contacting Tanzania Buildcon International Expo. Our team will respond to your enquiry shortly.",
      referenceId: data.referenceId,
    }),
  });
}

export async function sendPartnerEnquiryEmails(data: PartnerEnquiryInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Partnership Enquiry – ${data.organisation} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Partnership Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Organisation", value: data.organisation },
          { label: "Type", value: data.organisationType },
          { label: "Country", value: data.country },
          { label: "Contact Person", value: data.contactPerson },
          { label: "Email", value: data.email },
          { label: "Phone", value: data.phone },
          { label: "Nature of Enquiry", value: data.natureOfEnquiry },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your partnership enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.contactPerson,
      heading: "Partnership Enquiry Received",
      bodyText:
        "Thank you for your interest in partnering with Tanzania Buildcon International Expo. Our team will review your enquiry and respond shortly.",
      referenceId: data.referenceId,
    }),
  });
}
