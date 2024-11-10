####  TODO
# Cook&Meet
### Specification(In progress)

#### Purpose of the application:
The purpose of the applications is to strengthen the relationships between students living in the dormitories by spending time together cooking and sharing their meals.


####  The stakeholder (customer): Describe shortly the stakeholder/customer – the owner/operator of the web site/application. What are their goals, what is their mission?


####  Goals:
The main goal of this application is to connect the students living in the dormitories by spending their time together while cooking. Any user can become a "main chef" and create a cooking event for others to join. The application will enable the "main chef" to set up an event visible to other users by entering the meal they want to cook and the time frame they are available. The "main chef" should also add a predicted budget of that exact meal per portion, they can discuss details in the chat to set up the way they will split the cost - can either pay by cash during the event or by transfer. Other users will see events listed by the "main chefs," and can easily join any event they want. After such confirmation they will be automatically added to the event chat. To make the decision whether to join the event or not even easier, all users can leave rating to the recipe and all participants of that event(star rating and optional text feedback). Each user that has ever created any event will have a history of his recipes on their profile, that will not only help them to make the process of event creation faster, but also can see the feedback of others on his cooking skills. (Less words)

####  Success measures: How can you quantitatively measure whether your site/app is successful? What values of these measure do you want to achieve?
We can measure the success via diffeerent metrics.
1. User Satisfaction and Ratings
	•	Average Star Rating: Track the star ratings given by users (1-5 stars). Our goal is to maintain an average star rating of 4.8 or higher to indicate a high level of user satisfaction.
2. Engagement Metrics
	•	Number of Events Created: Track the total number of events created by users each month. We aim to reach 100 events per month as user adoption grows.
  •	Successful Event Completion Rate: Track the percentage of events that are successfully carried out as planned. We would like to achieve a success rate of 90, as this suggests that events are well-coordinated and satisfying users’ needs.
  •	Daily Active Users (DAU) and Monthly Active Users (MAU): Monitor how many users are actively engaging daily and monthly. Aim for DAU/MAU ratio of 0.4 or higher. This ratio indicates user stickiness and daily engagement.

3. Retention Metrics
•	User Retention Rates: Track the percentage of users who continue using the app after certain timeframes (1 week, 1 month, 3 months, etc.).
Goal:
•	1-week retention: 70% (indicates short-term engagement).
•	1-month retention: 50% (indicates medium-term satisfaction).
•	3-month retention: 30% (indicates longer-term loyalty).
•	Churn Rate: The percentage of users who stop using the app over a given period. Keep the churn rate below 30% per month to retain a steady user base.
4. Reach Metrics
•	Total Registered Users: Track the total number of users who have registered on the app.
•	Goal: If, for instance, there are 1,000 people living in the dorms, aim to have at least 80% (800 users) registered within the first few months of launch.
•	Dorm Coverage Rate: Track how many dorm residents are using the app versus the total dorm population.
•	Goal: Achieve 60% dorm resident usage after the first three months and aim to increase it to 80% within the first year.

5. Content Consumption and Interaction
	•	Average Session Duration: Monitor the average time users spend on the app per session.
•	Goal: Aim for an average session duration of 10 minutes or more, indicating users are engaged.
•	Page Views per Session: Track the number of pages users view on average in a single session.
•	Goal: Target an average of 5-7 page views per session.
These targets and measures can be tracked and adjusted as your app grows. With consistent monitoring, you’ll gain insights into which areas to improve, focusing on retention, satisfaction, or engagement as needed.

####  Competition analysis: The idea that you come up with has probably already been explored and implemented by someone else. Are there any similar web sites/applications? What can you learn from them? What are the things you like/dislike about their approach? What are the users' expectations with this kind of sites/applications (your best guess)? You can analyze competing solutions one by one, but always concisely summarize the important findings of the whole competition analysis. 
During our market research we came across different websites which performed similiar jobs to our planned website.

1. Eatwith

	•	Description: Eatwith connects people to host or join dining experiences at local hosts’ homes, popular among travelers.
	•	Strengths: Focuses on unique, local, and cultural experiences, offering a “boutique” dining feel with user reviews and booking options.
	•	Weaknesses: Limited to high-end, curated events rather than casual, everyday meet-ups, with fewer options in less touristy areas.
	•	Takeaways: Users appreciate high-quality, unique events but might desire a more accessible, casual option that encourages spontaneous and repeat connections.

2. Suppr

	•	Description: This social dining app helps individuals connect for group meals in local restaurants or homes, primarily targeting urban young professionals.
	•	Strengths: Provides social networking features, integrates well with social media, and allows group dining bookings.
	•	Weaknesses: More limited for student users; focus is mainly on restaurant-based meet-ups, which can be cost-prohibitive.
	•	Takeaways: Users appreciate integration with social profiles, which can increase trust and make connecting easier. Your app could benefit from profiles and ratings that build social proof without relying on expensive dining.

3. Belly

	•	Description: Focused on local food events and group dining experiences, with user-generated events and RSVPs.
	•	Strengths: Simple event creation and RSVP process, with a strong community feel and focus on connecting people through food.
	•	Weaknesses: Limited user moderation tools, and inconsistent quality in event execution.
	•	Takeaways: Ease of event creation and a welcoming community are appealing to users. Adding a review system and easy moderation tools could improve quality control.

4. Cookpad

	•	Description: A recipe-sharing platform with a social feature that allows users to interact, but no in-person meeting functionality.
	•	Strengths: High user engagement through recipe-sharing and feedback, which fosters a sense of community.
	•	Weaknesses: Lacks in-person event coordination, limiting real-world connections.
	•	Takeaways: Users value recipe sharing and virtual interaction around cooking. Combining this with real-life meetups could provide a unique, hybrid approach.

Summary of Competition Analysis

	•	User Expectations: Users expect ease of event creation, the ability to RSVP, and clear ratings or reviews to vet quality. They also value some degree of social proof, like integrated profiles or verified hosts, to make meeting new people feel safer and more approachable.
	•	Likes: The personalized approach, community focus, integration with social media, and user-generated content are all appreciated features across these platforms.
	•	Dislikes: High cost barriers, inconsistent event quality, and limited user interaction controls are frequent drawbacks. Users may also feel dissatisfied with general-purpose event apps and prefer platforms designed specifically for their interests.

Opportunities for our App

	•	Focus on Student-Friendly Accessibility: Affordable and casual meetups, with features like quick, flexible event creation, appeal to students who may prefer spontaneous or low-cost social gatherings.
	•	Enhanced Social Proof: Add social profiles, reviews, and star ratings to build trust.
	•	Integrated Recipes and Planning: Allowing users to share recipes, plan meals together, and even suggest what to cook can differentiate your app.
	•	Notifications and Engagement Tools: Clear notifications, reminders, and options for users to confirm attendance help ensure that events run smoothly and keep engagement high.

####  Functional requirements: What functionality will be required to achieve the application's goals?
  - Set up user profile
  - create the cooking event for others to join - place there an offer of an exact meal they want to cookvand the time frame they are available
  - add a predicted budget of that exact meal per portion
  - join the cooking event somebody else created
  - preview user that created a cooking event, his history what he already cooked or joined
  - Rate the recipie and the main chef and participating chefs (star rating and optional text feedback)
  - filtering the events based on dormitories, time, cuisine,... and searching for a specific event
(structure based on the kind of user : main chef and people who'll join)
 #### User Types:
 - Admin
 - Normal User

####  Non-functional requirements: What other requirements do you have? These are often high-level requirements on how the app should behave, interact, perform its functions, be implemented or deployed in terms of performance, security, availability, software quality, documentation, maintainability, etc.

1. Performance and Responsiveness
* Response Time: The app should respond to user actions within 1-2 seconds for standard operations. For actions involving data processing, like loading event lists or user profiles, the app should provide feedback within 3-5 seconds.
* Scalability: The app should support up to 1,000 concurrent users without degradation in performance. It should also be able to handle a 200% increase in user base within a year, ensuring smooth performance as more students join.
2. Usability and Accessibility
* Ease of Use: The app should have an intuitive and user-friendly design, allowing new users to learn and navigate the app with minimal instructions.
* Accessibility: Follow WCAG 2.1 AA guidelines to ensure accessibility for users with disabilities. This includes high-contrast text options, screen reader compatibility, and easy navigation.
* User Feedback and Help: Provide an accessible help section, including a searchable FAQ and a contact option. Users should also be able to submit feedback directly within the app.
3. Reliability and Availability
* Uptime: The app should aim for a 99.9% uptime, meaning it should be available for users nearly all the time, except for minimal planned maintenance.
* Fault Tolerance: Implement mechanisms to handle minor faults without crashing the entire app, ensuring continued functionality for users in the case of single-point failures.
* Data Backup and Recovery: User data should be backed up daily, with quick recovery processes to prevent data loss in case of system failure.
4. Security and Privacy
* Data Encryption: All user data should be encrypted in transit (via HTTPS) and at rest. Sensitive information (like passwords) should be hashed and stored securely.
* Authentication: Implement secure authentication protocols, including multi-factor authentication (MFA) for added security.
* Privacy Compliance: The app should comply with relevant data protection regulations, such as GDPR, ensuring that users’ personal data is handled lawfully and that they have control over it.
* User Access Control: Implement role-based access to protect administrative functions and sensitive data, ensuring only authorized users can access certain areas or perform specific actions.

####  Schedule & Budget: In particular, specify which functions you intend to design, prototype, and test in Round 1, and subsequently implement and test again in Round 2. Also specify which functions you intend to design, implement, and test in Round 3. Of course, the primary function of your site/app should be implemented first.

Schedule: 
    Round 1: Specification, user research, prototypes (75 Hours)
  - 6.10. - 13.10. Planning of the project, writing specification vol 1
  - 13.10. - 20.10. Creating the two personas
  - 20.10.-31.10. Two use-cases
  - 31.10. - 5.11. Wireframes and storyboard
  - 9.11. Finalization of files to be submited
  - Initial submission: 10 Nov 2024
  - Testing session: around 12 Nov 2024
  - Improved submission: 17 Nov 2024
  - Team review: 20 Nov 2024

    Round 2: App Version 1 (60 Hours)
  - 20.11. - 23.11. Writing specification vol 2
  - 23.11. - 10.12. Improving a prototype site 2 - secondary functions - showing the list of previous events/recipes with feedback/ratings, improvement of primary functoins
  - Updated specs submission: 24 Nov 2024
  - Testing session: 11 Dec 2024
  - Submission: 15 Dec 2024
  - Team review: 18 Dec 2024

    Round 3: App Version 2 (75 Hours)
  - 10.12. - 17.12. Writing specification vol 3
  - 18.12. - 10.1. Testing - internally
  - Updated specs submission: 22 Dec 2024
  - Submission: 18 Jan 2024
  - Team review: 21 Jan 2024

####  Split of responsibilities in your team:
  - Vanesa - Tester
  - Filip - Leader of the Application
  - Róbert - Observer
  - Dario - Testing leader


##### Personas:
https://www.canva.com/design/DAGTEaA_fXc/xKze3dv6ClPUfTBA3beHpA/edit?utm_content=DAGTEaA_fXc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
