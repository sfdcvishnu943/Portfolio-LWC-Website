public without sharing class PF_PortfolioController {
  @AuraEnabled(cacheable=true)
  public static List<Skill__c> getSkills() {
    return [
      SELECT Id, Name, Category__c, Proficiency__c, Display_Order__c
      FROM Skill__c
      WHERE IsActive__c = true
      ORDER BY Display_Order__c ASC, Name ASC
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Work_Experience__c> getWorkExperience() {
    return [
      SELECT
        Id,
        Name,
        Job_Title__c,
        Start_Date__c,
        End_Date__c,
        Description__c,
        Display_Order__c
      FROM Work_Experience__c
      WHERE IsActive__c = true
      ORDER BY Start_Date__c DESC
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Project__c> getProjects() {
    return [
      SELECT
        Id,
        Name,
        Description__c,
        Tech_Stack__c,
        Project_URL__c,
        Github_URL__c,
        Image__c,
        Display_Order__c,
        Start_Date__c,
        End_Date__c,
        Project_Type__c
      FROM Project__c
      WHERE IsActive__c = true
      ORDER BY Display_Order__c ASC, Name ASC
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Education__c> getEducation() {
    return [
      SELECT Id, Name, Degree__c, Start_Date__c, End_Date__c, Display_Order__c
      FROM Education__c
      WHERE IsActive__c = true
      ORDER BY Start_Date__c DESC
    ];
  }

  @AuraEnabled(cacheable=true)
  public static Map<String, String> getProfile() {
    Map<String, String> profile = new Map<String, String>();

    List<Portfolio_Profile__c> records = [
      SELECT Name, Headline__c, Bio__c, Photo_URL__c, Email__c, LinkedIn_URL__c, Github_URL__c, Trailhead_URL__c
      FROM Portfolio_Profile__c
      WHERE IsActive__c = true
      LIMIT 1
    ];

    if (!records.isEmpty()) {
      Portfolio_Profile__c p = records[0];
      profile.put('Full_Name__c', p.Name);
      profile.put('Headline__c', p.Headline__c);
      profile.put('Bio__c', p.Bio__c);
      profile.put('Photo_URL__c', p.Photo_URL__c);
      profile.put('Email__c', p.Email__c);
      profile.put('LinkedIn_URL__c', p.LinkedIn_URL__c);
      profile.put('Github_URL__c', p.Github_URL__c);
      profile.put('Trailhead_URL__c', p.Trailhead_URL__c);
    }

    return profile;
  }
}