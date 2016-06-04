|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Sprint 6|
|Date|04/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 6.

Total: ****

| User Story | Score |
|------------|-------|
| definition |     |
| splitting  |     |
| responsibility |  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |      |
| prioritisation        |     |
| reflection            |      |

## Notes
* **Thanks for adding the total hours!!**
	* Some hours seem on the low side since they don't include other hours (like you mentioned in the comment), you could include a column where everyone also fills in an estimated time spent on other items (meetings, lectures, etc)
* Well done

#Code Evolution Quality Feedback

Total: ****

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |      |
| Architecture Design Document (ADD) |      |

|                     | Score |
|---------------------|-------|
| Code Change Quality |      |

| Code Readability | Score |
|------------------|-------|
| Formatting       |      |
| Naming           |      |
| Comments         |      |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |      |
| Testing                |      |

|         | Score |
|---------|-------|
| Tooling |      |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |      |
| Code Review            |      |

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