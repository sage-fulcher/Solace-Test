The way I structured this is that each PR represents a phase of work, and each PR is targeted at the PR that came before it (rather than main). In full transparecny I spent more than 2 hours of this (probably closer to 5-6) but that was due to a combination of having fun working on it and losing time, as well as being a little unfamiliar with drizzle, next and tailwind and thus having to learn a good amount about them on the way. The final PR (https://github.com/sage-fulcher/Solace-Test/pull/4) has some extra snazzy features like redoing the seeding process to generate hundreds (or easily thousands) of distinct advocates and adds a loader.
There is still plenty more Id like to address, I only spent a brief amount of time on styling, I had no time to add any tests, and while the existing pagination works well it doesn't have the ability to easily surface to the user how many total pages there are so I'd like to address all those things, but given I already went well over the prescribed time I've decided to call it here.

In order of approach the way I addressed these changes were to

- Make Typescript happy, ideally no more anys (but especially no more explicit anys)
  adds types for advocates and and specialties - In this stage I didn't change the phone number, but I want to call out that in a real production app we shouldn't be storing phone numbers as numbers, given we never want to do any numerical operations on them. Ideally they should be a separate model in the DB with a many to many relationship with Advocates and ideally eventually on the patient model as well. We'd want the many to many because multiple patients/providers may have the same phone number (patients can cohabitate or share a phone, advocates can be working out of an office etc) and we'd want to make it its own model so phone numbers can eventually have more info attached to them (for example if the number is a cellphone or an answering service etc). Ideally Id probably also change the name of this field to contact phone number or something similar incase we want to add sms login down the line.
  (https://github.com/sage-fulcher/Solace-Test/pull/1)

- Make the search functionality work predictably. - Fixed several anti patterns (like changing the searchTerm to use all react state based logic, as opposed to setting the innerHtml etc), as well as changing the search box to be a controlled input. This should drastically reduce the number of bugs with this feature, as now all the data is under the control of react. - Split the table into child components, roughly following atomic design principles https://atomicdesign.bradfrost.com/chapter-2/ Even though I was planning on implementing server side filtering, I wanted to accomplish this version first as a stop gap.
  (https://github.com/sage-fulcher/Solace-Test/pull/2)

-Add pagination
While the amount of data in this repo doesnt come close to warranting pagination, I added it with an arbitrarily small page size (2). In the real world the page size would likely be much higher (probably around 200 or so at a minimum, likely higher).
(https://github.com/sage-fulcher/Solace-Test/pull/3)

-Add Server side filtering. In the current setup I just pass one search term that is just passed to all the relevant fields. In a more realistic app I would suggest to change the FE UI to have individual filters, and probably only have the generic search search specialty and name.
(https://github.com/sage-fulcher/Solace-Test/pull/3 )

- Make the seed data much larger. Use faker to generate thousands of advocates to better test the changes.
- Do some minor polishing and add a loader
  (https://github.com/sage-fulcher/Solace-Test/pull/4)
