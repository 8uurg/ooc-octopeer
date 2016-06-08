|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Sprint 6|
|Date|04/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 6.

Total: **10**

| User Story | Score |
|------------|-------|
| definition | 10    |
| splitting  | 10    |
| responsibility | 10 |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |   10   |
| prioritisation        |   10  |
| reflection            |   10   |

## Notes
* **Thanks for adding the total hours!!**
	* Some hours seem on the low side since they don't include other hours (like you mentioned in the comment), you could include a column where everyone also fills in an estimated time spent on other items (meetings, lectures, etc)
* Well done

#Code Evolution Quality Feedback

Total: **9.34**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  8    |
| Architecture Design Document (ADD) |  9    |

|                     | Score |
|---------------------|-------|
| Code Change Quality |   8   |

| Code Readability | Score |
|------------------|-------|
| Formatting       |   9   |
| Naming           |   10   |
| Comments         |   10   |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |   10   |
| Testing                |   10   |

|         | Score |
|---------|-------|
| Tooling |   10   |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10    |
| Code Review            |  10    |

##Notes
* ADD
	* Thanks for adding the diagrams!
	* Add text to the database design section, not everyone is a visual learner
	* Thanks for the extra glossary terms
	* Section Titles in English have all Words Capitalised except for Stop Words
	* System Decomposition diagram seems like an older version
	* Label your diagrams and use them in the text
* Good job keeping the motivation documents up to date
	* Since there is a trade-off is between type-checking to make the interfaces easier to debug and modifiability + extensibility, it can't be perfect; you motivate your choices well so it's as close as it's going to get.
* Magic numbers see, comments from feedback 5
* `semanticTracker.ts` 
	* has inconsistent coding styles with respect to anaonymous functions
		* `registerKeystroke` vs `registerClick`
	* todo's and commented code
	* `"http://10.0.22.6/api/event-types/"` should be saved a const or a setting