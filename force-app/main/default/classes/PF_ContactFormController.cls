/**
 * PF_ContactFormController
 * Handles contact form submissions from portfolio site visitors
 * Uses 'without sharing' because guest users insert new records they don't own;
 * access is controlled purely by the permission set grant (Create-only on Contact_Submission__c)
 * @developer Vishnu G
 * @date 2026-09-20
 */
public without sharing class PF_ContactFormController {
  private static final Integer MAX_NAME_LENGTH = 120;
  private static final Integer MAX_MESSAGE_LENGTH = 4000;
  private static final String EMAIL_REGEX = '^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  @AuraEnabled
  public static void submitContactForm(
    String name,
    String email,
    String message
  ) {
    try {
      // Validate inputs
      if (String.isBlank(name)) {
        throw new AuraHandledException('Name is required.');
      }
      if (String.isBlank(email)) {
        throw new AuraHandledException('Email is required.');
      }
      if (String.isBlank(message)) {
        throw new AuraHandledException('Message is required.');
      }

      // Length validation
      if (name.length() > MAX_NAME_LENGTH) {
        throw new AuraHandledException('Name is too long.');
      }
      if (message.length() > MAX_MESSAGE_LENGTH) {
        throw new AuraHandledException('Message is too long.');
      }

      // Email format validation
      if (!Pattern.matches(EMAIL_REGEX, email.trim())) {
        throw new AuraHandledException('Invalid email format.');
      }

      // Trim and sanitize
      String sanitizedName = name.trim();
      String sanitizedEmail = email.trim();
      String sanitizedMessage = stripHtmlTags(message.trim());

      // Create submission record
      Contact_Submission__c submission = new Contact_Submission__c(
        Name__c = sanitizedName,
        Email__c = sanitizedEmail,
        Message__c = sanitizedMessage
      );

      insert submission;
    } catch (AuraHandledException e) {
      throw e;
    } catch (Exception e) {
      throw new AuraHandledException(
        'Unable to submit form. Please try again.'
      );
    }
  }

  private static String stripHtmlTags(String input) {
    if (String.isBlank(input)) {
      return input;
    }
    return input.replaceAll('<[^>]*>', '');
  }
}