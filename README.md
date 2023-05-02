# Module 2 Group Assignment

CSCI 5117, Spring 2022, [assignment description](https://canvas.umn.edu/courses/355584/pages/project-2)

## App Info:

* Team Name: SKINS
* App Name: QuickFITS
* App Link: https://quickfit-project.netlify.app/

### Students

* Tenzin Tseten, tsete003@umn.edu
* Joshua Yang, yang7182@umn.edu
* Ishika Nimmagadda, nimma013@umn.edu


## Key Features

**Describe the most challenging features you implemented
(one sentence per bullet, maximum 4 bullets):**

* Getting the weather and calendar to interact with eachother was pretty complicated.
* Real time editing and deleting of clothes on the wardrobe page without refreshing.

Which (if any) device integration(s) does your app support?

* Camera
* Geolocation

Which (if any) progressive web app feature(s) does your app support?

* Responsiveness 
* App-like interface 
* Installation process: Does not need to install an app, just needs to visit a website


## Mockup images

### This is the home/landing page, it shows the outfit the user chose. If the user swipes to the left they can see the next day and so on. 
![Landing page when user logs in](/images/mockups/Home.jpg?raw=true)

### If the user has not chosen an outfit for the specified day yet, it will look like this and give the user the option to choose a fit. Clicking on the Month/day/year area will popup a little calender and they can also change the day that way as well.

### On the calender there are tiny colored marks on certain days which imply that the user has chosen a fit for that day. Green implies user has chosen a full outfit, yellow implies the user has started to choose a fit, but has not completed it yet. 
![Home page without a fit chosen](/images/mockups/Home2.jpg?raw=true )

### The user can also access the calender from the calender icon on the bottom and it has the same features as before. Clicking on a day will bring it to the same page as above. (Home page, but with user specified day)

![Calender ](/images/mockups/Calender.jpg?raw=true)

### From home page user clicked on choose fit and it comes here. On this page you can choose a fit for the specified date. (First img) After the user continues they start choosing their outfit pieces. Swiping left and right to change to different category of clothes and swiping down to view more stuff from the category. (second img)

### If user chooses none its implying they haven't decided yet or dont need that category of clothing. The finished outfit button is on all the pages (when swiping left and right) and is to be clicked when they have finished choosing their whole fit. (Can always add/edit fit later in "closet"(hanger icon))
![Choosing Fit ](/images/mockups/ChoosingFit.jpg?raw=true)

### The + icon on the bottom will bring the user to a page to add clothing to your "closet". 
![Alt text](/images/mockups/AddingItem.jpg?raw=true)

### After user submits their clothing it will show a success message and allow them to add more items.                                                                                  
![Alt text ](/images/mockups/finishedAdding.jpg?raw=true)

### The last icon of the hanger will let the user view, edit and delete all the clothes in their closet.
![Alt text ](/images/mockups/closetAndEditing.jpg?raw=true)
## Testing Notes

**Is there anything special we need to know in order to effectively test your app? (optional):**

* ...



## Screenshots of Site (complete)

### Home page when user HAS NOT selected an outfit yet. Can use the calendar, arrows, or swipe feature to change the day.  
![Choosing Fit ](images/siteScreenshots/nofit.png?raw=true)

### Pressing the choose an outfit button will take you to this page and allow you to build an outfit.   
![Choosing Fit ](images/siteScreenshots/chooseanoutfit.png?raw=true)

### After pressing the add top button, it will bring you to this page. 
![Choosing Fit ](images/siteScreenshots/clotheslist.png?raw=true)


### Home page after the user HAS selected an outfit. 
![Choosing Fit ](images/siteScreenshots/withfit.png?raw=true)

### To delete something from your outfit just click on the clothing card and it will show a message. 
![Choosing Fit ](images/siteScreenshots/deleteclothefromfit.png?raw=true)

### Page to add clothes to your wardrobe 
![Choosing Fit ](images/siteScreenshots/addclothes.png?raw=true)

### Wardrobe page is where all your clothes are. You can use the tabs to go to another category or swipe. 
![Choosing Fit ](images/siteScreenshots/wardrobe.png?raw=true)

### If you made a mistake or want to add more to you clothing info you can just click on the clothing card on the wardrobe page and edit. To cancel/get out of an edit, you can click anywhere outside the form. 
![Choosing Fit ](images/siteScreenshots/inwardrobeeditingclothesinfo.png?raw=true)

## External Dependencies

**Document integrations with 3rd Party code or services here.
Please do not document required libraries (e.g., Vue, Vuefire, Firebase).**

* OpenWeatherMap: Used to get weather data 
* Material UI: Library for all our components 
* React-Swipeable: Used to integrate swipeable feature on home & wardrobe page 

**If there's anything else you would like to disclose about how your project
relied on external code, expertise, or anything else, please disclose that
here:**
* Used stack overflow in some areas, cited in code  
